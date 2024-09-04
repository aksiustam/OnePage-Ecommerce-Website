"use client";
import { useState } from "react";
import Banner from "./comp/Banner";
import Referanslar from "./comp/Referanslar";
const SettingsClient = (props) => {
  const { settings, referans } = props;

  const [openTab, setOpenTab] = useState(1);
  return (
    <div className="flex flex-wrap">
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
              href="#banner"
              role="tablist"
            >
              Banner
            </a>
          </li>
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 2
                  ? "text-black bg-gray-400"
                  : "text-black bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle="tab"
              href="#referanslar"
              role="tablist"
            >
              Referanslar
            </a>
          </li>
        </ul>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="px-4 py-5 flex-auto">
            <div className="tab-content tab-space">
              <div className={openTab === 1 ? "block" : "hidden"} id="Banner">
                <Banner settings={settings} />
              </div>
              <div
                className={openTab === 2 ? "block" : "hidden"}
                id="Referanslar"
              >
                <Referanslar referans={referans} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsClient;
