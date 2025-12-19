import { Server } from "socket.io";
import { createMessage } from "../../services";
import { IMessage } from "../../interfaces";
import { AuthSocket } from "../../configuration";

export const chatSocket = (io: Server, socket: AuthSocket): void => {

  socket.on("sendMessage", async (data) => {
    const { _chat, _receiver, content } = data;
    console.log("-==>", socket.user)

    const message = await createMessage({
      _chat,
      _receiver,
      content,
      _sender: 'a'
    }) as IMessage;

    socket.emit("sentMessage", {
      _receiver,
      _chat,
      _message: message._id
    })
  });
}
