"use server";
import prisma from "@/lib/prismadb";

export default async function getOrderFinish() {
  try {
    const cont = await prisma.SiparisOrderFinish.findMany();

    return cont;
  } catch (error) {
    throw new Error(error);
  }
}
