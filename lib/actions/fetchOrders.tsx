"use server";

import { connectToDatabase } from "../database/database";
import Order, { orderSchemaType } from "../models/db/Order";

export const fetchOrders = async () => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }

    const orders: orderSchemaType[] = await Order.find();
    if (!orders) {
      throw new Error("Could not fetch  orders");
    }

    return orders;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
