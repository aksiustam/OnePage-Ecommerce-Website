"use server";
import prisma from "@/lib/prismadb";

export default async function setDiscUp(data) {
  try {
    const formData = {
      indirim1: data.indirim1,
      indirim2: data.indirim2,
      indirim3: data.indirim3,
    };
    await prisma.ayarlar.update({
      where: { id: 1 },
      data: {
        discountset: formData,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
