"use client";
import { useEffect, useState } from "react";
import useCart from "@/hooks/useCart";
import toast from "react-hot-toast";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import chevron from "./chevron-down.svg";
import { Radio, Space } from "antd";

import Image from "next/image";
import { Accordion, AccordionItem as AItem } from "@szhsin/react-accordion";
const AccordionItem = ({ header, ...rest }) => (
  <AItem
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        {header}
        <Image
          className={`ml-auto transition-transform duration-200 ease-out ${
            isEnter && "rotate-180"
          }`}
          src={chevron}
          alt="Chevron"
        />
      </>
    )}
    className="border-b"
    buttonProps={{
      className: ({ isEnter }) =>
        `flex w-full p-2 text-left font-medium hover:bg-gray-200 ${
          isEnter && "bg-gray-100"
        }`,
    }}
    contentProps={{
      className: "transition-height duration-200 ease-out",
    }}
    panelProps={{ className: "p-4" }}
  />
);

const ProductCardMobile = ({ datas, setImage }) => {
  const { addToBasket } = useCart();

  const addBasket = () => {
    if (!datas) {
      return;
    }
    if (1 <= datas.stock) {
      const data = {
        id: datas.id,
        name: datas.name,
        category: cat,
        price: datas.price,
        indirim: datas.indirim,
        quantity: 1,
        image: datas.images[0].imageurl,
      };

      addToBasket(data);

      toast.success("Başarıyla Sepete Eklendi");
    } else {
      toast.error("Stocklarda Kalmadı!");
    }
  };
  const [category, setCategory] = useState([]);
  const [cat, setCat] = useState(null);

  useEffect(() => {
    const category = [];
    if (datas?.price?.sarjprice > 1 || datas?.price?.sarjinprice > 1) {
      category.push("ŞARJLI");
    }

    if (datas?.price?.fisprice > 1 || datas?.price?.fisinprice > 1) {
      category.push("FİŞLİ");
    }

    if (datas?.price?.isikprice > 1 || datas?.price?.isikinprice > 1) {
      category.push("IŞIKSIZ");
    }
    setCat(category[0]);
    setCategory(category);
  }, [datas]);

  const getPriceLabel = (category) => {
    switch (category) {
      case "ŞARJLI":
        return "Sarjlı Fiyat : ";
      case "FİŞLİ":
        return "Fişli Fiyat : ";
      case "IŞIKSIZ":
        return "Işıksız Fiyat : ";
      default:
        return "";
    }
  };

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

  const { original, offer } = getPrice(cat, datas?.price);

  return (
    <div
      className="w-full h-full overflow-x-hidden overflow-y-scroll bg-white product-card border-t-2 border-slate-300 shadow-2xl shadow-black"
      style={{ boxShadow: "0px 15px 64px 0px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="w-full mt-2 px-4 flex flex-row items-center justify-start space-x-4 overflow-x-scroll">
        {datas?.images?.map((item, index) => (
          <Image
            key={index}
            src={item?.imageurl}
            alt="Product"
            width={700}
            height={700}
            className="w-32 h-32 object-contain cursor-pointer"
            onClick={() => setImage(item?.imageurl)}
          />
        ))}
      </div>
      <div className="w-full py-2 ml-2">
        <h2 className="text-2xl font-bold text-purple-700">{datas?.name}</h2>
      </div>
      <div className="w-full py-2 ml-2">
        <p className="price">
          <span>{getPriceLabel(cat)}</span>
          {datas?.indirim === true ? (
            <>
              <span className="main-price text-qgray line-through font-500 text-[12px]">
                {original}₺
              </span>
              <span className="offer-price text-qred font-700 text-[21px] ml-2">
                {offer}₺
              </span>
            </>
          ) : (
            <span className="offer-price text-qred font-700 text-[21px]">
              {original}₺
            </span>
          )}
        </p>
        {/* <span className="text-xl">Şarjlı Fiyatı: 1155₺</span> */}
      </div>
      <div className="w-full ml-2 flex items-start justify-start">
        <div className="flex flex-row h-10">
          <Space>
            <Radio.Group value={cat} onChange={(e) => setCat(e.target.value)}>
              {category?.map((item, index) => (
                <Radio.Button key={index} value={item}>
                  {item}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Space>
        </div>
      </div>
      <div className="w-full mt-3 mb-3 pl-2 pr-6 flex flex-row items-center justify-between">
        <div className="w-[119px] h-10 cursor-pointer">
          <button
            type="button"
            className="yellow-btn inline-flex space-x-2 items-center !bg-[#288E5F]"
            onClick={() => addBasket()}
          >
            <span className="text-sm font-600 tracking-wide leading-7 text-slate-50">
              Sepete Ekle
            </span>
          </button>
        </div>
      </div>
      <div className="w-full mb-2">
        <Accordion transition transitionTimeout={200}>
          <AccordionItem header={"Açıklama"} initialEntered>
            <div
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: datas?.quill?.desc }}
            />
          </AccordionItem>

          <AccordionItem header="Özellikler">
            <div
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: datas?.quill?.spec }}
            />
          </AccordionItem>

          <AccordionItem header="Kargo">
            <div
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: datas?.quill?.kargo }}
            />
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ProductCardMobile;
