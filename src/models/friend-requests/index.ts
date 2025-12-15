import { Schema, model, Types } from "mongoose";
import { friendRequestStatuses } from "../../lib";

const schema = new Schema(
  {
    from: {
      type: Types.ObjectId,
      required: true,
    },
    to: {
      type: Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: friendRequestStatuses,
      default: "PENDING",
    },
  },
  { timestamps: true },
);

schema.index({ from: 1, status: 1 });

schema.index(
  { from: 1, to: 1, status: 1 },
  { unique: true, partialFilterExpression: { status: "PENDING" } },
);

export const FRIEND_REQUEST = model("friend-request", schema);
