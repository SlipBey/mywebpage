import { useLocaleParser } from "@/libs/localeParser";
import { formatPhoneNumber, onContactSubmit } from "@/libs/utils/contact";
import { FormEvent, useState } from "react";

export const ContactForm: React.FC = () => {

  const parser = useLocaleParser();

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(event.target.value);
    setPhoneNumber(formattedNumber);
  };


  return (
    <form className="flex flex-col gap-2" onSubmit={onContactSubmit}>
        <div className="flex flex-col justify-left text-left items-left">
          <label>
            {parser.get("name")} <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="name"
            className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-200"
            required
          />
        </div>
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="flex flex-col justify-left text-left items-left">
          <label>
          {parser.get("mail")} <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            name="email"
            className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-200"
            required
          />
        </div>
        <div className="flex flex-col justify-left text-left items-left">
          <label>{parser.get("phone")}</label>
          <input
            type="tel"
            name="phone"
            className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-200"
            placeholder={parser.get("phoneText")}
            pattern="\d{0,3} \d{0,3} \d{0,4}"
            maxLength={12}
            minLength={12}
            onChange={handleChange}
            value={phoneNumber}
          />
        </div>
      </div>
      <div className="flex flex-col justify-left text-left items-left">
        <label>
        {parser.get("subject")} <span className="text-red-600">*</span>
        </label>
        <select
          defaultValue="istek"
          name="subject"
          className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-200"
          required
        >
          <option value="istek">{parser.get("optionIstek")}</option>
          <option value="teklif">{parser.get("optionTeklif")}</option>
          <option value="bildirim">{parser.get("optionBildirim")}</option>
        </select>
      </div>
      <div className="flex flex-col justify-left text-left items-left">
        <label>
        {parser.get("message")} <span className="text-red-600">*</span>
        </label>
        <textarea
          className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-200"
          rows={3}
          name="message"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          className="mt-2 bg-blue-600 hover:bg-blue-700 w-full p-3 rounded-lg font-semibold text-lg duration-200 text-white"
        >
          {parser.get("submit")}
        </button>
      </div>
    </form>
  );
};
