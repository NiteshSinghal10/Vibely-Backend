import { ITokenPayload } from '../interfaces';

export * from './internal';


// Extend Express Request interface using module augmentation
declare module 'express-serve-static-core' {
  interface Request {
    user: ITokenPayload;
  }
}
