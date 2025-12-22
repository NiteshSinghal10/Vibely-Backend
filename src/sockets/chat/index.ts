import { Server } from "socket.io";
import { createMessage } from "../../services";
import { IMessage } from "../../interfaces";
import { AuthSocket } from "../../configuration";
import { generateChatId } from "../../lib";
import { getRedisClient } from "../../loaders";

export const chatSocket = (io: Server, socket: AuthSocket): void => {

  socket.on("sendMessage", async (data) => {
    const { chatId, _receiver, content } = data;

    const message = await createMessage({
      chatId,
      _receiver,
      content,
      _sender: socket.user?.sub
    }) as IMessage;

    const redis = getRedisClient();

    const receiverSocketId = await redis.get(`user:${_receiver}`)

    const socketEventPayload = {
      _id: message._id,
      chatId: generateChatId(message._receiver, message._sender),
      _sender: message._sender,
      _receiver: message._receiver,
      content: message.content,
      createdAt: message.createdAt
    }

    if(receiverSocketId) {
      io.to(receiverSocketId).emit("sentMessage", socketEventPayload);
    }

    socket.emit("sentMessage", socketEventPayload)
  });
}
