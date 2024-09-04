import getSettings from "@/app/actions/getSettings";
import React from "react";
import DiscUpClient from "./DiscUpClient";
export const dynamic = "force-dynamic";
const page = async () => {
  const settings = await getSettings();

  return <DiscUpClient settings={settings} />;
};

export default page;
