"use client";
const AdminSwitch = ({ id, value, handleCheckChange }) => {
  return (
    <div className="flex items-center justify-center" key={id}>
      <label className="flex items-center cursor-pointer">
        <div className="relative ">
          <input
            type="checkbox"
            className="sr-only"
            checked={value}
            onChange={handleCheckChange}
          />
          <div
            className={`block  w-12 h-8 rounded-full  border-2 ${
              value ? "bg-green-600" : "bg-gray-600"
            }`}
          ></div>
          <div
            className={`dot absolute left-[6px] top-[6px] bg-white w-5 h-5 rounded-full transition-transform ${
              value ? "transform translate-x-full" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default AdminSwitch;
