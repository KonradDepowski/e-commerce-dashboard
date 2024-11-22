import { Schema } from "mongoose";
import mongoose from "mongoose";

export type DiscountType = {
  _id?: string;
  code: string;
  amount: string;
};

const discountSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  amount: {
    type: String,
    required: true,
  },
});

export default mongoose.models.discount ||
  mongoose.model("discount", discountSchema);
