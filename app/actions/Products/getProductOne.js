"use server";
import prisma from "@/lib/prismadb";

export default async function getProductOne(id) {
  try {
    const productsWithDetails = await prisma.product.findFirst({
      where: {
        id: parseInt(id),
        archive: false,
      },
    });

    return productsWithDetails;
  } catch (error) {
    throw new Error(error);
  }
}
