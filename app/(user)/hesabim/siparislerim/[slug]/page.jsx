import getOrderBasket from "../../../../actions/Order/getOrderBasket";
import ProfilLayout from "../../ProfilLayout";
import SiparisDetayClient from "./SiparisDetayClient";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";
const page = async () => {
  const user = await getCurrentUser();
  const siparis = await getOrderBasket();
  if (user !== null) {
    return (
      <ProfilLayout>
        <SiparisDetayClient user={user} siparis={siparis} />
      </ProfilLayout>
    );
  } else {
    redirect("/login");
  }
};

export default page;
