"use client";

import ProfilLayout from "./ProfilLayout";
import InputCom from "../components/Helpers/InputCom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import setUserData from "@/app/actions/User/setUserData";
import setUserEmail from "@/app/actions/User/setUserEmail";
import setUserCodeVerify from "@/app/actions/User/setUserCodeVerify";
import setUserResendCode from "@/app/actions/User/setUserResendCode";
import "react-phone-number-input/style.css";
import dynamic from "next/dynamic";

// PhoneInput bileşenini dinamik olarak yükle
const PhoneInput = dynamic(() => import("react-phone-number-input"), {
  ssr: false,
});

export default function ProfilClient({ user }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: user?.name,
      lastname: user?.lastname,
      email: user?.email,
      identityNumber: user?.identityNumber,
    },
  });
  const [tel, setTel] = useState(user?.tel || null);
  const [newscheck, setNewsCheck] = useState(user?.newscheck);
  const [formdata, setFormData] = useState(null);
  const [code, setCode] = useState("");
  const [formerror, setFormError] = useState("");
  const [clicked, setClicked] = useState(false);
  const [verify, setVerify] = useState(false);
  const router = useRouter();

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
  const onSubmit = async (data) => {
    if (user.email !== data.email) {
      const formData = {
        name: data.name,
        lastname: data.lastname,
        tel: tel,
        identityNumber: data.identityNumber,
        email: data.email,
        newscheck: newscheck,
      };
      setFormData(formData);

      await setUserEmail(user.id, formData);
      setVerify(true);
    } else {
      const formData = {
        name: data.name,
        lastname: data.lastname,
        newscheck: newscheck,
        tel: tel,
        identityNumber: data.identityNumber,
      };

      const res = await setUserData(user.id, formData);
      if (res === true)
        await Swal.fire(
          "Başarılı",
          "Bilgileriniz Başarıyla Güncellendi",
          "success"
        );

      router.refresh();
    }
  };
  const VerifyCode = async () => {
    if (code === 0) {
      setFormError("Kod Giriniz");
    } else {
      const formData = { email: formdata.email, code: code };
      const res = await setUserCodeVerify(user.id, formData);
      if (res === true) {
        setFormError("Başarılı");
        setVerify(false);
        await Swal.fire(
          "Başarılı",
          "Bilgileriniz Başarıyla Güncellendi. Yeniden Giriş Yapın!",
          "success"
        );
        router.push("/");
        router.refresh();
      } else {
        setFormError(res.message);
      }
    }
  };
  const resendMail = async () => {
    if (!clicked) {
      setClicked(true);
      localStorage.setItem("lastClickedTime", Date.now().toString());

      const formData = { email: formdata.email };
      const res = await setUserResendCode(user.id, formData);
      if (res === true) {
        setVerify(true);
        setFormError("Emailinize yeniden kod gönderildi.");
      }

      setTimeout(() => {
        setClicked(false); // 3 dakika sonra tekrar tıklamaya izin ver
      }, 120000);
    }
  };
  return (
    <>
      {verify ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto  max-w-lg">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                  <h3 className="text-xl font-semibold ">Onay Kodu</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setVerify(false)}
                  >
                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative py-6 px-12 flex-auto">
                  <div className="flex flex-wrap">
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-2">
                        <p>Mailinize gelen kodu giriniz...</p>
                        {!clicked && (
                          <span
                            className="text-blue-500 cursor-pointer text-center"
                            onClick={() => resendMail()}
                          >
                            Yeniden gönder!
                          </span>
                        )}
                      </div>
                      <div className="mb-2 text-red-600">
                        <p>{formerror}</p>
                      </div>
                      <div className="flex flex-1">
                        <InputCom
                          name="code"
                          type="text"
                          inputClasses="!text-xl !h-[50px]"
                          value={code}
                          onChange={(e) => {
                            const enteredValue = e.target.value;

                            if (/^\d{0,6}$/.test(enteredValue)) {
                              setCode(enteredValue);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setVerify(false)}
                  >
                    Kapat
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setVerify(false);
                      VerifyCode();
                    }}
                  >
                    Gönder
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <ProfilLayout>
        <form
          className="flex flex-col w-full h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col space-x-8">
            <div className="w-full flex flex-col sm:block mt-6 md:mt-0">
              <div className="input-item flex flex-col md:flex-row md:space-x-2.5 mb-0 md:mb-8">
                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                  <InputCom
                    label="Adınız*"
                    type="text"
                    inputClasses="!h-[50px]"
                    name="name"
                    errors={errors}
                    register={register}
                  />
                </div>
                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                  <InputCom
                    label="Soyadınız*"
                    type="text"
                    inputClasses="!h-[50px]"
                    name="lastname"
                    errors={errors}
                    register={register}
                  />
                </div>
              </div>
              <div className="input-item flex flex-col md:flex-row md:space-x-2.5 mb-0 md:mb-8">
                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                  <InputCom
                    label="Email*"
                    type="email"
                    inputClasses="!h-[50px]"
                    name="email"
                    errors={errors}
                    register={register}
                    pattern={{
                      value:
                        /^[A-Z0-9._%+-]{3,}@(hotmail|gmail|yahoo|outlook|aol|icloud|zoho|protonmail|gmx|yandex|mail|tutanota|fastmail|hushmail|lycos|rackspace|zimbra|squirrelmail|roundcube|163|qq)\.(com|net|org|edu)$/i,
                      message: "Doğru Email Giriniz",
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                  <div className="input-com w-full h-full">
                    <label
                      className={`text-qgray text-[13px] font-normal input-label capitalize block mb-2 `}
                    >
                      Telefon*
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
              <div className="input-item flex space-x-2.5 mb-0 md:mb-8">
                <div className="w-1/2 h-full">
                  <InputCom
                    label="TC Kimlik No*"
                    name="identityNumber"
                    type="text"
                    inputClasses="w-full !h-[50px]"
                    errors={errors}
                    register={register}
                    maxLength={11}
                    pattern={{
                      value: /^\d{11}$/,
                      message: "Sadece 11 Rakam Giriniz",
                    }}
                  />
                </div>
              </div>
              <div className="input-item flex space-x-2.5 mb-8">
                <div className="remember-checkbox flex items-center space-x-2.5">
                  <button
                    type="button"
                    onClick={() => setNewsCheck((prev) => !prev)}
                    className="w-5 h-5 text-qblack flex justify-center items-center border border-light-gray"
                  >
                    {newscheck && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  <span className="text-base text-black">
                    <span className="text-qblack">Haberlere Abone Ol ?</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="action-area flex space-x-4 items-center">
            <button
              type="sumbit"
              className="w-[164px] h-[50px] bg-qblack text-white text-sm"
            >
              Güncelle
            </button>
          </div>
        </form>
      </ProfilLayout>
    </>
  );
}
