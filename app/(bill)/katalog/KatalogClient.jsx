"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import "./style.css";
const KatalogClient = () => {
  const book = useRef(null);
  const [pageNumber, setPageNumber] = useState(0);
  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <HTMLFlipBook
        width={550}
        height={733}
        size="stretch"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1533}
        maxShadowOpacity={1.0}
        showCover={false}
        mobileScrollSupport={true}
        onFlip={(e) => setPageNumber(e.data)}
        className="mx-0 my-auto"
        ref={book}
      >
        <Image
          src={"/assets/images/maykatalog/01.png"}
          alt="Katalog1"
          width={1200}
          height={1700}
          className="object-contain"
        />
        <Image
          src={"/assets/images/maykatalog/02.png"}
          alt="Katalog2"
          width={1200}
          height={1700}
          className="object-contain"
        />
        <Image
          src={"/assets/images/maykatalog/03.png"}
          alt="Katalog3"
          width={1200}
          height={1700}
          className="object-contain"
        />
        <Image
          src={"/assets/images/maykatalog/04.png"}
          alt="Katalog4"
          width={1200}
          height={1700}
          className="object-contain"
        />
        <Image
          src={"/assets/images/maykatalog/05.png"}
          alt="Katalog5"
          width={1200}
          height={1700}
          className="object-contain"
        />
        <Image
          src={"/assets/images/maykatalog/06.png"}
          alt="Katalog6"
          width={1200}
          height={1700}
          className="object-contain"
        />
        <Image
          src={"/assets/images/maykatalog/07.png"}
          alt="Katalog7"
          width={1200}
          height={1700}
          className="object-contain"
        />
        <Image
          src={"/assets/images/maykatalog/08.png"}
          alt="Katalog8"
          width={1200}
          height={1700}
          className="object-contain"
        />
        <Image
          src={"/assets/images/maykatalog/09.png"}
          alt="Katalog9"
          width={1200}
          height={1700}
          className="object-contain"
        />
        <Image
          src={"/assets/images/maykatalog/10.png"}
          alt="Katalog10"
          width={1200}
          height={1700}
          className="object-contain"
        />
      </HTMLFlipBook>
      <div className="flex flex-row justify-evenly md:justify-center items-center gap-0 md:gap-5 mx-3 z-50 mb-6">
        <button
          onClick={() => book.current.pageFlip().flipPrev()}
          className="bg-slate-600 select-none p-2 rounded-full"
        >
          <BsChevronLeft className="text-white text-2xl" />
        </button>
        <span className="mx-3 text-center text-sm md:text-base">
          Page {pageNumber + 1} of 10
        </span>
        <button
          onClick={() => book.current.pageFlip().flipNext()}
          className="bg-slate-600 select-none p-2 rounded-full"
        >
          <BsChevronRight className="text-white text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default KatalogClient;
