import Empty from "./Empty";

export default function EmptyCardError() {
  return (
    <div className="empty-card-wrapper w-full">
      <div className="flex justify-center items-center w-full">
        <div>
          <div className="sm:mb-10 mb-5 transform scale-50 sm:scale-100">
            <Empty />
          </div>
          <div data-aos="fade-up" className="empty-content w-full">
            <h1 className="sm:text-xl text-base font-semibold text-center mb-5">
              Sepetiniz Boş!
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
