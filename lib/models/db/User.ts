import { Schema } from "mongoose";
import mongoose from "mongoose";

export type userSchemaType = {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
  userCart?: Object;
};

const userSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  userCart: {
    type: Object,
    required: true,
  },
});

export default mongoose.models.user || mongoose.model("user", userSchema);
