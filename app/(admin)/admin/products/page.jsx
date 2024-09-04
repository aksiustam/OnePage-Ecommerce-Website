import ProductsClient from "./ProductsClient";
import getProducts from "@/app/actions/Products/getProducts";
export const dynamic = "force-dynamic";
const page = async () => {
  const products = await getProducts();
  return <ProductsClient products={products} />;
};

export default page;
