"use server";
export const getOrganizationUsers = async () => {
  try {
    const response = await fetch(
      "https://api.clerk.com/v1/organizations/org_2oD4akB6qBQAcGPJVw1mgSnbopW/memberships?limit=10&offset=0",
      {
        headers: {
          Authorization:
            "Bearer sk_test_iW4n7iDabHVCOhDsU3Z8hatqMuX5e8fqXb1CisUKrO",
          cache: "no-store",
        },
      }
    );

    const members: any = [];

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    data.data.forEach((it: any) => {
      members.push({ ...it.public_user_data, role: it.role });
    });

    return members;
  } catch (error: any) {
    throw new Error(`Failed to fetch organization members: ${error.message}`);
  }
};
