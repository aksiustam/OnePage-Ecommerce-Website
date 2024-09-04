import BreadcrumbCom from "../Common/BreadcrumbCom";

export default function PageTitle({ title, breadcrumb = [] }) {
  return (
    <div className="page-title-wrapper bg-[#24003E] w-full h-[155px] pt-10 ">
      <div className="container-x h-full flex flex-col items-start justify-end mx-auto">
        <div className="w-full flex items-center justify-center mb-5">
          <h1 className="text-2xl font-semibold text-slate-50 text-shadow-md">
            {title}
          </h1>
        </div>
        <div className="mt-5">
          <BreadcrumbCom paths={breadcrumb} />
        </div>
      </div>
    </div>
  );
}
