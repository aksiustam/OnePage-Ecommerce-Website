"use client";
import useCart from "@/hooks/useCart";

import PageTitle from "../../../components/Helpers/PageTitle";
import ProductsTable from "./ProductsTable";
import BreadcrumbCom from "../../../components/Common/BreadcrumbCom";
import EmptyCardError from "./EmptyCardError";
import Link from "next/link";

const SepetPageClient = () => {
  const { basket, removeBasket } = useCart();

  const getPrice = (category, price) => {
    switch (category) {
      case "ŞARJLI":
        return { original: price?.sarjprice, offer: price?.sarjinprice };
      case "FİŞLİ":
        return { original: price?.fisprice, offer: price?.fisinprice };
      case "IŞIKSIZ":
        return { original: price?.isikprice, offer: price?.isikinprice };
      default:
        return { original: "", offer: "" };
    }
  };
  const cartTotal = () => {
    return basket
      .reduce((acc, item) => {
        const { original, offer } = getPrice(item?.category, item?.price);
        if (item.indirim === true) {
          return acc + item.quantity * offer;
        } else {
          return acc + item.quantity * original;
        }
      }, 0)
      .toFixed(0);
  };
  return (
    <>
      {basket?.length < 1 ? (
        <div className="cart-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom
              paths={[
                { name: "Anasayfa", path: "/" },
                { name: "Sepet", path: "/sepet" },
              ]}
            />
            <EmptyCardError />
          </div>
        </div>
      ) : (
        <div className="cart-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full">
            <PageTitle
              title="Alışveriş Sepetiniz"
              breadcrumb={[
                { name: "Anasayfa", path: "/" },
                { name: "Sepet", path: "/sepet" },
              ]}
            />
          </div>
          <div className="w-full mt-[23px]">
            <div className="container-x mx-auto">
              <ProductsTable
                className="mb-[30px]"
                basket={basket}
                removeBasket={removeBasket}
              />
              <div className="w-full mt-[30px] flex sm:justify-end">
                <div className="sm:w-[370px] w-full border border-[#EDEDED] px-[30px] py-[26px]">
                  <div className="sub-total mb-6">
                    <div className=" flex justify-between mb-6">
                      <p className="text-[15px] font-medium text-qblack">
                        Toplam
                      </p>
                      <p className="text-[15px] font-medium text-qred">
                        {cartTotal()}₺
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  </div>
                  <div className="shipping mb-6">
                    <span className="text-[15px] font-medium text-qblack mb-[18px] block">
                      Kargo
                    </span>
                    <ul className="flex flex-col space-y-1">
                      <li>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2.5 items-center">
                            <div className="input-radio">
                              <input
                                type="radio"
                                name="price"
                                className="accent-pink-500"
                                checked
                              />
                            </div>
                            <span className="text-[13px] text-normal text-qgraytwo">
                              Türkiyeye Özel Ücretsiz Kargo
                            </span>
                          </div>
                          <span className="text-[13px] text-normal text-qgraytwo">
                            +00.00₺
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="total mb-6">
                    <div className=" flex justify-between">
                      <p className="text-[18px] font-medium text-qblack">
                        Genel Toplam
                      </p>
                      <p className="text-[18px] font-medium text-qred">
                        {cartTotal()}₺
                      </p>
                    </div>
                  </div>
                  <Link href="/odeme">
                    <div className="w-full h-[50px] black-btn flex justify-center items-center">
                      <span className="text-sm font-semibold">Ödemeye Geç</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SepetPageClient;
