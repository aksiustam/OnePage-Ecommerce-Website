"use server";
import prisma from "@/lib/prismadb";
import slugify from "slugify";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export default async function updateProduct(data) {
  try {
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

    const slug = slugify(data.name, {
      lower: true,
      replacement: (char) => CharacterMap[char] || (char === " " ? "" : char),
      remove: /[*+~.()'"!:@]/g,
    });
    const check = data.Image.length > 0 ? true : false;

    if (check) {
      const product = await prisma.product.findUnique({
        where: {
          id: data.id,
        },
      });
      for (const item of product.images) {
        await cloudinary.uploader.destroy(item.imageid);
      }
    }

    await prisma.product.update({
      where: {
        id: parseInt(data.id),
      },
      data: {
        name: data.name,
        slug: slug,
        desc: data.desc,
        price: data.price,
        quill: data.quill,
        categoryId: parseInt(data.kategori),
        stock: parseInt(data.stock),
        kilo: parseInt(data.kilo),
        images: check ? data.Image : undefined,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
