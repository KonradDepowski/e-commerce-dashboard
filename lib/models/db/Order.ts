import { Schema } from "mongoose";
import mongoose from "mongoose";

export type orderSchemaType = {
  _id?: string;
  id: string;
  productsIds: Object;
  buyerId: string;
  createdAt: Date;
  totalAmount: number;
  deliveryData: Object;
};

const orderSchema = new Schema({
  id: {
    type: String,
  },
  productsIds: {
    type: Array,
    required: true,
  },
  buyerId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  totalAmount: {
    type: Number,
  },
  deliveryData: {
    type: Object,
    required: true,
  },
});

export default mongoose.models.order || mongoose.model("order", orderSchema);
