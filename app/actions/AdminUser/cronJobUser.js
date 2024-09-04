"use server";
import prisma from "@/lib/prismadb";

export default async function cronJobUser() {
  try {
    await prisma.User.deleteMany({
      where: {
        emailVerified: false,
      },
    });
    return true;
  } catch (error) {
    throw new Error(error);
  }
}
