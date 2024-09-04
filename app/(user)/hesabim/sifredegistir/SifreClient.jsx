"use client";

import { useForm } from "react-hook-form";
import PasswordSvg from "./PasswordSvg";
import Swal from "sweetalert2";
import setUserPass from "../../../actions/User/setUserPass";

export default function SifreClient({ user }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    const formData = {
      id: user.id,
      pastpass: data.pastpass,
      pass: data.pass,
      repass: data.repass,
    };
    const res = await setUserPass(formData);
    if (res === true) {
      await Swal.fire("Başarılı", "Bilgileriniz Güncellendi", "success");
      location.reload();
    } else {
      Swal.fire({
        icon: "error",
        title: res.message,
      });
    }
  };
  return (
    <div className="changePasswordTab w-full mt-8 md:mt-0">
      <div className="w-full flex xl:flex-row flex-col-reverse space-x-5 xl:items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[397px] mb-10">
            <div className="input-field mb-6">
              <label
                className="input-label text-qgray text-sm block mb-2.5"
                htmlFor="old_password"
              >
                Eski Şifre Giriniz*
                <span className="ml-2 text-red-600 text-sm">
                  {errors?.pastpass?.message}
                </span>
              </label>
              <div className="input-wrapper border border-[#E8E8E8] w-full  h-[58px] overflow-hidden relative ">
                <input
                  placeholder="● ● ● ● ● ●"
                  className="input-field placeholder:text-base text-bese px-4 text-dark-gray w-full h-full bg-[#FAFAFA] focus:ring-0 focus:outline-none"
                  type="password"
                  id="old_password"
                  required
                  {...register("pastpass", {
                    required: "Eski şifreyi giriniz",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                      message:
                        "Şifreniz 6 harften 1 büyük 1 küçük 1 rakamdan oluşmalıdır.",
                    },
                  })}
                />
              </div>
            </div>
            <div className="input-field mb-6">
              <label
                className="input-label text-qgray text-sm block mb-2.5"
                htmlFor="old_password"
              >
                Yeni Şifre*{" "}
                <span className="ml-2 text-red-600 text-sm">
                  {errors?.pass?.message}
                </span>
              </label>
              <div className="input-wrapper border border-[#E8E8E8] w-full  h-[58px] overflow-hidden relative ">
                <input
                  placeholder="● ● ● ● ● ●"
                  className="input-field placeholder:text-base text-bese px-4 text-dark-gray w-full h-full bg-[#FAFAFA] focus:ring-0 focus:outline-none"
                  type="password"
                  id="new_password"
                  required
                  {...register("pass", {
                    required: "Yeni şifre giriniz",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                      message:
                        "Yeni Şifreniz 6 harften 1 büyük 1 küçük 1 rakamdan oluşmalıdır.",
                    },
                  })}
                />
              </div>
            </div>
            <div className="input-field mb-6">
              <label
                className="input-label text-qgray text-sm block mb-2.5"
                htmlFor="old_password"
              >
                Şifreyi yeniden giriniz*
                <span className="ml-2 text-red-600 text-sm">
                  {errors?.repass?.message}
                </span>
              </label>
              <div className="input-wrapper border border-[#E8E8E8] w-full  h-[58px] overflow-hidden relative ">
                <input
                  placeholder="● ● ● ● ● ●"
                  className="input-field placeholder:text-base text-bese px-4 text-dark-gray w-full h-full bg-[#FAFAFA] focus:ring-0 focus:outline-none"
                  type="password"
                  id="confirm_password"
                  required
                  {...register("repass", {
                    required: "Yeni şifreyi yeniden giriniz",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                      message:
                        "Yeni Şifreniz 6 harften 1 büyük 1 küçük 1 rakamdan oluşmalıdır.",
                    },
                  })}
                />
              </div>
            </div>
            <div className="w-full mt-[30px] flex justify-start">
              <div className="sm:flex sm:space-x-[30px] items-center">
                <div className="w-[180px] h-[50px]">
                  <button type="sumbit" className="yellow-btn">
                    <div className="w-full text-sm font-semibold">
                      Şifreyi Güncelle
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="flex-1 sm:flex hidden justify-end">
          <PasswordSvg />
        </div>
      </div>
    </div>
  );
}
