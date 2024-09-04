"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  Cell,
} from "@table-library/react-table-library/table";
import {
  useSort,
  HeaderCellSort,
  SortToggleType,
} from "@table-library/react-table-library/sort";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useTheme } from "@table-library/react-table-library/theme";
import {
  DEFAULT_OPTIONS,
  getTheme,
} from "@table-library/react-table-library/material-ui";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./tablecss.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
const OrderClient = (props) => {
  const siparis = props.siparis;

  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const firstCreatedAt =
      siparis?.length > 0
        ? new Date(siparis[siparis?.length - 1].createdAt)
            .toISOString()
            .split("T")[0]
        : "";
    setStartDate(firstCreatedAt);
  }, [siparis]);

  const [startDate, setStartDate] = useState("");
  const enddDate = new Date();

  enddDate.setDate(enddDate.getDate() + 1);

  const updatedEndDate = enddDate.toISOString().split("T")[0];
  const [endDate, setEndDate] = useState(updatedEndDate);
  useEffect(() => {
    const filt = siparis.filter((item) => {
      const sipDate = new Date(item?.createdAt);
      return sipDate >= new Date(startDate) && sipDate <= new Date(endDate);
    });
    setFilterSiparis(filt);
  }, [siparis, startDate, endDate]);

  const [filtersiparis, setFilterSiparis] = useState([]);

  const filteredData =
    search === ""
      ? filtersiparis
      : filtersiparis?.filter(
          (item) =>
            item?.id === parseInt(search) ||
            item?.paymentId?.includes(search?.toLowerCase())
        );

  const data = { nodes: filteredData };

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme({
    ...materialTheme,
    Table: `
      --data-table-library_grid-template-columns: repeat(6, 1fr);
    `,
  });
  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortIcon: {
        iconDefault: null,
        iconUp: <FaChevronUp />,
        iconDown: <FaChevronDown />,
      },
      sortToggleType: SortToggleType.AlternateWithReset,
      sortFns: {
        ID: (array) => array.sort((a, b) => a.id - b.id),
        PAYID: (array) =>
          array.sort((a, b) => a?.paymentId?.localeCompare(b?.paymentId)),
        URUN: (array) =>
          array.sort((a, b) =>
            a?.basket[0]?.name?.localeCompare(b?.basket[0]?.name)
          ),
        DURUM: (array) =>
          array.sort((a, b) =>
            a?.paymentStatus?.localeCompare(b?.paymentStatus)
          ),
        MAIL: (array) =>
          array.sort((a, b) => a?.sendmail?.localeCompare(b?.sendmail)),
        DATE: (array) => array.sort((a, b) => a.createdAt - b.createdAt),
      },
    }
  );

  function onSortChange(action, state) {
    //console.log(action, state);
  }
  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 10,
    },
    onChange: onPaginationChange,
  });
  function onPaginationChange(action, state) {}

  const totalPage = pagination?.state?.getTotalPages(data.nodes);

  return (
    <>
      <div className="flex flex-col w-full pt-4">
        <div className="flex flex-wrap">
          <div className="w-2/4 flex gap-3">
            <div className="w-1/2 space-x-2 items-center flex">
              <input
                type="date"
                id="date_new"
                className="w-full h-full px-4 py-2 bg-slate-200"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <div>&</div>
            </div>
            <div className="w-1/2 space-x-2 items-center flex">
              <input
                type="date"
                id="date_old"
                className="w-full h-full px-4 py-2 bg-slate-200"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <div className="text-nowrap">Tarihleri Arasında</div>
            </div>
          </div>
        </div>
        <div className="w-full mt-2">
          <input
            type="text"
            placeholder="Ara"
            className="w-full h-12 bg-slate-200 px-4"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex w-full overflow-x-scroll">
          <Table
            data={data}
            sort={sort}
            theme={theme}
            pagination={pagination}
            layout={{ custom: true, horizontalScroll: true }}
          >
            {(tableList) => (
              <>
                <Header>
                  <HeaderRow>
                    <HeaderCellSort sortKey="ID">
                      <span className="text-lg text-gray-600">Sipariş ID</span>
                    </HeaderCellSort>
                    <HeaderCellSort sortKey="PAYID">
                      <span className="text-lg text-gray-600">
                        Iyzico PaymentID
                      </span>
                    </HeaderCellSort>
                    <HeaderCellSort sortKey="URUN">
                      <span className="text-lg text-gray-600">Ürünler</span>
                    </HeaderCellSort>
                    <HeaderCellSort sortKey="DURUM">
                      <span className="text-lg text-gray-600">Durum</span>
                    </HeaderCellSort>
                    <HeaderCellSort sortKey="MAIL">
                      <span className="text-lg text-gray-600">Mail</span>
                    </HeaderCellSort>
                    <HeaderCellSort sortKey="DATE">
                      <span className="text-lg text-gray-600">Tarih</span>
                    </HeaderCellSort>
                  </HeaderRow>
                </Header>

                <Body>
                  {tableList?.map((item) => {
                    const mydate = new Date(item?.createdAt);
                    const options = {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    };
                    const formattedDate = mydate?.toLocaleDateString(
                      "tr-TR",
                      options
                    );
                    const formattedTime = mydate.toLocaleTimeString("tr-TR");
                    const time = formattedDate + ", Saat " + formattedTime;

                    return (
                      <Row
                        className="hover:!bg-gray-200 cursor-pointer"
                        onClick={() => router.push(`/admin/orders/${item?.id}`)}
                        key={item?.id}
                      >
                        <Cell
                          onClick={() =>
                            router.push(`/admin/orders/${item?.id}`)
                          }
                        >
                          <Link
                            href={`/admin/orders/${item?.id}`}
                            className="text-blue-600"
                          >
                            #{item?.id}
                          </Link>
                        </Cell>
                        <Cell
                          onClick={() =>
                            router.push(`/admin/orders/${item?.id}`)
                          }
                        >
                          <Link
                            href={`/admin/orders/${item?.id}`}
                            className="text-blue-600"
                          >
                            #{item?.paymentId}
                          </Link>
                        </Cell>
                        <Cell>{item?.basket[0]?.name}</Cell>
                        <Cell>
                          {item?.status === "SUCCESS" && (
                            <span className="text-sm rounded text-blue-500 bg-blue-100 p-2">
                              Beklemede
                            </span>
                          )}
                          {item?.status === "SEND" && (
                            <span className="text-sm rounded text-green-500 bg-green-100 p-2">
                              Gönderildi
                            </span>
                          )}
                          {item?.status === "ERROR" && (
                            <span className="text-sm rounded text-red-500 bg-red-100 p-2">
                              Hata Var
                            </span>
                          )}
                        </Cell>
                        <Cell>{item?.sendmail || "Başarılı"}</Cell>
                        <Cell>
                          <span className="text-wrap">{time}</span>
                        </Cell>
                      </Row>
                    );
                  })}
                </Body>
              </>
            )}
          </Table>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between gap-4 mb-12">
            <span className="font-bold">Toplam Sayfa: {totalPage}</span>
            <div className="flex items-center justify-center gap-2 mr-12">
              <span className="font-bold">
                Sayfa : {pagination?.state?.page + 1}
              </span>

              <button
                type="button"
                className="theme-btn-one p-1 text-xl bg-stone-200 "
                disabled={pagination?.state?.page === 0}
                onClick={() => pagination.fns.onSetPage(0)}
              >
                {"|<"}
              </button>
              <button
                type="button"
                className="theme-btn-one p-1 text-xl bg-stone-200 "
                disabled={pagination?.state?.page === 0}
                onClick={() =>
                  pagination.fns.onSetPage(pagination.state.page - 1)
                }
              >
                {"<"}
              </button>
              <button
                type="button"
                className="theme-btn-one p-1 text-xl bg-stone-200 "
                disabled={pagination?.state?.page + 1 === totalPage}
                onClick={() =>
                  pagination.fns.onSetPage(pagination.state.page + 1)
                }
              >
                {">"}
              </button>
              <button
                type="button"
                className="theme-btn-one p-1 text-xl bg-stone-200 "
                disabled={pagination?.state?.page + 1 === totalPage}
                onClick={() => pagination.fns.onSetPage(totalPage - 1)}
              >
                {">|"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderClient;
