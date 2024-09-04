import React from "react";
import OdemeFaturaClient from "./OdemeFaturaClient";
import getOrderToken from "../../../actions/Order/getOrderToken";

export const metadata = {
  title: "May Plastik",
  description: "MAY PLASTİK Satış Websitesi",
};
const page = async ({ params }) => {
  const { token } = params;

  const siparis = await getOrderToken(token);

  return <OdemeFaturaClient sipdata={siparis} />;
};

export default page;
