"use server";
import prisma from "@/lib/prismadb";

export default async function getOrderBasket(basketid) {
  try {
    const siparis = await prisma.SiparisOrderFinish.findFirst({
      where: {
        basketId: basketid,
      },
    });

    return siparis;
  } catch (error) {
    throw new Error(error);
  }
}
