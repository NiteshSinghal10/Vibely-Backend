import { MESSAGE } from '../../models';

export const createMessage = (data: {}) => new Promise((resolve, reject) =>
  MESSAGE.create(data)
  .then(resolve)
  .catch(reject)
)

export const updateMessage = (search: {}, update: {}, options: {} = {new: true}) => new Promise((resolve, reject) =>
  MESSAGE.findOneAndUpdate(search, update, options)
  .lean()
  .exec()
  .then(resolve)
  .catch(reject)
)

export const getMessages = (search: {}, projection: {}, opitons: {}) => new Promise((resolve, reject) =>
  MESSAGE.find(search, projection, opitons)
  .lean()
  .exec()
  .then(resolve)
  .catch(reject)
)
