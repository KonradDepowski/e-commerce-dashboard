"use server";

import { connectToDatabase } from "../database/database";
import Product from "../models/db/Product";
import User from "../models/db/User";
import { fetchOrders } from "./order";

export const fetchYearOrders = async (year?: Number) => {
  try {
    const orders = await fetchOrders();
    const thisYear = year ? year : new Date().getFullYear();

    const thisYearOrders = orders.filter((item) => {
      const orderYear = item.createdAt.getFullYear();
      return orderYear === thisYear;
    });
    if (!thisYearOrders) {
      throw new Error("Could not fetch this year orders");
    }
    return thisYearOrders;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const recentSalesHandler = async () => {
  try {
    const orders = await fetchOrders();
    const lastFiveOrders = orders?.slice(-5) || [];
    const items = lastFiveOrders.map((item) => ({
      name: `${item.deliveryData.firstName} ${item.deliveryData.lastName}`,
      email: item.deliveryData.email,
      totalAmount: item.totalAmount,
      avatar: item.buyerAvatar,
    }));
    return items;
  } catch (error) {}
};

export const fetchYearRevenue = async () => {
  try {
    const thisYearOrders = await fetchYearOrders();
    let totalRevenue = 0;
    thisYearOrders.forEach((item) => (totalRevenue += item.totalAmount));
    return totalRevenue;
  } catch (error) {}
};

export const fetchAllUsersCount = async () => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const usersCount = await User.countDocuments();
    if (!usersCount) {
      throw new Error("Could not fetch users");
    }
    return usersCount;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchAllProductsCount = async () => {
  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("Failed to connect to the database");
    }
    const productsCount = await Product.countDocuments();
    if (!productsCount) {
      throw new Error("Could not fetch products");
    }
    return productsCount;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchYearSoldProducts = async () => {
  try {
    const thisYearOrders = await fetchYearOrders();
    let totalSoldProducts = 0;
    thisYearOrders.forEach((item) => {
      item.productsIds.forEach(
        (product) => (totalSoldProducts += product.quantity)
      );
    });
    return totalSoldProducts;
  } catch (error) {}
};

export const fetchMonthRevenue = async (year: Number) => {
  const data = [
    {
      id: 1,
      name: "Jan",
      total: 0,
    },
    {
      id: 2,
      name: "Feb",
      total: 0,
    },
    {
      id: 3,
      name: "Mar",
      total: 0,
    },
    {
      id: 4,
      name: "Apr",
      total: 0,
    },
    {
      id: 5,
      name: "May",
      total: 0,
    },
    {
      id: 6,
      name: "Jun",
      total: 0,
    },
    {
      id: 7,
      name: "Jul",
      total: 0,
    },
    {
      id: 8,
      name: "Aug",
      total: 0,
    },
    {
      id: 9,
      name: "Sep",
      total: 0,
    },
    {
      id: 10,
      name: "Oct",
      total: 0,
    },
    {
      id: 11,
      name: "Nov",
      total: 0,
    },
    {
      id: 12,
      name: "Dec",
      total: 0,
    },
  ];

  try {
    const thisYearOrders = await fetchYearOrders(year);

    thisYearOrders.forEach((item) => {
      data.filter((it) => {
        if (it.id === item.createdAt.getMonth()) {
          it.total += item.totalAmount;
        }
      });
    });
    return data;
  } catch (error) {}
};
