import { Server } from "socket.io";
import { chatSocket } from './chat';
import { AuthSocket } from '../configuration';

export default function registerSockets(io: Server, socket: AuthSocket): void {
  chatSocket(io, socket);
}