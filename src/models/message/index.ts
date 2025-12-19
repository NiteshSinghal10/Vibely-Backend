import { Schema, Types, model } from 'mongoose';
import { messageStatus } from '../../lib';

const schema = new Schema({
  _chat: {
    type: Types.ObjectId,
    ref: 'friend-request',
    required: true
  },
  _sender: {
    type: Types.ObjectId,
    required: true
  },
  _receiver: {
    type: Types.ObjectId,
    required: true
  },
  content: {
    type: String
  },
  status: {
    type: String,
    enum: messageStatus,
    default: 'PENDING'
  }
}, { timestamps: true });

export const MESSAGE = model('message', schema);