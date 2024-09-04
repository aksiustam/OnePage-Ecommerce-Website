import SifreClient from "./SifreClient";
import ProfilLayout from "../ProfilLayout";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";
const page = async () => {
  const user = await getCurrentUser();

  if (user !== null) {
    return (
      <ProfilLayout>
        <SifreClient user={user} />
      </ProfilLayout>
    );
  } else {
    redirect("/login");
  }
};

export default page;
