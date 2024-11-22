"use server";

import { clerkClient } from "@clerk/express";

export const deleteUser = async (userId: string) => {
  try {
    const response = clerkClient.users.deleteUser(userId);
    if (!response) {
      throw new Error("Could not delete user");
    }
    return response;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(` ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};
