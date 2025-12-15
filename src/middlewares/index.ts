import { ITokenPayload } from '../interfaces';

export * from './internal';
export * from './verify-token';
export * from './user-additional-info';


// Extend Express Request interface using module augmentation
declare module 'express-serve-static-core' {
  interface Request {
    user: ITokenPayload;
  }
}
