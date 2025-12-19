import { Server, Socket } from "socket.io";

export const chatSocket = (io: Server, socket: Socket): void => {

  socket.on("sendMessage", async (data: string) => {
    console.log(data)
    socket.emit("rec", "Hello i am from backend 2")
  });

  socket.on("message", async (data: string) => {
    console.log(data)
    socket.emit("rec", "Hello i am from backend")
  });

}
