import { Request, Response, NextFunction } from 'express';
import { getErrorMessage, RESPONSE_MESSAGES, sendResponse, validateToken } from '../../lib';
import { ITokenPayload } from '../../interfaces';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.accessToken;

    // If token is not found then send the response with 401 status code.
    if (!token) {
      console.log("hello")
      throw new Error(RESPONSE_MESSAGES.en.unauthorized);
    }

    const payload = validateToken(token) as ITokenPayload;

    req.user = payload;

    return next();
  } catch (error) {
    return sendResponse(res, 401, false, getErrorMessage(error));
  }
};
