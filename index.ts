import { appLoader, dbLoader, redisConnector } from "./src/loaders";

const startServer = async () => {
  await dbLoader();
  await redisConnector()
  appLoader();
};

startServer();
