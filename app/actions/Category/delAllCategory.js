"use server";
import prisma from "@/lib/prismadb";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function delAllCategory(role, data) {
  try {
    const catbrand = role;

    switch (catbrand) {
      case "category":
        if (data.imageid != null)
          await cloudinary.uploader.destroy(data.imageid);
        await prisma.category.delete({
          where: { id: data.id },
        });

        break;
      case "subcat":
        if (data.imageid != null)
          await cloudinary.uploader.destroy(data.imageid);
        await prisma.SubCategory.delete({
          where: { id: data.id },
        });

        break;

      default:
        break;
    }
    return true;
  } catch (error) {
    throw new Error(error);
  }
}
