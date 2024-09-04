"use server";
import prisma from "@/lib/prismadb";

export default async function getAllCategory() {
  try {
    const category = await prisma.Category.findMany({
      where: {
        archive: false,
      },
      orderBy: {
        index: "asc",
      },
    });
    const subcat = await prisma.SubCategory.findMany({
      where: {
        archive: false,
      },
      orderBy: {
        index: "asc",
      },
    });

    const data = {
      category: category,
      subcat: subcat,
    };
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
