"use server";
import prisma from "@/lib/prismadb";

export default async function deleteContact(data) {
  try {
    await prisma.Contact.delete({
      where: {
        id: data.id,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
