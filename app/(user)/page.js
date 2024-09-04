import Banner from "./components/Home/Banner";
import Bannerb from "./components/Home/Bannerb";
import getProducts from "@/app/actions/Products/getProducts";
import getSettings from "@/app/actions/getSettings";
import getAllCategory from "@/app/actions/Category/getAllCategory";
import getRef from "../actions/Referanslar/getRef";
import ReferansPage from "./components/Home/ReferansPage";
import ProductPage from "./components/Home/ProductPage";
import ArticlePage from "./components/Home/ArticlePage";
import FooterTop from "./components/Home/FooterTop";

export default async function Home() {
  const products = await getProducts();
  const settings = await getSettings();
  const allcategory = await getAllCategory();
  const referans = await getRef();

  return (
    <>
      <Banner settings={settings} />
      <Bannerb allcategory={allcategory} />
      <ReferansPage referans={referans} />
      <ProductPage products={products} />
      <ArticlePage />
      <FooterTop />
      {/* <div className="w-full h-full flex items-center justify-center mb-6">
        <div
          className="px-4 py-2 bg-gray-50 shadow rounded"
          data-aos="fade-top"
        >
          <h1 className="text-2xl font-bold text-[#ffee00] text-center text-shadow-xl">
            MayPlastik Alışveriş Sitesi
          </h1>
        </div>
      </div> */}
    </>
  );
}
