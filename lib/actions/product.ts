"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/database";
import Product, { productSchemaType } from "../models/db/Product";
import { redirect } from "next/navigation";

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

export const fetchProducts = async () => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const products = Product.find();
    if (!products) {
      throw new Error("Could not fetch all products");
    }

    return products;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

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
