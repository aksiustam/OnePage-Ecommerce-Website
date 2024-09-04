"use server";
import prisma from "@/lib/prismadb";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function delProduct(id) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    for (const item of product.images) {
      await cloudinary.uploader.destroy(item.imageid);
    }
    await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
