"use client";
import { useState } from "react";
import Switch from "../components/AdminSwitch";
import Swal from "sweetalert2";
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
import {
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
  FaRegEdit,
} from "react-icons/fa";
import "./tablecss.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import updateDiscProducts from "@/app/actions/Products/updateDiscProducts";
const DiscProductsClient = (props) => {
  const { products, settings } = props;
  const [productData, setProductData] = useState(products);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const disc = settings?.discountset;
  const [sendData, setSendData] = useState([]);

  const filteredData =
    search === ""
      ? productData
      : productData?.filter(
          (data) =>
            data?.name?.toLowerCase().includes(search?.toLowerCase()) ||
            data?.id?.toString().includes(search?.toLowerCase())
        );
  const data = { nodes: filteredData };

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme({
    ...materialTheme,
    Table: `
      --data-table-library_grid-template-columns: repeat(9, 1fr);
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
        ID: (array) => array.sort((a, b) => b.sells - a.sells),
        NAME: (array) => array.sort((a, b) => a?.name?.localeCompare(b?.name)),
        IND: (array) =>
          array.sort(
            (a, b) =>
              (a.indirim === true ? -1 : 1) - (b.indirim === true ? -1 : 1)
          ),
        IND1: (array) =>
          array.sort(
            (a, b) =>
              (String(disc?.indirim1) === String(a.indirimsize) ? -1 : 1) -
              (String(disc?.indirim1) === String(b.indirimsize) ? -1 : 1)
          ),
        IND2: (array) =>
          array.sort(
            (a, b) =>
              (String(disc?.indirim2) === String(a.indirimsize) ? -1 : 1) -
              (String(disc?.indirim2) === String(b.indirimsize) ? -1 : 1)
          ),
        IND3: (array) =>
          array.sort(
            (a, b) =>
              (String(disc?.indirim3) === String(a.indirimsize) ? -1 : 1) -
              (String(disc?.indirim3) === String(b.indirimsize) ? -1 : 1)
          ),
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

  const changeIndirim = (id) => {
    setProductData((prevProductData) => {
      let upindex = null;
      // Product data üzerinde map işlemi yaparak güncelleme veya ekleme yapılacak
      const updatedProductData = prevProductData.map((item, index) => {
        if (item.id === id) {
          upindex = index;
          // Eğer id eşleşirse, indirim durumu güncellenir
          return { ...item, indirim: !item.indirim };
        } else {
          return item;
        }
      });

      const updatedItem = updatedProductData[upindex];

      setSendData((prevSendData) => {
        const index = prevSendData.findIndex((item) => item.id === id);

        if (index !== -1) {
          // Eğer id eşleşen bir öğe varsa, sendData dizisinde güncelle
          const updatedSendData = [...prevSendData];
          updatedSendData[index] = updatedItem;
          return updatedSendData;
        } else {
          // Eğer eşleşen bir öğe yoksa, sendData dizisine yeni öğe ekle
          return [...prevSendData, updatedItem];
        }
      });

      return updatedProductData;
    });
  };

  const changeDisc1 = (id) => {
    setProductData((prevProductData) => {
      let upindex = null;
      // Product data üzerinde map işlemi yaparak güncelleme veya ekleme yapılacak
      const updatedProductData = prevProductData.map((item, index) => {
        if (item.id === id) {
          upindex = index;
          // Eğer id eşleşirse, indirim durumu güncellenir

          const sarjinprice = Math.ceil(
            item.price.sarjprice -
              item.price.sarjprice * (parseInt(disc.indirim1) / 100)
          );
          const fisinprice = Math.ceil(
            item.price.fisprice -
              item.price.fisprice * (parseInt(disc.indirim1) / 100)
          );
          const isikinprice = Math.ceil(
            item.price.isikprice -
              item.price.isikprice * (parseInt(disc.indirim1) / 100)
          );
          return {
            ...item,
            price: {
              ...item.price,
              sarjinprice: sarjinprice,
              fisinprice: fisinprice,
              isikinprice: isikinprice,
            },

            indirimsize: disc?.indirim1?.toString(),
          };
        } else {
          return item;
        }
      });

      const updatedItem = updatedProductData[upindex];

      setSendData((prevSendData) => {
        const index = prevSendData.findIndex((item) => item.id === id);

        if (index !== -1) {
          // Eğer id eşleşen bir öğe varsa, sendData dizisinde güncelle
          const updatedSendData = [...prevSendData];
          updatedSendData[index] = updatedItem;
          return updatedSendData;
        } else {
          // Eğer eşleşen bir öğe yoksa, sendData dizisine yeni öğe ekle
          return [...prevSendData, updatedItem];
        }
      });
      return updatedProductData;
    });
  };
  const changeDisc2 = (id) => {
    setProductData((prevProductData) => {
      let upindex = null;
      // Product data üzerinde map işlemi yaparak güncelleme veya ekleme yapılacak
      const updatedProductData = prevProductData.map((item, index) => {
        if (item.id === id) {
          upindex = index;
          // Eğer id eşleşirse, indirim durumu güncellenir
          const sarjinprice = Math.ceil(
            item.price.sarjprice -
              item.price.sarjprice * (parseInt(disc.indirim2) / 100)
          );
          const fisinprice = Math.ceil(
            item.price.fisprice -
              item.price.fisprice * (parseInt(disc.indirim2) / 100)
          );
          const isikinprice = Math.ceil(
            item.price.isikprice -
              item.price.isikprice * (parseInt(disc.indirim2) / 100)
          );
          return {
            ...item,
            price: {
              ...item.price,
              sarjinprice: sarjinprice,
              fisinprice: fisinprice,
              isikinprice: isikinprice,
            },

            indirimsize: disc?.indirim2?.toString(),
          };
        } else {
          return item;
        }
      });

      const updatedItem = updatedProductData[upindex];

      setSendData((prevSendData) => {
        const index = prevSendData.findIndex((item) => item.id === id);

        if (index !== -1) {
          // Eğer id eşleşen bir öğe varsa, sendData dizisinde güncelle
          const updatedSendData = [...prevSendData];
          updatedSendData[index] = updatedItem;
          return updatedSendData;
        } else {
          // Eğer eşleşen bir öğe yoksa, sendData dizisine yeni öğe ekle
          return [...prevSendData, updatedItem];
        }
      });

      return updatedProductData;
    });
  };

  const changeDisc3 = (id) => {
    setProductData((prevProductData) => {
      let upindex = null;
      // Product data üzerinde map işlemi yaparak güncelleme veya ekleme yapılacak
      const updatedProductData = prevProductData.map((item, index) => {
        if (item.id === id) {
          upindex = index;
          // Eğer id eşleşirse, indirim durumu güncellenir
          const sarjinprice = Math.ceil(
            item.price.sarjprice -
              item.price.sarjprice * (parseInt(disc.indirim3) / 100)
          );
          const fisinprice = Math.ceil(
            item.price.fisprice -
              item.price.fisprice * (parseInt(disc.indirim3) / 100)
          );
          const isikinprice = Math.ceil(
            item.price.isikprice -
              item.price.isikprice * (parseInt(disc.indirim3) / 100)
          );
          return {
            ...item,
            price: {
              ...item.price,
              sarjinprice: sarjinprice,
              fisinprice: fisinprice,
              isikinprice: isikinprice,
            },

            indirimsize: disc?.indirim3?.toString(),
          };
        } else {
          return item;
        }
      });

      const updatedItem = updatedProductData[upindex];

      setSendData((prevSendData) => {
        const index = prevSendData.findIndex((item) => item.id === id);

        if (index !== -1) {
          // Eğer id eşleşen bir öğe varsa, sendData dizisinde güncelle
          const updatedSendData = [...prevSendData];
          updatedSendData[index] = updatedItem;
          return updatedSendData;
        } else {
          // Eğer eşleşen bir öğe yoksa, sendData dizisine yeni öğe ekle
          return [...prevSendData, updatedItem];
        }
      });

      return updatedProductData;
    });
  };

  const productSave = async () => {
    if (sendData.length === 0)
      await Swal.fire({
        icon: "error",
        title: "Bir Yeri Değiştirin",
        showConfirmButton: false,
        timer: 1500,
      });
    else {
      const filterdata = sendData.filter((item) => item !== undefined);
      const res = await updateDiscProducts(filterdata);
      if (res === true) {
        await Swal.fire({
          icon: "success",
          title: "Başarıyla Kaydedildi",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: res.message,
        });
      }
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col w-full pt-4">
      <div className="flex flex-wrap">
        <div className="w-1/2">
          <div
            className="w-[119px] h-10 cursor-pointer"
            onClick={() => productSave()}
          >
            <div className="yellow-btn inline-flex space-x-2 items-center">
              <span className="text-sm font-600 tracking-wide leading-7">
                Kaydet
              </span>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex justify-end space-x-4">
          {/* <Link href={"/admin/disc/pageup"} className=" h-10 cursor-pointer">
            <div className="px-6 yellow-btn inline-flex space-x-2 items-center">
              <span className="text-sm font-600 tracking-wide leading-7">
                İndirim Yeri düzenle
              </span>
              <FaArrowRight size={12} />
            </div>
          </Link> */}
          <Link href={"/admin/disc/update"} className="h-10 cursor-pointer">
            <div className="px-6 yellow-btn inline-flex space-x-2 items-center">
              <span className="text-sm font-600 tracking-wide leading-7">
                İndirim Değiştir
              </span>
              <FaArrowRight size={12} />
            </div>
          </Link>
        </div>
      </div>
      <div className="w-full mt-2">
        <input
          type="text"
          id="product_name"
          className="w-full h-12 bg-slate-200 px-4"
          placeholder="Ara"
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
                  <HeaderCellSort>
                    <span className=" text-gray-600 text-center">Resim</span>
                  </HeaderCellSort>
                  <HeaderCellSort sortKey="NAME">
                    <span className="text-sm text-gray-600 text-center">
                      Ad
                    </span>
                  </HeaderCellSort>
                  <HeaderCellSort>
                    <span className="text-sm text-gray-600 text-center">
                      Fiyat (Sarj / Fiş / Işıksız)
                    </span>
                  </HeaderCellSort>
                  <HeaderCellSort sortKey="IND">
                    <span className="text-sm text-gray-600 text-center">
                      İndirim Aç/Kapa
                    </span>
                  </HeaderCellSort>
                  <HeaderCellSort sortKey="IND1">
                    <span className="text-sm text-gray-600 text-center">
                      İndirim-1 (%{disc?.indirim1})
                    </span>
                  </HeaderCellSort>
                  <HeaderCellSort sortKey="IND2">
                    <span className="text-sm text-gray-600 text-center">
                      İndirim-2 (%{disc?.indirim2})
                    </span>
                  </HeaderCellSort>
                  <HeaderCellSort sortKey="IND3">
                    <span className="text-sm text-gray-600 text-center">
                      İndirim-3 (%{disc?.indirim3})
                    </span>
                  </HeaderCellSort>
                  <HeaderCellSort sortKey="ID">
                    <span className="text-sm text-gray-600 text-center">
                      Satış Miktarı
                    </span>
                  </HeaderCellSort>
                  <HeaderCellSort>
                    <span className="text-sm text-gray-600 text-center">
                      Düzenle/Sil
                    </span>
                  </HeaderCellSort>
                </HeaderRow>
              </Header>

              <Body>
                {tableList?.map((item) => {
                  return (
                    <Row key={item?.id}>
                      <Cell
                        className="hover:bg-slate-100 cursor-pointer"
                        onClick={() =>
                          router.push(`/admin/product/${item?.id}`)
                        }
                      >
                        <Link href={`/admin/product/${item?.id}`}>
                          <Image
                            src={item?.images[0]?.imageurl}
                            alt="image"
                            width={80}
                            height={80}
                            loading="eager"
                            className="object-contain"
                          />
                        </Link>
                      </Cell>
                      <Cell
                        className="hover:bg-slate-100 cursor-pointer"
                        onClick={() =>
                          router.push(`/admin/product/${item?.id}`)
                        }
                      >
                        <Link href={`/admin/product/${item?.id}`}>
                          {item?.name}
                        </Link>
                      </Cell>
                      <Cell
                        className="hover:bg-slate-100 cursor-pointer"
                        onClick={() =>
                          router.push(`/admin/product/${item?.id}`)
                        }
                      >
                        {item?.indirim === true ? (
                          <>
                            {(item.price.sarjinprice &&
                              item.price.sarjinprice) ||
                              0}{" "}
                            ₺ /{" "}
                            {(item.price.fisinprice && item.price.fisinprice) ||
                              0}{" "}
                            ₺ /{" "}
                            {(item.price.isikinprice &&
                              item.price.isikinprice) ||
                              0}{" "}
                            ₺
                          </>
                        ) : (
                          <>
                            {(item.price.sarjprice && item.price.sarjprice) ||
                              0}{" "}
                            ₺ /{" "}
                            {(item.price.fisprice && item.price.sarjprice) || 0}{" "}
                            ₺ /{" "}
                            {(item.price.isikprice && item.price.isikprice) ||
                              0}{" "}
                            ₺
                          </>
                        )}
                      </Cell>
                      <Cell>
                        <Switch
                          value={item.indirim}
                          handleCheckChange={() => changeIndirim(item.id)}
                        />
                      </Cell>
                      <Cell>
                        <Switch
                          value={
                            String(disc?.indirim1) === String(item.indirimsize)
                          }
                          handleCheckChange={() => changeDisc1(item.id)}
                        />
                      </Cell>
                      <Cell>
                        <Switch
                          value={
                            String(disc?.indirim2) === String(item.indirimsize)
                          }
                          handleCheckChange={() => changeDisc2(item.id)}
                        />
                      </Cell>
                      <Cell>
                        <Switch
                          value={
                            String(disc?.indirim3) === String(item.indirimsize)
                          }
                          handleCheckChange={() => changeDisc3(item.id)}
                        />
                      </Cell>
                      <Cell>{item?.sells || 0}</Cell>
                      <Cell>
                        <button
                          onClick={() => {
                            router.push(`/admin/product/${item?.id}`);
                          }}
                        >
                          <FaRegEdit size={26} color="green" />
                        </button>
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
  );
};

export default DiscProductsClient;
