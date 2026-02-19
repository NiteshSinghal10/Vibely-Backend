import { Server } from "socket.io";
import { AuthSocket } from "../../configuration";
import { getRedisClient } from "../../loaders";

export const randomConnectSocket = (io: Server, socket: AuthSocket) => {
  socket.on("randomConnect", async() => {
    const user = socket.user?.sub;

    const redis = getRedisClient();
    const waitingUsers = await redis.LRANGE("waiting-users", 0, -1);

    if(waitingUsers.length) {
      const randomIndex = Math.floor(Math.random() * waitingUsers.length);
      const randomUser = waitingUsers[randomIndex];

      await Promise.all([
        redis.hSet("active-chats", user as string, randomUser),
        redis.hSet("active-chats", randomUser, user as string)
      ]);

      // Notify the users that they are connected
      io.to(user as string).emit("randomConnected");
      socket.emit("randomConnected");

    } else {
      await redis.LPUSH("waiting-users", user as string);
    }
  })

  socket.on("cancelRandomConnect", async() => {
    const user = socket.user?.sub;

    if(user) {
      const redis = getRedisClient();
      await redis.LREM("waiting-users", 0, user as string);
    }
  })
}