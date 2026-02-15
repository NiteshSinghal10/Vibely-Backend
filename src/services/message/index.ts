import { IPopulate } from '../../interfaces';
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

export const updateMessages = (search: {}, update: {}) => new Promise((resolve, reject) =>
  MESSAGE.updateMany(search, update)
  .lean()
  .exec()
  .then(resolve)
  .catch(reject)
)

export const getMessages = (search: {}, projection: {}, opitons: {}, populate: IPopulate[]) => new Promise((resolve, reject) => {
  const query = MESSAGE.find(search, projection, opitons);

  if (populate.length) {
    populate.forEach((pop) => query.populate(pop));
  }

  return query.lean()
  .exec()
  .then(resolve)
  .catch(reject)
})

export const getMessage = (search: {}, projection: {}, opitons: {}) => new Promise((resolve, reject) =>
  MESSAGE.findOne(search, projection, opitons)
  .lean()
  .exec()
  .then(resolve)
  .catch(reject)
)

export const countMessages = (search: {}) => new Promise((resolve, reject) =>
  MESSAGE.countDocuments(search)
  .then(resolve)
  .catch(reject)
)