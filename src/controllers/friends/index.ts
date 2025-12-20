import { Router, Request, Response } from 'express';
import { AUTH_BACKEND_URL, callOtherService, getErrorMessage, RESPONSE_MESSAGES, sendResponse } from '../../lib';
import { getFriendRequests, getFriends } from '../../services';
import { IFriend, IFriendRequest, IUser } from '../../interfaces';
import { Types } from 'mongoose';

const router = Router();

router.get('/list', async(req: Request, res: Response) => {
  try {
    const { sub } = req.user;
    const { page = 1, limit = 10, search = '' } = req.query;
    const options = {
      skip: (Number(page) - 1) * Number(limit),
      limit
    };

    let friendUserIds: string[] = [];

    if(search) {
      const users = await callOtherService<{ data: IUser[] }>(
        `${AUTH_BACKEND_URL}/auth/api/v1/internal/users`,
        "POST",
        { searchValue: search },
      );

      const friendsIds = users.data.map(user => String(user._id));

      const friends = await getFriends({
        _users: { $in: sub },
        status: 'ACTIVE',
        $expr: {
          $setIsSubset: [[sub], '$_users']
        }
      }, {}, options) as IFriend[];

      friends.forEach((friend) => {
        const friendId = friend._users.find(
          id => String(id) !== String(sub)
        );
  
        if (friendsIds.includes(String(friendId))) {
          friendUserIds.push(String(friendId));
        }
      });
    } else {
      const friends = await getFriends({ _users: { $in: sub }, status: 'ACTIVE' }, {},options) as IFriend[];

      friendUserIds = friends.map(friend => friend._users.find(user => String(user) !== String(sub)))
      .filter(user => user !== undefined)
      .map(user => String(user));
    }

    const friendsData = await callOtherService<{ data: IUser[] }>(
      `${AUTH_BACKEND_URL}/auth/api/v1/internal/users`,
      'POST',
      { search: { _id: { $in: friendUserIds } } }
    );

    return sendResponse(res, 200, true, RESPONSE_MESSAGES.en.success, friendsData.data)

  } catch(error) {
    return sendResponse(res, 400, false, getErrorMessage(error));
  }
})

export const friendsController = router;