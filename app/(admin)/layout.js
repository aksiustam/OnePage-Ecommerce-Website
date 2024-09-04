import { Inter } from "next/font/google";
import "@/app/(user)/globals.css";
import Layout from "./admin/components/Layout";
import { getCurrentUser } from "../actions/getCurrentUser";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin MayPlastik",
  description: "MayPlastik admin paneli",
  robots: {
    index: false,
    nocache: true,
    follow: false,
  },
};
export default async function SubLayout({ children }) {
  const user = await getCurrentUser();

  if (user === null) {
    redirect("/login");
  } else {
    if (user !== null && user.Role === "ADMIN") {
      return (
        <html lang="tr">
          <body className={inter.className}>
            <Layout>{children}</Layout>
          </body>
        </html>
      );
    } else {
      return (
        <html lang="tr">
          <body className={inter.className}></body>
        </html>
      );
    }
  }
}
