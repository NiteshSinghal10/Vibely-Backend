import { createClient, RedisClientType } from 'redis';

let redisClient: RedisClientType | null = null;

export const redisConnector = async () => {
  if (!redisClient) {
    // Connect to production Redis
    redisClient = createClient({
      url: "redis://localhost:6379",
    });

    redisClient.on("connect", () => console.log("Redis connected"));
    redisClient.on("error", (err) => console.error("Redis error:", err));

    await redisClient.connect();

    return redisClient
  }
}

export const getRedisClient = (): RedisClientType => {
  if (!redisClient) {
    throw new Error("Redis client not initialized");
  }

  return redisClient;
};

