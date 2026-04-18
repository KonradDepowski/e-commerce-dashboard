"use server";

import { unstable_cache } from "next/cache";
import { connectToDatabase } from "../database/database";
import Order from "../models/db/Order";
import Product from "../models/db/Product";
import User from "../models/db/User";

type YearOrderProjection = {
  createdAt: Date;
  totalAmount: number;
  productsIds: Array<{ quantity: number }>;
};

type RecentSaleItem = {
  name: string;
  email: string;
  totalAmount: number;
  avatar: string;
};

const MONTHS_TEMPLATE = [
  { id: 0, name: "Jan", total: 0 },
  { id: 1, name: "Feb", total: 0 },
  { id: 2, name: "Mar", total: 0 },
  { id: 3, name: "Apr", total: 0 },
  { id: 4, name: "May", total: 0 },
  { id: 5, name: "Jun", total: 0 },
  { id: 6, name: "Jul", total: 0 },
  { id: 7, name: "Aug", total: 0 },
  { id: 8, name: "Sep", total: 0 },
  { id: 9, name: "Oct", total: 0 },
  { id: 10, name: "Nov", total: 0 },
  { id: 11, name: "Dec", total: 0 },
];

const getYearOrdersCached = unstable_cache(
  async (year: number): Promise<YearOrderProjection[]> => {
    await connectToDatabase();

    const start = new Date(year, 0, 1);
    const end = new Date(year + 1, 0, 1);

    return Order.find({
      createdAt: {
        $gte: start,
        $lt: end,
      },
    })
      .select("createdAt totalAmount productsIds")
      .lean<YearOrderProjection[]>();
  },
  ["dashboard-year-orders"],
  { revalidate: 120 },
);

const getRecentSalesCached = unstable_cache(
  async (): Promise<RecentSaleItem[]> => {
    await connectToDatabase();

    const lastFiveOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select(
        "deliveryData.firstName deliveryData.lastName deliveryData.email totalAmount buyerAvatar",
      )
      .lean<
        Array<{
          totalAmount: number;
          buyerAvatar: string;
          deliveryData: {
            firstName: string;
            lastName: string;
            email: string;
          };
        }>
      >();

    return lastFiveOrders.map((item) => ({
      name: `${item.deliveryData.firstName} ${item.deliveryData.lastName}`,
      email: item.deliveryData.email,
      totalAmount: item.totalAmount,
      avatar: item.buyerAvatar,
    }));
  },
  ["dashboard-recent-sales"],
  { revalidate: 60 },
);

const getUsersCountCached = unstable_cache(
  async () => {
    await connectToDatabase();
    return User.countDocuments();
  },
  ["dashboard-users-count"],
  { revalidate: 300 },
);

const getProductsCountCached = unstable_cache(
  async () => {
    await connectToDatabase();
    return Product.countDocuments();
  },
  ["dashboard-products-count"],
  { revalidate: 300 },
);

export const fetchYearOrders = async (year?: number) => {
  try {
    const thisYear = year ? year : new Date().getFullYear();
    return await getYearOrdersCached(thisYear);
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};

export const recentSalesHandler = async () => {
  try {
    return await getRecentSalesCached();
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    }
  }
};

export const fetchYearRevenue = async () => {
  try {
    const thisYearOrders = await fetchYearOrders();
    let totalRevenue = 0;
    thisYearOrders.forEach((item) => {
      totalRevenue += item.totalAmount;
    });
    return totalRevenue;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};

export const fetchAllUsersCount = async () => {
  try {
    return await getUsersCountCached();
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};

export const fetchAllProductsCount = async () => {
  try {
    return await getProductsCountCached();
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};

export const fetchYearSoldProducts = async () => {
  try {
    const thisYearOrders = await fetchYearOrders();
    let totalSoldProducts = 0;
    thisYearOrders.forEach((item) => {
      item.productsIds.forEach(
        (product) => (totalSoldProducts += product.quantity),
      );
    });
    return totalSoldProducts;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};

export const fetchMonthRevenue = async (year: number) => {
  const data = MONTHS_TEMPLATE.map((item) => ({ ...item }));

  try {
    const thisYearOrders = await fetchYearOrders(year);
    thisYearOrders.forEach((item) => {
      const monthIndex = item.createdAt.getMonth();
      data[monthIndex].total += item.totalAmount;
    });
    return data;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};
