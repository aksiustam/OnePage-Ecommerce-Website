"use client";
import IcoAdress from "./icons/IcoAdress";
import IcoCart from "./icons/IcoCart";
import IcoLogout from "./icons/IcoLogout";
import IcoPassword from "./icons/IcoPassword";
import IcoPeople from "./icons/IcoPeople";
import BreadcrumbCom from "../components/Common/BreadcrumbCom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import PageTitle from "../components/Helpers/PageTitle";
const ProfilLayout = ({ children }) => {
  const router = useRouter();
  const logout = () => {
    signOut();
    router.push("/");
    router.refresh();
  };
  return (
    <div className="profile-page-wrapper w-full">
      <div className="title-area w-full">
        <PageTitle
          title="Hesabım"
          breadcrumb={[
            { name: "Anasayfa", path: "/" },
            { name: "Hesabım", path: "/hesabim" },
          ]}
        />
      </div>
      <div className="container-x mx-auto">
        <div className="w-full my-10">
          {/* <BreadcrumbCom
            paths={[
              { name: "Anasayfa", path: "/" },
              { name: "Profil", path: "/hesabim" },
            ]}
          /> */}
          <div className="w-full bg-white px-10 py-9">
            <div className="title-area w-full flex justify-between items-center">
              <h1 className="text-[22px] font-bold text-qblack">
                Profil Hesabım
              </h1>
            </div>
            <div className="profile-wrapper w-full mt-8 space-x-10 flex flex-col md:flex-row">
              <div className="w-[236px] min-h-[600px] border-r border-[rgba(0, 0, 0, 0.1)]  hidden md:block ">
                <div className="flex flex-col space-y-10">
                  <div className="item group">
                    <Link href="/hesabim">
                      <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                        <span>
                          <IcoPeople />
                        </span>
                        <h2 className=" font-normal text-base">
                          Kullanıcı Bilgileri
                        </h2>
                      </div>
                    </Link>
                  </div>

                  <div className="item group">
                    <Link href="/hesabim/siparislerim">
                      <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                        <span>
                          <IcoCart />
                        </span>
                        <h2 className=" font-normal text-base">
                          Tüm Siparişlerim
                        </h2>
                      </div>
                    </Link>
                  </div>

                  <div className="item group">
                    <Link href="/hesabim/adres">
                      <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                        <span>
                          <IcoAdress />
                        </span>
                        <h2 className=" font-normal text-base">
                          Adres Bilgilerim
                        </h2>
                      </div>
                    </Link>
                  </div>

                  <div className="item group">
                    <Link href="/hesabim/sifredegistir">
                      <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                        <span>
                          <IcoPassword />
                        </span>
                        <h2 className=" font-normal text-base">
                          Şifre Değiştir
                        </h2>
                      </div>
                    </Link>
                  </div>

                  <div className="item group">
                    <div
                      className="flex space-x-3 items-center text-qgray hover:text-qblack cursor-pointer"
                      onClick={() => logout()}
                    >
                      <span>
                        <IcoLogout />
                      </span>
                      <h2 className=" font-normal text-base">Çıkış Yap</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full min-h-[50px] border-b border-[rgba(0, 0, 0, 0.1)] block md:hidden">
                <div className="flex space-x-8">
                  <div className="item group">
                    <Link href="/hesabim">
                      <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                        <span>
                          <IcoPeople />
                        </span>
                      </div>
                    </Link>
                  </div>

                  <div className="item group">
                    <Link href="/hesabim/siparislerim">
                      <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                        <span>
                          <IcoCart />
                        </span>
                      </div>
                    </Link>
                  </div>

                  <div className="item group">
                    <Link href="/hesabim/adres">
                      <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                        <span>
                          <IcoAdress />
                        </span>
                      </div>
                    </Link>
                  </div>

                  <div className="item group">
                    <Link href="/hesabim/sifredegistir">
                      <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                        <span>
                          <IcoPassword />
                        </span>
                      </div>
                    </Link>
                  </div>

                  <div className="item group">
                    <div
                      className="flex space-x-3 items-center text-qgray hover:text-qblack cursor-pointer"
                      onClick={() => logout()}
                    >
                      <span>
                        <IcoLogout />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="item-body dashboard-wrapper w-full">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilLayout;
