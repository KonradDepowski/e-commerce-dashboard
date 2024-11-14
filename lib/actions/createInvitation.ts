"use server";
import { clerkClient } from "@clerk/express";
import { OrganizationMembership } from "@clerk/nextjs/server";

const organizationId = "org_2oD4akB6qBQAcGPJVw1mgSnbopW";
const role = "org:member";

export const createInvitation = async (
  inviterUserId: string,
  emailAddress: string
) => {
  OrganizationMembership;
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
    throw new Error(error.message);
  }
};
