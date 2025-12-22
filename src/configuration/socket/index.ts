import { Server } from 'socket.io';
import socketAuth, { AuthSocket } from '../socket-auth';
import http from 'http';
import registerSockets from '../../sockets';
import { ServerToClientEvents, ClientToServerEvents } from '../../interfaces';
import { getRedisClient } from '../../loaders';

let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
    cors: {
      origin: "*",
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
  });

  io.use(socketAuth);

  io.on('connection', async (socket: AuthSocket) => {
    console.log("Connected:", socket.id);

    const redis = getRedisClient()

    await redis.set(`user:${socket.user?.sub}`, socket.id)

    registerSockets(io, socket);

    socket.on("disconnect", async () => {
      await redis.del(`user:${socket.user?.sub}`);
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