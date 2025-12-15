import { Router, Request, Response } from "express";
import { getErrorMessage, RESPONSE_MESSAGES, sendResponse } from "../../lib";
import {
  getUserAdditionalInfo,
  updateUserAdditionalInfo,
} from "../../services";
import { IUserAdditionalInfo } from "../../interfaces";
import { validateUpdateUserInterest } from "../../middlewares";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { sub } = req.user;
    const userInfo = (await getUserAdditionalInfo({
      _user: sub,
    })) as IUserAdditionalInfo;

    const data = {
      _id: userInfo?._id,
      country: userInfo?.country,
      countryCode: userInfo?.countryCode,
      countryCode3: userInfo?.countryCode3,
      timezone: userInfo?.timezone,
      interests: userInfo?.interests,
    };

    return sendResponse(res, 200, true, RESPONSE_MESSAGES.en.success, data);
  } catch (error) {
    return sendResponse(res, 400, false, getErrorMessage(error));
  }
});

router.put(
  "/interests",
  validateUpdateUserInterest,
  async (req: Request, res: Response) => {
    try {
      const { sub } = req.user;
      const { interests } = req.body;

      await updateUserAdditionalInfo(
        { _user: sub },
        { interests },
        { upsert: true },
      );

      return sendResponse(res, 200, true, RESPONSE_MESSAGES.en.success);
    } catch (error) {
      return sendResponse(res, 400, false, getErrorMessage(error));
    }
  },
);

export const userLocationController = router;
