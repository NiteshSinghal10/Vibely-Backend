import { Types } from 'mongoose';
import { IUser } from '../user';

export interface IFriendRequest {
  _id: Types.ObjectId;
  from: Types.ObjectId;
  to: Types.ObjectId | IUser;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}