"use client";
import { useEffect, useState } from "react";
import getSiparisMail from "../../../actions/User/getSiparisMail";
import InputCom from "@/app/(user)/components/Helpers/InputCom";
import PageTitle from "../../components/Helpers/PageTitle";
const SiparisTakipClient = () => {
  const [email, setEmail] = useState("");
  const [sipdata, setSipData] = useState([]);
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    const lastClickedTime = localStorage.getItem("lastClickedTime");
    if (lastClickedTime) {
      const elapsedTime = Date.now() - parseInt(lastClickedTime);
      if (elapsedTime < 100000) {
        // Eğer son tıklama 3 dakika içinde yapıldıysa
        setClicked(true);
        setTimeout(() => {
          setClicked(false); // 3 dakika sonra tekrar tıklamaya izin ver
        }, 100000 - elapsedTime);
      }
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clicked) {
      setClicked(true);
      localStorage.setItem("lastClickedTime", Date.now().toString());

      const res = await getSiparisMail(email);

      if (res.message) setError(res.message);
      else setSipData(res);

      setTimeout(() => {
        setClicked(false);
      }, 180000);
    } else {
      setError("3 Dakika bekleyiniz");
    }
  };

  return (
    <>
      <div className="page-title mb-10">
        <PageTitle
          title="Sipariş Takip"
          breadcrumb={[
            { name: "Anasayfa", path: "/" },
            { name: "Sipariş Takip", path: "/siparistakip" },
          ]}
        />
      </div>
      <section id="order-track" className="my-8">
        <div className="container">
          <div className="account_form  flex flex-col gap-4 justify-center items-center">
            <div className="default-form-box">
              <div className="text-sm font-bold text-red-600 text-center mb-6">
                {error && error}
              </div>
              <form onSubmit={handleSubmit} className="text-center">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-full">
                    <InputCom
                      placeholder="Email"
                      label="Email Adresinizi Giriniz*"
                      name="email"
                      type="email"
                      inputClasses="!h-[50px]"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="w-20 !h-[50px] mt-7">
                    <button
                      type="sumbit"
                      className="blue-btn inline-flex space-x-2 items-center"
                    >
                      Gönder
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {sipdata.length > 0 && (
              <div className="table_page">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
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
                        SiparişID
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                        }
                      >
                        Tarih
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                        }
                      >
                        Durum
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                        }
                      >
                        Ürünler
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                        }
                      >
                        Toplam
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sipdata?.map((data) => {
                      const createdAt = data.createdAt;
                      const date = new Date(createdAt);
                      const options = {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      };
                      const formattedDate = date.toLocaleDateString(
                        "tr-TR",
                        options
                      );

                      return (
                        <tr key={data?.id}>
                          <th className="px-6 whitespace-nowrap p-4 text-left ">
                            #{data?.id}
                          </th>
                          <td className="px-6 whitespace-nowrap p-4 text-left ">
                            #{data?.paymentId}
                          </td>
                          <td className="px-6 whitespace-nowrap p-4 ">
                            {formattedDate}
                          </td>
                          <td className="px-6 whitespace-nowrap p-4 text-left">
                            {data?.status === "SUCCESS" && (
                              <span className="text-sm rounded text-blue-500 bg-blue-100 p-2">
                                Beklemede
                              </span>
                            )}
                            {data?.status === "SEND" && (
                              <span className="text-sm rounded text-green-500 bg-green-100 p-2">
                                Gönderildi
                              </span>
                            )}
                            {data?.status === "ERROR" && (
                              <span className="text-sm rounded text-red-500 bg-red-100 p-2">
                                Hata Var{" "}
                                {item?.error !== "null" ? item?.error : ""}
                              </span>
                            )}
                          </td>
                          <td className="px-6 whitespace-nowrap p-4 text-left">
                            {data?.basket[0]?.name}
                          </td>
                          <td className="px-6 whitespace-nowrap p-4 text-left cursor-pointer">
                            {data?.amount}₺
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SiparisTakipClient;
