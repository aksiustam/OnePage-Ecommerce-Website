"use server";
import prisma from "@/lib/prismadb";

export default async function setOnClick(data) {
  try {
    await prisma.product.update({
      where: {
        id: parseInt(data.id),
      },
      data: {
        onclick: {
          increment: 1,
        },
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
