import React from "react";
import CategoryClient from "./CategoryClient";
import getAllCategory from "@/app/actions/Category/getAllCategory";
export const dynamic = "force-dynamic";
const page = async () => {
  const AllCategory = await getAllCategory();

  return <CategoryClient AllCategory={AllCategory} />;
};

export default page;
