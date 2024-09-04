"use server";
import prisma from "@/lib/prismadb";

export default async function verifyCode(data) {
  try {
    const { email, code } = data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { message: "Email Adresi Bulunamadı!" };
    }

    if (user) {
      if (code !== user.code) return { message: "Yanlış Kod Girdiniz..." };

      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          emailVerified: true,
        },
      });
      const nodemailer = await import("nodemailer");

      let transporter = nodemailer.createTransport({
        host: "mail.bicakciserkan.com",
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
          user: "info@bicakciserkan.com",
          pass: "Cod3fO2k8@%i",
        },
      });

      const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" lang="en"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></head><div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Bıçakcı Serkan Hoşgeldiniz<div></div></div><body style="background-color:#efeef1;font-family:HelveticaNeue,Helvetica,Arial,sans-serif"><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:610px;margin:30px auto;background-color:#fff"><tbody><tr style="width:100%"><td><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="display:flex;justify-content:center;aling-items:center;padding:30px"><tbody><tr><td><img alt="logo" height="90" src="https://bicakci.aydtanitim.com/assets/images/bicakcilogo.svg" style="display:block;outline:0;border:none;text-decoration:none" width="385"></td></tr></tbody></table><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="padding:5px 20px 10px 20px"><tbody><tr><td><p style="font-size:16px;line-height:26px;margin:16px 0;text-align:center;font-weight:700">Hoşgeldiniz, USER !</p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">Bıçakcı Serkan alışveriş sitemiz ile artık harika ürünlerimizin keyfini çıkarabilirsiniz.</p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">Özel indirimler, yeni ürün duyuruları ve çok daha fazlası için bizi takip etmeye devam edin.</p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">Keyifli alışverişler dileriz!</p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">Bıçakcı Serkan</p></td></tr></tbody></table></td></tr></tbody></table><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;margin:0 auto"><tbody><tr><td><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"><tbody style="width:100%"><tr style="width:100%"><p style="font-size:14px;line-height:24px;margin:16px 0;text-align:center;color:#706a7b">© CopyRight BıçakcıSerkan<br>Erenler, Kazdağı Sk. 7bb, 42050 Karatay/Konya</p></tr></tbody></table></td></tr></tbody></table></body></html>`;

      const username = user.name + " " + user.lastname;

      const modifiedHtml = html.replace(/USER/g, username);

      // Login Welcome Mail
      let mailOptions = {
        from: "info@bicakciserkan.com",
        to: user.email,
        subject: "Bıçakcı Serkan - Hoşgeldiniz",
        html: modifiedHtml,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("E-posta gönderildi: " + info.response);
        }
      });
    }
    return true;
  } catch (error) {
    throw new Error(error);
  }
}
