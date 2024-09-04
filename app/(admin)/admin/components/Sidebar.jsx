"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMiniBars3 } from "react-icons/hi2";
import { BiWorld } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FaChessPawn } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { BiAperture } from "react-icons/bi";
import { MdDiscount } from "react-icons/md";
import { FaShopify } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import { MdConnectWithoutContact } from "react-icons/md";
export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const pathname = usePathname();

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6 ">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none  rounded border border-solid "
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <HiMiniBars3 size={24} />
          </button>
          {/* Brand */}
          <Link
            href="/admin"
            className="md:flex text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
          >
            Admin Paneli
          </Link>

          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    href="/admin"
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                  >
                    Admin Paneli
                  </Link>
                </div>

                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none  rounded border border-solid"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <HiMiniBars3 size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            {/* <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              GENEL
            </h6> */}
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  href="/"
                  className={
                    "text-xs uppercase py-3 font-bold flex flex-row items-center justify-start " +
                    (pathname.indexOf("/home") !== -1
                      ? "text-yellow-500 hover:text-yellow-600"
                      : "hover:text-yellow-500")
                  }
                >
                  <BiWorld size={24} className={"mr-2 "} />
                  WEBSİTE
                </Link>
              </li>
              <li className="items-center">
                <Link
                  href="/admin"
                  className={
                    "text-xs uppercase py-3 font-bold flex flex-row items-center justify-start " +
                    (pathname === "/admin"
                      ? "text-yellow-500 hover:text-yellow-600"
                      : "hover:text-yellow-500")
                  }
                >
                  <FaHome size={24} className={"mr-2 "} />
                  ANASAYFA
                </Link>
              </li>
              <li className="items-center">
                <Link
                  href="/admin/products"
                  className={
                    "text-xs uppercase py-3 font-bold flex flex-row items-center justify-start " +
                    (pathname.indexOf("/products") !== -1
                      ? "text-yellow-500 hover:text-yellow-600"
                      : "hover:text-yellow-600")
                  }
                >
                  <FaChessPawn size={24} className={"mr-2 "} />
                  ÜRÜNLER
                </Link>
              </li>
              <li className="items-center">
                <Link
                  href="/admin/disc"
                  className={
                    "text-xs uppercase py-3 font-bold flex flex-row items-center justify-start " +
                    (pathname.indexOf("/admin/disc") !== -1
                      ? "text-yellow-500 hover:text-yellow-600"
                      : "hover:text-yellow-500")
                  }
                >
                  <MdDiscount size={24} className={"mr-2 "} />
                  İNDİRİM AYARLARI
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-2 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              SATIŞ
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  href="/admin/orders"
                  className={
                    "text-xs uppercase py-3 font-bold flex flex-row items-center justify-start " +
                    (pathname.indexOf("/admin/orders") !== -1
                      ? "text-yellow-500 hover:text-yellow-600"
                      : "hover:text-yellow-500")
                  }
                >
                  <FaShopify size={24} className={"mr-2 "} />
                  SİPARİŞLER
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-2 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              AYARLAR
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  href="/admin/category"
                  className={
                    "text-xs uppercase py-3 font-bold flex flex-row items-center justify-start " +
                    (pathname.indexOf("/admin/category") !== -1
                      ? "text-yellow-500 hover:text-yellow-600"
                      : "hover:text-yellow-500")
                  }
                >
                  <MdOutlineCategory size={24} className={"mr-2 "} />
                  KATEGORİLER
                </Link>
              </li>
              <li className="items-center">
                <Link
                  href="/admin/settings"
                  className={
                    "text-xs uppercase py-3 font-bold flex flex-row items-center justify-start " +
                    (pathname.indexOf("/admin/settings") !== -1
                      ? "text-yellow-500 hover:text-yellow-600"
                      : "hover:text-yellow-500")
                  }
                >
                  <BiAperture size={24} className={"mr-2 "} />
                  SİTE AYARLARI
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-2 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              DİĞER
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  href="/admin/users"
                  className={
                    "text-xs uppercase py-3 font-bold flex flex-row items-center justify-start " +
                    (pathname.indexOf("/admin/users") !== -1
                      ? "text-yellow-500 hover:text-yellow-600"
                      : "hover:text-yellow-500")
                  }
                >
                  <FaHouseUser size={24} className={"mr-2 "} />
                  KULLANICILAR
                </Link>
              </li>
              <li className="items-center">
                <Link
                  href="/admin/contact"
                  className={
                    "text-xs uppercase py-3 font-bold flex flex-row items-center justify-start " +
                    (pathname.indexOf("/admin/contact") !== -1
                      ? "text-yellow-500 hover:text-yellow-600"
                      : "hover:text-yellow-500")
                  }
                >
                  <MdConnectWithoutContact size={24} className={"mr-2 "} />
                  İLETİŞİM
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
