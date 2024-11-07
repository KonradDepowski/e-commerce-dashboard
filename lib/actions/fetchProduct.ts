"use server";

import { connectToDatabase } from "../database/database";
import Product from "../models/db/Product";

export const fetchProduct = async (id: string) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const product = Product.find({ _id: id });
    if (!product) {
      throw new Error("Could not fetch all products");
    }

    return product;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
