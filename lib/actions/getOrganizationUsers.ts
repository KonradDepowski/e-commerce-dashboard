"use server";

export type OrganizationType = {
  object: string;
  id: string;
  public_metadata: object;
  private_metadata: object;
  role: string;
  role_name: string;
  permissions: Array<unknown>;
  createdAt: number;
  update_at: number;
  organization: object;
  public_user_data: OrganiztionMemebersType;
};
export type OrganiztionMemebersType = {
  first_name: string;
  last_name: string;
  image_url: string;
  has_image: boolean;
  identifier: string;
  profile_image_url: string;
  user_id: string;
  role: string;
};

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

    const members: OrganiztionMemebersType[] = [];

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data: { data: OrganizationType[] } = await response.json();

    data.data.forEach((it) => {
      members.push({ ...it.public_user_data, role: it.role });
    });

    return members;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      throw new Error(`Failed to fetch organization members: ${error.message}`);
    } else {
      throw new Error("Internal Server Error");
    }
  }
};
