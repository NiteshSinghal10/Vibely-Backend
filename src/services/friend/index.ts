import { FRIEND } from '../../models';

export const createFriend = (data: {}) => new Promise((resolve, reject) =>
  FRIEND.create(data)
    .then(resolve)
    .catch(reject)
)

export const getFriends = (search: {}, project: {} = {}, options: {} = {}) => new Promise((resolve, reject) =>
  FRIEND.find(search, project, options)
  .lean()
  .exec()
  .then(resolve)
  .catch(reject)
)

export const getFriend = (search: {}, project: {} = {}, options: {} = {}) => new Promise((resolve, reject) =>
  FRIEND.findOne(search, project, options)
  .lean()
  .exec()
  .then(resolve)
  .catch(reject)
)

export const updateFriend = (search: {}, update: {} = {}, options: {} = { new: true }) => new Promise((resolve, reject) =>
  FRIEND.findOneAndUpdate(search, update, options)
  .lean()
  .exec()
  .then(resolve)
  .catch(reject)
)