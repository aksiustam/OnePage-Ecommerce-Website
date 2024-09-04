"use client";
import Link from "next/link";
import Image from "next/image";
import checktick from "@/public/assets/images/checktick.png";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import UseCart from "@/hooks/useCart";
import PageTitle from "../components/Helpers/PageTitle";

const OdemeSonClient = (props) => {
  const { user } = props;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Content user={user} />
    </Suspense>
  );
};

const Content = ({ user }) => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const { emptyBasket } = UseCart();

  useEffect(() => {
    emptyBasket();
  }, [emptyBasket]);

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
            src={checktick}
            alt="Success"
            width={1200}
            height={1200}
            className="w-60 h-60 object-contain"
          />
        </div>
        <div>Siparişiniz Başarıyla Sonuçlanmıştır.</div>
        <div>
          Faturanızı görmek için{" "}
          <Link
            className="text-blue-600 cursor-pointer"
            href={`/order-bill/${token}`}
          >
            Tıklayınız
          </Link>
        </div>
        {user !== null ? (
          <div className="text-center">
            Siparişinizin takibini profil alanınızdan ulaşabilirsiniz.
          </div>
        ) : (
          <Link
            className="text-blue-600 cursor-pointer text-center"
            href={`/siparistakip`}
          >
            Siparişinizi takip edin
          </Link>
        )}
      </div>
    </div>
  );
};

export default OdemeSonClient;
