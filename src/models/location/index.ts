import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  _user: {
    type: Types.ObjectId,
    required: true,
    unique: true
  },
  city: {
    type: String
  },
  region: {
    type: String
  },
  country: {
    type: String
  },
  countryCode: {
    type: String
  },
  countryCode3: {
    type: String
  },
  timezone: {
    type: String
  },
  currency: {
    type: String
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  }
}, { timestamps: true });

export const USER_LOCATION = model('user-location', schema);
