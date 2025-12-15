import { Router, Request, Response } from 'express';
import { getErrorMessage, RESPONSE_MESSAGES, sendResponse } from '../../lib';
import { getUserLocation } from '../../services';
import { IUserLocation } from '../../interfaces';

const router = Router();

router.get('/', async(req: Request, res: Response) => {
  try {
    const { sub } = req.user;
    const userLocation = await getUserLocation({ _user: sub }) as IUserLocation;

    const data = {
      country: userLocation.country,
      countryCode: userLocation.countryCode,
      countryCode3: userLocation.countryCode3,
      timezone: userLocation.timezone
    }

    return sendResponse(res, 200, true, RESPONSE_MESSAGES.en.success, data);
  } catch(error) {
    return sendResponse(res, 400, false, getErrorMessage(error));
  }
})

export const userLocationController = router;