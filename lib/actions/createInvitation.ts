"use server";
import { clerkClient } from "@clerk/express";

const organizationId = "org_2oD4akB6qBQAcGPJVw1mgSnbopW";
const role = "org:member";

export const createInvitation = async (
  inviterUserId: string,
  emailAddress: string
) => {
  const response = await clerkClient.organizations.createOrganizationInvitation(
    {
      organizationId,
      inviterUserId,
      emailAddress,
      role,
      redirectUrl: "http://localhost:3000/signup",
    }
  );

  return response;
};
