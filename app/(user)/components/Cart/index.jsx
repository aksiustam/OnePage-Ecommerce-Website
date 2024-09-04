import UseCart from "@/hooks/useCart";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  const { basket, removeBasket } = UseCart();

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
  const cartTotal = () => {
    return basket
      .reduce((acc, item) => {
        const { original, offer } = getPrice(item?.category, item?.price);
        if (item.indirim === true) {
          return acc + item.quantity * offer;
        } else {
          return acc + item.quantity * original;
        }
      }, 0)
      .toFixed(0);
  };
  return (
    <>
      <div
        style={{ boxShadow: " 0px 15px 50px 0px rgba(0, 0, 0, 0.14)" }}
        className={`w-[300px] bg-white border-t-[3px] absolute -right-[45px] top-11 z-[900] hidden group-hover:block cart-wrappwer transition  duration-[200] delay-1000 hover:delay-0`}
      >
        <div className="w-full h-full">
          <div className="product-items max-h-[310px] overflow-y-scroll">
            <ul>
              {basket?.map((item) => {
                const { original, offer } = getPrice(
                  item?.category,
                  item?.price
                );
                return (
                  <li key={item?.id} className="w-full h-full flex">
                    <div className="flex w-full space-x-[8px] justify-center items-center px-4 my-[20px]">
                      <div className="w-[65px] h-full">
                        <Image
                          src={item?.image}
                          alt={item?.name}
                          width={100}
                          height={100}
                          loading="eager"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 h-full flex flex-col justify-center ">
                        <p className="title mb-2 text-[13px] font-600 text-qblack leading-4 line-clamp-2 hover:text-blue-600">
                          {item?.name} {item?.category}
                        </p>

                        <p className="price">
                          <span className="offer-price text-qred font-600 text-[15px] ml-2">
                            {item?.quantity} X{" "}
                            {item?.indirim === true ? offer : original}₺
                          </span>
                        </p>
                      </div>
                    </div>
                    <span
                      className="mt-[20px] mr-[15px] inline-flex cursor-pointer "
                      onClick={() => removeBasket(item)}
                    >
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        className="inline fill-current text-[#AAAAAA] hover:text-qred"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7.76 0.24C7.44 -0.08 6.96 -0.08 6.64 0.24L4 2.88L1.36 0.24C1.04 -0.08 0.56 -0.08 0.24 0.24C-0.08 0.56 -0.08 1.04 0.24 1.36L2.88 4L0.24 6.64C-0.08 6.96 -0.08 7.44 0.24 7.76C0.56 8.08 1.04 8.08 1.36 7.76L4 5.12L6.64 7.76C6.96 8.08 7.44 8.08 7.76 7.76C8.08 7.44 8.08 6.96 7.76 6.64L5.12 4L7.76 1.36C8.08 1.04 8.08 0.56 7.76 0.24Z" />
                      </svg>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-full px-4 mt-[20px] mb-[12px]">
            <div className="h-[1px] bg-[#F0F1F3]"></div>
          </div>
          <div className="product-actions px-4 mb-[30px]">
            <div className="total-equation flex justify-between items-center mb-[28px]">
              <span className="text-[15px] font-500 text-qblack">Toplam</span>
              <span className="text-[15px] font-500 text-qred ">
                {cartTotal()}₺
              </span>
            </div>
            <div className="product-action-btn">
              <Link href={"/sepet"}>
                <div className="gray-btn w-full h-[50px] mb-[10px] ">
                  <span>Sepeti Görüntüle</span>
                </div>
              </Link>
              <Link href={"/odeme"}>
                <div className="w-full h-[50px]">
                  <div className={"yellow-btn"}>
                    <span className="text-sm">Ödeme</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
