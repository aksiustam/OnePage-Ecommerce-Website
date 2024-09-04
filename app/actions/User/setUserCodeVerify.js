"use server";
import prisma from "@/lib/prismadb";

export default async function setUserCodeVerify(id, formData) {
  try {
    const user = await prisma.User.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (user) {
      if (formData.code !== user.code)
        return { message: "Yanlış veya Geçersiz Kod!" };
      await prisma.User.update({
        where: {
          id: parseInt(id),
        },
        data: formData,
      });
    }

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
