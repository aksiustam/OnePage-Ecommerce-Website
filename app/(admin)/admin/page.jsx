import React from "react";
import Dashboard from "./Dashboard";
import getProducts from "@/app/actions/Products/getProducts";
import getOrderFinish from "@/app/actions/Order/getOrderFinish";
export const dynamic = "force-dynamic";
const page = async () => {
  const products = await getProducts();
  const siparis = await getOrderFinish();

  return <Dashboard products={products} siparis={siparis} />;
};

export default page;
