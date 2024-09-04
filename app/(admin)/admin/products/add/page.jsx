import React from "react";
import ProductAddClient from "./ProductAddClient";
import getAllCategory from "@/app/actions/Category/getAllCategory";
export const dynamic = "force-dynamic";
const page = async () => {
  const allcategory = await getAllCategory();
  return <ProductAddClient allcategory={allcategory} />;
};

export default page;
