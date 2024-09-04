import React from "react";
export const dynamic = "force-dynamic";
import getUsers from "@/app/actions/AdminUser/getUsers";
import UserClient from "./UserClient";
const page = async () => {
  const users = await getUsers();
  return <UserClient users={users} />;
};

export default page;
