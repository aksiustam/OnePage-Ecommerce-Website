"use server";
import prisma from "@/lib/prismadb";

import bcrypt from "bcryptjs";

function generatePasswordCode() {
  const upperCaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseCharacters = "abcdefghijklmnopqrstuvwxyz";
  const numericCharacters = "0123456789";

  let code = "";

  for (let i = 0; i < 8; i++) {
    let typeIndex = Math.floor(Math.random() * 3);
    if (i < 3) typeIndex = i;
    let randomChar;
    switch (typeIndex) {
      case 0:
        randomChar = upperCaseCharacters.charAt(
          Math.floor(Math.random() * upperCaseCharacters.length)
        );
        break;
      case 1:
        randomChar = lowerCaseCharacters.charAt(
          Math.floor(Math.random() * lowerCaseCharacters.length)
        );
        break;
      case 2:
        randomChar = numericCharacters.charAt(
          Math.floor(Math.random() * numericCharacters.length)
        );
        break;
    }

    // Kodu oluştur
    code += randomChar;
  }

  return code;
}

export default async function forgotPass(email) {
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return {
        message: "Email adresi bulunamadı! 3 dakika sonra tekrar deneyiniz",
      };
    }

    if (user) {
      const pass = generatePasswordCode();
      const encryptedPassword = await bcrypt.hash(pass, 10);
      await prisma.user.update({
        where: { email: email },
        data: { password: encryptedPassword },
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
      const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" lang="en"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></head><div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Şifremi Unuttum - Bıçakcı Serkan<div></div></div><body style="background-color:#efeef1;font-family:HelveticaNeue,Helvetica,Arial,sans-serif"><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;margin:30px auto;background-color:#fff"><tbody><tr style="width:100%"><td><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="display:flex;justify-content:center;aling-items:center;padding:15px"><tbody><tr><td><img alt="logo" height="90" src="https://bicakci.aydtanitim.com/assets/images/bicakcilogo.svg" style="display:flex;outline:0;border:none;text-decoration:none;justify-content:center;aling-items:center;padding:15px" width="385"></td></tr></tbody></table><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="padding:5px 20px 10px 20px"><tbody><tr><td><p style="font-size:14px;line-height:26px;margin:16px 0;text-align:center;font-weight:700">Merhaba USER</p><p style="font-size:14px;line-height:26px;margin:16px 0;text-align:center;font-weight:700">Yeni Şifreniz budur :<p style="font-size:14px;line-height:26px;margin:16px 0;color:red;font-weight:700;text-align:center">PASSWORD</p></p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">Bu şifrenin önceki şifrenizin yerine geçtiğini hatırlatırız. Büyük ve küçük harflere dikkat etmeyi unutmayın.</p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">Şifrenizi Profil kısmından geri değiştirebilirsiniz</p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">Teşekkürler<br>Bıçakcı Serkan</p></td></tr></tbody></table></td></tr></tbody></table><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;margin:0 auto"><tbody><tr><td><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"><tbody style="width:100%"><tr style="width:100%"><p style="font-size:14px;line-height:24px;margin:16px 0;text-align:center;color:#706a7b">© CopyRight BıçakcıSerkan<br>Erenler, Kazdağı Sk. 7bb, 42050 Karatay/Konya</p></tr></tbody></table></td></tr></tbody></table></body></html>`;

      const modifiedHtml = html.replace(/USER/g, user.name);

      const modifiedHtmlto = modifiedHtml.replace(/PASSWORD/g, pass);
      // Şifremi Unuttum Mail
      let mailOptions = {
        from: "info@bicakciserkan.com",
        to: email,
        subject: "Bıçakcı Serkan - Yeni Şifre",
        html: modifiedHtmlto,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("E-posta gönderildi: " + info.response);
        }
      });
      return true;
    }
  } catch (error) {
    throw new Error(error);
  }
}
