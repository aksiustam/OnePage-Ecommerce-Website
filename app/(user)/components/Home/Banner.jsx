"use client";
import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export default function Banner({ className, settings }) {
  const data = settings?.banner;
  let slidersettings = {
    autoplay: true,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 200,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    pauseOnHover: false,
  };

  return (
    <>
      <section className="w-full h-full relative">
        <div
          className={`w-full h-full lg:h-[840px] relative ${className || ""}`}
        >
          <Slider {...slidersettings} className="w-full h-full lg:h-[840px]">
            {data?.images?.map((item, index) => (
              <Link key={index} href={data?.url || "/"}>
                <Image
                  src={item?.imageurl}
                  alt="MayPlastik Banner"
                  width={3000}
                  height={2000}
                  className="inset-0 w-full h-full lg:h-[840px] object-cover object-center -z-30"
                />
              </Link>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
}
