import Link from "next/link";
import React from "react";

const SiparisClient = (props) => {
  const { user } = props;

  return (
    <>
      <div className="relative w-full overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom ">
              <td className="py-4 block whitespace-nowrap text-center">
                Sipariş No
              </td>
              <td className="py-4 whitespace-nowrap text-center">Tarih</td>
              <td className="py-4 whitespace-nowrap text-center">Durum</td>
              <td className="py-4 whitespace-nowrap text-center">Fiyat</td>
              <td className="py-4 whitespace-nowrap  text-center"></td>
            </tr>
            {/* table heading end */}
            {user?.SiparisOrderFinish?.map((item) => {
              const mydate = new Date(item?.createdAt);
              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
              };
              const formattedDate = mydate.toLocaleDateString("tr-TR", options);

              const time = formattedDate;

              return (
                <tr
                  className="bg-white border-b hover:bg-gray-50"
                  key={item?.id}
                >
                  <td className="text-center py-4">
                    <span className="text-lg text-qgray font-medium">
                      #{item?.id}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="text-base text-qgray  whitespace-nowrap">
                      {time}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                    {item?.status === "SUCCESS" && (
                      <span className="text-sm rounded text-blue-500 bg-blue-100 p-2">
                        Beklemede
                      </span>
                    )}
                    {item?.status === "SEND" && (
                      <span className="text-sm rounded text-green-500 bg-green-100 p-2">
                        Gönderildi
                      </span>
                    )}
                    {item?.status === "ERROR" && (
                      <span className="text-sm rounded text-red-500 bg-red-100 p-2">
                        Hata Var {item?.error !== "null" ? item?.error : ""}
                      </span>
                    )}
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="text-base text-qblack whitespace-nowrap px-2 ">
                      {item?.amount?.toFixed(2)}₺
                    </span>
                  </td>
                  <td className="text-center py-4">
                    <Link href={`/hesabim/siparislerim/${item?.basketId}`}>
                      <button
                        type="button"
                        className="w-[116px] h-[46px] bg-qyellow text-qblack font-bold"
                      >
                        Detaylar
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SiparisClient;
