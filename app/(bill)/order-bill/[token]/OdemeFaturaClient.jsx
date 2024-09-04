"use client";

import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { useRouter } from "next/navigation";
import Image from "next/image";
function OdemeFaturaClient(props) {
  const { sipdata } = props;

  const router = useRouter();

  const componentRef = useRef();

  const reactToPrintTrigger = () => {
    return (
      <button className="yellow-btn text-center !h-12 !w-28 mr-auto mt-[30px] font-bold text-black border-[1px] border-black">
        Yazdır
      </button>
    );
  };
  const reactToPrintTriggerMobile = () => {
    return (
      <button className="yellow-btn text-center !h-12 !w-28 mr-3 mt-[30px] font-bold text-black border-[1px] border-black">
        Yazdır
      </button>
    );
  };
  return (
    <>
      {sipdata !== null && (
        <div className="flex flex-col lg:flex-row w-full">
          <div className="mb-3 flex justify-between lg:hidden flex-1 flex-wrap">
            <button
              className="yellow-btn !block lg:!hidden lg:!min-h-6 text-center ml-3 !h-12 !w-28 mt-[30px] font-bold text-black border-[1px] border-black"
              onClick={() => router.push("/")}
            >
              Geri Dön
            </button>

            <ReactToPrint
              content={() => componentRef.current}
              documentTitle="fatura"
              removeAfterPrint
              trigger={reactToPrintTriggerMobile}
            />
          </div>
          <button
            className="yellow-btn !hidden lg:!block text-center !h-12 !w-28 ml-auto mr-4 mt-[30px] font-bold text-black border-[1px] border-black"
            onClick={() => router.push("/")}
          >
            Geri Dön
          </button>
          <div className="pt-8">
            <OrderSuccess sipdata={sipdata} ref={componentRef} />
          </div>
          <div className="hidden lg:block mr-auto ml-4">
            <ReactToPrint
              content={() => componentRef.current}
              documentTitle="fatura"
              removeAfterPrint
              trigger={reactToPrintTrigger}
            />
          </div>
        </div>
      )}
    </>
  );
}
export default OdemeFaturaClient;

const OrderSuccess = React.forwardRef(function OrderSuccess(props, ref) {
  const { sipdata } = props;

  const TotalHT = sipdata?.basket
    .reduce((acc, item) => {
      return acc + parseFloat(item.price) / 1.2;
    }, 0)
    .toFixed(2);

  const TotalTVA = sipdata?.basket
    .reduce((acc, item) => {
      const price = parseFloat(item.price) / 1.2;
      const TVA = parseFloat(item.price) - price;
      return acc + TVA;
    }, 0)
    .toFixed(2);

  const TOTAL = (parseFloat(TotalHT) + parseFloat(TotalTVA)).toFixed(2);

  function formatNumber(num) {
    // Gelen sayıyı istenen formata dönüştür
    let formattedNumber = String(num);
    while (formattedNumber.length < 10) {
      formattedNumber = "0" + formattedNumber;
    }
    return formattedNumber;
  }
  function formatPNumber(num) {
    // Gelen sayıyı istenen formata dönüştür
    let formattedNumber = String(num);
    while (formattedNumber.length < 6) {
      formattedNumber = "0" + formattedNumber;
    }
    return formattedNumber;
  }

  function getDate(data) {
    const mydata = new Date(data);
    const gun = mydata.getDate();
    const ay = mydata.getMonth() + 1;
    const yil = mydata.getFullYear();
    return `${gun}/${ay}/${yil}`;
  }

  return (
    <>
      {sipdata !== null && (
        <div
          ref={ref}
          style={{
            marginTop: "30px",
            minWidth: "650px",
            margin: "auto",
            padding: "30px",
            border: "1px solid #eee",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
            fontSize: "10px",
            lineHeight: "12px",
            fontFamily:
              '"Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif',
            color: "#555",
          }}
        >
          <table cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <td colSpan="2">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <Image
                            src={"/assets/images/yuvarlakmaylogo.png"}
                            alt="bicakciserkanlogo"
                            width={400}
                            height={400}
                            loading="eager"
                            style={{
                              width: "100%",
                              maxWidth: "110px",
                              objectFit: "contain",
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr style={{ height: "20px" }}></tr>
              <tr>
                <td colSpan="2">
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                    }}
                  >
                    <tbody>
                      <tr style={{ verticalAlign: "top" }}>
                        <td>
                          <table
                            style={{
                              width: "220px",
                              borderCollapse: "collapse",
                            }}
                          >
                            <tbody>
                              <tr style={{ verticalAlign: "top" }}>
                                <td>Fatura No</td>
                                <td align="right">
                                  F{formatNumber(sipdata.id)}
                                </td>
                              </tr>
                              <tr>
                                <td>Siparis No</td>
                                <td align="right">S{sipdata.paymentId}</td>
                              </tr>
                              <tr>
                                <td>Sepet No</td>
                                <td align="right">{sipdata.basketId}</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>

                        <td align="right">
                          <table
                            style={{
                              width: "250px",
                              borderCollapse: "collapse",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td
                                  style={{ width: "30%", verticalAlign: "top" }}
                                >
                                  Sipariş Adresi:
                                </td>
                                <td
                                  style={{ width: "70%", verticalAlign: "top" }}
                                >
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <span>
                                            {sipdata.sendadress.address}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          {sipdata.sendadress.zipCode}{" "}
                                          {sipdata.sendadress.city}{" "}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>{sipdata.sendadress.country}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr style={{ height: "20px" }}></tr>
              <tr>
                <td colSpan="2">
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                    }}
                  >
                    <tbody>
                      <tr style={{ verticalAlign: "top" }}>
                        <td>
                          <table
                            style={{
                              width: "220px",
                              borderCollapse: "collapse",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td>Fatura Tarihi</td>
                                <td align="right">
                                  {getDate(sipdata.createdAt)}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>

                        <td align="right">
                          <table
                            style={{
                              width: "250px",
                              borderCollapse: "collapse",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td
                                  style={{ width: "30%", verticalAlign: "top" }}
                                >
                                  Fatura Adresi:
                                </td>
                                <td
                                  style={{ width: "70%", verticalAlign: "top" }}
                                >
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <span>
                                            {sipdata.billadress.address}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          {sipdata.billadress.zipCode}{" "}
                                          {sipdata.billadress.city}{" "}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>{sipdata.billadress.country}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr style={{ height: "20px" }}></tr>
              <tr
                style={{
                  fontSize: "22px",
                  lineHeight: "1",
                  color: "#b90808",
                  fontWeight: "bold",
                }}
              >
                <td>FATURA</td>
              </tr>
              <tr style={{ height: "20px" }}></tr>
              <tr>
                <td style={{ width: "100%" }}>
                  <table
                    className="order-detail"
                    border="0"
                    cellPadding="0"
                    cellSpacing="0"
                    align="left"
                    style={{
                      width: "100%",
                      border: "1px solid #000",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr
                        align="left"
                        style={{
                          height: "40px",
                          paddingBottom: "0px",
                        }}
                      >
                        <th
                          style={{
                            textAlign: "start",
                            verticalAlign: "bottom",
                            width: "23%",
                            border: "1px solid #000",
                            padding: "6px",
                          }}
                        >
                          Ürün Referans Kodu
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            verticalAlign: "bottom",
                            width: "30%",
                            border: "1px solid #000",
                            padding: "6px",
                          }}
                        >
                          Ürün Adı
                        </th>

                        <th
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                            padding: "6px",
                          }}
                        >
                          Ürün Adeti
                        </th>
                        <th
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                            padding: "6px",
                          }}
                        >
                          Ürün KDV Öncesi Fiyat
                        </th>
                        <th
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                            padding: "6px",
                          }}
                        >
                          KDV %
                        </th>
                        <th
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                            padding: "6px",
                          }}
                        >
                          Ürün KDV Fiyatı
                        </th>

                        <th
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                            padding: "6px",
                          }}
                        >
                          Ürün Fiyatı
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sipdata?.basket?.map((item, index) => {
                        const tekHT = (parseFloat(item?.price) / 1.2).toFixed(
                          2
                        );
                        const TVAprice = (
                          parseFloat(item?.price) - parseFloat(tekHT)
                        ).toFixed(2);

                        return (
                          <tr key={index}>
                            <td
                              style={{
                                textAlign: "start",
                                verticalAlign: "top",
                                border: "1px solid #000",
                                padding: "6px",
                              }}
                            >
                              {formatPNumber(item?.id)}
                            </td>
                            <td
                              style={{
                                textAlign: "start",
                                verticalAlign: "top",
                                border: "1px solid #000",
                                padding: "6px",
                              }}
                            >
                              {item?.name}
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                textAlign: "center",
                                padding: "6px",
                              }}
                            >
                              {item?.quantity}
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                textAlign: "center",
                                padding: "6px",
                              }}
                            >
                              {tekHT}₺
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                textAlign: "center",
                                padding: "6px",
                              }}
                            >
                              %20
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                textAlign: "center",
                                padding: "6px",
                              }}
                            >
                              {TVAprice}₺
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                textAlign: "center",
                                padding: "6px",
                              }}
                            >
                              {parseFloat(item?.price).toFixed(2)}₺
                            </td>
                          </tr>
                        );
                      })}

                      <tr>
                        <td colSpan={2}></td>

                        <td
                          colSpan={7}
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                            padding: "6px",
                          }}
                        >
                          <table
                            border="0"
                            cellPadding="0"
                            cellSpacing="0"
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    padding: "6px",
                                    textAlign: "left",
                                    border: "none",
                                  }}
                                >
                                  KDV&apos;siz Fiyat:
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    padding: "6px",
                                    border: "none",
                                  }}
                                >
                                  {TotalHT}₺
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    padding: "6px",
                                    textAlign: "left",
                                    border: "none",
                                  }}
                                >
                                  KDV Yüzdesi:
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    padding: "6px",
                                    border: "none",
                                  }}
                                >
                                  20,00%
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    padding: "6px",
                                    textAlign: "left",
                                    border: "none",
                                  }}
                                >
                                  KDV Fiyatı :
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    padding: "6px",
                                    border: "none",
                                  }}
                                >
                                  {TotalTVA}₺
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    padding: "6px",
                                    textAlign: "left",
                                    border: "none",
                                  }}
                                >
                                  TOPLAM :
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    padding: "6px",
                                    border: "none",
                                  }}
                                >
                                  {TOTAL}₺
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    padding: "6px",
                                    textAlign: "left",
                                    border: "none",
                                  }}
                                >
                                  Ödeme Şekli
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    padding: "6px",
                                    border: "none",
                                  }}
                                >
                                  Kredi Kartı
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td style={{ paddingTop: "20px" }}>
                  Tatlıcak Mh. Gürçınar Sk. No:60 Vatan San. Sit. Karatay/Konya
                  TÜRKİYE
                </td>
              </tr>
              <tr>
                <td>Vergi No : 44644281890</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
});
