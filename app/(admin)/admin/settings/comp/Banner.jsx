import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { useRouter } from "next/navigation";
import setBannerSettings from "@/app/actions/Settings/setBannerSettings";
import InputCom from "@/app/(user)/components/Helpers/InputCom";

const Banner = (props) => {
  const { settings } = props;
  const { handleSubmit } = useForm();
  const [image, setImage] = useState([]);
  const [url, setUrl] = useState(settings?.banner?.url);

  const router = useRouter();
  const onSubmit = async () => {
    const data = image.map((item) => {
      return { imageid: item.public_id, imageurl: item.secure_url };
    });
    let formData = {
      images: image.length > 0 ? data : null,
      url: url,
    };
    console.log(formData);
    const res = await setBannerSettings(formData);
    if (res === true) {
      await Swal.fire({
        icon: "success",
        title: "Başarıyla Kaydedildi",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: res.message,
      });
    }
    // router.refresh();
  };
  return (
    <form className=" mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col w-full h-full -ml-2">
        <div className="w-full">
          <div className="text-red-600 underline mb-2">
            Resimleri Yükledikten sonra Lütfen Kaydet e Basınız...{" "}
          </div>
        </div>
        <div className="flex flex-wrap -ml-2 py-4 px-4 bg-white shadow-xl">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-12 h-12">
            <label className="mr-4 text-nowrap">
              Banner Resmleri<span className="text-danger">*</span> (1920x850)
            </label>
            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={(result) => {
                setImage((prev) => {
                  const data = prev || [];
                  return [...data, { ...result?.info }];
                });
              }}
              uploadPreset="mayplastik_set"
            >
              {({ open }) => {
                function handleOnClick() {
                  setImage([]);
                  open();
                }

                return (
                  <button
                    type="button"
                    className="blue-btn inline-flex space-x-2 items-center"
                    onClick={handleOnClick}
                  >
                    Banner Resimleri Yükle
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-12 px-2">
            <InputCom
              placeholder="Banner URL"
              label="Banner URL*"
              name="bannerurl"
              type="text"
              value={url}
              inputHandler={(e) => setUrl(e.target.value)}
              inputClasses="!h-[50px]"
            />
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2  flex items-center justify-center">
            <div className="w-[319px] h-12 mb-6 cursor-pointer ">
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
      </div>
    </form>
  );
};

export default Banner;
