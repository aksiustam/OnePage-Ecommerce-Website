"use server";
import prisma from "@/lib/prismadb";

export default async function updateDiscProducts(formData) {
  try {
    await Promise.all(
      formData.map(async (item) => {
        await prisma.product.update({
          where: {
            id: parseInt(item.id),
          },
          data: {
            price: item.price,
            indirim: item.indirim,
            indirimsize: item.indirimsize,
          },
        });
      })
    );

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
