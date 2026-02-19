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


router.use("/internal", internalController);

router.get("/test", (req, res) => {
  return sendResponse(res, 200, true, "Success");
});

router.use(verifyToken);

router.use("/user-info", userLocationController);

router.use("/friend-request", friendRequestController);

router.use('/friend', friendsController);

router.use('/message', messageController)

export default router;
