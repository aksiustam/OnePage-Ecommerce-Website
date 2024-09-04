"use client";
import { useForm } from "react-hook-form";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import sendMail from "@/app/actions/AdminUser/sendMail";
import { useState } from "react";
import InputCom from "@/app/(user)/components/Helpers/InputCom";
const MailClient = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [quillValue, setQuillValue] = useState("");
  const onSubmit = async (data) => {
    const formData = {
      mailto: data.mailto,
      mailBaslik: data.mailBaslik,
      text: quillValue,
    };
    const res = await sendMail(formData);
    if (res === true)
      Swal.fire({
        icon: "success",
        title: "Başarıyla Gönderildi",
        showConfirmButton: false,
        timer: 1500,
      });
  };

  return (
    <div className="container">
      <div className="text-xl shadow-lg px-2 py-4 mb-2 font-bold">
        -Mail Gönder-
      </div>
      <form
        className="flex flex-col w-full h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-wrap -ml-2">
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 px-2 mb-12">
            <InputCom
              label="Kime Gidecek*"
              name="mailto"
              type="text"
              inputClasses="!h-[50px]"
              errors={errors}
              register={register}
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 px-2 mb-12">
            <InputCom
              label="Mail Başlık*"
              name="mailBaslik"
              type="text"
              inputClasses="!h-[50px]"
              errors={errors}
              register={register}
            />
          </div>

          <div className="w-full px-2 mb-12">
            <ReactQuill
              theme="snow"
              value={quillValue}
              onChange={setQuillValue}
              modules={{
                toolbar: [
                  [{ font: [] }],
                  [{ size: [] }],
                  [{ color: [] }, { background: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],

                  ["link"],
                  ["clean"],
                ],
              }}
            />
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 flex items-center justify-center">
            <div className="w-[319px] h-10 cursor-pointer">
              <button
                type="submit"
                className="yellow-btn inline-flex space-x-2 items-center"
              >
                <span className="text-sm font-600 tracking-wide leading-7">
                  Gönder
                </span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MailClient;
