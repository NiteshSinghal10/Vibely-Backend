import { USER_LOCATION } from '../../models';

export const updateUserLocation = (search: {}, update: {}, options: {} = { upsert: true }) => new Promise((resolve, reject) =>
  USER_LOCATION.findOneAndUpdate(search, update, options)
    .then(resolve)
    .catch(reject)
)