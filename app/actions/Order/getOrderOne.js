"use server";
import prisma from "@/lib/prismadb";

export default async function getOrderOne(id) {
  try {
    const siparis = await prisma.SiparisOrderFinish.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return siparis;
  } catch (error) {
    throw new Error(error);
  }
}
