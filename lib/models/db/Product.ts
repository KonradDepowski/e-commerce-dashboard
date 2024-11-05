import { Schema } from "mongoose";
import mongoose from "mongoose";

export type productSchemaType = {
  _id?: string;
  id?: string;
  name: string;
  category: "lifestyle" | "football" | "running" | "sneakers";
  sex: "men" | "women" | "unisex";
  price: number;
  images: Array<string>;
  offer: boolean;
};

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.product ||
  mongoose.model("product", productSchema);
