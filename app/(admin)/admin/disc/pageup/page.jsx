import getSettings from "@/app/actions/getSettings";
import React from "react";
import IndirimYeriClient from "./IndirimYeriClient";
export const dynamic = "force-dynamic";
const page = async () => {
  const settings = await getSettings();

  return <IndirimYeriClient settings={settings} />;
};

export default page;
