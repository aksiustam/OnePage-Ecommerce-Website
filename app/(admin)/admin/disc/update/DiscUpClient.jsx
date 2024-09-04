"use client";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import InputCom from "@/app/(user)/components/Helpers/InputCom";
import setDiscUp from "@/app/actions/Settings/setDiscUp";

const DiscUpClient = (props) => {
  const { settings } = props;
  const data = settings?.discountset;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      indirim1: data?.indirim1,
      indirim2: data?.indirim2,
      indirim3: data?.indirim3,
    },
  });

  const router = useRouter();
  const onSubmit = async (data) => {
    let formData = { ...data };

    const res = await setDiscUp(formData);
    if (res === true) {
      await Swal.fire({
        icon: "success",
        title: "Başarıyla Değiştirildi",
        showConfirmButton: false,
        timer: 1500,
      });
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
        İndirim Ayarları
      </div>
      <form
        className="flex flex-col w-full h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-wrap -ml-2">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-12">
            <InputCom
              label="İndirim 1 %Yüzde*"
              name="indirim1"
              type="text"
              inputClasses="!h-[50px]"
              errors={errors}
              register={register}
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-12">
            <InputCom
              label="İndirim 2 %Yüzde*"
              name="indirim2"
              type="text"
              inputClasses="!h-[50px]"
              errors={errors}
              register={register}
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-12">
            <InputCom
              label="İndirim 3 %Yüzde*"
              name="indirim3"
              type="text"
              inputClasses="!h-[50px]"
              errors={errors}
              register={register}
            />
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

export default DiscUpClient;
