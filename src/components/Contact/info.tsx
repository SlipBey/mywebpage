import { CustomImage } from "@/components/Utils/CustomImage";
import { Link } from "@/components/Utils/Link";
import { CONFIG } from "@/libs/config";
import { useLocaleParser } from "@/libs/localeParser";
import slipyme from "@/assets/works/slipyme.svg";
import { FiMail } from "react-icons/fi";

export const ContactInfo: React.FC = () => {
  const parser = useLocaleParser();

  return (
    <div className="flex flex-col lg:flex-row gap-3 items-center justify-left">
      <div className="w-48">
        <CustomImage className="w-full" src={slipyme} alt="" />
      </div>
      <div className="flex flex-col gap-5 text-left">
        <h3 className="text-2xl font-bold text-black dark:text-white flex items-center gap-2">
          <FiMail className="w-5 h-5" /> Mail
        </h3>
        {CONFIG.MAILS.map((mail, idx) => (
          <h5
            className="text-lg font-semibold text-gray-800 dark:text-gray-200"
            key={idx}
          >
            {parser.get(mail.name)}:{" "}
            <Link
              className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-600"
              href={`mailto:${mail.mail}@slipyme.com`}
            >
              {mail.mail}@slipyme.com
            </Link>
          </h5>
        ))}
      </div>
    </div>
  );
};
