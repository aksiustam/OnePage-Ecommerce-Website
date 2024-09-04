"use server";
import prisma from "@/lib/prismadb";

export default async function setUserAdress(data) {
  try {
    await prisma.Address.create({
      data: {
        User: {
          connect: { id: parseInt(data.userid) },
        },
        adressname: data.adressname,
        address: data.address,
        country: data.country,
        city: data.city,
        zipCode: data.zipCode,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
