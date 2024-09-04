"use server";
import prisma from "@/lib/prismadb";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function setBannerSettings(data) {
  try {
    const ayarlar = await prisma.ayarlar.findFirst();

    let formData = { images: ayarlar.banner.images, url: data.url };

    if (data.images !== null) {
      for (const image of formData.images) {
        await cloudinary.uploader.destroy(image.imageid);
      }

      formData.images = data.images;
    }

    await prisma.Ayarlar.update({
      where: {
        id: 1,
      },
      data: {
        banner: formData,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
