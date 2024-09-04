"use server";
import prisma from "@/lib/prismadb";

export default async function setUserData(id, formData) {
  try {
    await prisma.User.update({
      where: {
        id: parseInt(id),
      },
      data: formData,
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
