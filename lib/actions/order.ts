"use server";

import { connectToDatabase } from "../database/database";
import Order, { orderSchemaType } from "../models/db/Order";
import { fetchProduct } from "./product";

export const fetchSingleOrder = async (orderId: string) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }

    const order: any = await Order.findOne({ _id: orderId });

    if (!order) {
      throw new Error("Could not fetch order");
    }

    const productsIds = order.productsIds;

    const productsData = [];

    // Using Promise.all to handle asynchronous operations inside map
    const products = await Promise.all(
      productsIds.map(async (obj: any) => {
        const productData = await fetchProduct(obj.id);
        return {
          ...productData,
          size: obj.size,
          quantity: obj.quantity,
        };
      })
    );
    if (!products) {
      throw new Error("Could not fetch order");
    }

    productsData.push({
      products,
      deliveryData: order.deliveryData,
      totalAmount: order.totalAmount,
      date: order.createdAt,
    });

    return productsData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

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
