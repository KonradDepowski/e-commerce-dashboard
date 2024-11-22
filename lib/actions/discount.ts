"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/database";
import Discount from "../models/db/Discount";

import { Discount as DiscountType } from "../models/form/discountSchema";

export const fetchDiscountCodes = async () => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }

    const discounts: DiscountType[] = await Discount.find();
    if (!discounts) {
      throw new Error("Could not fetch dicounts");
    }

    return discounts;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};

export const addNewDiscountCode = async (data: DiscountType) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const newDiscount: DiscountType = await Discount.create(data);
    if (!newDiscount) {
      throw new Error("Could not create new discount");
    }
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  } finally {
    revalidatePath("/dashboard/discounts");
  }
};

export const deleteDiscountCode = async (id: string) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const newDiscount: DiscountType | null = await Discount.findByIdAndDelete(
      id
    );
    if (!newDiscount) {
      throw new Error("Could not delete code");
    }
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  } finally {
    revalidatePath("/dashboard/discounts");
  }
};
