"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TiTimes } from "react-icons/ti";
import putUserAdress from "@/app/actions/User/putUserAdress";
import InputCom from "@/app/(user)/components/Helpers/InputCom";
const AdressClient = (props) => {
  const { user } = props;
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const [adressmodal, setAdressModal] = useState(false);
  const [modalmsg, setModalMsg] = useState({ msg: "", btncheck: false });

  const openModal = (data) => {
    reset({
      adressname: data?.adressname || "",
      address: data?.address || "",
      city: data?.city || "",
      country: data?.country || "",
      zipCode: data?.zipCode || "",
      id: data?.id || "",
    });
    setAdressModal(true);
  };

  const onSubmit = async (data) => {
    await putUserAdress(data);

    setModalMsg({
      msg: "Bilgileriniz Başarıyla Değiştirildi.",
      btncheck: true,
    });
    setTimeout(() => {
      location.reload();
      setAdressModal(false);
      setModalMsg({
        msg: "",
        btncheck: false,
      });
    }, 1200);
  };

  return (
    <>
      {adressmodal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto max-w-xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                  <h3 className="text-xl font-semibold">Adres Değiştir</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setAdressModal(false);
                    }}
                  >
                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <TiTimes size={32} />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form id="adress_form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative p-6 flex-auto">
                    <input type="text" name="id" {...register("id")} hidden />
                    <div className="flex flex-col flex-wrap">
                      <div className="mb-6 flex gap-3">
                        <InputCom
                          label="Adres Adı*"
                          name="adressname"
                          type="text"
                          inputClasses="!h-[50px]"
                          errors={errors}
                          required="Adress Adı giriniz"
                          register={register}
                        />
                        <InputCom
                          label="Ülke*"
                          name="country"
                          type="text"
                          inputClasses="!h-[50px]"
                          value={"Türkiye"}
                          disable
                        />
                      </div>

                      <div className="mb-6">
                        <label
                          htmlFor="Kategori"
                          className="capitalize block text-qgray text-[13px] font-normal"
                        >
                          Şehir*
                        </label>
                        <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative">
                          <select
                            name="city"
                            id="category"
                            className="!h-[50px] input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none"
                            required
                            {...register("city")}
                          >
                            <option value="Adana">Adana</option>
                            <option value="Adıyaman">Adıyaman</option>
                            <option value="Afyonkarahisar">
                              Afyonkarahisar
                            </option>
                            <option value="Ağrı">Ağrı</option>
                            <option value="Amasya">Amasya</option>
                            <option value="Ankara">Ankara</option>
                            <option value="Antalya">Antalya</option>
                            <option value="Artvin">Artvin</option>
                            <option value="Aydın">Aydın</option>
                            <option value="Balıkesir">Balıkesir</option>
                            <option value="Bilecik">Bilecik</option>
                            <option value="Bingöl">Bingöl</option>
                            <option value="Bitlis">Bitlis</option>
                            <option value="Bolu">Bolu</option>
                            <option value="Burdur">Burdur</option>
                            <option value="Bursa">Bursa</option>
                            <option value="Çanakkale">Çanakkale</option>
                            <option value="Çankırı">Çankırı</option>
                            <option value="Çorum">Çorum</option>
                            <option value="Denizli">Denizli</option>
                            <option value="Diyarbakır">Diyarbakır</option>
                            <option value="Edirne">Edirne</option>
                            <option value="Elazığ">Elazığ</option>
                            <option value="Erzincan">Erzincan</option>
                            <option value="Erzurum">Erzurum</option>
                            <option value="Eskişehir">Eskişehir</option>
                            <option value="Gaziantep">Gaziantep</option>
                            <option value="Giresun">Giresun</option>
                            <option value="Gümüşhane">Gümüşhane</option>
                            <option value="Hakkari">Hakkari</option>
                            <option value="Hatay">Hatay</option>
                            <option value="Isparta">Isparta</option>
                            <option value="Mersin">Mersin</option>
                            <option value="İstanbul">İstanbul</option>
                            <option value="İzmir">İzmir</option>
                            <option value="Kars">Kars</option>
                            <option value="Kastamonu">Kastamonu</option>
                            <option value="Kayseri">Kayseri</option>
                            <option value="Kırklareli">Kırklareli</option>
                            <option value="Kırşehir">Kırşehir</option>
                            <option value="Kocaeli">Kocaeli</option>
                            <option value="Konya">Konya</option>
                            <option value="Kütahya">Kütahya</option>
                            <option value="Malatya">Malatya</option>
                            <option value="Manisa">Manisa</option>
                            <option value="Kahramanmaraş">Kahramanmaraş</option>
                            <option value="Mardin">Mardin</option>
                            <option value="Muğla">Muğla</option>
                            <option value="Muş">Muş</option>
                            <option value="Nevşehir">Nevşehir</option>
                            <option value="Niğde">Niğde</option>
                            <option value="Ordu">Ordu</option>
                            <option value="Rize">Rize</option>
                            <option value="Sakarya">Sakarya</option>
                            <option value="Samsun">Samsun</option>
                            <option value="Siirt">Siirt</option>
                            <option value="Sinop">Sinop</option>
                            <option value="Sivas">Sivas</option>
                            <option value="Tekirdağ">Tekirdağ</option>
                            <option value="Tokat">Tokat</option>
                            <option value="Trabzon">Trabzon</option>
                            <option value="Tunceli">Tunceli</option>
                            <option value="Şanlıurfa">Şanlıurfa</option>
                            <option value="Uşak">Uşak</option>
                            <option value="Van">Van</option>
                            <option value="Yozgat">Yozgat</option>
                            <option value="Zonguldak">Zonguldak</option>
                            <option value="Aksaray">Aksaray</option>
                            <option value="Bayburt">Bayburt</option>
                            <option value="Karaman">Karaman</option>
                            <option value="Kırıkkale">Kırıkkale</option>
                            <option value="Batman">Batman</option>
                            <option value="Şırnak">Şırnak</option>
                            <option value="Bartın">Bartın</option>
                            <option value="Ardahan">Ardahan</option>
                            <option value="Iğdır">Iğdır</option>
                            <option value="Yalova">Yalova</option>
                            <option value="Karabük">Karabük</option>
                            <option value="Kilis">Kilis</option>
                            <option value="Osmaniye">Osmaniye</option>
                            <option value="Düzce">Düzce</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-6">
                        <h6 className=" text-qgray capitalize text-[13px] font-normal block">
                          Adres*{" "}
                        </h6>
                        <textarea
                          placeholder="Adres..."
                          className="w-full h-[105px] text-sm focus:ring-0 focus:outline-none p-3 border border-qgray-border placeholder:text-sm"
                          required="Adres giriniz"
                          {...register("address")}
                          maxLength={120}
                        ></textarea>
                      </div>

                      <div className="mb-6 flex gap-3">
                        <InputCom
                          label="Posta Kodu*"
                          name="zipCode"
                          type="text"
                          inputClasses="!h-[50px]"
                          errors={errors}
                          required="Posta Kodu giriniz"
                          register={register}
                          pattern={{
                            value: /^\d{1,7}$/,
                            message: "En fazla 7 Rakam Giriniz",
                          }}
                          maxLength={7}
                        />
                      </div>
                      <div className="mb-6 flex gap-3">
                        <div className="text-red-600">{modalmsg.msg}</div>
                      </div>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setAdressModal(false);
                      }}
                    >
                      Kapat
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="sumbit"
                      disabled={modalmsg.btncheck}
                    >
                      Kaydet
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
        {user?.Address?.map((item, index) => (
          <div
            key={item?.id}
            className="w-full bg-primarygray p-5 border hover:bg-slate-200 cursor-pointer"
            onClick={() => openModal(item)}
          >
            <div className="flex justify-between items-center">
              <p className="title text-[22px] font-semibold">
                Adres #{index + 1}
              </p>
            </div>
            <div className="mt-5">
              <table>
                <tbody>
                  <tr className="flex mb-3">
                    <td className="text-base text-qgraytwo w-[110px] block text-nowrap">
                      <div>Adres Adı:</div>
                    </td>
                    <td className="text-base text-qblack line-clamp-1 font-medium">
                      {item?.adressname}
                    </td>
                  </tr>
                  <tr className="flex mb-3">
                    <td className="text-base text-qgraytwo w-[110px] block text-nowrap">
                      <div>Ülke:</div>
                    </td>
                    <td className="text-base text-qblack line-clamp-1 font-medium">
                      {item?.country}
                    </td>
                  </tr>
                  <tr className="flex mb-3">
                    <td className="text-base text-qgraytwo w-[110px] block text-nowrap">
                      <div>Şehir:</div>
                    </td>
                    <td className="text-base text-qblack line-clamp-1 font-medium">
                      {item?.city}
                    </td>
                  </tr>

                  <tr className="flex mb-3">
                    <td className="text-base text-qgraytwo w-[110px] block text-nowrap">
                      <div>Posta Kodu:</div>
                    </td>
                    <td className="text-base text-qblack line-clamp-1 font-medium">
                      {item?.zipCode}
                    </td>
                  </tr>
                  <tr className="flex mb-3">
                    <td className="text-base text-qgraytwo w-[110px] block text-nowrap">
                      <div>Adres:</div>
                    </td>
                    <td className="text-base text-qblack line-clamp-3 font-medium">
                      {item?.address}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdressClient;
