import { Schema, Types, model } from 'mongoose';
import { generateChatId, messageStatus } from '../../lib';

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

schema.pre('save', function (next) {
  if (!this.isNew) {
    return next();
  }

  const chatId = generateChatId(String(this._sender), String(this._receiver));
  this.chatId = chatId;
  next();
})

export const MESSAGE = model('message', schema);