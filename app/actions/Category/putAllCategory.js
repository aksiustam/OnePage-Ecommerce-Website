"use server";
import prisma from "@/lib/prismadb";
import slugify from "slugify";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function putAllCategory(role, data) {
  try {
    const catbrand = role;

    const CharacterMap = {
      Ç: "C",
      Ş: "S",
      Ğ: "G",
      İ: "I",
      Ö: "O",
      Ü: "U",
      ç: "c",
      ş: "s",
      ğ: "g",
      ı: "i",
      ö: "o",
      ü: "u",
    };

    switch (catbrand) {
      case "category":
        const slug = slugify(data.name, {
          lower: true,
          replacement: (char) =>
            CharacterMap[char] || (char === " " ? "" : char),
          remove: /[*+~.()'"!:@]/g,
        });

        await prisma.category.update({
          where: { id: data.id },
          data: {
            index: parseInt(data.index),
            name: data.name,
            slug: slug,
            archive: data.archive,
          },
        });

        if (data.imageid !== null && data.imageurl !== null) {
          const category = await prisma.category.findUnique({
            where: {
              id: data.id,
            },
          });

          if (category.imageid !== null)
            await cloudinary.uploader.destroy(category.imageid);

          await prisma.category.update({
            where: { id: data.id },
            data: {
              imageid: data.imageid,
              imageurl: data.imageurl,
            },
          });
        }
        break;
      case "subcat":
        const slug2 = slugify(data.name, {
          lower: true,
          replacement: (char) =>
            CharacterMap[char] || (char === " " ? "" : char),
          remove: /[*+~.()'"!:@]/g,
        });

        await prisma.SubCategory.update({
          where: { id: data.id },
          data: {
            index: parseInt(data.index),
            name: data.name,
            slug: slug2,
            archive: data.archive,
          },
        });

        if (data.imageid !== null && data.imageurl !== null) {
          const subcategory = await prisma.SubCategory.findUnique({
            where: {
              id: data.id,
            },
          });
          if (subcategory.imageid !== null)
            await cloudinary.uploader.destroy(subcategory.imageid);

          await prisma.SubCategory.update({
            where: { id: data.id },
            data: {
              imageid: data.imageid,
              imageurl: data.imageurl,
            },
          });
        }
        break;

      default:
        break;
    }
    return true;
  } catch (error) {
    throw new Error(error);
  }
}
