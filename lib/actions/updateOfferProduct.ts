"use server";

import { connectToDatabase } from "../database/database";
import Product from "../models/db/Product";

export const updateOfferProduct = async () => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }

    await Product.findOneAndUpdate({ offer: true }, { offer: false });
  } catch (error: any) {
    throw new Error(`Failed to update offer product: ${error.message}`);
  }
};
