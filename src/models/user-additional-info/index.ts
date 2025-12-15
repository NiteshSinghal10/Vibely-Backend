import { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    _user: {
      type: Types.ObjectId,
      required: true,
      unique: true,
    },
    city: {
      type: String,
    },
    region: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
    countryCode3: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
    },
    currency: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    interests: {
      type: [String],
    },
  },
  { timestamps: true },
);

export const USER_ADDITIONAL_INFO = model("user-additional-info", schema);
