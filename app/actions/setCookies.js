"use server";
import { cookies } from "next/headers";

export default async function setCookies(props) {
  try {
    const formData = {
      gacheck: props.gacheck,
      advertcheck: props.advertcheck,
    };
    const oneMonth = 12 * 30 * 24 * 60 * 60 * 1000;

    cookies().set("cookie", JSON.stringify(formData), {
      path: "/",
      expires: Date.now() + oneMonth,
    });

    return true;
  } catch (error) {
    return null;
  }
}
