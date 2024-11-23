import { Schema } from "mongoose";
import mongoose from "mongoose";
import { productSchemaType } from "./Product";

export type productsIdsType = {
  id: string;
  size: string;
  quantity: number;
};

export type orderSchemaType = {
  _id?: string;
  id: string;
  productsIds: Array<productsIdsType>;
  buyerId: string;
  buyerAvatar: string;
  createdAt: Date;
  totalAmount: number;
  deliveryData: DeliveryDataType;
  status: string;
};

export type DeliveryDataType = {
  country: string;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  houseNumber: number;
  postalCode: string;
  town: string;
  phone: number;
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
  buyerAvatar: {
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
  status: {
    type: String,
    required: true,
  },
});

export default mongoose.models.order || mongoose.model("order", orderSchema);
