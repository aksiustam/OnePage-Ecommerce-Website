import React from "react";
import OdemeSonClient from "./OdemeSonClient";
import { getCurrentUser } from "../../actions/getCurrentUser";
const page = async () => {
  const user = await getCurrentUser();

  return <OdemeSonClient user={user} />;
};

export default page;
