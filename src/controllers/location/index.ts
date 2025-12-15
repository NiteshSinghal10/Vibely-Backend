import { Router, Request, Response } from 'express';
import { getErrorMessage, RESPONSE_MESSAGES, sendResponse } from '../../lib';
import { getUserLocation } from '../../services';

const router = Router();

router.get('/user-location', async(req: Request, res: Response) => {
  try {
    const { sub } = req.user;
    const userLocation = await getUserLocation({ _user: sub });

    return sendResponse(res, 200, true, RESPONSE_MESSAGES.en.success, userLocation);
  } catch(error) {
    return sendResponse(res, 400, false, getErrorMessage(error));
  }
})

export const userLocationController = router;