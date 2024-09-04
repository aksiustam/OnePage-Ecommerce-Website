"use server";
import prisma from "@/lib/prismadb";

export default async function setSettings(data) {
  try {
    await prisma.Ayarlar.update({
      where: {
        id: 1,
      },
      data: {
        settings: data,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
