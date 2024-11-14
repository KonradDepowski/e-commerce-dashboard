import React from "react";
import UsersTable from "../users/UsersTable";
import { getOrganizationUsers } from "@/lib/actions/getOrganizationUsers";

const UsersPage = async () => {
  const users = await getOrganizationUsers();

  return <UsersTable data={users} />;
};

export default UsersPage;
