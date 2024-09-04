"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { CiCircleQuestion, CiCircleAlert, CiCircleCheck } from "react-icons/ci";
const Dashboard = (props) => {
  const { products, siparis } = props;
  const router = useRouter();
  const mysiparis = siparis.sort((item1, item2) => {
    if (item1.status === "SUCCESS" && item2.status !== "SUCCESS") {
      return -1; // item1'i item2'den önce sırala
    } else if (item1.status !== "SUCCESS" && item2.status === "SUCCESS") {
      return 1; // item2'yi item1'den önce sırala
    } else {
      return 0; // Değişiklik yapma, sıralama düzenini değiştirme
    }
  });

  return (
    <>
      <div className="relative">
        {/* Card stats */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-4/12 xl:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-gray-600 uppercase font-bold text-xs">
                      Toplam Ürünler
                    </h5>
                    <span className="font-semibold text-xl ">
                      {products?.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-4/12 xl:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-gray-600 uppercase font-bold text-xs">
                      Toplam Satışlar
                    </h5>
                    <span className="font-semibold text-xl ">
                      {siparis?.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-4/12 xl:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                      Bekleyen Satışlar
                    </h5>
                    <span className="font-semibold text-xl text-blueGray-700">
                      {
                        siparis?.filter((item) => item?.status === "SUCCESS")
                          ?.length
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block w-full overflow-x-auto bg-white shadow-2xl mb-6">
        {/* Projects table */}
        <div className="bg-[#F8FAFC] px-6 py-3 font-extrabold text-yellow-400">
          En Çok Satanlar
        </div>
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-[#F8FAFC] text-[#64748B] "
                }
              >
                Ürün Resmi
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-[#F8FAFC] text-[#64748B]"
                }
              >
                Ürün Adı
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-[#F8FAFC] text-[#64748B]"
                }
              >
                Satış Miktarı
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-[#F8FAFC] text-[#64748B]"
                }
              >
                Tıklanma Miktarı
              </th>
            </tr>
          </thead>
          <tbody>
            {products
              .sort((a, b) => b.sells - a.sells)
              .slice(0, 5)
              .map((item) => (
                <tr
                  key={item?.id}
                  className="hover:bg-slate-200 cursor-pointer h-12"
                  onClick={() => router.push(`/admin/product/${item?.id}`)}
                >
                  <th className="px-6 align-middle text-xs whitespace-nowrap p-2 text-left flex items-center">
                    <Image
                      src={item?.images[0]?.imageurl}
                      alt="Ürünler"
                      width={150}
                      height={150}
                      className="w-12 h-12 object-contain"
                      loading="eager"
                    />
                  </th>
                  <td className="px-6 align-middle text-xs whitespace-nowrap p-2">
                    {item?.name}
                  </td>
                  <td className="px-6 align-middle  text-xs whitespace-nowrap p-2">
                    {item?.sells}
                  </td>
                  <td className="px-6 align-middle text-xs whitespace-nowrap p-2">
                    {item?.onclick}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="block w-full overflow-x-auto bg-white shadow-2xl  mb-12">
        {/* Projects table */}
        <div className="bg-[#F8FAFC] px-6 py-3 font-extrabold text-yellow-400">
          Son Satışlar
        </div>
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-[#F8FAFC] text-[#64748B] "
                }
              >
                ID
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-[#F8FAFC] text-[#64748B] "
                }
              >
                Satış ID
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-[#F8FAFC] text-[#64748B]"
                }
              >
                Ürün Detayı
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-[#F8FAFC] text-[#64748B]"
                }
              >
                Durum
              </th>
            </tr>
          </thead>
          <tbody>
            {mysiparis.slice(0, 8).map((item) => (
              <tr
                key={item?.id}
                className="hover:bg-slate-200 cursor-pointer h-12"
                onClick={() => router.push(`/admin/orders/${item?.id}`)}
              >
                <th className="px-6 align-middle text-xs whitespace-nowrap text-left  p-2 text-blue-600">
                  #{item?.id}
                </th>
                <td className="px-6 align-middle text-xs whitespace-nowrap p-2">
                  #{item?.paymentId}
                </td>
                <td className="px-6 align-middle text-xs whitespace-nowrap p-2">
                  {item?.basket[0]?.name}
                </td>
                <td className="px-6 align-middle text-xs whitespace-nowrap p-2 text-left">
                  {item?.status === "SUCCESS" && (
                    <div className="flex justify-start gap-2">
                      <CiCircleQuestion color="blue" size={16} /> Beklemede
                    </div>
                  )}
                  {item?.status === "SEND" && (
                    <div className="flex justify-start gap-2">
                      <CiCircleCheck color="green" size={16} /> Gönderildi
                    </div>
                  )}
                  {item?.status === "ERROR" && (
                    <div className="flex justify-start gap-2">
                      <CiCircleAlert color="red" size={16} /> HATA VAR
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
