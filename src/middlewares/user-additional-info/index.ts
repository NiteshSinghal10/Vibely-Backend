import joi from "joi";
import { Request, Response, NextFunction } from "express";
import { getErrorMessage, sendResponse } from "../../lib";

export const validateUpdateUserInterest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = joi
    .object({
      interests: joi.array().items(joi.string()).min(1),
    })
    .validate(req.body);

  if (error) {
    return sendResponse(res, 400, false, error.message);
  }

  return next();
};
