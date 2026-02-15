import { Router, Request, Response } from 'express';
import { AUTH_BACKEND_URL, callOtherService, getErrorMessage, RESPONSE_MESSAGES, sendResponse } from '../../lib';
import { countMessages, getFriends } from '../../services';
import { IFriend, IUser } from '../../interfaces';
import { getRedisClient } from '../../loaders';

const router = Router();

router.get('/list', async(req: Request, res: Response) => {
  try {
    const { sub } = req.user;
    const redisClient = getRedisClient();
    const { cursor = '', limit = 10, search = '' } = req.query;
    const options = {
      limit,
      sort: { lastActivity: -1 }
    };

    let friendsDetail: Record<string, (IFriend & {friendDetail?: IUser, isOnline?: boolean, newMessage?: number})> = {};

    if(search) {
      const users = await callOtherService<{ data: IUser[] }>(
        `${AUTH_BACKEND_URL}/auth/api/v1/internal/users`,
        "POST",
        { searchValue: search },
      );

      const friendsIds = users.data.map(user => String(user._id));

      const friends = await getFriends({
        ...(cursor ? { lastActivity: { $lt: cursor } } : {}),
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
          friendsDetail[String(friendId)] = friend;
        }
      });
    } else {
      const friends = await getFriends({ ...(cursor ? { lastActivity: { $lt: cursor } } : {}), _users: { $in: sub }, status: 'ACTIVE' }, {},options) as IFriend[];

      friends.forEach(friend => {
        const friendId = friend._users.find(id => String(id) !== String(sub));

        if (friendId) {
          friendsDetail[String(friendId)] = friend;
        }
      })
    }

    const friendsData = await callOtherService<{ data: (IUser & { isOnline?: boolean })[] }>(
      `${AUTH_BACKEND_URL}/auth/api/v1/internal/users`,
      'POST',
      { search: { _id: { $in: Object.keys(friendsDetail) } } }
    );


    for await (const friend of friendsData.data) {
      friendsDetail[String(friend._id)].friendDetail = friend;
      friendsDetail[String(friend._id)].isOnline = !!(await redisClient.get(`user:${friend._id}`));
    }

    const data = Object.values(friendsDetail);

    const newMessagesCount = await Promise.all(data.map(async (friend) => await countMessages({ _friend: friend._id, status: { $ne: 'READ' } })));

    data.forEach((friend, index) => {
      friend.newMessage = (newMessagesCount[index] as number) || 0;
    })
    

    return sendResponse(res, 200, true, RESPONSE_MESSAGES.en.success, data);

  } catch(error) {
    return sendResponse(res, 400, false, getErrorMessage(error));
  }
})

export const friendsController = router;