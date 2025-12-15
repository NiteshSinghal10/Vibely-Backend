import { Types } from "mongoose";


export interface IUserAdditionalInfo {
  _id: Types.ObjectId;
  _user: Types.ObjectId;
  city?: string;
  region?: string;
  country: string;
  countryCode: string;
  countryCode3: string;
  timezone?: string;
  currency?: string;
  latitude?: number;
  longitude?: number;
  interests?: string[]
}
