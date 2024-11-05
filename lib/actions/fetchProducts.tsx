"use server";

import { connectToDatabase } from "../database/database";
import Product from "../models/db/Product";

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
