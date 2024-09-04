import React from "react";

export default function InputCom({
  label,
  type,
  name,
  placeholder,
  children,
  inputHandler,
  value,
  inputClasses,
  labelClasses = "text-qgray text-[13px] font-normal",
  register,
  errors,
  required,
  pattern,
  myerror,
  ...rest
}) {
  return (
    <div className="input-com w-full h-full">
      {label && (
        <label
          className={`input-label capitalize block mb-2 ${labelClasses}`}
          htmlFor={name}
        >
          {label}{" "}
          <span className="text-red-600">{errors?.[name]?.message}</span>
          <span className="text-red-600">{myerror}</span>
        </label>
      )}
      <div className="input-wrapper border border-qgray-border w-full h-fit overflow-hidden relative">
        <input
          placeholder={placeholder}
          value={value || undefined}
          onChange={inputHandler || undefined}
          className={`input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none ${
            inputClasses || ""
          }`}
          type={type}
          id={name}
          {...(register ? register(name, { required, pattern }) : {})}
          {...rest}
        />
        {children}
      </div>
    </div>
  );
}
