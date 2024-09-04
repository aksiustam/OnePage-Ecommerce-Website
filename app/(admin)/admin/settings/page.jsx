import getRef from "@/app/actions/Referanslar/getRef";
import SettingsClient from "./SettingsClient";
import getSettings from "@/app/actions/getSettings";
export const dynamic = "force-dynamic";
const page = async () => {
  const settings = await getSettings();
  const referans = await getRef();

  return <SettingsClient settings={settings} referans={referans} />;
};

export default page;
