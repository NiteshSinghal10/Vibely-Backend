import { Server } from "socket.io";
import { chatSocket } from './chat';
import { AuthSocket } from '../configuration';
import { randomConnectSocket } from "./random-connect";

export default function registerSockets(io: Server, socket: AuthSocket): void {
  chatSocket(io, socket);
  randomConnectSocket(io, socket);
}