import joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { getErrorMessage, sendResponse } from '../../lib';

export const validateUpdateUserLocation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = joi.object({
    _user: joi.string().hex().length(24).required(),
    city: joi.string(),
    region: joi.string(),
    country: joi.string().required(),
    latitude: joi.number(),
    longitude: joi.number(),
    countryCode: joi.string().required(),
    countryCode3: joi.string().required(),
    timezone: joi.string(),
    currency: joi.string()
  })
  .validate(req.body);

  if(error) {
    return sendResponse(res, 400, false, error.message);
  }

  return next();
}