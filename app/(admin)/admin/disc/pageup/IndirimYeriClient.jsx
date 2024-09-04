"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import InputCom from "@/app/(user)/components/Helpers/InputCom";
import setDiscPage from "@/app/actions/Settings/setDiscPage";

const IndirimYeriClient = (props) => {
  const { settings } = props;
  const data = settings.discountpage;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      checkbox: data.checkbox,
      date: data.date,
      bannerAlt: data.bannerAlt,
      bannerUst: data.bannerUst,
      buttonUrl: data.buttonUrl,
      buttonName: data.buttonName,
    },
  });

  const [image, setImage] = useState(null);
  const router = useRouter();
  const onSubmit = async (data) => {
    let formData = { ...data, discres: null };
    if (image !== null) {
      formData = {
        ...formData,
        discres: { imageid: image.public_id, imageurl: image.secure_url },
      };
    }

    const res = await setDiscPage(formData);
    if (res === true) {
      await Swal.fire({
        icon: "success",
        title: "Başarıyla Değiştirildi",
        showConfirmButton: false,
        timer: 1500,
      });
      setImage(null);
    } else {
      Swal.fire({
        icon: "error",
        title: JSON.stringify(res.message),
      });
    }
    router.refresh();
  };

  return (
    <>
      <div className="text-xl shadow-lg px-2 py-4 mb-2 font-bold">
        İndirim Yeri Düzenle
      </div>
      <form
        className="flex flex-col w-full h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-wrap">
          <div className="w-full mb-4">
            <div className="text-red-600 underline mb-2">
              Resmi Yükledikten sonra Lütfen Kaydet e Basınız...
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -ml-2">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-12">
            <label className="mr-4">
              Arka Plan Resmi<span className="text-danger">*</span> (1920x900)
            </label>
            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={(result) => {
                setImage(result?.info);
              }}
              uploadPreset="mayplastik_set"
              options={{
                maxFiles: 1,
              }}
            >
              {({ open }) => {
                function handleOnClick() {
                  setImage(null);
                  open();
                }

                return (
                  <button
                    type="button"
                    className="blue-btn inline-flex space-x-2 items-center"
                    onClick={handleOnClick}
                  >
                    Resim Yükle
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-12">
            <InputCom
              label="Banner Üst*"
              name="bannerUst"
              type="text"
              inputClasses="!h-[50px]"
              errors={errors}
              register={register}
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-12">
            <InputCom
              label="Banner Alt*"
              name="bannerAlt"
              type="text"
              inputClasses="!h-[50px]"
              errors={errors}
              register={register}
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-12">
            <InputCom
              label="Button Adı*"
              name="buttonName"
              type="text"
              inputClasses="!h-[50px]"
              errors={errors}
              register={register}
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-12">
            <InputCom
              label="Button Url*"
              name="buttonUrl"
              type="text"
              inputClasses="!h-[50px]"
              errors={errors}
              register={register}
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 pb-2 flex items-center justify-center">
            <div className="w-full flex flex-col">
              <label htmlFor="indirim_etkin" className="text-xs text-nowrap">
                Anasayfa İndirimi Etkinleştir
                <span className="text-danger">*</span>
              </label>
              <select
                name="checkbox"
                id="indirim_etkin"
                {...register("checkbox")}
                className="!h-[50px] text-sm px-6"
              >
                <option value="false">Hayır</option>
                <option value="true">Evet</option>
              </select>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 pb-2 flex items-center justify-center">
            <div className="w-full flex flex-col">
              <label htmlFor="indirim_etkin" className="text-xs text-nowrap">
                İndirim Zamanı
                <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                id="product_available"
                className="!h-[50px] text-sm px-12"
                {...register("date")}
              />
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 flex items-center justify-center">
            <div className="w-[319px] h-10 cursor-pointer">
              <button
                type="submit"
                className="yellow-btn inline-flex space-x-2 items-center"
              >
                <span className="text-sm font-600 tracking-wide leading-7">
                  Kaydet
                </span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default IndirimYeriClient;
