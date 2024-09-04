"use client";

import Link from "next/link";
import { ImBoxAdd } from "react-icons/im";
const SiparisDetayClient = (props) => {
  const { siparis } = props;

  const createdAt = siparis?.createdAt;
  const date = new Date(createdAt);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("tr-TR", options);

  return (
    <>
      <div className="w-full h-full flex flex-col gap-3">
        <div className="w-full">
          <h4 className="text-lg font-bold">Satın Alma Detayları</h4>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-12 col-12  mb-3 text-sm block md:hidden">
          <div className="flex flex-row gap-2  border-2 py-4 border-black">
            <div className="flex items-center justify-center  py-1 px-3 ">
              <ImBoxAdd size={33} />
            </div>
            <div className="flex flex-col justify-evenly gap-1 whitespace-nowrap">
              <span className="font-semibold">#{siparis?.id}</span>{" "}
              <span>{formattedDate}</span>
            </div>

            <div className="ml-auto flex flex-col justify-between text-right mr-2">
              <span className="text-red-600 font-semibold">
                {siparis?.amount?.toFixed(2)}₺
              </span>{" "}
              {siparis?.status === "SUCCESS" && (
                <span className="text-sm rounded text-blue-500 bg-blue-100 p-2">
                  Beklemede
                </span>
              )}
              {siparis?.status === "SEND" && (
                <span className="text-sm rounded text-green-500 bg-green-100 p-2">
                  Gönderildi
                </span>
              )}
              {siparis?.status === "ERROR" && (
                <span className="text-sm rounded text-red-500 bg-red-100 p-2">
                  {siparis?.error !== "null"
                    ? siparis?.error
                    : "Hata Mailinizi Kontrol Edin"}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-12 col-12  mb-3 text-sm hidden md:block">
          <div className="flex flex-row gap-6 w-[510px] border-2 p-4 border-black">
            <div className="flex items-center justify-center  py-3 px-6 ">
              <ImBoxAdd size={55} />
            </div>
            <div className="flex flex-col justify-evenly gap-2 whitespace-nowrap">
              <span className="font-semibold">#{siparis?.id}</span>{" "}
              <span>{formattedDate}</span>
            </div>
            <div className="ml-auto flex flex-col justify-evenly text-right">
              <span className="text-red-600 font-semibold">
                {siparis?.amount?.toFixed(2)}₺
              </span>{" "}
              {siparis?.status === "SUCCESS" && (
                <span className="text-sm rounded text-blue-500 bg-blue-100 p-2">
                  Beklemede
                </span>
              )}
              {siparis?.status === "SEND" && (
                <span className="text-sm rounded text-green-500 bg-green-100 p-2">
                  Gönderildi
                </span>
              )}
              {siparis?.status === "ERROR" && (
                <span className="text-sm rounded text-red-500 bg-red-100 p-2">
                  {siparis?.error !== "null"
                    ? siparis?.error
                    : "Hata Mailinizi Kontrol Edin"}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="w-full  mb-3">
          <h4 className="font-semibold">Gönderilme Yeri</h4>
          <div className="flex max-w-[510px] bg-slate-300 p-4 text-sm whitespace-nowrap">
            <ul className="ml-4">
              <li>
                {siparis?.userinfo?.name} {siparis?.userinfo?.surname}
              </li>
              <li>{siparis?.userinfo?.tel}</li>
              <li>{siparis?.sendadress?.address}</li>
              <li>
                {siparis?.sendadress?.city} {siparis?.sendadress?.zipCode}
              </li>
              <li>{siparis?.sendadress?.country}</li>
            </ul>
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-12 col-12">
          <h4 className="font-semibold">Sepet Detayı</h4>
          <div className="flex flex-col max-w-[510px] bg-slate-50 p-4  whitespace-nowrap">
            {siparis?.basket?.map((item) => {
              return (
                <ul className="border-b-2 border-stone-300" key={item?.id}>
                  <li>
                    <span className="font-semibold">Ürün Adı :</span>{" "}
                    {item?.name}
                  </li>
                  <li>
                    <span className="font-semibold">Adeti :</span> 1
                  </li>
                  <li>
                    <span className="font-semibold">Fiyatı :</span>{" "}
                    {item?.price}₺
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
        <div className="w-full flex items-center justify-start">
          <Link href={`/order-bill/${siparis?.token}`}>
            <button className="yellow-btn min-h-12 px-3 text-center w-24 mt-[30px] font-bold text-black border-[1px] border-black">
              Faturayı Gör
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SiparisDetayClient;
