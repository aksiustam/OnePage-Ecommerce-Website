"use server";
import prisma from "@/lib/prismadb";

export default async function setRef(data) {
  try {
    await prisma.Referans.create({
      data: {
        index: parseInt(data.index),
        name: data.name,
        imageid: data.imageid || undefined,
        imageurl: data.imageurl || undefined,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
