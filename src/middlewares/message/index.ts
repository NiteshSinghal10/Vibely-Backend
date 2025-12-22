import joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { getErrorMessage, sendResponse } from '../../lib';


export const validateMessageListing = (req: Request, res: Response, next: NextFunction) => {
  const { error } = joi.object({
    page: joi.number(),
    limit: joi.number(),
    _user: joi.string().hex().length(24)
  })
  .validate(req.query);

  if(error) {
    return sendResponse(res, 400, false, getErrorMessage(error));
  }

  return next();
}