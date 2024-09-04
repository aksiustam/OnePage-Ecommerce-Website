"use server";
import prisma from "@/lib/prismadb";

export default async function getRef() {
  try {
    const ref = await prisma.Referans.findMany({
      orderBy: {
        index: "asc",
      },
    });

    return ref;
  } catch (error) {
    throw new Error(error);
  }
}
