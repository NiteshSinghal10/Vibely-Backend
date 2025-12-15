import { Router, Request, Response } from "express";
import { getErrorMessage, RESPONSE_MESSAGES, sendResponse } from "../../lib";
import { validateUpdateUserLocation } from "../../middlewares";
import { updateUserAdditionalInfo } from "../../services";

const router = Router();

router.put(
  "/update-user-location",
  validateUpdateUserLocation,
  async (req: Request, res: Response) => {
    try {
      const { _user, ...rest } = req.body;

      const userLocation = await updateUserAdditionalInfo({ _user }, rest, {
        upsert: true,
      });

      return sendResponse(
        res,
        200,
        true,
        RESPONSE_MESSAGES.en.success,
        userLocation,
      );
    } catch (error) {
      return sendResponse(res, 400, false, getErrorMessage(error));
    }
  },
);

export const internalController = router;
