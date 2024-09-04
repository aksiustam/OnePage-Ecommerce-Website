import DiscProductsClient from "./DiscProductsClient";
import getProducts from "@/app/actions/Products/getProducts";
import getSettings from "@/app/actions/getSettings";
export const dynamic = "force-dynamic";
const page = async () => {
  const products = await getProducts();
  const settings = await getSettings();
  return <DiscProductsClient products={products} settings={settings} />;
};

export default page;
