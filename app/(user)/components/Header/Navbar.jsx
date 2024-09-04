"use client";

import Link from "next/link";
import Cart from "../Cart";
import ThinBag from "../Helpers/icons/ThinBag";
import ThinPeople from "../Helpers/icons/ThinPeople";
import Image from "next/image";
import { MdAdminPanelSettings } from "react-icons/md";
import { useEffect } from "react";
export default function Navbar({ user, basket }) {
  useEffect(() => {
    const header = document.querySelector(".header-section");

    const isSticky = () => {
      const scrollTop = window.scrollY;
      scrollTop >= 75
        ? header.classList.add("is-sticky")
        : header.classList.remove("is-sticky");
    };

    window.addEventListener("scroll", isSticky);

    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);
  return (
    <div
      className={`header-section nav-widget-wrapper w-full z-20 pt-6 pb-3 h-[90px] fixed quomodo-shop-nav-bar lg:block hidden`}
    >
      <div className="container-x mx-auto">
        <div className="w-full h-full relative">
          <div className="w-full h-full flex justify-between items-center">
            <div className="w-[220px] flex items-center justify-center h-full  relative">
              <Link href="/">
                <Image
                  src={"/assets/images/logo.png"}
                  alt=""
                  width={700}
                  height={300}
                  loading="eager"
                  className="object-contain"
                />
              </Link>
            </div>
            <div className="w-[270px] flex space-x-6 items-center justify-end">
              <div className="cart-wrapper group relative py-4">
                <div className="relative">
                  <Link href="/sepet">
                    <span>
                      <ThinBag />
                    </span>
                  </Link>
                  <span
                    className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-zinc-400`}
                  >
                    {basket?.length}
                  </span>
                </div>
                <Cart />
              </div>
              <div>
                <Link href={user !== null ? "/hesabim" : "/login"}>
                  <span>
                    <ThinPeople />
                  </span>
                </Link>
              </div>
              {user !== null && user.Role === "ADMIN" && (
                <div>
                  <Link href={"/admin"}>
                    <span>
                      <MdAdminPanelSettings color="white" size={26} />
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
