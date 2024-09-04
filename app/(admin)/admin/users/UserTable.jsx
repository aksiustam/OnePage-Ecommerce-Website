import React, { useState } from "react";

import InputCom from "@/app/(user)/components/Helpers/InputCom";
const UserTable = (props) => {
  const [search, setSearch] = useState("");
  const { users } = props;
  const filteredData =
    search === ""
      ? users
      : users?.filter(
          (data) =>
            data?.name?.toLowerCase().includes(search?.toLowerCase()) ||
            data?.lastname?.toLowerCase().includes(search?.toLowerCase()) ||
            data?.email?.toLowerCase().includes(search?.toLowerCase()) ||
            data?.tel?.toLowerCase().includes(search?.toLowerCase())
        );
  return (
    <div className="w-full h-full">
      <div className="block w-full overflow-x-auto">
        {/* Projects table */}
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 px-2 mb-12">
          <InputCom
            label="Ara*"
            name="mailBaslik"
            type="text"
            inputClasses="!h-[50px]"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                }
              >
                Index
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                }
              >
                Ad Soyad
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                }
              >
                Email
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                }
              >
                Telefon
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                }
              >
                Email Onaylı Mı?
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((data) => {
              return (
                <tr key={data?.id}>
                  <th className="px-6 whitespace-nowrap p-4 text-left cursor-pointer text-blue-600 ">
                    #{data?.id}
                  </th>
                  <td className="px-6 whitespace-nowrap p-4 ">
                    {data?.name} {data?.lastname}
                  </td>
                  <td className="px-6 whitespace-nowrap p-4 text-left">
                    {data?.email}
                  </td>
                  <td className="px-6 whitespace-nowrap p-4 text-left">
                    {data?.tel}
                  </td>
                  <td className="px-6 whitespace-nowrap p-4 text-left cursor-pointer">
                    {data?.emailVerified === true ? "Evet" : "Hayır"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
