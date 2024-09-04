import Link from "next/link";
import Facebook from "../Helpers/icons/Facebook";
import Instagram from "..//Helpers/icons/Instagram";
import Youtube from "../Helpers/icons/Youtube";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="footer-section-wrapper bg-white print:hidden">
      <div className="container-x block mx-auto pt-[56px]">
        <div className="w-full flex flex-col items-center mb-[50px] bg-[#24003E]">
          {/* logo area */}
          <div className="my-4  p-2">
            <Link href="/">
              <Image
                src={"/assets/images/logo.png"}
                alt="logo"
                width={400}
                height={200}
                loading="eager"
                className="object-contain"
              />
            </Link>
          </div>
          <div className="w-full h-[1px] bg-[#E9E9E9]"></div>
        </div>
        <div className="lg:flex justify-between mb-[50px]">
          <div className="lg:w-[424px]  ml-0 w-full mb-10 lg:mb-0">
            <h6 className="text-[18] font-500 text-[#2F2F2F] mb-5">
              Hakkımızda
            </h6>
            <p className="text-[#454345] text-[14px] w-[247px] leading-[28px]">
              <span className="text-[16px]">
                MAYPLASTİK -{" "}
                <strong className="text-sm">
                  Aracı Değil, İmalatçı Firmayız...
                </strong>
              </span>{" "}
              <br />
              <strong>Telefon :</strong> 0 544 942 42 82 <br />
              <strong>Sipariş İçin :</strong> 0 332 342 16 66 <br />
              <strong>Adress :</strong> Tatlıcak Mh. Gürçınar Sk. No:60 Vatan
              San. Sit. Karatay / Konya
            </p>
          </div>
          <div className="flex-1 lg:flex">
            <div className="lg:w-1/3 w-full mb-10 lg:mb-0">
              <div className="mb-5">
                <h6 className="text-[18] font-500 text-[#2F2F2F]">Kurumsal</h6>
              </div>
              <div>
                <ul className="flex flex-col space-y-4 ">
                  <li>
                    <Link href="/hakkimizda">
                      <span className="text-[#454345] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        Hakkımızda
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/iletisim">
                      <span className="text-[#454345] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        İletişim
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/siparistakip">
                      <span className="text-[#454345] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        Sipariş Sorgula
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:w-1/3 lg:flex lg:flex-col items-center w-full mb-10 lg:mb-0 ">
              <div>
                <div className="mb-5">
                  <h6 className="text-[18] font-500 text-[#2F2F2F]">
                    Alışveriş
                  </h6>
                </div>
                <div>
                  <ul className="flex flex-col space-y-4 ">
                    <li>
                      <Link href="/kurumsal/mesafeli-satis-sozlesmesi">
                        <span className="text-[#454345] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Mesafeli Satış Sözleşmesi
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/kurumsal/gizlilik-cerez-politikasi">
                        <span className="text-[#454345] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Gizlilik ve Çerez Politikası
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/kurumsal/teslimat-ve-iade-sartlari">
                        <span className="text-[#454345] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Teslimat ve İade Şartları
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 lg:flex lg:flex-col items-center w-full mb-10 lg:mb-0">
              <div>
                <div className="mb-5">
                  <h6 className="text-[18] font-500 text-[#2F2F2F]">Yardım</h6>
                </div>
                <div>
                  <ul className="flex flex-col space-y-4 ">
                    {/* <li>
                      <Link href="/">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          SSS
                        </span>
                      </Link>
                    </li> */}
                    <li>
                      <div className="flex space-x-5 items-center">
                        <a href="https://www.instagram.com/mayplastik/?hl=en">
                          <Instagram className="fill-current text-qgray hover:text-qblack" />
                        </a>
                        <a href="https://www.facebook.com/p/Mayplastik-Led-I%C5%9F%C4%B1kl%C4%B1-%C3%9Cr%C3%BCnler-100063619403794/?locale=tr_TR&paipv=0&eav=AfbG8YXh1fYC_rq92rlJiObY2FrYFqQ5-FCHfiT1Zvgmw7Q0nHuubc_Pkkyp6FRZh5c&_rdr">
                          <Facebook className="fill-current text-qgray hover:text-qblack" />
                        </a>
                        <a href="https://www.youtube.com/channel/UCaLNZGXcyfR-AqEuYngXIGw">
                          <Youtube className="fill-current text-qgray hover:text-qblack" />
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-bar border-t border-qgray-border lg:h-[82px] lg:flex justify-between items-center">
          <div className="flex lg:space-x-5 justify-between items-center pt-3  mb-3">
            <span className="sm:text-base text-[10px] text-qgray font-300">
              ©2024
              <a
                href="https://aydtanitim.com"
                target="_blank"
                rel="noreferrer"
                className="font-500 text-qblack mx-1"
              >
                AYD TANITIM
              </a>
            </span>
          </div>
          <div className="">
            <a href="#">
              <Image
                src={`/assets/images/payment-getways.png`}
                alt="payment-getways"
                width={300}
                height={110}
                loading="eager"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
