"use server";

import { clerkClient } from "@clerk/express";

export const deleteUser = async (userId: string) => {
  const response = clerkClient.users.deleteUser(userId);
  if (!response) {
    throw new Error("Could not delete user");
  }
  return response;
};
