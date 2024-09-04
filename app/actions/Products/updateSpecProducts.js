"use server";
import prisma from "@/lib/prismadb";

export default async function updateSpecProducts(formData) {
  try {
    await Promise.all(
      formData.map(async (item) => {
        await prisma.product.update({
          where: {
            id: parseInt(item.id),
          },
          data: {
            indirim: item.indirim,
            yeni: item.yeni,
            ilk: item.ilk,
          },
        });
      })
    );

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
