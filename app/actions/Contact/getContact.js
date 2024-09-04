"use server";
import prisma from "@/lib/prismadb";

export default async function getContact() {
  try {
    const cont = await prisma.Contact.findMany();

    return cont;
  } catch (error) {
    throw new Error(error);
  }
}
