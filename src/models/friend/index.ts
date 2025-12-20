import { Schema, model, Types } from 'mongoose';
import { friendStatus } from '../../lib';

const schema = new Schema({
  _users: {
    type: [Types.ObjectId],
    required: true
  },
  status: {
    type: String,
    enum: friendStatus,
    default: 'ACTIVE'
  },
  _blockedBy: {
    type: Types.ObjectId
  },
  _reportedBy: {
    type: Types.ObjectId
  }
}, { timestamps: true });

export const FRIEND = model('Friend', schema);