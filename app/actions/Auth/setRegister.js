"use server";
import prisma from "@/lib/prismadb";
import bcrypt from "bcryptjs";
function generateRandomCode() {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += Math.floor(Math.random() * 10); // 0-9 arası rastgele sayı ekle
  }
  return code;
}
export default async function setRegister(data) {
  try {
    const { name, lastname, tel, email, password, checked } = data;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { message: "Bu Email Adresi Zaten Kayıtlı!" };
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const code = generateRandomCode();
    await prisma.user.create({
      data: {
        name: name,
        lastname: lastname,
        email: email,
        tel: tel,
        code: code,
        emailVerified: false,
        password: encryptedPassword,
        newscheck: checked,
      },
    });

    const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" lang="en"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></head><body style="background-color:#fff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif"><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:360px;background-color:#fff;border:1px solid #eee;border-radius:5px;box-shadow:0 5px 10px rgba(20,50,70,.2);margin-top:20px;margin:0 auto;padding:68px 0 130px"><tbody><tr style="width:100%"><td><img alt="logo" height="90" src="https://bicakci.aydtanitim.com/assets/images/bicakcilogo.svg" style="display:block;outline:0;border:none;text-decoration:none;margin:0 auto" width="385"><p style="font-size:15px;line-height:16px;margin:16px 8px 8px 8px;color:#0a85ea;font-weight:700;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;height:20px;letter-spacing:0;text-transform:uppercase;text-align:center">DOĞRULAMA KODU</p><h1 style="color:#000;font-family:HelveticaNeue-Medium,Helvetica,Arial,sans-serif;font-size:14px;font-weight:500;line-height:24px;margin-bottom:0;margin-top:0;margin-right:auto;margin-left:auto;text-align:center">Aşşağıdaki kodu sitemize girerek emailinizi onaylatın.</h1><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:rgba(0,0,0,.05);border-radius:4px;margin:16px auto 14px;vertical-align:middle;width:280px"><tbody><tr><td><p style="font-size:32px;line-height:40px;margin:0 auto;color:#000;display:inline-block;font-family:HelveticaNeue-Bold;font-weight:700;letter-spacing:6px;padding-bottom:8px;padding-top:8px;width:100%;text-align:center">validationCode</p></td></tr></tbody></table><p style="font-size:15px;line-height:23px;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">Eğer bu gönderen siz değilseniz.</p><p style="font-size:15px;line-height:23px;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">bize bu adresden ulaşabilirsiniz:<a href="mailto:info@bicakciserkan.com" style="color:#444;text-decoration:underline" target="_blank">info@bicakciserkan.com</a></p></td></tr></tbody></table><p style="font-size:12px;line-height:23px;margin:0;color:#000;font-weight:800;letter-spacing:0;margin-top:20px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;text-align:center;text-transform:uppercase">BIÇAKCI SERKAN RESMİ MAİLi</p></body></html>`;

    const modifiedHtml = html.replace(/validationCode/g, code);

    const nodemailer = await import("nodemailer");

    // KOD MAİLİ AYARLA
    let transporter = nodemailer.createTransport({
      host: "mail.bicakciserkan.com",
      port: 465,
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: "info@bicakciserkan.com",
        pass: "Cod3fO2k8@%i",
      },
    });
    /// EMAİL CODE VERİFY
    let mailOptions = {
      from: "info@bicakciserkan.com",
      to: email,
      subject: "Bıçakcı Serkan Onay Kodu Maili",
      html: modifiedHtml,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("E-posta gönderildi: " + info.response);
      }
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
