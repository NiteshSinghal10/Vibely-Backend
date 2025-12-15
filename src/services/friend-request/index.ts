import { FRIEND_REQUEST } from "../../models";

export const createFriendRequest = (data: {}) =>
  new Promise((resolve, reject) =>
    FRIEND_REQUEST.create(data).then(resolve).catch(reject),
  );

export const getFriendRequests = (search = {}, project = {}, options = {}) =>
  new Promise((resolve, reject) =>
    FRIEND_REQUEST.find(search, project, options)
      .lean()
      .exec()
      .then(resolve)
      .catch(reject),
  );

export const updateFriendRequest = (search = {}, update = {}, options = {}) =>
  new Promise((resolve, reject) =>
    FRIEND_REQUEST.findOneAndUpdate(search, update, options)
      .lean()
      .exec()
      .then(resolve)
      .catch(reject),
  );
