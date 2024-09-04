import React from "react";
import SearchClient from "./SearchClient";
import getProducts from "@/app/actions/Products/getProducts";

const page = async ({ params }) => {
  const { search } = params;

  const products = await getProducts();

  return (
    <div className="w-full">
      <SearchClient products={products} search={search} />
    </div>
  );
};

export default page;
