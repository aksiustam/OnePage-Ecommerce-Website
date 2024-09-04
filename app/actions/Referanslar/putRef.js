"use server";
import prisma from "@/lib/prismadb";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function putRef(data) {
  try {
    await prisma.Referans.update({
      where: { id: data.id },
      data: {
        index: parseInt(data.index),
        name: data.name,
      },
    });

    if (data.imageid !== null && data.imageurl !== null) {
      const ref = await prisma.Referans.findUnique({
        where: {
          id: data.id,
        },
      });

      if (ref.imageid !== null) await cloudinary.uploader.destroy(ref.imageid);

      await prisma.Referans.update({
        where: { id: data.id },
        data: {
          imageid: data.imageid,
          imageurl: data.imageurl,
        },
      });
    }
    return true;
  } catch (error) {
    throw new Error(error);
  }
}
