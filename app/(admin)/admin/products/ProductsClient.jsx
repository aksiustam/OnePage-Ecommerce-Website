"use client";
import { useState } from "react";
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
  FaChevronDown,
  FaChevronUp,
  FaRegEdit,
  FaRegTrashAlt,
} from "react-icons/fa";
import "./tablecss.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AdminSwitch from "../components/AdminSwitch";
import { FaArrowRight } from "react-icons/fa";

import updateSpecProducts from "@/app/actions/Products/updateSpecProducts";
import delProduct from "@/app/actions/Products/delProduct";
const ProductsClient = (props) => {
  const pdata = props.products || [];
  const [productData, setProductData] = useState(pdata);
  const router = useRouter();

  const [search, setSearch] = useState("");
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
        STOCK: (array) => array.sort((a, b) => b.stock - a.stock),
        SELLS: (array) => array.sort((a, b) => b.sells - a.sells),
        CLICK: (array) => array.sort((a, b) => b.onclick - a.onclick),
        NAME: (array) => array.sort((a, b) => a?.name?.localeCompare(b?.name)),
        IND: (array) =>
          array.sort(
            (a, b) =>
              (a.indirim === true ? -1 : 1) - (b.indirim === true ? -1 : 1)
          ),
        ILK: (array) =>
          array.sort(
            (a, b) => (a.ilk === true ? -1 : 1) - (b.ilk === true ? -1 : 1)
          ),
        YENI: (array) =>
          array.sort(
            (a, b) => (a.yeni === true ? -1 : 1) - (b.yeni === true ? -1 : 1)
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
      // Product data üzerinde map işlemi yaparak güncelleme veya ekleme yapılacak
      let upindex = null;
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
  const changeYeni = (id) => {
    setProductData((prevProductData) => {
      let upindex = null;
      // Product data üzerinde map işlemi yaparak güncelleme veya ekleme yapılacak
      const updatedProductData = prevProductData.map((item, index) => {
        if (item.id === id) {
          upindex = index;
          // Eğer id eşleşirse, indirim durumu güncellenir
          return { ...item, yeni: !item.yeni };
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
  const changeIlk = (id) => {
    setProductData((prevProductData) => {
      let upindex = null;
      // Product data üzerinde map işlemi yaparak güncelleme veya ekleme yapılacak
      const updatedProductData = prevProductData.map((item, index) => {
        if (item.id === id) {
          upindex = index;
          // Eğer id eşleşirse, indirim durumu güncellenir
          return { ...item, ilk: !item.ilk };
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

  const productDelete = async (item) => {
    Swal.fire({
      title: item.name + " Adlı Ürün Silinecek!! ",
      showDenyButton: true,
      confirmButtonText: "Sil",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await delProduct(item?.id);
        if (res === true) {
          await Swal.fire({
            icon: "success",
            title: "Başarıyla Silindi",
            showConfirmButton: false,
            timer: 1500,
          });
          router.refresh();
        } else {
          Swal.fire({
            icon: "error",
            title: res.message,
          });
        }
      }
    });
  };

  const productSave = async () => {
    if (sendData?.length === 0)
      await Swal.fire({
        icon: "error",
        title: "Bir Yeri Değiştirin",
        showConfirmButton: false,
        timer: 1500,
      });
    else {
      const filterdata = sendData.filter((item) => item !== undefined);

      const res = await updateSpecProducts(filterdata);
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
    <>
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
          <div className="w-1/2 flex justify-end">
            <Link
              href={"/admin/products/add"}
              className="w-[119px] h-10 cursor-pointer"
            >
              <div className="yellow-btn inline-flex space-x-2 items-center">
                <span className="text-sm font-600 tracking-wide leading-7">
                  Ürün Ekle
                </span>
                <FaArrowRight size={12} />
              </div>
            </Link>
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
                    <HeaderCellSort>
                      <span className="text-gray-600 text-center">Resim</span>
                    </HeaderCellSort>
                    <HeaderCellSort sortKey="NAME">
                      <span className="text-sm text-gray-600 text-center">
                        Ad
                      </span>
                    </HeaderCellSort>
                    <HeaderCellSort sortKey="IND">
                      <span className="text-sm text-gray-600 text-center">
                        İndirim
                      </span>
                    </HeaderCellSort>
                    <HeaderCellSort sortKey="ILK">
                      <span className="text-sm text-gray-600 text-center">
                        İlk Gösterilen / Trend Ürünler
                      </span>
                    </HeaderCellSort>
                    <HeaderCellSort sortKey="YENI">
                      <span className="text-sm text-gray-600 text-center">
                        Yeni Ürünler
                      </span>
                    </HeaderCellSort>
                    <HeaderCellSort sortKey="STOCK">
                      <span className="text-sm text-gray-600 text-center">
                        Stock Sayısı
                      </span>
                    </HeaderCellSort>
                    <HeaderCellSort sortKey="SELLS">
                      <span className="text-sm text-gray-600 text-center">
                        Satış Miktarı
                      </span>
                    </HeaderCellSort>
                    <HeaderCellSort sortKey="CLICK">
                      <span className="text-sm text-gray-600 text-center">
                        Tıklama Miktarı
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
                          <Link href={`/admin/product/${item.id}`}>
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
                          <Link href={`/admin/product/${item.id}`}>
                            {item?.name}
                          </Link>
                        </Cell>
                        <Cell>
                          <AdminSwitch
                            value={item?.indirim}
                            handleCheckChange={() => changeIndirim(item?.id)}
                          />
                        </Cell>
                        <Cell>
                          <AdminSwitch
                            value={item?.ilk}
                            handleCheckChange={() => changeIlk(item.id)}
                          />
                        </Cell>
                        <Cell>
                          <AdminSwitch
                            value={item?.yeni}
                            handleCheckChange={() => changeYeni(item?.id)}
                          />
                        </Cell>
                        <Cell>{item?.stock || 0}</Cell>
                        <Cell>{item?.sells || 0}</Cell>
                        <Cell>{item?.onclick || 0}</Cell>
                        <Cell>
                          <button
                            onClick={() => {
                              router.push(`/admin/product/${item?.id}`);
                            }}
                          >
                            <FaRegEdit size={26} color="green" />
                          </button>

                          <button onClick={() => productDelete(item)}>
                            <FaRegTrashAlt size={26} color="red" />
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
    </>
  );
};

export default ProductsClient;
