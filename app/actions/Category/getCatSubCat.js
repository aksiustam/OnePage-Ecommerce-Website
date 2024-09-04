"use server";
import prisma from "@/lib/prismadb";

export default async function getCatSubCat(slug) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        slug: slug,
        archive: false,
      },
    });

    const data = {
      category: category || null,
    };
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
