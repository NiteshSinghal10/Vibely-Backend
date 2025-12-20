import { Schema, Types, model } from 'mongoose';
import { messageStatus } from '../../lib';

const schema = new Schema({
  chatId: {
    type: String,
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
    default: 'SENT'
  }
}, { timestamps: true });

export const MESSAGE = model('message', schema);