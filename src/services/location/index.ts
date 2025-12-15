import { USER_LOCATION } from '../../models';

export const updateUserLocation = (search: {}, update: {}, options: {} = { upsert: true }) => new Promise((resolve, reject) =>
  USER_LOCATION.findOneAndUpdate(search, update, options)
    .then(resolve)
    .catch(reject)
)

export const getUserLocation = (search: {}) => new Promise((resolve, reject) =>
  USER_LOCATION.findOne(search)
    .then(resolve)
    .catch(reject)
)