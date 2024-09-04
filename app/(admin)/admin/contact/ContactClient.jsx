"use client";
import React, { useState } from "react";
import deleteContact from "@/app/actions/Contact/deleteContact";
import { useRouter } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";
import "./contactcss.css";
import Swal from "sweetalert2";
const ContactClient = (props) => {
  const { contact } = props;
  const [message, setMessage] = useState("");
  const router = useRouter();

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(contact?.length / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  const generatePageGroups = () => {
    const pageGroups = [];
    for (let i = 0; i < totalPages; i += 5) {
      pageGroups.push(pageNumbers.slice(i, i + 5));
    }
    return pageGroups;
  };

  const pageGroups = generatePageGroups();
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const currentGroup = pageGroups[currentGroupIndex];

  const goToPreviousGroup = () => {
    setCurrentGroupIndex(Math.max(currentGroupIndex - 1, 0));
  };

  const goToNextGroup = () => {
    setCurrentGroupIndex(
      Math.min(currentGroupIndex + 1, pageGroups.length - 1)
    );
  };
  const calculateIndexRange = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const { startIndex, endIndex } = calculateIndexRange();
  const pagiData = contact?.slice(startIndex, endIndex);
  const contactDelete = (data) => {
    Swal.fire({
      title: data.name + "adlı Konu SİLİNECEKTİR!! ",
      showDenyButton: true,
      confirmButtonText: "Sil",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteContact(data);
        if (res === true) {
          Swal.fire({
            icon: "success",
            title: "Başarıyla Silindi",
            showConfirmButton: false,
            timer: 1100,
          });
          router.refresh();
        }
      }
    });
  };
  pagiData?.reverse();
  return (
    <div className="w-full h-full">
      <div className="w-96 h-full text-xl font-bold flex items-center justify-start px-2 py-4">
        İLETİŞİM
      </div>
      <div className="block w-full overflow-x-auto">
        {/* Projects table */}
        <div className="w-full px-2 mb-12">
          <textarea
            rows="4"
            className="w-full border px-2 py-2"
            name="message"
            placeholder="Mesaj"
            value={message}
            readOnly
          ></textarea>
        </div>
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
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
                EMail
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                }
              >
                Konu
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                }
              >
                Düzenle/Sil
              </th>
            </tr>
          </thead>
          <tbody>
            {contact?.map((data) => {
              return (
                <tr key={data?.id} onClick={() => setMessage(data?.not)}>
                  <th className="px-6 whitespace-nowrap p-4 text-left cursor-pointer text-blue-600 ">
                    {data?.name}
                  </th>

                  <td className="px-6 whitespace-nowrap p-4 text-left">
                    {data?.email}
                  </td>
                  <td className="px-6 whitespace-nowrap p-4 text-left">
                    {data?.konu}
                  </td>
                  <td className="px-6 whitespace-nowrap p-4 text-left cursor-pointer">
                    <button onClick={() => contactDelete(data)}>
                      <FaRegTrashAlt size={26} color="red" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="w-full h-full flex items-center justify-center">
          <ul className="pagination">
            {pageNumbers?.length > 1 && (
              <>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#!"
                    onClick={goToPreviousGroup}
                    disabled={currentGroupIndex === 0}
                  >
                    &laquo;
                  </a>
                </li>
              </>
            )}
            {currentGroup?.map((pageNumber) => (
              <li
                key={pageNumber}
                className={`page-item ${page === pageNumber ? "active" : ""}`}
              >
                <a
                  className="page-link"
                  href="#!"
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </a>
              </li>
            ))}
            {pageNumbers?.length > 1 && (
              <>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#!"
                    onClick={goToNextGroup}
                    disabled={currentGroupIndex === pageGroups.length - 1}
                  >
                    &raquo;
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactClient;
