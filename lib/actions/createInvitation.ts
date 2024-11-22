"use server";
import { clerkClient } from "@clerk/express";

const organizationId = "org_2oD4akB6qBQAcGPJVw1mgSnbopW";
const role = "org:member";

export const createInvitation = async (
  inviterUserId: string,
  emailAddress: string
) => {
  try {
    const response =
      await clerkClient.organizations.createOrganizationInvitation({
        organizationId,
        inviterUserId,
        emailAddress,
        role,
        redirectUrl: "http://localhost:3000/signup",
      });
    if (!response) {
      throw new Error("Could not send invitation");
    }
  } catch (error: any) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(`Failed to create invitation ${error.message}`);
    }
  }
};
