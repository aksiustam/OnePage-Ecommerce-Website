"use client";

import { useState } from "react";
import UserTable from "./UserTable";
import cronJobUser from "../../../actions/AdminUser/cronJobUser";
import Swal from "sweetalert2";
import Link from "next/link";

const UserClient = (props) => {
  const { users } = props;
  const [openTab, setOpenTab] = useState(1);
  const cronJob = async () => {
    const res = await cronJobUser();
    if (res === true)
      await Swal.fire({
        icon: "success",
        title: "Bellek Boşaltıldı!",
        showConfirmButton: false,
        timer: 700,
      });
  };
  return (
    <div className="flex flex-wrap flex-col">
      <div className="w-full h-8 flex items-center justify-start gap-4">
        <div className="tw-w-40 h-8">
          <button
            type="button"
            className="yellow-btn inline-flex space-x-2 items-center px-5"
          >
            <Link href="/admin/users/mail">Mail Gönder</Link>
          </button>
        </div>
        <div className="tw-w-40 h-8">
          <button
            type="button"
            className="yellow-btn inline-flex space-x-2 items-center px-5"
          >
            <Link href="/admin/users/allmail">Toplu Mail Gönder</Link>
          </button>
        </div>
        <div className="tw-w-40 h-8">
          <button
            type="button"
            className="yellow-btn inline-flex space-x-2 items-center px-5"
            onClick={() => cronJob()}
          >
            Kullanıcı Bellek Boşalt
          </button>
        </div>
      </div>
      <div className="w-full">
        <ul
          className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
          role="tablist"
        >
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 1
                  ? "text-black bg-gray-400"
                  : "text-black bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#user"
              role="tablist"
            >
              Kullanıcılar
            </a>
          </li>
        </ul>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="px-4 py-5 flex-auto">
            <div className="tab-content tab-space">
              <div className={openTab === 1 ? "block" : "hidden"} id="user">
                <UserTable users={users} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserClient;
