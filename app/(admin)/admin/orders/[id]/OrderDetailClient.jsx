"use client";
import React, { useState } from "react";

import "./styles.css";
import { FaUser } from "react-icons/fa";
import putOrder from "../../../../actions/Order/putOrder";
import Swal from "sweetalert2";
import { saveAs } from "file-saver";
import Invoicemail from "@/app/email/Invoicemail";
const OrderDetailClient = (props) => {
  const data = props.siparis;

  const [status, setStatus] = useState(data.status);
  const [message, setMessage] = useState(data.error);
  const onSumbit = async () => {
    const formData = {
      id: data.id,
      status: status,
      message: message,
    };
    const res = await putOrder(formData);
    if (res === true) {
      await Swal.fire({
        icon: "success",
        title: "Başarıyla Değiştirildi",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.reload();
    } else {
      Swal.fire({
        icon: "error",
        title: JSON.stringify(res.message),
      });
    }
  };

  const mydate = new Date(data?.createdAt);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = mydate.toLocaleDateString("tr-TR", options);
  const formattedTime = mydate.toLocaleTimeString("tr-TR");
  const time = formattedDate + ", Saat " + formattedTime;

  const DownPdf = async () => {
    const { render } = await import("@react-email/render");

    const html = render(<Invoicemail sipdata={data} />);

    const blob = new Blob([html], { type: "text/html" });

    saveAs(blob, `fatura-${data.id}.html`);
  };
  return (
    <div className="flex flex-wrap">
      <div className="w-full flex flex-col">
        <h4 className="text-2xl font-bold mb-4">Sipariş Detayları</h4>
        <div className="grid grid-cols-2">
          <div className="w-full h-full">
            <ul>
              <li>
                Siparis Id : <span>{data?.id}</span>
              </li>

              <li>
                Adı : <span>{data?.userinfo?.name}</span>
              </li>
              <li>
                Soyadı : <span>{data?.userinfo?.surname}</span>
              </li>
              <li>
                Email : <span>{data?.email}</span>
              </li>
              <li>
                Telefon : <span>{data?.userinfo?.tel}</span>
              </li>
              <li>
                TC Kimlik : <span>{data?.userinfo?.identityNumber}</span>
              </li>
              <li>
                Toplam Fiyatı : <span>{data?.amount.toFixed(2)}₺</span>
              </li>
              <li>
                Satın Alma Tarihi : <span>{time}</span>
              </li>
              <li>
                Kullanıcı Notu :
                <span className="break-words ">{data?.note}</span>
              </li>
              <li>
                ÖDEME DURUMU : <span>{data?.paymentStatus}</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <div
              className={`border-[3px]  min-h-32 min-w-96 flex flex-col pl-3 pt-4 gap-3 cursor-pointer  text-sm hover:bg-slate-200`}
            >
              <div className="flex items-center gap-3">
                <FaUser />
                <span>Fatura Adresi</span>
              </div>
              <div className="flex flex-col">
                <p className=" break-words mr-12 text-sm">
                  {data?.billadress?.address}
                </p>
                <p className="break-words my-1 mr-2 text-sm">
                  <span>{data?.billadress?.city}</span> /
                  <span>{data?.billadress?.country}</span>
                  <span className="ml-2">{data?.billadress?.zipCode}</span>
                </p>
              </div>
            </div>
            <div
              className={`border-[3px]  min-h-32 min-w-96 flex flex-col pl-3 pt-4 gap-3 cursor-pointer  text-sm hover:bg-slate-200`}
            >
              <div className="flex items-center gap-3">
                <FaUser />
                <span>Gönderme Adresi</span>
              </div>
              <div className="flex flex-col">
                <p className=" break-words mr-12 text-sm">
                  {data?.sendadress?.address}
                </p>
                <p className="break-words my-1 mr-2 text-sm">
                  <span>{data?.sendadress?.city}</span> /
                  <span>{data?.sendadress?.country}</span>
                  <span className="ml-2">{data?.sendadress?.zipCode}</span>
                </p>
              </div>
            </div>
            <div className="w-full h-12">
              <button className="yellow-btn text-black" onClick={DownPdf}>
                Fatura İndir
              </button>
            </div>
          </div>
        </div>
        <div className="w-full mb-6">
          <table className="items-center w-full bg-gray-100 border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  ID
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Ürün Adı
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Ürün Miktarı
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Fiyatı
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.basket?.map((data) => {
                return (
                  <tr key={data?.id}>
                    <th className="px-6 whitespace-nowrap p-4 text-left cursor-pointer text-blue-600 ">
                      #{data?.id}
                    </th>
                    <td className="px-6 whitespace-nowrap p-4 ">
                      {data?.name}
                    </td>
                    <td className="px-6 whitespace-nowrap p-4 ">
                      {data?.quantity}
                    </td>
                    <td className="px-6 whitespace-nowrap p-4 text-left">
                      {data?.price}₺
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="w-full grid grid-cols-2 gap-12 mb-12">
          <div className="w-full h-12">
            <label htmlFor="Durumu" className="capitalize block text-[16px]">
              Durumu*
            </label>
            <select
              name="status"
              id="siparis_status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="text-sm px-6 text-gray-900 w-full h-full bg-white border-2 border-black"
            >
              <option value="SUCCESS">Ödendi</option>
              <option value="SEND">Gönderildi</option>
              <option value="ERROR">Hata var</option>
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="Durumu" className="capitalize block text-[16px]">
              Hata Mesajı*
            </label>
            <input
              type="text"
              id="error"
              className="w-full h-12 bg-slate-200 px-4 text-lg text-gray-900 border-2 border-black"
              placeholder="Ürün Açıklaması"
              value={message === "null" ? "Yok" : message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="mb-8 w-40 h-12">
            <button className="yellow-btn text-black" onClick={onSumbit}>
              Güncelle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailClient;
