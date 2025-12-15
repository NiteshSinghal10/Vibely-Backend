import { Request, Response, Router } from 'express';
import { AUTH_BACKEND_URL, getErrorMessage, RESPONSE_MESSAGES, sendResponse } from '../../lib';
import { validateCreateFriendRequest, validateGetFriendRequests, validateUpdateStatusFriendRequest } from '../../middlewares';
import { createFriendRequest, getFriendRequests, updateFriendRequest } from '../../services';
import { IFriendRequest, IUser } from '../../interfaces';
import { callOtherService } from '../../lib';

const router = Router();

router.route('/')
.post( validateCreateFriendRequest, async(req: Request, res: Response) => {
  try {
    const { sub } = req.user;
    const { to } = req.body;

    const friendRequest = await createFriendRequest({ from: sub, to });

    return sendResponse(res, 200, true, RESPONSE_MESSAGES.en.success, friendRequest);
  } catch(error) {
    return sendResponse(res, 400, false, getErrorMessage(error));
  }
})

.put( validateUpdateStatusFriendRequest, async(req: Request, res: Response) => {
  try {
    const { sub } = req.user;
    const { _id, status } = req.body;

    const updatedFriendRequest = await updateFriendRequest(
      { _id, from: sub, status: 'PENDING' },
      { status },
      { new: true }
    );

    return sendResponse(res, 200, true, RESPONSE_MESSAGES.en.success, updatedFriendRequest);
  } catch(error) {
    return sendResponse(res, 400, false, getErrorMessage(error));
  }
})

.get( validateGetFriendRequests, async(req: Request, res: Response) => {
  try {
    // const { sub } = req.user;
    const sub = '6920199d5f9c121d9dc53588';
    const { page = 1, limit= 10 } = req.query;

    const options = {
      skip: (Number(page) - 1) * Number(limit), 
      limit
    }

    const friendRequests = await getFriendRequests({ from: sub, status: { $ne: 'PENDING' } }, {}, options) as IFriendRequest[];

    const userIds = friendRequests.map(request => request.to);

    const users = await callOtherService<{data: IUser[]}>(`${AUTH_BACKEND_URL}/auth/api/v1/internal/users`, 'GET', {}, { search: { _ids: { $in: userIds } } } );

    friendRequests.forEach(request => {
      const toUser = users.data.find(user => String(user._id) === String(request.to));

      if(toUser) {
        request.to = toUser;
      }
    })

    return sendResponse(res, 200, true, RESPONSE_MESSAGES.en.success, friendRequests)
  } catch(error) {
    return sendResponse(res, 400, false, getErrorMessage(error));
  }
})

export const friendRequestController = router;