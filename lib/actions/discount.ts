"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/database";
import Discount from "../models/db/Discount";
import { Discount as DiscountType } from "../models/form/discountSchema";
import { log } from "console";

export const fetchDiscountCodes = async () => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }

    const discounts = Discount.find();
    if (!discounts) {
      throw new Error("Could not fetch dicounts");
    }

    return discounts;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const addNewDiscountCode = async (data: DiscountType) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const newDiscount = await Discount.create(data);
    if (!newDiscount) {
      throw new Error("Could not create new discount");
    }
  } catch (error: any) {
    throw new Error(error.message);
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
    const newDiscount = await Discount.findByIdAndDelete(id);
    if (!newDiscount) {
      throw new Error("Could not delete code");
    }
  } catch (error: any) {
    throw new Error(error);
  } finally {
    revalidatePath("/dashboard/discounts");
  }
};
