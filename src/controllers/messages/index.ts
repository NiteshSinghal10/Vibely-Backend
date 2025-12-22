import { Request, Response, Router } from 'express';
import { sendResponse, getErrorMessage, RESPONSE_MESSAGES, generateChatId } from '../../lib';
import { getMessages } from '../../services';
import { validateMessageListing } from '../../middlewares';

const router = Router();

router.get('/list', validateMessageListing, async(req: Request, res: Response) => {
  try {
    const { sub } = req.user;
    const { page = 1, limit = 30, _user } = req.query;

    const options = {
      skip: (Number(page) - 1) * Number(limit),
      limit,
      sort: { createdAt: -1 }
    }

    const messages = await getMessages({ chatId: generateChatId(String(sub), String(_user)) }, {}, options);

    return sendResponse(res, 200, true, RESPONSE_MESSAGES.en.success, messages);
  } catch(error) {
    return sendResponse(res, 400, false, getErrorMessage(error));
  }
})

export const messageController = router;