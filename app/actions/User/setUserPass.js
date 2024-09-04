"use server";
import prisma from "@/lib/prismadb";
import bcrypt from "bcryptjs";

export default async function setUserPass(formData) {
  try {
    const { id, pastpass, pass, repass } = formData;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    const isPasswordValid = await bcrypt.compare(pastpass, user.password);

    if (!isPasswordValid) {
      return {
        message: "Eski Şifreniz Yanlış. Yeniden giriniz.",
      };
    }

    if (pass !== repass) {
      return {
        message: "Şifreler Uyuşmuyor.",
      };
    }

    if (pastpass === pass && pastpass === repass) {
      return { message: "Şifreniz eskisi ile aynı olamaz!" };
    }

    const encryptedPassword = await bcrypt.hash(pass, 10);

    await prisma.User.update({
      where: {
        id: parseInt(user.id),
      },
      data: {
        password: encryptedPassword,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
