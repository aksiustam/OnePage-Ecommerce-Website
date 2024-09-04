"use server";
import prisma from "@/lib/prismadb";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function setDiscPage(data) {
  try {
    const ayarlar = await prisma.ayarlar.findFirst();

    const formData = {
      bannerUst: data.bannerUst,
      bannerAlt: data.bannerAlt,
      buttonName: data.buttonName,
      buttonUrl: data.buttonUrl,
      checkbox: data.checkbox,
      date: data.date,
      discres: ayarlar.discountpage.discres,
    };

    if (data.discres !== null) {
      await cloudinary.uploader.destroy(ayarlar.discountpage.discres.imageid);
      formData.discres = data.discres;
    }

    await prisma.ayarlar.update({
      where: { id: 1 },
      data: {
        discountpage: formData,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
