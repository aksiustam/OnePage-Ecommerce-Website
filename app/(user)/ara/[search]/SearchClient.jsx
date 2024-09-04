"use client";

import ProductCard from "../../components/Helpers/Cards/ProductCard";

const SearchClient = (props) => {
  const { products, search } = props;
  let decodedSearch = decodeURIComponent(search);
  const filterProducts =
    products?.filter(
      (product) =>
        product?.name
          ?.toLowerCase()
          .replace(/\s/g, "")
          .includes(decodedSearch?.toLowerCase().replace(/\s/g, "")) ||
        product?.slug
          ?.toLowerCase()
          .replace(/\s/g, "")
          .includes(decodedSearch?.toLowerCase().replace(/\s/g, ""))
    ) || [];

  return (
    <div>
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
        {filterProducts?.map((item) => (
          <div data-aos="fade-up" key={item.id}>
            <ProductCard datas={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchClient;
