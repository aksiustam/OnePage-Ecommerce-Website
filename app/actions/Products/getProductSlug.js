"use server";
import prisma from "@/lib/prismadb";

export default async function getProductSlug(slug) {
  try {
    const productsWithDetails = await prisma.product.findUnique({
      where: {
        slug: slug,
        archive: false,
      },
    });
    if (productsWithDetails) return productsWithDetails;
    else return null;
  } catch (error) {
    throw new Error(error);
  }
}
