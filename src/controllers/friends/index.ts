import { Router, Request, Response } from 'express';
import { AUTH_BACKEND_URL, callOtherService, getErrorMessage, RESPONSE_MESSAGES, sendResponse } from '../../lib';
import { getFriendRequests } from '../../services';
import { IFriendRequest, IUser } from '../../interfaces';

const router = Router();

router.get('/list', async(req: Request, res: Response) => {
  try {
    const { sub } = req.user;
    const { page = 1, limit = 10, search = '' } = req.query;
    const options = {
      skip: (Number(page) - 1) * Number(limit),
      limit
    };

    let users: { data: IUser[] };
    let friends: IFriendRequest[];
    let fromIds: string[] = [];

    if(search) {
      users = await callOtherService<{ data: IUser[] }>(
        `${AUTH_BACKEND_URL}/auth/api/v1/internal/users`,
        "POST",
        { searchValue: search },
      );

      fromIds = users.data.map(user => String(user._id));

      friends = await getFriendRequests({ from: { $in: fromIds }, to: sub, status: 'ACCEPTED' }, {}, options) as IFriendRequest[];
    } else {
      friends = await getFriendRequests({ from: sub, status: 'ACCEPTED' }, {}, options) as IFriendRequest[];

      fromIds = friends.map(friend => String(friend.to));

      users = await callOtherService<{ data: IUser[] }>(
        `${AUTH_BACKEND_URL}/auth/api/v1/internal/users`,
        "POST",
        { search: { _id: { $in: fromIds } } }
      );
    }

    friends.forEach((friend) => {
      const fromUser = users.data.find(
        (user) => String(user._id) === String(friend.to),
      );

      if (fromUser) {
        friend.from = fromUser;
      }
    });

    return sendResponse(res, 200, true, RESPONSE_MESSAGES.en.success, friends)

  } catch(error) {
    return sendResponse(res, 400, false, getErrorMessage(error));
  }
})

export const friendsController = router;