"use server";
import prisma from "@/lib/prismadb";

export default async function upSepetProduct(formData) {
  try {
    const updatedProducts = await Promise.all(
      formData.map(async (item) => {
        const product = await prisma.Product.findUnique({
          where: {
            id: item.id,
          },
        });

        return {
          ...item,
          price: product.price,
          inprice: product.inprice,
          indirim: product.indirim,
        };
      })
    );

    return updatedProducts;
  } catch (error) {
    throw new Error(error);
  }
}
