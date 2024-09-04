"use server";
import prisma from "@/lib/prismadb";

export default async function getSettings() {
  try {
    const ayarlar = await prisma.ayarlar.findFirst();

    return ayarlar;
  } catch (error) {
    throw new Error(error);
  }
}
