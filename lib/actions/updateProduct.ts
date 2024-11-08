"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/database";
import Product, { productSchemaType } from "../models/db/Product";
import { redirect } from "next/navigation";

export const updateProduct = async (data: productSchemaType, id: string) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    await Product.findOneAndUpdate({ _id: id }, data);
    revalidatePath("/dashboard/products");
  } catch (error: any) {
    throw new Error(error.message);
  } finally {
    redirect("/dashboard/products");
  }
};
