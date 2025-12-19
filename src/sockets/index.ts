import { Server, Socket } from "socket.io";
import { chatSocket } from './chat';

export default function registerSockets(io: Server, socket: Socket): void {
  chatSocket(io, socket);
}