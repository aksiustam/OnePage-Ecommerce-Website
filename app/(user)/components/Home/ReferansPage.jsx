"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
const ReferansPage = (props) => {
  const { referans } = props;

  let slidersettings = {
    autoplay: true,
    arrows: false,
    dots: false,
    infinite: referans?.length > 1,
    speed: 2000,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="w-full h-auto relative">
      <Slider {...slidersettings}>
        {referans?.map((item) => (
          <Image
            key={item.id}
            src={item.imageurl}
            alt={`Ref${item.index}`}
            width={1000}
            height={1000}
            className="object-contain px-3"
          />
        ))}
      </Slider>
    </div>
  );
};

export default ReferansPage;
