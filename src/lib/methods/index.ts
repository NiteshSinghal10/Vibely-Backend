import { RESPONSE_MESSAGES } from "../messages";

export const getErrorMessage = (error: any): string => {
  return error instanceof Error ? error.message : RESPONSE_MESSAGES.en.unknown_error;
}