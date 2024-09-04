import prisma from "@/lib/prismadb";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import Invoicemail from "@/app/email/Invoicemail";
const apiKey = process.env.API_KEY;
const secretKey = process.env.API_SECRET;

function generateAuthorizationString(url, data) {
  const randomVar = 959770701;
  const randomKey = new Date().getTime() + randomVar;

  const splitUrl = url.split(".com");
  const uri = splitUrl.slice(1).join("/");

  const payload = uri + JSON.stringify(data);
  const dataToEncrypt = randomKey + payload;
  const encryptedData = crypto
    .createHmac("sha256", secretKey)
    .update(dataToEncrypt)
    .digest("hex");

  const authorizationString =
    "apiKey:" +
    apiKey +
    "&randomKey:" +
    randomKey +
    "&signature:" +
    encryptedData;

  const base64EncodedAuthorization =
    Buffer.from(authorizationString).toString("base64");

  return {
    auth: "IYZWSv2 " + base64EncodedAuthorization,
    randomkey: randomKey,
  };
}

async function reduceBasket(basket) {
  const updatePromises = basket.map((item) =>
    prisma.product.update({
      where: {
        id: parseInt(item.id),
      },
      data: {
        sells: {
          increment: item.quantity,
        },
        stock: {
          decrement: item.quantity,
        },
      },
    })
  );

  await Promise.all(updatePromises);
  return true;
}

export async function POST(req, res) {
  const body = await req.text();
  const token = body.split("=")[1];

  const randomVar = 153724751;
  const randomKey = new Date().getTime() + randomVar;
  const formData = {
    locale: "tr",
    token: token,
    conversationId: String(randomKey),
  };

  const url =
    "https://sandbox-api.iyzipay.com/payment/iyzipos/checkoutform/auth/ecom/detail";

  var authres = generateAuthorizationString(url, formData);

  const sgresponse = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `${authres.auth}`,
      "x-iyzi-rnd": String(authres.randomkey),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const response = await sgresponse.json();

  if (response.status === "success" && response.paymentStatus === "SUCCESS") {
    const order = await prisma.SiparisOrder.findFirst({
      where: {
        basketId: response.basketId,
      },
    });
    await prisma.SiparisOrder.update({
      where: {
        id: order.id,
      },
      data: {
        status: "SUCCESS",
      },
    });

    reduceBasket(order.basket);
    const uutoken = uuidv4();
    const user = {
      name: order.name,
      surname: order.surname,
      identityNumber: order.identityNumber,
      tel: order.tel,
    };

    const payment = await prisma.SiparisOrderFinish.create({
      data: {
        conversationId: response.conversationId,
        paymentId: response.paymentId,
        userId: order.userId !== null ? order.userId : null,
        userinfo: user,
        email: order.email,
        billadress: order.billadress,
        sendadress: order.sendadress,
        basketId: response.basketId,
        basket: order.basket,
        note: order.note,
        sendmail: "TRUE",
        amount: order.amount,
        status: "SUCCESS",
        paymentStatus: response.paymentStatus,
        error: "null",
        token: uutoken,
      },
    });

    const MYURL =
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000/odeme-son?token=${uutoken}`
        : `https://bicakciserkan.com/odeme-son?token=${uutoken}`;
    const destinationUrl = new URL(MYURL);

    const nodemailer = await import("nodemailer");

    const { render } = await import("@react-email/render");
    const html = render(<Invoicemail sipdata={payment} />);

    let transporter = nodemailer.createTransport({
      host: "mail.bicakciserkan.com",
      port: 465,
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: "info@bicakciserkan.com",
        pass: "Cod3fO2k8@%i",
      },
    });

    let mailOptions = {
      from: "info@bicakciserkan.com",
      to: order.email,
      subject: "Fatura - BıçakcıSerkan",
      html: html,
      attachments: [
        {
          filename: "fatura.html",
          content: html,
        },
      ],
    };
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    let error = "null";
    try {
      await sendMail(mailOptions, transporter);
      error = "Gönderildi";
    } catch (err) {
      error = "Başarısız";
    }

    await prisma.SiparisOrderFinish.update({
      where: {
        id: payment.id,
      },
      data: {
        sendmail: error,
      },
    });

    return NextResponse.redirect(destinationUrl, 302);
  } else {
    const MYURL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/odeme-hata"
        : "https://bicakciserkan.com/odeme-hata";
    const destinationUrl = new URL(MYURL);

    return NextResponse.redirect(destinationUrl, 302);
  }
}

function sendMail(mailOptions, transporter) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}
