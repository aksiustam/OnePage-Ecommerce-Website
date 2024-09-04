import ProfilLayout from "../ProfilLayout";
import SiparisClient from "./SiparisClient";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";
const page = async () => {
  const user = await getCurrentUser();

  if (user !== null) {
    return (
      <ProfilLayout>
        <SiparisClient user={user} />
      </ProfilLayout>
    );
  } else {
    redirect("/login");
  }
};

export default page;
