import { Router } from "express";
import { sendResponse } from "../lib";
import {
  internalController,
  userLocationController,
  friendRequestController,
} from "../controllers";
import { verifyToken } from "../middlewares";

const router = Router();

router.use("/user-info", verifyToken, userLocationController);

router.use("/friend-request", friendRequestController);

router.use("/internal", internalController);

router.get("/test", (req, res) => {
  return sendResponse(res, 200, true, "Success");
});

export default router;
