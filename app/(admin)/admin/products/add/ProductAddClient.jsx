"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import setProduct from "@/app/actions/Products/setProduct";
import { useRouter } from "next/navigation";
import InputCom from "@/app/(user)/components/Helpers/InputCom";
import { CldUploadWidget } from "next-cloudinary";

const ProductAddClient = (props) => {
  const { allcategory } = props;
  const category = allcategory.category;

  const [quillValueDesc, setQuillValueDesc] = useState("");
  const [quillValueSpec, setQuillValueSpec] = useState("");
  const [quillValueKargo, setQuillValueKargo] = useState("");

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  const [cimage, setCImage] = useState([]);
  const router = useRouter();
  const convertToFloat = (value) => {
    const number = parseFloat(value);
    return isNaN(number) ? 0 : number;
  };
  const onSubmit = async (data) => {
    const formData = {
      ...data,
      price: {
        sarjprice: convertToFloat(data.sarjprice),
        sarjinprice: convertToFloat(data.sarjinprice),
        fisprice: convertToFloat(data.fisprice),
        fisinprice: convertToFloat(data.fisinprice),
        isikprice: convertToFloat(data.isikprice),
        isikinprice: convertToFloat(data.isikinprice),
      },
      quill: {
        desc: quillValueDesc,
        spec: quillValueSpec,
        kargo: quillValueKargo,
      },
    };

    const res = await setProduct(formData);
    if (res === true) {
      await Swal.fire({
        icon: "success",
        title: "Başarıyla Eklendi",
        showConfirmButton: false,
        timer: 1500,
      });
      setCImage([]);
      router.refresh();
    } else {
      Swal.fire({
        icon: "error",
        title: JSON.stringify(res.message),
      });
    }
  };

  useEffect(() => {
    const data = cimage.map((item) => {
      return { imageid: item.public_id, imageurl: item.secure_url };
    });
    setValue(`Image`, data);
  }, [setValue, cimage]);
  return (
    <section className="h-full w-full">
      <h4 className="text-2xl font-bold mb-4">ÜRÜN EKLE</h4>
      <form className=" w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex mb-4 space-x-5">
          <div className="input-item mb-5 w-1/2 ">
            <InputCom
              placeholder="Ürün Adı"
              label="Ürün Adı*"
              name="name"
              type="text"
              inputClasses="!h-[50px]"
              errors={errors}
              register={register}
              required="Ürün Adı Giriniz"
            />
          </div>
          <div className="input-item mb-5 w-1/2 ">
            <InputCom
              placeholder="Açıklama"
              label="Açıklama*"
              name="desc"
              type="text"
              inputClasses="!h-[50px]"
              errors={errors}
              register={register}
              required="Ürün Açıklaması Giriniz"
            />
          </div>
        </div>
        <div className="flex  mb-4 space-x-5">
          <div className="input-item mb-5 w-1/4 ">
            <InputCom
              placeholder="Şarjlı Fiyat"
              label="Şarjlı Fiyat"
              name="sarjprice"
              type="number"
              min={0.0}
              inputClasses="!h-[50px]"
              errors={errors}
              register={register}
            />
          </div>
          <div className="input-item mb-5 w-1/4">
            <InputCom
              placeholder="Şarjlı İndirimli Fiyatı"
              label="Şarjlı İndirimli Fiyatı"
              name="sarjinprice"
              type="number"
              inputClasses="!h-[50px]"
              min={0.0}
              errors={errors}
              register={register}
            />
          </div>
          <div className="input-item mb-5 w-1/4 ">
            <InputCom
              placeholder="Fisli Fiyat"
              label="Fisli Fiyat"
              name="fisprice"
              type="number"
              min={0.0}
              inputClasses="!h-[50px]"
              errors={errors}
              register={register}
            />
          </div>
          <div className="input-item mb-5 w-1/4">
            <InputCom
              placeholder="Fisli İndirimli Fiyatı"
              label="Fisli İndirimli Fiyatı"
              name="fisinprice"
              type="number"
              inputClasses="!h-[50px]"
              min={0.0}
              errors={errors}
              register={register}
            />
          </div>
        </div>
        <div className="flex  mb-4 space-x-5">
          <div className="input-item mb-5 w-1/4 ">
            <InputCom
              placeholder="Isıksız Fiyat"
              label="Isıksız Fiyat"
              name="isikprice"
              type="number"
              min={0.0}
              inputClasses="!h-[50px]"
              errors={errors}
              register={register}
            />
          </div>
          <div className="input-item mb-5 w-1/4">
            <InputCom
              placeholder="Isıksız İndirimli Fiyatı"
              label="Isıksız İndirimli Fiyatı"
              name="isikinprice"
              type="number"
              inputClasses="!h-[50px]"
              min={0.0}
              errors={errors}
              register={register}
            />
          </div>
          <div className="input-item mb-5 w-1/4 ">
            <InputCom
              placeholder="Stock Sayısı"
              label="Stock Sayısı*"
              name="stock"
              type="number"
              inputClasses="!h-[50px]"
              errors={errors}
              register={register}
              required="Stock Sayısı Giriniz"
            />
          </div>
          <div className="input-item mb-5 w-1/4 ">
            <InputCom
              placeholder="Kilo"
              label="Kilosu"
              name="kilo"
              type="number"
              inputClasses="!h-[50px]"
              errors={errors}
              register={register}
            />
          </div>
        </div>
        <div className="flex mb-4 space-x-5">
          <div className="input-item mb-5 w-1/2 ">
            <label
              htmlFor="Kategori"
              className="capitalize block text-qgray text-[13px] font-normal"
            >
              Kategori*
            </label>
            <select
              name="category"
              id="category"
              {...register("kategori", { required: true })}
              className="placeholder:text-sm text-sm px-6 text-dark-gray w-full !h-[60px] font-normal bg-white focus:ring-0 focus:outline-none"
              required
            >
              {category?.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-item mb-5 w-1/2 ">
            <input hidden {...register(`Image`)} />
            <label className="mr-4 text-xs">
              Resim<span className="text-danger">*</span>
            </label>
            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={(result) => {
                setCImage((prev) => {
                  const data = prev || [];
                  return [...data, { ...result?.info }];
                });
              }}
              uploadPreset="mayplastik_product"
            >
              {({ open }) => {
                function handleOnClick() {
                  setCImage([]);
                  open();
                }

                return (
                  <button
                    type="button"
                    className="blue-btn inline-flex space-x-2 items-center mt-1 !h-[50px]"
                    onClick={handleOnClick}
                  >
                    Resim Yükle
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
        </div>
        <div className="w-full grid grid-cols-3">
          <div className="w-full">
            <div className="pl-3 text-red-600 font-bold underline">
              Ürün Açıklama
            </div>
            <ReactQuill
              theme="snow"
              value={quillValueDesc}
              onChange={setQuillValueDesc}
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
          <div className="w-full">
            <div className="pl-3 text-red-600 font-bold underline">
              Ürün Özellikleri
            </div>
            <ReactQuill
              theme="snow"
              value={quillValueSpec}
              onChange={setQuillValueSpec}
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
          <div className="w-full">
            <div className="pl-3 text-red-600 font-bold underline">
              Ürün Kargo Kısmı
            </div>
            <ReactQuill
              theme="snow"
              value={quillValueKargo}
              onChange={setQuillValueKargo}
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
        </div>

        <div className="flex w-full my-8">
          <div className="w-[159px] h-10 cursor-pointer">
            <button
              type="submit"
              className="yellow-btn inline-flex space-x-2 items-center"
            >
              <span className="text-sm font-600 tracking-wide leading-7">
                Ürün Ekle
              </span>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ProductAddClient;
