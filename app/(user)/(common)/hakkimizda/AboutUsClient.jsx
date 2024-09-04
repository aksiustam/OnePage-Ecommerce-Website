"use client";

import Link from "next/link";
import PageTitle from "../../components/Helpers/PageTitle";
import Image from "next/image";

const AboutUsClient = () => {
  return (
    <div className="about-page-wrapper w-full">
      <div className="title-area w-full">
        <PageTitle
          title="Hakkımızda"
          breadcrumb={[
            { name: "Anasayfa", path: "/" },
            { name: "Hakkımızda", path: "/hakkimizda" },
          ]}
        />
      </div>

      <div className="aboutus-wrapper w-full">
        <div className="container-x mx-auto">
          <div className="w-full min-h-[665px] lg:flex lg:space-x-12 items-center pb-10 lg:pb-0">
            <div className="md:w-[570px] w-full md:h-[560px] h-auto rounded overflow-hidden my-5 lg:my-0">
              <Image
                src={`/assets/images/hakkimizda.jpg`}
                alt="Hakkımızda"
                width={1200}
                height={1200}
                loading="eager"
                className="w-full h-full"
              />
            </div>
            <div className="content flex-1">
              <h1 className="text-[24px] font-medium text-qblack mb-2.5">
                MAY PLASTİK - Aracı Değil, İmalatçı Firmayız
              </h1>
              <p className="text-[15px] text-qgraytwo leading-7 mb-2.5">
                May Plastik, çocuk park grupları ve çeşitli plastik ürünlerin
                yanı sıra LED ışıklı polietilen ürünlerin üretim ve pazarlama
                alanında uzmanlaşmış bir firmadır. Sektördeki deneyimimizle,
                yüksek kalite standartlarını benimseyerek müşteri memnuniyetini
                en üst düzeyde tutmayı hedefliyoruz.
              </p>
              <p className="text-[15px] text-qgraytwo leading-7 mb-2.5">
                Amacımız, bireysel ve kurumsal performansı sürekli olarak
                geliştirmek ve müşterilerimize LED ışıklı ürünler alanında hızlı
                ve ekonomik çözümler sunmaktır. Yenilikçi yaklaşımımızla
                sektördeki değişimlere hızlı bir şekilde adapte olmaktayız.
              </p>
              <p className="text-[15px] text-qgraytwo leading-7 mb-2.5">
                May Plastik olarak, güvenilirlik ilkesini benimsemekte ve bu
                ilkeyi kurum kültürümüzün merkezine koymaktayız. Ürün ve hizmet
                kalitemizi en üst düzeyde tutarak, sektördeki en yüksek
                standartları sağlamak ve bu kaliteyi müşterilerimize yansıtmak
                için çalışıyoruz.
              </p>

              <p className="text-[15px] text-qgraytwo leading-7 mb-2.5">
                Üretim yelpazemizde, çocuk oyun ve park grupları, kaydıraklar,
                salıncaklar, donmaz suluklar, buzağı kulübeleri, plastik su
                depoları, rotasyon makineleri ve kalıpları, LED ışıklı çiçek
                saksıları, bistrolar, masa altlıkları, oturma grupları ve diğer
                dekoratif ürünler bulunmaktadır. Geniş ürün yelpazemizle, her
                türlü ihtiyaca uygun çözümler sunmaktayız.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsClient;
