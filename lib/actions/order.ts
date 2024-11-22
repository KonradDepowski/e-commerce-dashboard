"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/database";
import Order, { DeliveryDataType, orderSchemaType } from "../models/db/Order";
import { fetchProduct } from "./product";

export type productsType = {
  name: string;
  category: "lifestyle" | "sneakers" | "football" | "running";
  sex: "unisex" | "men" | "women";
  price: string;
  offer: boolean;
  images?: string[];
  size: string;
  quantity: number;
};

export type productDataType = {
  products: productsType[];
  deliveryData: DeliveryDataType;
  totalAmount: number;
  date: Date;
  status: string;
};

export const fetchSingleOrder = async (orderId: string) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }

    const order: orderSchemaType | null = await Order.findOne({ _id: orderId });

    if (!order) {
      throw new Error("Could not fetch order");
    }

    const productsIds = order.productsIds;

    const productsData: productDataType[] = [];

    const products = await Promise.all(
      productsIds.map(async (obj) => {
        const productData = await fetchProduct(obj.id);
        if (!productData) {
          throw new Error(`Could not fetch product with ID ${obj.id}`);
        }
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
      status: order.status,
    });

    return productsData;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
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
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};

export const updateOrderStatus = async (id: string, status: string) => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }

    const updatedOrder: orderSchemaType | null = await Order.findOneAndUpdate(
      { _id: id },
      { status: status }
    );
    if (!updatedOrder) {
      throw new Error("Could not update order");
    }
    revalidatePath("/dashboard/orders");
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};
