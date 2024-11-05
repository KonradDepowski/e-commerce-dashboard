"use server";
import { clerkClient, ClerkClient } from "@clerk/express";

export const invite = async () => {
  const response = await clerkClient.invitations.createInvitation({
    emailAddress: "depowskikonrad@gmail.com",
    redirectUrl: "http://localhost:3000/signup",
    publicMetadata: {
      example: "metadata",
      example_nested: {
        nested: "metadata",
      },
    },
  });
  return response;
};
