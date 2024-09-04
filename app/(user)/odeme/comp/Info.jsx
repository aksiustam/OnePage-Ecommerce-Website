"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "react-phone-number-input/style.css";
import dynamic from "next/dynamic";

// PhoneInput bileşenini dinamik olarak yükle
const PhoneInput = dynamic(() => import("react-phone-number-input"), {
  ssr: false,
});

import { FaPlus } from "react-icons/fa";
import { TiTimes } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import UseCart from "@/hooks/useCart";
import InputCom from "@/app/(user)/components/Helpers/InputCom";
import setUserAdress from "@/app/actions/User/setUserAdress";
const Info = (props) => {
  const { setUserInfo, setSteps, user } = props;

  const { basket } = UseCart();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      surname: user?.lastname || "",
      email: user?.email || "",
      identityNumber: user?.identityNumber || "",
    },
  });
  const [tel, setTel] = useState(user?.tel || null);

  const [valueadress, setValueAdress] = useState({
    id: "",
    adressname: "",
    address: "",
    country: "Türkiye",
    city: "Adana",
    zipCode: "",
  });
  const [sendadress, setSendAdress] = useState({
    id: "",
    adressname: "",
    address: "",
    country: "Türkiye",
    city: "Adana",
    zipCode: "",
  });
  const [billadress, setBillAdress] = useState({
    id: "",
    adressname: "",
    address: "",
    country: "Türkiye",
    city: "Adana",
    zipCode: "",
  });

  useEffect(() => {
    if (user !== null && user?.Address?.length > 0) {
      const adress = user.Address[0];
      delete adress.userId;

      setSendAdress({ ...adress });
      setBillAdress({ ...adress });
    }
  }, [user]);

  const [modalerror, setModalError] = useState({ name: "", msg: "" });
  const [formerror, setFormError] = useState({ name: "", msg: "" });

  const [adressmodal, setAdressModal] = useState({ check: false, bill: false });
  const [modalmsg, setModalMsg] = useState({ msg: "", btncheck: false });
  const [checkbill, setCheckBill] = useState(true);

  const onSubmit = async (data) => {
    if (tel === "+90") {
      setFormError({ name: "tel", msg: "Telefon Numarası Giriniz" });
      return;
    }
    data.tel = tel;
    if (sendadress.adressname === "" || sendadress.address === "") {
      setFormError({
        name: "address",
        msg: "Teslimat Adresini Giriniz",
      });
      return;
    }
    if (billadress.adressname === "" || billadress.address === "") {
      setFormError({
        name: "address",
        msg: "Fatura Adresini Giriniz",
      });
      return;
    }

    const formData = {
      data: { ...data },
      bill: { ...billadress },
      send: { ...sendadress },
    };

    if (basket.length > 0) {
      setUserInfo(formData);
      setSteps(1);
    } else {
      await Swal.fire({
        icon: "error",
        title: "Sepetiniz Boş",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const updateAdressModal = async () => {
    setModalError({ name: "", msg: "" });
    if (valueadress.adressname.length < 2) {
      setModalError({
        name: "adressname",
        msg: "Adres Adı Giriniz",
      });
      return;
    }
    if (valueadress.address.length < 10) {
      setModalError({
        name: "address",
        msg: "Uygun Bir Adres Girin",
      });
      return;
    }

    if (valueadress.zipCode.length < 5) {
      setModalError({
        name: "zipCode",
        msg: "Uygun Bir Posta Kodu Giriniz",
      });
      return;
    }

    if (user) {
      let formData = { userid: user.id, ...valueadress };

      const res = await setUserAdress(formData);
      if (res === true) {
        setModalMsg({
          msg: "Bilgileriniz başarıyla eklenmiştir.",
          btncheck: true,
        });
        setTimeout(() => {
          window.location.reload();
          setAdressModal({ check: false, bill: false });
          setModalMsg({
            msg: "",
            btncheck: false,
          });
        }, 2000);
      }
    } else {
      if (checkbill) {
        setSendAdress({ ...valueadress });
        setBillAdress({ ...valueadress });
      } else {
        adressmodal.bill === false
          ? setSendAdress({ ...valueadress })
          : setBillAdress({ ...valueadress });
      }
      setModalMsg({
        msg: "Bilgileriniz başarıyla eklenmiştir.",
        btncheck: true,
      });
      setTimeout(() => {
        setAdressModal({ check: false, bill: false });
        setModalMsg({
          msg: "",
          btncheck: false,
        });
      }, 2000);
    }
    setValueAdress({
      id: "",
      adressname: "",
      address: "",
      country: "Türkiye",
      city: "Adana",
      zipCode: "",
    });
  };

  return (
    <>
      <div className="form-area">
        <form onSubmit={handleSubmit(onSubmit)}>
          {adressmodal.check ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative my-6 mx-auto max-w-xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
                    <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                      <h3 className="text-xl font-semibold">
                        Adres Ekle/Değiştir
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => {
                          setValueAdress({
                            id: "",
                            adressname: "",
                            address: "",
                            country: "Türkiye",
                            city: "Adana",
                            zipCode: "",
                          });
                          setAdressModal({ check: false, bill: false });
                        }}
                      >
                        <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                          <TiTimes size={32} />
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <div className="flex flex-col flex-wrap">
                        <div className="mb-6 flex gap-3">
                          <InputCom
                            label="Adres Adı*"
                            name="adressname"
                            type="text"
                            inputClasses="!h-[50px]"
                            myerror={
                              modalerror.name === "adressname"
                                ? modalerror.msg
                                : ""
                            }
                            value={valueadress.adressname}
                            onChange={(e) => {
                              setValueAdress((prev) => ({
                                ...prev,
                                adressname: e.target.value,
                              }));
                            }}
                            required
                          />
                          <InputCom
                            label="Ülke*"
                            name="ulke"
                            type="text"
                            inputClasses="!h-[50px]"
                            value={"Türkiye"}
                            disable
                            required
                          />
                        </div>

                        <div className="mb-6">
                          <label
                            htmlFor="Kategori"
                            className="capitalize block text-qgray text-[13px] font-normal"
                          >
                            Şehir*
                            <span className="text-red-600">
                              {modalerror.name === "city" ? modalerror.msg : ""}
                            </span>
                          </label>
                          <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative">
                            <select
                              name="city"
                              id="category"
                              className="!h-[50px] input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none"
                              required
                              value={valueadress.city}
                              onChange={(e) =>
                                setValueAdress((prev) => ({
                                  ...prev,
                                  city: e.target.value,
                                }))
                              }
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
                              <option value="Kahramanmaraş">
                                Kahramanmaraş
                              </option>
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
                            <span className="text-red-600">
                              {modalerror.name === "address"
                                ? modalerror.msg
                                : ""}
                            </span>
                          </h6>
                          <textarea
                            placeholder="Adres..."
                            name="address"
                            className="w-full h-[105px] text-sm focus:ring-0 focus:outline-none p-3 border border-qgray-border placeholder:text-sm"
                            value={valueadress.address}
                            required
                            maxLength={120}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              if (/^[^<>]*$/.test(inputValue)) {
                                setValueAdress((prev) => ({
                                  ...prev,
                                  address: inputValue,
                                }));
                              }
                            }}
                          ></textarea>
                        </div>

                        <div className="mb-6 flex gap-3">
                          <InputCom
                            label="Posta Kodu*"
                            name="zipCode"
                            type="text"
                            inputClasses="!h-[50px]"
                            myerror={
                              modalerror.name === "zipCode"
                                ? modalerror.msg
                                : ""
                            }
                            value={valueadress.zipCode}
                            maxLength={7}
                            required
                            onChange={(e) => {
                              const enteredValue = e.target.value;
                              // Girilen değer sadece rakamlardan oluşuyor mu ve 6 haneli mi kontrol ediyoruz
                              if (/^\d{0,7}$/.test(enteredValue)) {
                                // Girilen değeri state'e atıyoruz
                                setValueAdress((prev) => ({
                                  ...prev,
                                  zipCode: enteredValue,
                                }));
                              }
                            }}
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
                          setValueAdress({
                            id: "",
                            adressname: "",
                            address: "",
                            country: "Türkiye",
                            city: "Adana",
                            zipCode: "",
                          });
                          setAdressModal({ check: false, bill: false });
                        }}
                      >
                        Kapat
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={() => {
                          updateAdressModal();
                        }}
                        type="button"
                        disabled={modalmsg.btncheck}
                      >
                        Kaydet
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
          <div className="sm:flex sm:space-x-5 items-center mb-6">
            <div className="sm:w-1/2  mb-5 sm:mb-0">
              <InputCom
                label="Ad*"
                placeholder="Adınız"
                name="name"
                inputClasses="w-full !h-[50px]"
                errors={errors}
                required="Bir Ad Giriniz"
                register={register}
              />
            </div>
            <div className="flex-1">
              <InputCom
                label="Soyad*"
                placeholder="Soyadınız"
                name="surname"
                required="Bir Soyadı Giriniz"
                inputClasses="w-full !h-[50px]"
                errors={errors}
                register={register}
              />
            </div>
          </div>
          <div className="sm:flex sm:space-x-5 items-center mb-6">
            <div className="w-1/2">
              <InputCom
                label="Email Adresi*"
                placeholder="deneme@gmail.com"
                name="email"
                required="Bir Email Giriniz"
                inputClasses="w-full !h-[50px]"
                errors={errors}
                register={register}
              />
            </div>
            <div className="flex-1">
              <div className="input-com w-full h-full">
                <label
                  className={`text-qgray text-[13px] font-normal input-label capitalize block mb-2 `}
                >
                  Telefon*
                  <span className="text-red-600">
                    {formerror?.name === "tel" ? formerror?.msg : ""}
                  </span>
                </label>

                <div className="input-wrapper border border-qgray-border w-full h-fit overflow-hidden relative">
                  <PhoneInput
                    id="phone"
                    international="false"
                    countries={["TR"]}
                    defaultCountry="TR"
                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none !h-[50px]"
                    value={tel}
                    maxLength={18}
                    onChange={setTel}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <InputCom
              label="TC Kimlik No*"
              name="identityNumber"
              type="text"
              inputClasses="w-full !h-[50px]"
              errors={errors}
              register={register}
              required="TC Kimlik No Giriniz"
              maxLength={11}
              pattern={{
                value: /^\d{11}$/,
                message: "Sadece 11 Rakam Giriniz",
              }}
            />
          </div>
          <div className="mb-6 flex">
            <div className="mb-2 font-bold">Adres</div>
            <div className="flex w-full justify-between mr-3 items-center mb-4">
              <span className="text-red-600">
                {formerror.name === "address" ? formerror.msg : ""}
              </span>
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  name="checkbox2"
                  className="w-3 h-3"
                  checked={checkbill}
                  onChange={(e) => {
                    if (e.target.checked === true) {
                      setBillAdress({ ...sendadress });
                    }
                    setCheckBill(e.target.checked);
                  }}
                />
                <span className="font-semibold text-sm ml-2 text-blue-700">
                  Faturayı aynı adrese gönderin
                </span>
              </div>
            </div>
          </div>
          <div className="mb-6">
            {checkbill === true && (
              <>
                <div className="bg-slate-100 pb-4 px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    <div className="py-4 font-semibold md:col-span-2">
                      Teslimat Adresi
                    </div>
                    {user && user !== null && user?.Address?.length < 4 && (
                      <div
                        className="border-[3px] h-32 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-slate-300"
                        onClick={() =>
                          setAdressModal({ check: true, bill: false })
                        }
                      >
                        <FaPlus size={26} />
                        <span className="font-semibold text-center">
                          Teslimat Adresi <br /> Ekleyin
                        </span>
                      </div>
                    )}
                    {user === null && (
                      <div
                        className="border-[3px] h-32 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-slate-300"
                        onClick={() =>
                          setAdressModal({ check: true, bill: false })
                        }
                      >
                        <FaPlus size={26} />
                        <span className="font-semibold text-center">
                          Teslimat Adresi <br /> Ekleyin/Değiştirin
                        </span>
                      </div>
                    )}

                    {user === null && sendadress?.adressname !== "" && (
                      <div className="border-[3px] border-black min-h-32 flex flex-col pl-3 pt-4 gap-3 cursor-pointer bg-slate-200 text-sm">
                        <div className="flex items-center gap-3">
                          <FaUser />
                          <span>{sendadress?.adressname}</span>
                        </div>

                        <div className="flex flex-col">
                          <p className="break-words mr-12 text-sm">
                            {sendadress?.address}
                          </p>

                          <p className="break-words my-1 mr-2 text-sm">
                            <span>{sendadress?.city}</span> /
                            <span>{sendadress?.country}</span>
                            <span className="ml-2">{sendadress?.zipCode}</span>
                          </p>
                        </div>
                      </div>
                    )}

                    {user &&
                      user !== null &&
                      user.Address?.length > 0 &&
                      user.Address?.map((item) => {
                        return (
                          <div className="mb-3" key={item?.id}>
                            <div
                              className={`border-[3px] min-h-32 flex flex-col pl-3 pt-4 gap-3 cursor-pointer text-sm ${
                                sendadress?.id === item?.id
                                  ? "border-black bg-slate-200"
                                  : ""
                              }`}
                              onClick={() => {
                                setSendAdress(item);
                                setBillAdress(item);
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <FaUser />
                                <span>{item?.adressname}</span>
                              </div>
                              <div className="flex flex-col">
                                <p className="break-words mr-12 text-sm">
                                  {item?.address}
                                </p>
                                <p className="break-words my-1 mr-2 text-sm">
                                  <span>{item?.city}</span> /
                                  <span>{item?.country}</span>
                                  <span className="ml-2">{item?.zipCode}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </>
            )}

            {checkbill === false && (
              <>
                <div className=" bg-slate-100 py-4 px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    <div className="font-semibold pb-4">Teslimat Adresi</div>
                    <div className="font-semibold pb-4 hidden md:block ">
                      Fatura Adresi
                    </div>
                    <div className="w-full border-b-[2.5px] border-blue-600 mb-2 md:mb-0 md:border-b-0    ">
                      <div className="flex flex-col gap-2">
                        {user && user !== null && user?.Address?.length < 4 && (
                          <div
                            className="border-[3px] h-32 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-slate-300"
                            onClick={() =>
                              setAdressModal({ check: true, bill: false })
                            }
                          >
                            <FaPlus size={26} />
                            <span className="font-bold">
                              Yeni Bir Adres Ekleyin
                            </span>
                          </div>
                        )}
                        {!user && user === null && (
                          <div
                            className="border-[3px] h-32 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-slate-300"
                            onClick={() =>
                              setAdressModal({ check: true, bill: false })
                            }
                          >
                            <FaPlus size={26} />
                            <span className="font-semibold text-center">
                              Teslimat Adresi <br /> Ekleyin/Değiştirin
                            </span>
                          </div>
                        )}

                        {user === null && sendadress?.adressname !== "" && (
                          <div className="border-[3px] border-black min-h-32 flex flex-col pl-3 pt-4 gap-3 cursor-pointer bg-slate-200 text-sm">
                            <div className="flex items-center gap-3">
                              <FaUser />
                              <span>{sendadress?.adressname}</span>
                            </div>

                            <div className="flex flex-col">
                              <p className=" break-words mr-12 text-sm">
                                {sendadress?.address}
                              </p>

                              <p className=" break-words my-1 mr-2 text-sm">
                                <span>{sendadress?.city}</span> /
                                <span>{sendadress?.country}</span>
                                <span className="ml-2">
                                  {sendadress?.zipCode}
                                </span>
                              </p>
                            </div>
                          </div>
                        )}

                        {user &&
                          user !== null &&
                          user?.Address?.length > 0 &&
                          user?.Address?.map((item) => {
                            return (
                              <div className="w-full mb-2" key={item?.id}>
                                <div
                                  className={`border-[3px]  min-h-32 flex flex-col pl-3 pt-4 gap-3 cursor-pointer  text-sm ${
                                    sendadress.id === item?.id
                                      ? "border-black bg-slate-200"
                                      : ""
                                  }`}
                                  onClick={() => setSendAdress(item)}
                                >
                                  <div className="flex items-center gap-3">
                                    <FaUser />
                                    <span>{item?.adressname}</span>
                                  </div>

                                  <div className="flex flex-col">
                                    <p className="break-words mr-12 text-sm">
                                      {item?.address}
                                    </p>

                                    <p className="break-words my-1 mr-2 text-sm">
                                      <span>{item?.city}</span> /
                                      <span>{item?.country}</span>
                                      <span className="ml-2">
                                        {item?.zipCode}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="block md:hidden font-bold pb-4">
                        <div className="w-full">Fatura Adresi</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {user && user !== null && user?.Address?.length < 4 && (
                          <div
                            className="border-[3px] h-32 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-slate-300"
                            onClick={() =>
                              setAdressModal({ check: true, bill: false })
                            }
                          >
                            <FaPlus size={26} />
                            <span className="font-bold">
                              Yeni Bir Adres Ekleyin
                            </span>
                          </div>
                        )}
                        {user === null && (
                          <div
                            className="border-[3px] h-32 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-slate-300"
                            onClick={() =>
                              setAdressModal({ check: true, bill: true })
                            }
                          >
                            <FaPlus size={26} />
                            <span className="font-bold text-center">
                              Fatura Adresi <br /> Ekleyin/Değiştirin
                            </span>
                          </div>
                        )}

                        {user === null && billadress?.adressname !== "" && (
                          <div className="border-[3px] min-h-32 flex flex-col pl-3 pt-4 gap-3 border-blue-600 cursor-pointer bg-slate-300 text-sm">
                            <div className="flex items-center gap-3">
                              <FaUser />
                              <span>{billadress?.adressname}</span>
                            </div>

                            <div className="flex flex-col">
                              <p className="break-words mr-12 text-sm">
                                {billadress?.address}
                              </p>
                              <p className="break-words my-1 mr-2 text-sm">
                                <span>{billadress?.city}</span> /
                                <span>{billadress?.country}</span>
                                <span className="ml-2">
                                  {billadress?.zipCode}
                                </span>
                              </p>
                            </div>
                          </div>
                        )}

                        {user !== null &&
                          user?.Address?.length > 0 &&
                          user?.Address?.map((item) => {
                            return (
                              <div className="w-full mb-2" key={item?.id}>
                                <div
                                  className={`border-[3px] min-h-32 flex flex-col pl-3 pt-4 gap-3 cursor-pointer text-sm ${
                                    billadress?.id === item?.id
                                      ? "border-blue-700 bg-slate-200"
                                      : ""
                                  }`}
                                  onClick={() => setBillAdress(item)}
                                >
                                  <div className="flex items-center gap-3">
                                    <FaUser />
                                    <span>{item?.adressname}</span>
                                  </div>

                                  <div className="flex flex-col">
                                    <p className="break-words mr-12 text-sm">
                                      {item?.address}
                                    </p>

                                    <p className="break-words my-1 mr-2 text-sm">
                                      <span>{item?.city}</span> /
                                      <span>{item?.country}</span>
                                      <span className="ml-2">
                                        {item?.zipCode}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="mb-6">
            <div className=" text-qgray capitalize text-[13px] font-normal block">
              Not*
            </div>
            <textarea
              placeholder="Mesaj..."
              name="not"
              className="w-full h-[105px] text-sm focus:ring-0 focus:outline-none p-3 border border-qgray-border placeholder:text-sm"
              maxLength={80}
              {...register("not")}
            ></textarea>
          </div>
          <div className="mb-6 flex justify-end">
            <div className="flex justify-center">
              <button
                type="sumbit"
                className="black-btn mb-6 text-sm text-white w-40 h-[50px] font-semibold flex justify-center items-center"
              >
                <span>Devam Et</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Info;
