export default function ViewMoreTitle({
  categoryTitle = "",
  className,
  children,
}) {
  return (
    <div className={`section-wrapper w-full ${className || ""}`}>
      <div className="container-x mx-auto">
        <div className=" section-title flex justify-between items-center mb-5">
          <div>
            <h2 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none">
              {categoryTitle}
            </h2>
          </div>
        </div>
        <div className="section-content">{children && children}</div>
      </div>
    </div>
  );
}
