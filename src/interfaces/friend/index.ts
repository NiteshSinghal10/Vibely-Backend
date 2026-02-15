import { Types } from "mongoose";

export interface IFriend {
  _id: Types.ObjectId;
  _users: Types.ObjectId[];
  status: string;
  _blockedBy?: Types.ObjectId;
  _reportedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}