"use server";
import prisma from "@/lib/prismadb";

export default async function getOrderToken(token) {
  try {
    const siparis = await prisma.SiparisOrderFinish.findFirst({
      where: {
        token: token,
      },
    });
    if (siparis) return siparis;
    else return null;
  } catch (error) {
    throw new Error(error);
  }
}
