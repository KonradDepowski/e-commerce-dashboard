"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/database";
import Product from "../models/db/Product";
import { redirect } from "next/navigation";
import { productSchemaType } from "../models/db/Product";
import { deleteObject, getStorage, ref } from "@firebase/storage";
import { app } from "../database/firebase";
const storage = getStorage(app);

export const fetchProduct = async (id: string) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }

    const product = await Product.findOne({
      _id: id,
    }).lean<productSchemaType>();

    if (!product) {
      throw new Error("Could not fetch all products");
    }

    return product;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};

export const fetchProducts = async (page: string | number, limit: number) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const skipAmount = (Number(page) - 1) * limit;
    const productCount = await Product.countDocuments();
    const products: productSchemaType[] = await Product.find()
      .skip(skipAmount)
      .limit(limit);
    if (!products) {
      throw new Error("Could not fetch all products");
    }
    return {
      products,
      totalPages: Math.ceil(productCount / limit),
    };
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};

export const createProduct = async (data: productSchemaType) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const product: productSchemaType = await Product.create(data);
    if (!product) {
      throw new Error("Could not fetch all products");
    }
    revalidatePath("/dashboard/products");
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
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

    const updatedProduct: productSchemaType | null =
      await Product.findOneAndUpdate({ offer: true }, { offer: false });
    if (!updatedProduct) {
      throw new Error("Could not update offer product");
    }
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};

export const updateProduct = async (data: productSchemaType, id: string) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const updatedProduct: productSchemaType | null =
      await Product.findOneAndUpdate({ _id: id }, data);
    if (!updatedProduct) {
      throw new Error("Could not update product");
    }
    revalidatePath("/dashboard/products");
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  } finally {
    redirect("/dashboard/products");
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const deleteProduct: productSchemaType | null =
      await Product.findByIdAndDelete(id);

    if (!deleteProduct) {
      throw new Error("Could not delete product");
    }

    const images = deleteProduct.images;
    images?.forEach((image) => {
      const bucketBaseUrl =
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-c1871.appspot.com/o/";
      const filePath = decodeURIComponent(
        image.replace(bucketBaseUrl, "").split("?")[0]
      );
      const fileRef = ref(storage, filePath);

      deleteObject(fileRef);
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  } finally {
    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
  }
};
