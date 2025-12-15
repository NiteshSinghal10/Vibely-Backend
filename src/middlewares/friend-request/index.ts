import joi from 'joi';
import { Request, Response, NextFunction } from 'express'
import { friendRequestStatuses, getErrorMessage, sendResponse } from '../../lib';

export const validateCreateFriendRequest = (req: Request, res: Response, next: NextFunction) => {
  const { error } = joi.object({
    to: joi.string().hex().length(24).required()
  })
  .validate(req.body);

  if(error) {
    return sendResponse(res, 400, false, error.message);
  }

  return next();
}

export const validateUpdateStatusFriendRequest = (req: Request, res: Response, next: NextFunction) => {
  const { error } = joi.object({
    _id: joi.string().hex().length(24).required(),
    status: joi.string().valid(...friendRequestStatuses).required()
  })
  .validate(req.body);

  if(error) {
    return sendResponse(res, 400, false, error.message);
  }

  return next();
}

export const validateGetFriendRequests = (req: Request, res: Response, next: NextFunction) => {
  const { error } = joi.object({
    page: joi.number(),
    limit: joi.number()
  })
  .validate(req.query);

  if(error) {
    return sendResponse(res, 400, false, error.message);
  }

  return next();
}