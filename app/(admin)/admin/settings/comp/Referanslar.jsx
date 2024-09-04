"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import InputCom from "@/app/(user)/components/Helpers/InputCom";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import setRef from "@/app/actions/Referanslar/setRef";
import delRef from "@/app/actions/Referanslar/delRef";
import putRef from "@/app/actions/Referanslar/putRef";

const Referanslar = (props) => {
  const { referans } = props;
  const [index, setIndex] = useState(1);
  const [name, setName] = useState("");
  const [modalcat, setModalCat] = useState({});
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);

  const onDelete = async (data) => {
    Swal.fire({
      title: data.name + " Adlı Referans Silinecektir! ",
      showDenyButton: true,
      confirmButtonText: "Sil",
      denyButtonText: "Hayır",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await delRef("category", data);
        if (res === true)
          Swal.fire({
            icon: "success",
            title: "Başarıyla Silindi",
            showConfirmButton: false,
            timer: 1500,
          });
        else {
          Swal.fire({
            icon: "error",
            title: JSON.stringify(res.message),
          });
        }
        router.refresh();
      }
    });
  };
  const addCat = async () => {
    if ((name === "", index === "")) {
      await Swal.fire({
        icon: "error",
        title: "Boş Bırakmayın",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const formData = {
        name: name,
        index: index,
        imageid: image?.public_id || undefined,
        imageurl: image?.secure_url || undefined,
      };

      const res = await setRef(formData);
      if (res === true) {
        await Swal.fire({
          icon: "success",
          title: "Başarıyla Eklendi",
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
    }
  };

  const updateCat = async () => {
    const formData = {
      ...modalcat,
      imageid: image?.public_id || null,
      imageurl: image?.secure_url || null,
    };
    const res = await putRef(formData);
    if (res === true) {
      await Swal.fire({
        icon: "success",
        title: "Başarıyla Kaydedildi",
        showConfirmButton: false,
        timer: 1500,
      });
      setImage(null);
    } else {
      Swal.fire({
        icon: "error",
        title: res.message,
      });
    }
    router.refresh();
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-lg">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                  <h3 className="text-xl font-semibold">Kategori Değiştir</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex flex-wrap">
                    <div className="mb-6 flex gap-3">
                      <div className="input-item mb-5  ">
                        <InputCom
                          label="Sıra Ekle*"
                          name="index"
                          type="number"
                          min={0}
                          value={modalcat?.index}
                          inputHandler={(e) =>
                            setModalCat({ ...modalcat, index: e.target.value })
                          }
                          inputClasses="!h-[50px]"
                        />
                      </div>
                      <div className="input-item mb-5 ">
                        <InputCom
                          label="Referans Adı*"
                          name="name"
                          type="text"
                          value={modalcat?.name}
                          inputHandler={(e) =>
                            setModalCat({ ...modalcat, name: e.target.value })
                          }
                          inputClasses="!h-[50px]"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-2 flex flex-1">
                      <div className="input-item mb-5 w-full h-12">
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
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Kapat
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      updateCat();
                    }}
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

      <div className="flex flex-col w-full h-full">
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full sm:w-1/4 md:w-1/6 lg:w-1/8 px-2 mb-12">
            <InputCom
              label="Sıra Ekle*"
              name="index"
              type="number"
              min={0}
              inputHandler={(e) => setIndex(e.target.value)}
              inputClasses="!h-[50px]"
              required
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-12 px-2">
            <InputCom
              placeholder="Referans Adı"
              label="Referans Adı*"
              name="name"
              type="text"
              inputHandler={(e) => setName(e.target.value)}
              inputClasses="!h-[50px]"
              required
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-16 h-12">
            <div className="text-sm text-red-600">
              Hepsinin Boyutları Aynı Olacak
            </div>
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
                    className="blue-btn inline-flex space-x-2 items-center "
                    onClick={handleOnClick}
                  >
                    Resim Yükle
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-6 ml-auto">
            <div className="h-12 cursor-pointer">
              <button
                className="yellow-btn inline-flex space-x-2 items-center"
                type="button"
                onClick={addCat}
              >
                <span className="text-sm font-600 tracking-wide leading-7">
                  Kaydet
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Index
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Kategori Resim
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Kategori Adı
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Değiştir/Sil
                </th>
              </tr>
            </thead>
            <tbody>
              {referans?.map((data) => {
                return (
                  <tr key={data?.id}>
                    <th
                      className="px-6 whitespace-nowrap p-4 text-left cursor-pointer text-blue-600 "
                      onClick={() => {
                        setShowModal(true);
                        setModalCat(data);
                      }}
                    >
                      #{data?.index}
                    </th>
                    <td
                      className="px-6 whitespace-nowrap p-4 text-left cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setModalCat(data);
                      }}
                    >
                      {data?.imageurl && (
                        <Image
                          src={data?.imageurl}
                          alt="Kategori"
                          width={70}
                          height={70}
                          loading="eager"
                        />
                      )}
                    </td>
                    <td
                      className="px-6 whitespace-nowrap p-4 cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setModalCat(data);
                      }}
                    >
                      {data?.name}
                    </td>

                    <td className="px-6 whitespace-nowrap p-4">
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setModalCat(data);
                        }}
                      >
                        <FaRegEdit size={26} color="green" />
                      </button>

                      <button onClick={() => onDelete(data)}>
                        <FaRegTrashAlt size={26} color="red" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Referanslar;
