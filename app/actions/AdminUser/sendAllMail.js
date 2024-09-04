"use server";
import prisma from "@/lib/prismadb";
import EmailTaslak from "../../email/EmailTaslak";

export default async function sendAllMail(formData) {
  try {
    const { text, mailBaslik } = formData;
    //KOALA MAIL
    const nodemailer = await import("nodemailer");

    const { render } = await import("@react-email/render");

    let transporter = nodemailer.createTransport({
      host: "mail.bicakciserkan.com",
      port: 465,
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: "info@bicakciserkan.com",
        pass: "Cod3fO2k8@%i",
      },
    });

    const html = render(<EmailTaslak text={text} />);

    // TASLAK MAIL
    let mailOptions = {
      from: "info@bicakciserkan.com",
      subject: mailBaslik,
      html: html,
    };

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });
    const user = await prisma.user.findMany({
      where: {
        newscheck: true,
      },
    });
    user.forEach((item) => {
      // Alıcıyı güncelle
      mailOptions.to = item.email;

      // E-postayı gönder
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("E-posta gönderilirken hata oluştu:", error);
        } else {
          console.log("E-posta başarıyla gönderildi:", info.response);
        }
      });
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
