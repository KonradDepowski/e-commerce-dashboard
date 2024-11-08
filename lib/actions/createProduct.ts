"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/database";
import Product, { productSchemaType } from "../models/db/Product";
import { redirect } from "next/navigation";

export const createProduct = async (data: productSchemaType) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const products = Product.create(data);
    if (!products) {
      throw new Error("Could not fetch all products");
    }
    revalidatePath("/dashboard/products");
  } catch (error: any) {
    throw new Error(error.message);
  } finally {
    redirect("/dashboard/products");
  }
};
