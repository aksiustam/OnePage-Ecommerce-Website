"use client";
import Image from "next/image";
import Link from "next/link";
import { IoIosPeople } from "react-icons/io";
import { LiaUserClockSolid } from "react-icons/lia";
export default function Bannerb({ allcategory }) {
  const { category } = allcategory;

  return (
    <>
      <div className="w-full h-full py-6 relative">
        <div className="h-full flex flex-col ">
          <div className="w-full flex items-center justify-center">
            <div className="container-x py-10 lg:grid lg:grid-cols-2 flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-center mb-3 lg:mb-0">
                <Image
                  src={"/assets/images/yuvarlakmaylogo.png"}
                  alt="MayPlastikLogo"
                  width={1200}
                  height={1200}
                  className="w-52 h-52 lg:w-80 lg:h-80 object-contain"
                />
              </div>
              <div className="w-full flex flex-col items-center justify-center px-6">
                <div className="w-full mb-8">
                  <h1 className="text-2xl font-bold text-purple-800 text-center text-shadow-md">
                    Konya&apos;da Led Işıklı Polietilen Ürünler Üretimi{" "}
                    <span className="block">MAY PLASTİK</span>
                  </h1>
                </div>
                <p className="text-sm text-left pr-0 lg:pr-16">
                  &nbsp;&nbsp;&nbsp;&nbsp;MAY PLASTİK, Konya&apos;da LED&apos;li
                  yürüyüş yolları, abajurlar, bistro masaları ve oturma grupları
                  gibi polietilen ürünlerin imalatını ve pazarlamasını
                  gerçekleştirmektedir. Yüksek kaliteli ve dayanıklı malzemeler
                  kullanılarak üretilen ürünlerimiz, estetik tasarımları ve
                  işlevselliği sayesinde hem iç hem de dış mekanlarda uzun
                  süreli kullanım için idealdir.
                </p>
                <div className="w-full mt-3 grid grid-cols-2">
                  <div className="flex flex-col items-center justify-center justify-self-center lg:justify-self-start ">
                    <IoIosPeople size={80} color="red" />
                    <div className="text-lg">25+ Şirket ile İş Birliği</div>
                  </div>
                  <div className="flex flex-col items-center justify-center justify-self-center lg:justify-self-start">
                    <LiaUserClockSolid size={80} color="red" />
                    <div className="text-lg">3 Gün de İş Teslimi</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full px-8 xl:px-0 mt-4 xl:ml-[196px] xl:mt-6 flex flex-col items-start justify-start">
          <div className="flex px-1 xl:px-0 mt-4 mb-2 items-start justify-start xl:my-4">
            <div className="w-full text-2xl font-bold text-purple-900 text-center xl:text-left">
              Kategorilerimiz
            </div>
          </div>
          <div className="w-full flex flex-col-reverse lg:flex-col items-start justify-start">
            <div className="w-full flex flex-row space-x-1 xl:space-x-4">
              {category?.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  className="w-32 h-full flex items-center justify-start"
                >
                  <Link
                    href={`#products`}
                    className="w-full h-full rounded-full transition duration-300 ease-in-out  hover:bg-purple-800"
                  >
                    <Image
                      src={item?.imageurl}
                      alt={item.name}
                      width={2000}
                      height={2000}
                      className="w-32 object-contain object-center rounded-full border-2 border-slate-400 hover:opacity-60"
                    />
                  </Link>
                </div>
              ))}
            </div>
            <div className="w-full flex flex-row pt-0 pb-3 lg:pb-0 lg:pt-3 space-x-1 xl:space-x-4">
              {category?.slice(6, 12).map((item) => (
                <div
                  key={item.id}
                  className="w-32 h-full flex items-center justify-start"
                >
                  <Link
                    href={`#products`}
                    className="w-full h-full rounded-full transition duration-300 ease-in-out  hover:bg-purple-800"
                  >
                    <Image
                      src={item?.imageurl}
                      alt={item.name}
                      width={2000}
                      height={2000}
                      className="w-32  object-contain object-center rounded-full border-2 border-slate-400 hover:opacity-60"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
