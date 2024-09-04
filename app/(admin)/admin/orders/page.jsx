import getOrderFinish from "@/app/actions/Order/getOrderFinish";
import OrderClient from "./OrderClient";
export const dynamic = "force-dynamic";
const page = async () => {
  const siparis = await getOrderFinish();

  return (
    <>
      <main>
        <OrderClient siparis={siparis} />
      </main>
    </>
  );
};

export default page;
