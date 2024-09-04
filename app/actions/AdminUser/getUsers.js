"use server";
import prisma from "@/lib/prismadb";

export default async function getUsers() {
  try {
    const users = await prisma.user.findMany();

    return users;
  } catch (error) {
    throw new Error(error);
  }
}
