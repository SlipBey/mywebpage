import { IContactProps } from "@/models/contact";
import { contactService } from "@/services/contact";
import { FormEvent } from "react";

export const formatPhoneNumber = (input: string) => {
  const cleaned = ("" + input).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,4})$/);
  if (match) {
    const formatted = `${match[1]} ${match[2]} ${match[3]}`;
    return formatted.trim();
  }
  return input;
};

export const onContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const contact: IContactProps = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    phone: parseFloat((formData.get("phone") as string).replace(/\s/g, "")),
    message: formData.get("message") as string,
  };

  await contactService(contact);
};
