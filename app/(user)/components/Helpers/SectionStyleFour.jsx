import ProductCardRow from "./Cards/ProductCardRow";
import ViewMoreTitle from "./ViewMoreTitle";

export default function SectionStyleFour({
  className,
  products,
  sectionTitle,
}) {
  return (
    <div className={`section-style-one ${className || ""}`}>
      <ViewMoreTitle categoryTitle={sectionTitle}>
        <div className="products-section w-full">
          <div className="grid lg:grid-cols-3 grid-cols-1 xl:gap-[30px] lg:gap-5">
            <div className="item-col">
              {products
                .sort((a, b) => b.sells - a.sells)
                .slice(0, 4)
                .map((item) => (
                  <div data-aos="fade-up" key={item.id}>
                    <ProductCardRow datas={item} />
                  </div>
                ))}
            </div>
            <div className="item-col">
              {products
                .sort((a, b) => b.sells - a.sells)
                .slice(4, 8)
                .map((item) => (
                  <div data-aos="fade-up" key={item.id}>
                    <ProductCardRow datas={item} />
                  </div>
                ))}
            </div>
            <div className="item-col">
              {products
                .sort((a, b) => b.sells - a.sells)
                .slice(8, 12)
                .map((item) => (
                  <div data-aos="fade-up" key={item.id}>
                    <ProductCardRow datas={item} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </ViewMoreTitle>
    </div>
  );
}
