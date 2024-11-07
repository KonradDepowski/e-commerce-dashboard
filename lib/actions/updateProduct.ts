"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/database";
import Product, { productSchemaType } from "../models/db/Product";

export const updateProduct = async (data: productSchemaType, id: string) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const products = Product.findOneAndUpdate({ _id: id }, data);
    if (!products) {
      throw new Error("Could not fetch all products");
    }
    revalidatePath("/dashboard/products");
    return products;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
