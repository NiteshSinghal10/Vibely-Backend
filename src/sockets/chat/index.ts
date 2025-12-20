import { Server } from "socket.io";
import { createMessage } from "../../services";
import { IMessage } from "../../interfaces";
import { AuthSocket } from "../../configuration";
import { generateChatId } from "../../lib";

export const chatSocket = (io: Server, socket: AuthSocket): void => {

  socket.on("sendMessage", async (data) => {
    const { chatId, _receiver, content } = data;

    const message = await createMessage({
      chatId,
      _receiver,
      content,
      _sender: socket.user?.sub
    }) as IMessage;

    socket.emit("sentMessage", {
      _id: message._id,
      chatId: generateChatId(message._receiver, message._sender),
      _sender: message._sender,
      _receiver: message._receiver,
      content: message.content,
      createdAt: message.createdAt
    })
  });
}
