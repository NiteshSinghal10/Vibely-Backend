import { Router } from "express";
import { sendResponse } from "../lib";
import {
  internalController,
  userLocationController,
  friendRequestController,
  friendsController,
  messageController,
} from "../controllers";
import { verifyToken } from "../middlewares";

const router = Router();

router.use("/user-info", verifyToken, userLocationController);

router.use("/friend-request", verifyToken, friendRequestController);

router.use('/friend', verifyToken, friendsController);

router.use('/message', verifyToken, messageController)

router.use("/internal", internalController);

router.get("/test", (req, res) => {
  return sendResponse(res, 200, true, "Success");
});

export default router;
