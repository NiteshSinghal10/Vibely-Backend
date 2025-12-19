import { Socket } from 'socket.io';
import { ITokenPayload } from '../../interfaces';
import { validateToken } from '../../lib';

export interface AuthSocket extends Socket {
  user?: ITokenPayload;
}

export default function socketAuth(
  socket: AuthSocket,
  next: (err?: Error) => void
) {
  try {
    console.log("AUTH MIDDLEWARE")
    const token = socket.handshake.auth.token;
    const user = validateToken(token) as ITokenPayload;

    socket.user = user;
    next();
  } catch {
    next(new Error("Unauthorized"));
  }
}