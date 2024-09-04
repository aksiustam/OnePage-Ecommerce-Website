import React from "react";
export const dynamic = "force-dynamic";
import ContactClient from "./ContactClient";
import getContact from "@/app/actions/Contact/getContact";
const page = async () => {
  const contact = await getContact();
  return <ContactClient contact={contact} />;
};

export default page;
