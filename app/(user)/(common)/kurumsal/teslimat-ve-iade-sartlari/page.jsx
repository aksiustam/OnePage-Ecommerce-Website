import PageTitle from "@/app/(user)/components/Helpers/PageTitle";
import React from "react";

const page = () => {
  return (
    <div className="terms-condition-page w-full bg-white pb-[30px]">
      <div className="w-full mb-[30px]">
        <PageTitle
          breadcrumb={[
            { name: "Anasayfa", path: "/" },
            {
              name: "Teslimat ve İade Şartları",
              path: "teslimat-ve-iade-sartlari",
            },
          ]}
          title="Teslimat ve İade Şartları"
        />
      </div>
      <div className="w-full">
        <div className="container-x mx-auto">
          <div className="content-item w-full mb-10">
            <p className="text-[15px] text-qgraytwo leading-7 mb-4">
              <strong>Ürün Teslimat Koşulları :</strong> Sitemiz üzerinden satın
              aldığınız ürünler, sipariş tarihinden itibaren en az 3 iş günü (
              Ürünün Miktarı ve Boyutuna göre Değişebilir ) içinde yapılır ve
              anlaşmalı kargoya verilir. Teslimat süresi, kargo şirketinin
              yoğunluğuna ve teslimat adresine göre değişiklik gösterebilir.
              Ürününüzü teslim alırken paketi kontrol ediniz. Hasar görmüş
              paketleri teslim almadan önce kargo yetkilisine tutanak tutturarak
              geri gönderiniz. Ürün teslim alındıktan sonra, herhangi bir hasar
              durumunda sorumluluk müşteriye aittir. Teslimat sırasında yaşanan
              gecikmeler veya problemler için lütfen telefon numaramızdan veya
              mailden iletişime geçiniz.
            </p>
            <p className="text-[15px] text-qgraytwo leading-7">
              <strong>Ürün İade Koşulları :</strong> Sitemiz üzerinden satın
              aldığınız ürünün hatalı veya eksik çıkması halinde teslimat
              tarihinde veya ertesi gün satıcının telefon veya email ile
              iletişim şekillerini kullanarak bizimle iletişim kurmanız
              gerekmektedir. Sipariş edilen ürün hatası müşteri kullanımından
              oluşmuşsa veya belirtilen süre içerisinde ürün kullanılmışsa
              ürünün iade ve değişimi yapılmaz. Ürün iadesi ve değiştirme
              şartları olarak, 4077 sayılı Tüketicinin Korunması Hakkında Kanun
              gereği uygulamalar esastır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
