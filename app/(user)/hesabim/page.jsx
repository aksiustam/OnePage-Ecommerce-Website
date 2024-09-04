import React from "react";
import ProfilClient from "./ProfilClient";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";
const page = async () => {
  const user = await getCurrentUser();

  if (user !== null) {
    return <ProfilClient user={user} />;
  } else {
    redirect("/login");
  }
};

export default page;
