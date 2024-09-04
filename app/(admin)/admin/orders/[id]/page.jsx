import getOrderOne from "../../../../actions/Order/getOrderOne";
import OrderDetailClient from "./OrderDetailClient";
const page = async ({ params }) => {
  const { id } = params;
  const siparis = await getOrderOne(id);

  return (
    <>
      <main>
        <OrderDetailClient siparis={siparis} />
      </main>
    </>
  );
};

export default page;
