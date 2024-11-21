import { Schema } from "mongoose";
import mongoose from "mongoose";

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
mongoose.deleteModel("discount");

export default mongoose.models.discount ||
  mongoose.model("discount", discountSchema);
