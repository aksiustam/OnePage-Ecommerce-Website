"use server";
import prisma from "@/lib/prismadb";

export default async function putUserAdress(formData) {
  try {
    await prisma.Address.update({
      where: {
        id: parseInt(formData.id),
      },
      data: formData,
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
