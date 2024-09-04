"use server";
import prisma from "@/lib/prismadb";

export default async function putOrder(data) {
  try {
    await prisma.SiparisOrderFinish.update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
        error: data.message,
      },
    });
    return true;
  } catch (error) {
    throw new Error(error);
  }
}
