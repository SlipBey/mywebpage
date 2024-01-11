import { Layout } from "@/components/Layout";
import { useLocaleParser } from "@/libs/localeParser";
import { NextPage } from "next";
import { FaWpforms } from "react-icons/fa";
import { ContactInfo } from "@/components/Contact/info";
import { ContactForm } from "@/components/Contact/form";

const ContactPage: NextPage = () => {
  const parser = useLocaleParser();

  return (
    <Layout title={parser.get("contact")}>
      <section className="text-center p-8">
        <div className="mx-auto mb-8 rounded-lg py-10 px-5 text-center bg-white dark:bg-gray-900 sm:px-10">
          <div className="flex flex-col lg:flex-row gap-5 text-center justify-between">
            <ContactInfo />
            <div className="flex flex-col gap-5">
              <h3 className="text-2xl font-bold text-black dark:text-white flex items-center justify-center gap-2">
                <FaWpforms className="w-5 h-5" /> {parser.get("contact")}
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
