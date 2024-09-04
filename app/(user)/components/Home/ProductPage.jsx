"use client";
import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import ProductCard from "../Helpers/Cards/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

import "swiper/css";

import ProductCardMobile from "../Helpers/Cards/ProductCardMobile";
SwiperCore.use([Autoplay]);

const ProductPage = (props) => {
  const { products } = props;

  const [pitem, setPItem] = useState(null);
  const [isCardActive, setIsCardActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [image, setImage] = useState(null);

  const swiperRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isCardActive && !event.target.closest(".product-card")) {
        setIsCardActive(false);
        setPItem(null);
        if (swiperRef.current) {
          swiperRef.current.autoplay.start();
          swiperRef.current.allowTouchMove = true;
        }
      }
    };
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 1024);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [isCardActive, isMobile]);

  const handleItemClick = (item, index) => {
    setPItem(item);
    setIsCardActive(true);
    if (swiperRef.current) {
      if (isMobile) {
        swiperRef.current.autoplay.stop();
        swiperRef.current.slideToLoop(index, 1000);
      } else {
        swiperRef.current.autoplay.stop();
        swiperRef.current.allowTouchMove = false;
        swiperRef.current.slideToLoop(index, 1000);
      }

      if (isMobile && scrollContainerRef.current) {
        scrollContainerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const swiperSettings = {
    spaceBetween: 20,
    autoplay: { delay: 3000, disableOnInteraction: false },
    loop: true,
    onSwiper: (swiper) => (swiperRef.current = swiper),
    breakpoints: {
      1024: {
        slidesPerView: 4,
      },
      400: {
        slidesPerView: 1,
      },
    },
  };

  return (
    <div
      className="w-full h-full relative mt-3 lg:mt-6 lg:py-8"
      id="products"
      ref={scrollContainerRef}
    >
      <div
        className={`product-card block lg:hidden w-full overflow-hidden h-[47%] bottom-0 left-0 z-10 fixed transition-transform ease-in-out duration-[1150ms] ${
          isCardActive ? "translate-y-0 " : "translate-y-full"
        }`}
      >
        <ProductCardMobile datas={pitem} setImage={setImage} />
      </div>

      <div
        className={`product-card hidden lg:block w-[75%] h-full overflow-hidden absolute top-0 right-0 z-10 transition-transform ease-in-out duration-[1150ms] ${
          isCardActive ? "translate-x-0 " : "translate-x-full "
        }`}
      >
        <ProductCard datas={pitem} />
      </div>

      <div className="w-full">
        <div className="px-4 lg:px-0 ml-6 lg:ml-48 py-4 text-3xl font-semibold text-purple-800 text-shadow-md">
          Ürünlerimiz
        </div>
      </div>
      <div className="w-full h-full p-4 lg:p-0 lg:px-4">
        {domLoaded && (
          <Swiper {...swiperSettings}>
            {products?.map((item, index) => {
              let imagedata = null;

              if (image !== null) {
                imagedata = item?.images?.find(
                  (item) => item.imageurl === image
                );
              }

              return (
                <SwiperSlide
                  key={item.id}
                  className="w-full h-full cursor-pointer "
                  onClick={() => handleItemClick(item, index)}
                >
                  {imagedata !== null ? (
                    <Image
                      src={imagedata?.imageurl}
                      alt={item.name}
                      width={1000}
                      height={1000}
                      className="object-contain"
                    />
                  ) : (
                    <Image
                      src={item?.images[0]?.imageurl}
                      alt={item.name}
                      width={1000}
                      height={1000}
                      className="object-contain"
                    />
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
