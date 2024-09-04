"use client";
import Link from "next/link";
import Image from "next/image";
import errortick from "@/public/assets/images/errortick.png";
import PageTitle from "../components/Helpers/PageTitle";

const OdemeHataClient = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full mb-5">
        <PageTitle
          title="Ödeme Sayfası"
          breadcrumb={[
            { name: "Anasayfa", path: "/" },
            { name: "Ödeme", path: "/odeme" },
          ]}
        />
      </div>
      <div className="flex flex-col items-center justify-center pb-12">
        <div>
          <Image
            src={errortick}
            alt="Success"
            width={1200}
            height={1200}
            className="w-60 h-60 object-contain"
          />
        </div>
        <div>Siparişinizde bir hata oluştu ve başarısız sonuçlanmıştır.</div>
        <div>
          {" "}
          Lütfen{" "}
          <Link className="text-blue-600 cursor-pointer" href={`/odeme`}>
            Bu Sayfaya
          </Link>{" "}
          giderek tekrar deneyiniz.{" "}
        </div>
        <div>Teşekkürler.</div>
      </div>
    </div>
  );
};

export default OdemeHataClient;
