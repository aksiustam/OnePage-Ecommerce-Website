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
              name: "Mesafeli Satış Sözleşmesi",
              path: "mesafeli-satis-sozlesmesi",
            },
          ]}
          title="Mesafeli Satış Sözleşmesi"
        />
      </div>
      <div className="w-full">
        <div className="container-x mx-auto">
          <div className="content-item w-full mb-10">
            <h2 className="text-[18px] font-medium text-qblack mb-5">
              1. Konu
            </h2>
            <p className="text-[15px] text-qgraytwo leading-7">
              İşbu Satış Sözleşmesi Ön Bilgi Formu’nun konusu, Satıcı&apos;nın,
              Sipariş Veren/Alıcı&apos;ya satışını yaptığı, aşağıda nitelikleri
              ve satış fiyatı belirtilen ürün/ürünlerin satışı ve teslimi ile
              ilgili olarak 6502 sayılı Tüketicilerin Korunması Hakkındaki Kanun
              - Mesafeli Sözleşmeler Yönetmeliği (RG:27.11.2014/29188) hükümleri
              gereğince tarafların hak ve yükümlülüklerini kapsamaktadır. İş bu
              ön bilgilendirme formunu kabul etmekle Alıcı, sözleşme konusu
              siparişi onayladığı takdirde sipariş konusu bedeli ve varsa kargo
              ücreti, vergi gibi belirtilen ek ücretleri ödeme yükümlülüğü
              altına gireceğini ve bu konuda bilgilendirildiğini peşinen kabul
              eder.
            </p>
          </div>
          <div className="content-item w-full mb-10">
            <h2 className="text-[18px] font-medium text-qblack mb-5">
              2. Satıcı Bilgileri
            </h2>
            <p className="text-[15px] text-qgraytwo leading-7 mb-10">
              <strong>Ünvanı:</strong> MAY Plastik
              <br />
              <strong>Adresi:</strong> Tatlıcak Mah. Gürçınar Sokak No:60
              Karatay - KONYA
              <br />
              <strong>Telefon:</strong> +90 544 942 42 82 / 0 332 342 16 66
              <br />
              <strong>E-posta:</strong> bilgi@mayplastik.com
            </p>
            <div>
              <h2 className="text-[18px] font-medium text-qblack mb-5">
                3. Alıcı Bilgileri (Bundan sonra Alıcı olarak anılacaktır)
              </h2>
              <p className="text-[15px] text-qgraytwo leading-7 mb-10">
                <strong>Adı/Soyadı/Ünvanı:</strong> [Alıcının adı/ünvanı]
                <br />
                <strong>Adresi:</strong> [Alıcının adresi]
                <br />
                <strong>Telefon:</strong> [Alıcının telefon numarası]
                <br />
                <strong>E-posta:</strong> [Alıcının e-posta adresi]
              </p>
            </div>
            <div>
              <h2 className="text-[18px] font-medium text-qblack mb-5">
                4. Sözleşme Konusu Ürün/Ürünler Bilgileri
              </h2>
              <p className="text-[15px] text-qgraytwo leading-7 mb-4">
                4.1. Malın / Ürün/Ürünlerin / Hizmetin temel özellikleri (türü,
                miktarı, marka/modeli, rengi, adedi) Satıcı’ya ait internet
                sitesinde yer almaktadır. Ürünün temel özelliklerini kampanya
                süresince inceleyebilirsiniz. Kampanya tarihine kadar
                geçerlidir.
              </p>
              <p className="text-[15px] text-qgraytwo leading-7 mb-4">
                4.2. Listelenen ve sitede ilan edilen fiyatlar satış fiyatıdır.
                İlan edilen fiyatlar ve vaatler güncelleme yapılana ve
                değiştirilene kadar geçerlidir. Süreli olarak ilan edilen
                fiyatlar ise belirtilen süre sonuna kadar geçerlidir.
              </p>
            </div>
            <div>
              <h2 className="text-[18px] font-medium text-qblack mb-5">
                5. Genel Hükümler
              </h2>
              <ul className="list-disc ml-5">
                <li className="text-[15px] text-qgraytwo leading-7">
                  5.1. Alıcı, Satıcı’ya ait internet sitesinde sözleşme konusu
                  ürünün temel nitelikleri, satış fiyatı ve ödeme şekli ile
                  teslimata ilişkin ön bilgileri okuyup, bilgi sahibi olduğunu,
                  elektronik ortamda gerekli teyidi verdiğini kabul, beyan ve
                  taahhüt eder. Alıcının, Ön Bilgilendirmeyi elektronik ortamda
                  teyit etmesi, mesafeli satış sözleşmesinin kurulmasından
                  evvel, Satıcı tarafından Alıcı&apos;ya verilmesi gereken
                  adresi, siparişi verilen ürünlere ait temel özellikleri,
                  ürünlerin vergiler dâhil fiyatını, ödeme ve teslimat
                  bilgilerini de doğru ve eksiksiz olarak edindiğini kabul,
                  beyan ve taahhüt eder.
                </li>
                <li className="text-[15px] text-qgraytwo leading-7">
                  5.2. Sözleşme konusu her bir ürün, 30 günlük yasal süreyi
                  aşmamak kaydı ile Alıcının yerleşim yeri uzaklığına bağlı
                  olarak internet sitesindeki ön bilgiler kısmında belirtilen
                  süre zarfında Alıcı veya Alıcının gösterdiği adresteki kişi
                  ve/veya kuruluşa teslim edilir. Bu süre içinde ürünün Alıcı’ya
                  teslim edilememesi durumunda, Alıcının sözleşmeyi feshetme
                  hakkı saklıdır.
                </li>
                <li className="text-[15px] text-qgraytwo leading-7">
                  5.3. Satıcı, sözleşme konusu ürünü eksiksiz, siparişte
                  belirtilen niteliklere uygun ve varsa garanti belgeleri,
                  kullanım kılavuzları ile teslim etmeyi, her türlü ayıptan ari
                  olarak yasal mevzuat gereklerine sağlam, standartlara uygun
                  bir şekilde işin gereği olan bilgi ve belgeler ile işi
                  doğruluk ve dürüstlük esasları dâhilinde ifa etmeyi, hizmet
                  kalitesini koruyup yükseltmeyi, işin ifası sırasında gerekli
                  dikkat ve özeni göstermeyi, ihtiyat ve öngörü ile hareket
                  etmeyi kabul, beyan ve taahhüt eder.
                </li>
                <li className="text-[15px] text-qgraytwo leading-7">
                  5.4. Satıcı, sözleşmeden doğan ifa yükümlülüğünün süresi
                  dolmadan Alıcı’yı bilgilendirmek ve açıkça onayını almak
                  suretiyle eşit kalite ve fiyatta farklı bir ürün tedarik
                  edebilir.
                </li>
                <li className="text-[15px] text-qgraytwo leading-7">
                  5.5. Satıcı, sipariş konusu ürün veya hizmetin yerine
                  getirilmesinin imkânsızlaşması halinde sözleşme konusu
                  yükümlülüklerini yerine getiremezse, bu durumu, öğrendiği
                  tarihten itibaren 3 gün içinde yazılı olarak tüketiciye
                  bildireceğini, 14 günlük süre içinde toplam bedeli Alıcı’ya
                  iade edeceğini kabul, beyan ve taahhüt eder.
                </li>
                <li className="text-[15px] text-qgraytwo leading-7">
                  5.6. Alıcı, sözleşme konusu ürünün teslimatı için işbu Ön
                  Bilgilendirme Formunu elektronik ortamda teyit edeceğini,
                  herhangi bir nedenle sözleşme konusu ürün bedelinin ödenmemesi
                  ve/veya banka kayıtlarında iptal edilmesi halinde, Satıcının
                  sözleşme konusu ürünü teslim yükümlülüğünün sona ereceğini
                  kabul, beyan ve taahhüt eder.
                </li>
                <li className="text-[15px] text-qgraytwo leading-7">
                  5.7. Alıcı, sözleşme konusu ürünün Alıcı veya Alıcının
                  gösterdiği adresteki kişi ve/veya kuruluşa tesliminden sonra
                  Alıcı&apos;ya ait kredi kartının yetkisiz kişilerce haksız
                  kullanılması sonucunda sözleşme konusu ürün bedelinin ilgili
                  banka veya finans kuruluşu tarafından Satıcı&apos;ya
                  ödenmemesi halinde, Alıcı sözleşme konusu ürünü 3 gün
                  içerisinde nakliye gideri Satıcı’ya ait olacak şekilde
                  Satıcı’ya iade edeceğini kabul, beyan ve taahhüt eder.
                </li>

                <li className="text-[15px] text-qgraytwo leading-7">
                  5.8. Satıcı, tarafların iradesi dışında gelişen, önceden
                  öngörülemeyen ve tarafların borçlarını yerine getirmesini
                  engelleyici ve/veya geciktirici hallerin oluşması gibi mücbir
                  sebepler halleri nedeni ile sözleşme konusu ürünü süresi
                  içinde teslim edemez ise, durumu Alıcı&apos;ya bildireceğini
                  kabul, beyan ve taahhüt eder. Alıcı da siparişin iptal
                  edilmesini, sözleşme konusu ürünün varsa emsali ile
                  değiştirilmesini ve/veya teslimat süresinin engelleyici
                  durumun ortadan kalkmasına kadar ertelenmesini Satıcı’dan
                  talep etme hakkına haizdir. Alıcı tarafından siparişin iptal
                  edilmesi halinde Alıcı’nın nakit ile yaptığı ödemelerde, ürün
                  tutarı 14 gün içinde kendisine nakden ve defaten ödenir.
                  Alıcının kredi kartı ile yaptığı ödemelerde ise, ürün tutarı,
                  siparişin Alıcı tarafından iptal edilmesinden sonra 14 gün
                  içerisinde ilgili bankaya iade edilir. Alıcı, Satıcı
                  tarafından kredi kartına iade edilen tutarın banka tarafından
                  Alıcı hesabına yansıtılmasına ilişkin ortalama sürecin 2 ile 3
                  haftayı bulabileceğini, bu tutarın bankaya iadesinden sonra
                  Alıcı’nın hesaplarına yansıması halinin tamamen banka işlem
                  süreci ile ilgili olduğundan, Alıcı, olası gecikmeler için
                  Satıcı’yı sorumlu tutamayacağını kabul, beyan ve taahhüt eder.
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-[18px] font-medium text-qblack mb-5 mt-3">
                6. Fatura Bilgileri
              </h2>
              <p className="text-[15px] text-qgraytwo leading-7 mb-10">
                <strong>Ödeme Şekli:</strong> [Ödeme şekli]
                <br />
                <strong>Teslimat Adresi:</strong> [Teslimat adresi]
                <br />
                <strong>Teslim Edilecek Kişi:</strong> [Teslim edilecek kişi]
                <br />
                <strong>Fatura Adresi:</strong> [Fatura adresi] <br />
                <strong>Kargo Ücreti:</strong> [Kargo ücreti] <br />
                Fatura teslim: Fatura sipariş gönderiminden sonra; alıcının mail
                adresine e-fatura olarak olarak gönderilmektedir.
              </p>
            </div>
            <div>
              <h2 className="text-[18px] font-medium text-qblack mb-5">
                7. Cayma Hakkı
              </h2>
              <p className="text-[15px] text-qgraytwo leading-7 mb-4">
                Ürünlerimiz alıcıya özel ve alıcının istediği ebatlarda
                yapıldığından cayma hakkı yoktur. Ancak, ürün ambalajından
                çıkarılmamış halde ve ciddi bir sebep olması durumunda, örneğin
                ölçülerin farklı olması, malzeme kalitesi bozukluğu veya
                çalışmaması gibi durumlarda değişim yapılabilir.
              </p>
            </div>
            <div>
              <h2 className="text-[18px] font-medium text-qblack mb-5">
                8. Cayma Hakkı Kullanılamayacak Ürünler
              </h2>
              <p className="text-[15px] text-qgraytwo leading-7 mb-4">
                8.1. Niteliği itibariyle iade edilemeyecek ürünler, tek
                kullanımlık ürünler, hızlı bozulan veya son kullanma tarihi
                geçen ürünler için cayma hakkı kullanılamaz.
              </p>
              <p className="text-[15px] text-qgraytwo leading-7 mb-4">
                8.2. Alıcı, ambalajı açılmış, kullanılmış, bozulmuş ve tekrar
                satılabilirlik özelliğini kaybetmiş ürünlerin iadesini yapamaz.
              </p>
              <p className="text-[15px] text-qgraytwo leading-7 mb-4">
                8.3. Cayma hakkı süresi içinde dahi olsa, kullanılmış ürünler,
                kişiye özel üretilmiş ürünler ve tekrar satılması mümkün olmayan
                ürünler iade alınmaz.
              </p>
            </div>

            <div>
              <h2 className="text-[18px] font-medium text-qblack mb-5">
                10. Uyuşmazlıkların Çözümü
              </h2>
              <p className="text-[15px] text-qgraytwo leading-7 mb-4">
                10.1. İşbu Sözleşme’den doğabilecek ihtilaflarda, T.C. Gümrük ve
                Ticaret Bakanlığı’nca ilan edilen değere kadar Alıcı’nın mal
                veya hizmeti satın aldığı ve ikametgahının bulunduğu yerdeki
                Tüketici Hakem Heyetleri yetkilidir.
              </p>
              <p className="text-[15px] text-qgraytwo leading-7 mb-4">
                10.2. İşbu Sözleşme’nin uygulanmasında, Türkiye Cumhuriyeti
                yasaları uygulanır ve Konya Mahkemeleri ve İcra Daireleri
                yetkilidir.
              </p>
            </div>
            <div>
              <h2 className="text-[18px] font-medium text-qblack mb-5">
                11. Yürürlük
              </h2>
              <p className="text-[15px] text-qgraytwo leading-7 mb-4">
                İşbu Sözleşme, Alıcı tarafından elektronik olarak onaylandığı
                tarihte yürürlüğe girer.
              </p>
            </div>
            <div>
              <p className="text-[15px] text-qgraytwo leading-7 mb-4">
                Satıcı
                <br />
                MAY Plastik
              </p>
              <p className="text-[15px] text-qgraytwo leading-7 mb-4">
                Alıcı
                <br />
                [Alıcının Adı ve Soyadı/Ünvanı]
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
