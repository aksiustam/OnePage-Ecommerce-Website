import DataIteration from "./DataIteration";
import ViewMoreTitle from "./ViewMoreTitle";
import ProductCard from "./Cards/ProductCard";
export default function SectionStyleThreeHomeTwo({
  className,
  sectionTitle,
  products,
}) {
  return (
    <div className={`section-style-one ${className || ""}`}>
      <ViewMoreTitle categoryTitle={sectionTitle}>
        <div className="products-section w-full">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-10">
            {products
              .sort((a, b) => b.onclick - a.onclick)
              .slice(0, 6)
              .map((item) => (
                <div data-aos="fade-up" key={item.id}>
                  <ProductCard datas={item} />
                </div>
              ))}
          </div>
        </div>
      </ViewMoreTitle>
    </div>
  );
}
