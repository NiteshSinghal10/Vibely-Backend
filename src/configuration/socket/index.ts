import { Server } from 'socket.io';
import socketAuth from '../socket-auth';
import http from 'http';
import registerSockets from '../../sockets';

let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
  });

  // io.use(socketAuth);

  io.on('connection', (socket) => {
    console.log("Connected:", socket.id);

    registerSockets(io, socket);

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
    });
  });
} 

export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
}