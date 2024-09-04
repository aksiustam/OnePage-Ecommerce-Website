"use client";

import Link from "next/link";
import Thumbnail from "./Thumbnail";
import Swal from "sweetalert2";
import InputCom from "../../components/Helpers/InputCom";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import setRegister from "../../../actions/Auth/setRegister";
import verifyCode from "../../../actions/Auth/verifyCode";
import resendCode from "../../../actions/Auth/resendCode";
import { signIn } from "next-auth/react";
import "react-phone-number-input/style.css";
import dynamic from "next/dynamic";

// PhoneInput bileşenini dinamik olarak yükle
const PhoneInput = dynamic(() => import("react-phone-number-input"), {
  ssr: false,
});
import PageTitle from "../../components/Helpers/PageTitle";
const RegisterClient = () => {
  const [error, setError] = useState("");
  const [verify, setVerify] = useState(false);
  const [formData, setFormData] = useState(null);
  const [code, setCode] = useState("");
  const [formerror, setFormError] = useState("");
  const [clicked, setClicked] = useState(false);
  const [tel, setTel] = useState(null);
  const [abone, setAbone] = useState(false);
  const [kvkcheck, setKvkCheck] = useState(false);
  const [telerror, setTelError] = useState(null);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (tel === null) {
        setTelError("Telefon Numarası Giriniz");
        return;
      }
      if (kvkcheck === false) {
        setError("Üyelik sözleşmemizi kabul edin!");
        return;
      }
      const mydata = { ...data, tel: tel, checked: abone };
      const res = await setRegister(mydata);
      if (res === true) {
        setFormData(mydata);
        setCode("");
        setFormError("");
        setVerify(true);
      } else {
        setError(res.message);
      }
    } catch (error) {
      setError(error);
    }
  };
  const VerifyCode = async () => {
    if (code === 0) {
      setFormError("Kod Giriniz");
    } else {
      try {
        const mydata = { email: formData.email, code: code };
        const res = await verifyCode(mydata);
        if (res === true) {
          signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
          }).then(async (callback) => {
            if (callback?.ok) {
              setFormError("Giriş Başarılı");
              setVerify(false);
              await Swal.fire({
                icon: "success",
                title: "Hoşgeldiniz",
                showConfirmButton: false,
                timer: 1500,
              });
              router.push("/");
              router.refresh();
            }

            if (callback?.error) {
              await Swal.fire({
                icon: "error",
                title: callback.error,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        } else {
          setFormError(res.message);
        }
      } catch (error) {
        setFormError(JSON.stringify(error));
      }
    }
  };
  const resendMail = async () => {
    if (!clicked) {
      setClicked(true);
      localStorage.setItem("lastClickedTime", Date.now().toString());

      const data = { email: formData.email };
      const res = await resendCode(data);
      if (res === true) {
        setVerify(true);
        setFormError("Kod Yeniden Gönderildi. Kontrol Ediniz!");
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
                            className="text-blue-500 cursor-pointer"
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
      <div className="login-page-wrapper w-full pb-10">
        <div className="title-area w-full">
          <PageTitle
            title="Kayıt Ol"
            breadcrumb={[
              { name: "Anasayfa", path: "/" },
              { name: "Kayıt Ol", path: "/register" },
            ]}
          />
        </div>
        <div className="container-x mx-auto pt-20">
          <div className="lg:flex items-center relative">
            <div className="lg:w-[572px] w-full lg:h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              <div className="w-full">
                <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                  <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                    Kayıt Ol
                  </h1>
                  <div className="shape -mt-6">
                    <svg
                      width="354"
                      height="30"
                      viewBox="0 0 354 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                        stroke="#FFBB38"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-red-600 text-left mt-1 mb-3">
                  {error && error}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 space-y-5 sm:space-y-0 sm:gap-3 mb-5">
                    <InputCom
                      placeholder="Adınız"
                      label="Adınız*"
                      name="name"
                      type="text"
                      inputClasses="!h-[50px]"
                      errors={errors}
                      register={register}
                      required="Adınızı Giriniz"
                    />

                    <InputCom
                      placeholder="Soyadı"
                      label="Soyadı*"
                      name="lastname"
                      type="text"
                      inputClasses="!h-[50px]"
                      errors={errors}
                      register={register}
                      required="Soyadınızı Giriniz"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 space-y-5 sm:space-y-0 sm:gap-3 mb-5">
                    <div className="w-full h-full">
                      <InputCom
                        placeholder="deneme@gmail.com"
                        label="Email*"
                        name="email"
                        type="email"
                        inputClasses="!h-[50px]"
                        errors={errors}
                        register={register}
                        required="E-mail Giriniz"
                        pattern={{
                          value:
                            /^[A-Z0-9._%+-]{3,}@(hotmail|gmail|yahoo|outlook|aol|icloud|zoho|protonmail|gmx|yandex|mail|tutanota|fastmail|hushmail|lycos|rackspace|zimbra|squirrelmail|roundcube|163|qq)\.(com|net|org|edu)$/i,
                          message: "Doğru Email Giriniz",
                        }}
                      />
                    </div>
                    <div className="input-com w-full h-full">
                      <label
                        className={`text-qgray text-[13px] font-normal input-label capitalize block mb-2 `}
                      >
                        Telefon*
                        <span className="text-red-600">
                          {telerror !== null && telerror}
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
                  <div className="grid grid-cols-1 space-y-5 sm:space-y-0 sm:gap-3 mb-5">
                    <InputCom
                      placeholder="* * * * * "
                      label="Şifre*"
                      name="password"
                      type="password"
                      inputClasses="!h-[50px]"
                      errors={errors}
                      register={register}
                      required="Şifre Giriniz"
                      minLength="6"
                      pattern={{
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                        message:
                          "Şifreniz 1 büyük 1 küçük harf ve sayıdan oluşmalıdır",
                      }}
                    />
                  </div>
                  <div className="forgot-password-area mb-7">
                    <div className="remember-checkbox flex items-center space-x-2.5">
                      <button
                        onClick={() => setAbone((prev) => !prev)}
                        type="button"
                        className="w-5 h-5 text-qblack flex justify-center items-center border border-light-gray"
                      >
                        {abone && (
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
                      <span
                        onClick={() => setAbone((prev) => !prev)}
                        className="text-base text-black"
                      >
                        <span className="text-qblack">
                          Haberlere Abone Ol ?
                        </span>
                      </span>
                    </div>
                    <div className="remember-checkbox flex items-center space-x-2.5">
                      <button
                        onClick={() => setKvkCheck((prev) => !prev)}
                        type="button"
                        className="w-5 h-5 text-qblack flex justify-center items-center border border-light-gray"
                      >
                        {kvkcheck && (
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
                      <span
                        onClick={() => setKvkCheck((prev) => !prev)}
                        className="text-base text-black"
                      >
                        <span className="text-blue-600">
                          <Link href={"/kurumsal/gizlilik-cerez-politikasi"}>
                            Üyelik sözleşmesini
                          </Link>
                        </span>{" "}
                        okudum, kabul ediyorum.
                      </span>
                    </div>
                  </div>
                  <div className="signin-area mb-3">
                    <div className="flex justify-center">
                      <button
                        type="sumbit"
                        className="black-btn text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
                      >
                        <span>Kayıt Ol</span>
                      </button>
                    </div>
                  </div>

                  <div className="signup-area flex justify-center">
                    <p className="text-base text-qgraytwo font-normal">
                      Zaten Kayıtlı Mısınız?
                      <Link href="/login" className="ml-2 text-qblack">
                        Giriş Yap
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center">
              <div
                className="absolute xl:-right-20 -right-[138px]"
                style={{ top: "calc(50% - 258px)" }}
              >
                <Thumbnail />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterClient;
