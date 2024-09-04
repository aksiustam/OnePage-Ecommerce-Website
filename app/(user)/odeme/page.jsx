import React from "react";
import OdemeClient from "./OdemeClient";
import { getCurrentUser } from "../../actions/getCurrentUser";
const page = async () => {
  const user = await getCurrentUser();

  return <OdemeClient user={user} />;
};

export default page;
