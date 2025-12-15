import { USER_ADDITIONAL_INFO } from '../../models';

export const updateUserAdditionalInfo = (search: {}, update: {}, options: {} = { upsert: true }) => new Promise((resolve, reject) =>
  USER_ADDITIONAL_INFO.findOneAndUpdate(search, update, options)
    .then(resolve)
    .catch(reject)
)

export const getUserAdditionalInfo = <T>(search: {}): Promise<T | null> => new Promise((resolve, reject) =>
  USER_ADDITIONAL_INFO.findOne(search)
    .lean()
    .exec()
    .then((data) => resolve(data as T | null))
    .catch(reject)
)