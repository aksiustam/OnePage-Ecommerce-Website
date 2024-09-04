import useCart from "@/hooks/useCart";
import Image from "next/image";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

export default function ProductsTable({ className }) {
  const { basket, removeBasket, incBasket, decBasket } = useCart();

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

  return (
    <div className={`w-full ${className || ""}`}>
      <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
              <td className="py-4 pl-10 whitespace-nowrap ">Ürün Resmi</td>
              <td className="py-4 whitespace-nowrap text-center">Ürün Adı</td>
              <td className="py-4 whitespace-nowrap text-center">Miktarı</td>
              <td className="py-4 whitespace-nowrap text-center">Fiyatı</td>
              <td className="py-4 whitespace-nowrap  text-center">Toplam</td>
              <td className="py-4 whitespace-nowrap text-right w-[114px]"></td>
            </tr>{" "}
            {/* table heading end */}
            {basket?.map((item) => {
              const { original, offer } = getPrice(item?.category, item?.price);
              return (
                <tr
                  key={item?.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="pl-10  py-4 ">
                    <div className="flex space-x-6 items-center">
                      <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                        <Image
                          src={item?.image}
                          alt={item?.name}
                          width={100}
                          height={100}
                          loading="eager"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="text-center py-4 px-2">
                    <div className="flex-1 flex flex-col justify-center items-center">
                      <p className="font-medium text-[15px] text-qblack">
                        {item?.name} {item.category}
                      </p>
                    </div>
                  </td>
                  <td className="text-center py-4 px-2">
                    <div className="flex space-x-1 items-center justify-center">
                      <span
                        className="hover:text-black cursor-pointer"
                        onClick={() => decBasket(item)}
                      >
                        <FaRegArrowAltCircleLeft size={18} />
                      </span>
                      <span className="text-[18px] font-normal">
                        {item?.quantity}
                      </span>
                      <span
                        className="hover:text-black cursor-pointer"
                        onClick={() => incBasket(item)}
                      >
                        <FaRegArrowAltCircleRight size={18} />
                      </span>
                    </div>
                  </td>
                  <td className="text-center py-4 px-2">
                    <div className="flex space-x-1 items-center justify-center">
                      <span className="text-[15px] font-normal">
                        {item?.indirim === true ? offer : original}₺
                      </span>
                    </div>
                  </td>
                  <td className=" py-4">
                    <div className="flex space-x-1 items-center justify-center">
                      <span className="text-[15px] font-normal">
                        {item?.indirim === true
                          ? (offer * item?.quantity).toFixed(0)
                          : (original * item?.quantity).toFixed(0)}
                        ₺
                      </span>
                    </div>
                  </td>

                  <td className="text-right py-4">
                    <div
                      className="flex space-x-1 items-center justify-center cursor-pointer "
                      onClick={() => removeBasket(item)}
                    >
                      <span>
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z"
                            fill="#AAAAAA"
                          />
                        </svg>
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
