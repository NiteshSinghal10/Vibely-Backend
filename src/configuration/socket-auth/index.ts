import { Socket } from 'socket.io';
import { parse } from "cookie";

import { ITokenPayload, ClientToServerEvents, ServerToClientEvents } from '../../interfaces';
import { getErrorMessage, validateToken } from '../../lib';

export interface AuthSocket extends Socket<ClientToServerEvents, ServerToClientEvents> {
  user?: ITokenPayload;
}

export default function socketAuth(
  socket: AuthSocket,
  next: (err?: Error) => void
) {
  try {
    const cookies = parse(socket.handshake.headers.cookie || "");
    const token = cookies?.accessToken || '';

    const user = validateToken(token) as ITokenPayload;

    socket.user = user;
    next();
  } catch(error) {
    next(new Error(getErrorMessage(error)));
  }
}