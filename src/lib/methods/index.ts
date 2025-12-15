import jwt from 'jsonwebtoken';
import { RESPONSE_MESSAGES } from "../messages";
import { PUBLIC_KEY } from '../env-variables';

export const getErrorMessage = (error: any): string => {
  return error instanceof Error ? error.message : RESPONSE_MESSAGES.en.unknown_error;
}

export const validateToken = (token: string) => {
  const response = jwt.verify(token, String(PUBLIC_KEY));
  return response;
};