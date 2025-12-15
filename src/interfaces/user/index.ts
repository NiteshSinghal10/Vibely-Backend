import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  firstName: string;
  lastName?: string;
  email: string;
  picture?: string;
  dob?: {
    year: number;
    month: number;
    day: number;
  };
  gender?: string;
}
