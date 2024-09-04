"use server";
import prisma from "@/lib/prismadb";

export default async function getSiparisMail(email) {
  try {
    const siparis = await prisma.SiparisOrderFinish.findMany({
      where: {
        paymentStatus: "SUCCESS",
      },
    });

    const bucket = siparis.filter((item) => item.userinfo.email === email);
    if (bucket.length === 0) return { message: "Bu Mailde Sipariş Yoktur" };

    return bucket;
  } catch (error) {
    throw new Error(error);
  }
}
