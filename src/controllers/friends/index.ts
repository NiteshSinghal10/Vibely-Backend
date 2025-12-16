import { Router, Request, Response } from 'express';
import { AUTH_BACKEND_URL, callOtherService, getErrorMessage, RESPONSE_MESSAGES, sendResponse } from '../../lib';
import { getFriendRequests } from '../../services';
import { IFriendRequest, IUser } from '../../interfaces';

const router = Router();

router.get('/list', async(req: Request, res: Response) => {
  try {
    // const { sub } = req.user;
    const sub = "6920199d5f9c121d9dc53588";
    const { page = 1, limit = 10, search = '' } = req.query;
    const options = {
      skip: (Number(page) - 1) * Number(limit),
      limit
    };

    let users: { data: IUser[] };
    let friends: IFriendRequest[];
    let toIds: string[] = [];

    if(search) {
      const regex = new RegExp(String(search).trim(), 'i');
      users = await callOtherService<{ data: IUser[] }>(
        `${AUTH_BACKEND_URL}/auth/api/v1/internal/users`,
        "GET",
        {},
        { search: { $or: [{ firstName: regex }, { lastName: regex }] } },
      );

      toIds = users.data.map(user => String(user._id));

      friends = await getFriendRequests({ from: sub, to: { $in: toIds }, status: 'ACCEPTED' }, {}, options) as IFriendRequest[];
    } else {
      friends = await getFriendRequests({ from: sub, status: 'ACCEPTED' }, {}, options) as IFriendRequest[];

      toIds = friends.map(friend => String(friend.to));

      users = await callOtherService<{ data: IUser[] }>(
        `${AUTH_BACKEND_URL}/auth/api/v1/internal/users`,
        "GET",
        {},
        { search: { _id: { $in: toIds } } },
      );
    }

    friends.forEach((friend) => {
      const toUser = users.data.find(
        (user) => String(user._id) === String(friend.to),
      );

      if (toUser) {
        friend.to = toUser;
      }
    });

    return sendResponse(res, 200, true, RESPONSE_MESSAGES.en.success, friends)

  } catch(error) {
    return sendResponse(res, 400, false, getErrorMessage(error));
  }
})

export const friendsController = router;