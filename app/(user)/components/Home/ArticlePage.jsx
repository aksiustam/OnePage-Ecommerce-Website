"use client";
import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
const ArticlePage = () => {
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
    <div className="w-full h-full flex flex-col">
      <div className="w-full my-6 h-auto flex flex-col items-center justify-center lg:grid lg:grid-cols-2">
        <div className="w-full px-4 lg:px-0 flex items-center justify-center lg:pl-2 lg:pr-16">
          <Slider {...slidersettings} className="w-full h-full">
            <Image
              src={"/assets/images/article/about5.png"}
              alt="resim1"
              width={1200}
              height={1200}
              className="object-contain"
            />
            <Image
              src={"/assets/images/article/about6.png"}
              alt="resim2"
              width={1200}
              height={1200}
              className="object-contain"
            />
            <Image
              src={"/assets/images/article/about7.png"}
              alt="resim3"
              width={1200}
              height={1200}
              className="object-contain"
            />
            <Image
              src={"/assets/images/article/about8.png"}
              alt="resim4"
              width={1200}
              height={1200}
              className="object-contain"
            />
          </Slider>
        </div>
        <div className="w-full flex py-6 flex-col items-center lg:items-start justify-center lg:border-l-[2px] lg:pr-2 lg:pl-16">
          <div className="w-96 h-60 ">
            <ReactPlayer
              url={"https://www.youtube.com/watch?v=DGOJAIiUa_s"}
              playing={true}
              loop={true}
              muted={true}
              light={false}
              pip={true}
              width="100%"
              height="100%"
              playsinline={true}
            />
            <source
              src={"https://www.youtube.com/watch?v=DGOJAIiUa_s"}
              type="video/mp4"
            />
          </div>
          <div className="text-lg mt-2 py-1 text-purple-500">LED IŞIKLI</div>
          <div className="text-xl font-semibold py-1 text-purple-700">
            Bistro Masalar
          </div>
          <p className="text-sm font-light py-1 w-96 text-slate-950">
            &nbsp;&nbsp;&nbsp;&nbsp;Işıklı bistro masalar, modern ve şık
            tasarımlarıyla mekanlara estetik bir dokunuş katarken, aynı zamanda
            işlevsellik sunar. Bu masalar, özellikle akşamları dış mekanlarda ya
            da loş ortamlarda kullanılmak üzere tasarlanmıştır. LED
            aydınlatmaları sayesinde hem ortamı aydınlatır hem de dikkat çekici
            bir atmosfer yaratır.
          </p>
          <p className="text-sm font-light py-2 w-96 text-slate-950">
            &nbsp;&nbsp;&nbsp;&nbsp;Renk seçenekleri ve ışık modlarıyla
            özelleştirilebilen bu masalar, restoran, kafe, otel gibi
            işletmelerde müşterilere keyifli bir deneyim sunar. Dayanıklı
            malzemelerden üretilmiş olup, hem iç hem de dış mekanlarda uzun
            ömürlü bir kullanım sağlar.
          </p>
        </div>
      </div>
      <div className="w-full my-6 h-auto flex flex-col-reverse items-center justify-center lg:grid lg:grid-cols-2">
        <div className="w-full flex py-6 flex-col items-center lg:items-end justify-center lg:border-r-[2px] lg:pl-2 lg:pr-16">
          <div className="h-full w-96 ">
            <ReactPlayer
              url={"https://www.youtube.com/watch?v=YBLXZlHxInk"}
              playing={true}
              loop={true}
              muted={true}
              light={false}
              pip={true}
              width="100%"
              height="100%"
              playsinline={true}
            />
            <source
              src={"https://www.youtube.com/watch?v=YBLXZlHxInk"}
              type="video/mp4"
            />
          </div>
          <div className="text-lg mt-2 py-1 text-purple-500 lg:text-right">
            LED IŞIKLI
          </div>
          <div className="text-xl font-semibold py-1 text-purple-700 lg:text-right">
            Saksı
          </div>
          <p className="text-sm font-light py-1 w-96 text-slate-950 lg:text-right">
            &nbsp;&nbsp;&nbsp;&nbsp;Işıklı saksılar, şık tasarımları ve
            dekoratif aydınlatmalarıyla mekanlara modern bir dokunuş kazandırır.
            Bu saksılar, özellikle akşam saatlerinde bahçe, teras, kafe ve otel
            gibi alanlarda kullanıldığında, ortama hem sıcak hem de davetkâr bir
            atmosfer katar.
          </p>
          <p className="text-sm font-light py-2 w-96 text-slate-950 lg:text-right">
            &nbsp;&nbsp;&nbsp;&nbsp;İçerdikleri LED aydınlatma sistemi, farklı
            renk seçenekleri ve ayarlanabilir ışık modlarıyla dikkat çekici bir
            ambiyans oluşturur. Bitkilerin doğal güzelliğini vurgularken,
            dayanıklı malzemeleri sayesinde uzun ömürlü bir kullanım sunar.
            Işıklı saksılar, hem iç hem de dış mekan dekorasyonlarına zarif ve
            modern bir hava katmak için mükemmel bir seçimdir.
          </p>
        </div>
        <div className="w-full px-4 lg:px-0 flex items-center justify-center lg:pr-2 lg:pl-16">
          <Slider {...slidersettings} className="w-full h-full">
            <Image
              src={"/assets/images/article/about1.png"}
              alt="resim5"
              width={1200}
              height={1200}
              className="object-contain"
            />
            <Image
              src={"/assets/images/article/about2.png"}
              alt="resim6"
              width={1200}
              height={1200}
              className="object-contain"
            />
            <Image
              src={"/assets/images/article/about3.png"}
              alt="resim7"
              width={1200}
              height={1200}
              className="object-contain"
            />
            <Image
              src={"/assets/images/article/about4.png"}
              alt="resim8"
              width={1200}
              height={1200}
              className="object-contain"
            />
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
