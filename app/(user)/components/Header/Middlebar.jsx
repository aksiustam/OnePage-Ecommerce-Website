export default function Middlebar({ user, basket }) {
  return (
    <div
      className={`w-full h-[86px] bg-white quomodo-shop-middle-bar lg:block hidden`}
    >
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            {/* <div className="w-[517px] h-[44px]">
              <SearchBox />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
