import jwt from "jsonwebtoken";
import { RESPONSE_MESSAGES } from "../messages";
import { PUBLIC_KEY } from "../env-variables";
import { Types } from "mongoose";

export const getErrorMessage = (error: any): string => {
  return error?.message ? error.message : RESPONSE_MESSAGES.en.unknown_error;
};

export const validateToken = (token: string) => {
  const response = jwt.verify(token, String(PUBLIC_KEY));
  return response;
};

export * from "./call-other-service";
