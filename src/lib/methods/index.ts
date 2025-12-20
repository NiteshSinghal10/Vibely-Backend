import jwt from "jsonwebtoken";
import { RESPONSE_MESSAGES } from "../messages";
import { PUBLIC_KEY } from "../env-variables";

export const getErrorMessage = (error: any): string => {
  return error?.message ? error.message : RESPONSE_MESSAGES.en.unknown_error;
};

export const validateToken = (token: string) => {
  const response = jwt.verify(token, String(PUBLIC_KEY));
  return response;
};

export const generateChatId = (userId1: string, userId2: string): string => {
  // Sort the two IDs lexicographically (Dictionary Order) to ensure order doesn't matter
  const ids = [userId1, userId2].sort();
  return ids.join('_');
}

export * from "./call-other-service";
