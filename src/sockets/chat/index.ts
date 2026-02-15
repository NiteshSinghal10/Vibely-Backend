import { Server } from "socket.io";
import { createMessage, getMessage, updateFriend, updateMessage, updateMessages } from "../../services";
import { IMessage } from "../../interfaces";
import { AuthSocket } from "../../configuration";
import { generateChatId } from "../../lib";
import { getRedisClient } from "../../loaders";

export const chatSocket = (io: Server, socket: AuthSocket): void => {

  socket.on("sendMessage", async (data) => {
    const { chatId, _receiver, content, _replyMessage, _friend } = data;

    const message = await createMessage({
      chatId,
      _receiver,
      content,
      _sender: socket.user?.sub,
      _replyMessage,
      _friend
    }) as IMessage;

    const redis = getRedisClient()

    const receiverSocketId = await redis.get(`user:${_receiver}`);

    let replyMessage: IMessage | undefined;

    if(_replyMessage) {
      replyMessage = await getMessage({ _id: _replyMessage }, {}, {}) as IMessage;
    }

    const socketEventPayload = {
      _id: message._id,
      chatId: generateChatId(message._receiver, message._sender),
      _sender: message._sender,
      _receiver: message._receiver,
      content: message.content,
      createdAt: message.createdAt,
      _replyMessage: replyMessage
    }

    if(receiverSocketId) {
      io.to(receiverSocketId).emit("sentMessage", socketEventPayload);
    }

    socket.emit("sentMessage", socketEventPayload);

    // Update last activity
    await updateFriend(
      { _id: message._friend },
      { lastActivity: new Date() }
    );
  });

  socket.on("deleteMessage", async (data) => {
    const user = socket.user?.sub
    const message = await updateMessage({ _id: data._id, _sender: user }, { status: 'DELETED' }) as IMessage;

    const redis = getRedisClient()

    const receiverSocketId = await redis.get(`user:${message._receiver}`);

    if(receiverSocketId) {
      io.to(receiverSocketId).emit("messageDeleted", message);
    }

    socket.emit("messageDeleted", message);

     // Update last activity
     await updateFriend(
      { _id: message._friend },
      { lastActivity: new Date() }
    );
  })

  socket.on("editMessage", async (data) => {
    const user = socket.user?.sub;
    const { _id, ...rest } = data;
    const message = await updateMessage({ _id, _sender: user }, rest) as IMessage;

    const redis = getRedisClient();

    const receiverSocketId = await redis.get(`user:${message._receiver}`);

    if(receiverSocketId) {
      io.to(receiverSocketId).emit("messageEdited", message);
    }

    socket.emit("messageEdited", message);

     // Update last activity
     await updateFriend(
      { _id: message._friend },
      { lastActivity: new Date() }
    );
  })

  socket.on("messageRead", async (data) => {
    await updateMessages({ _friend: data._friend }, { status: 'READ' });
  })
}
