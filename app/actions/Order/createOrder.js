"use server";
import prisma from "@/lib/prismadb";
import crypto from "crypto";
import { headers } from "next/headers";
const apiKey = process.env.API_KEY;
const secretKey = process.env.API_SECRET;

function generateAuthorizationString(url, data) {
  const randomVar = 132639701;
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
const getPrice = (category, price) => {
  switch (category) {
    case "ŞARJLI":
      return { original: price?.sarjprice, offer: price?.sarjinprice };
    case "FİŞLİ":
      return { original: price?.fisprice, offer: price?.fisinprice };
    case "IŞIKSIZ":
      return { original: price?.isikprice, offer: price?.isikinprice };
    default:
      return { original: "", offer: "" };
  }
};
export default async function createOrder(user, userInfo, basket) {
  try {
    const total = basket.reduce((acc, item) => {
      const { original, offer } = getPrice(item?.category, item?.price);
      if (item.indirim === true) {
        return acc + item.quantity * offer;
      } else {
        return acc + item.quantity * original;
      }
    }, 0);

    const userip = headers().get("x-forwarded-for");

    for (const item of basket) {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(item.id) },
        include: { Category: true },
      });

      if (!product) {
        return "Sepetteki Ürün bulunmamaktadır.";
      }

      if (product.stock <= 0 || product.stock < item.quantity) {
        return "Sepetteki Ürün Stocklarda Kalmadı.";
      }
    }

    const basketItems = [];
    basket.forEach((item) => {
      const { original, offer } = getPrice(item?.category, item?.price);
      basketItems.push({
        id: String(item.id),
        price:
          item.indirim === true
            ? (item.quantity * offer).toFixed(2)
            : (item.quantity * original).toFixed(2),
        name: item.name + " " + item.category,
        category1: item.category,
        itemType: "PHYSICAL",
        quantity: item.quantity,
      });
    });

    const randomVar = 123523769;
    const randomKey = new Date().getTime() + randomVar;
    const bKey = "B" + randomKey;
    const formData = {
      locale: "tr",
      conversationId: String(randomKey),
      price: total.toFixed(2),
      basketId: String(bKey),
      paymentGroup: "PRODUCT",
      buyer: {
        id: user !== null ? String(user.id) : "guest",
        name: userInfo.data.name,
        surname: userInfo.data.surname,
        identityNumber: userInfo.data.identityNumber,
        email: userInfo.data.email,
        gsmNumber: userInfo.data.tel,
        registrationAddress: userInfo.send.address,
        city: userInfo.send.city,
        country: "Turkey",
        zipCode: userInfo.send.zipCode,
        ip: userip,
      },
      shippingAddress: {
        address: userInfo.send.address,
        zipCode: userInfo.send.zipCode,
        contactName: userInfo.data.name + " " + userInfo.data.surname,
        city: userInfo.send.city,
        country: "Turkey",
      },
      billingAddress: {
        address: userInfo.bill.address,
        zipCode: userInfo.bill.zipCode,
        contactName: userInfo.data.name + " " + userInfo.data.surname,
        city: userInfo.bill.city,
        country: "Turkey",
      },
      basketItems: basketItems,
      enabledInstallments: [1, 2, 3, 6, 9],
      callbackUrl:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/api/iyzico-order"
          : "https://mayplastik.com/api/iyzico-order",
      currency: "TRY",
      paidPrice: total.toFixed(2),
    };
    // https://webhook.site/4ed223d3-010a-40a6-bd6d-4e0c9fa0f9c7
    const url =
      "https://sandbox-api.iyzipay.com/payment/iyzipos/checkoutform/initialize/auth/ecom";

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

    await prisma.SiparisOrder.create({
      data: {
        conversationId: String(randomKey),
        userId: user !== null ? user.id : null,
        name: userInfo.data.name,
        surname: userInfo.data.surname,
        email: userInfo.data.email,
        identityNumber: userInfo.data.identityNumber,
        note: userInfo.data.not,
        tel: userInfo.data.tel,
        billadress: userInfo.bill,
        sendadress: userInfo.send,
        basketId: String(bKey),
        basket: basketItems,
        amount: total,
        status: "PENDING",
      },
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
}
