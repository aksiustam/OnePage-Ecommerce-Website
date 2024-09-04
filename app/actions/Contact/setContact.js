"use server";
import prisma from "@/lib/prismadb";

export default async function setContact(data) {
  try {
    await prisma.Contact.create({
      data: {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        konu: data.konu,
        not: data.not,
      },
    });
    return true;
  } catch (error) {
    throw new Error(error);
  }
}
