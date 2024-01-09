import { CustomImage } from "@/components/Utils/CustomImage";
import { Link } from "@/components/Utils/Link";
import { CONFIG } from "@/libs/config";
import { useLocaleParser } from "@/libs/localeParser";
import icon from "@/assets/icon.svg";
import iconLight from "@/assets/iconBeyaz.svg";

export const HeroAbout: React.FC = () => {
  const parser = useLocaleParser();

  return (
    <div className="w-full">
      <CustomImage
        src={icon}
        alt="Avatar Image"
        className="w-24 h-24 mx-auto dark:hidden"
      />
      <CustomImage
        src={iconLight}
        alt="Avatar Image"
        className="w-24 h-24 mx-auto hidden dark:block"
      />
      <h1 className="font-bold text-2xl text-black dark:text-white">SlipBey</h1>
      <h5 className="mt-1 font-semibold text-xl flex justify-center space-x-1">
        <div>
          <span className="text-blue-600">Full-Stack</span> Developer
        </div>
        <div> / </div>
        <div>
          <span className="text-red-600">{parser.get("contents")}</span>{" "}
          {parser.get("creator")}
        </div>
      </h5>
      <div
        className="mt-2 font-medium text-medium text-gray-900 dark:text-gray-200 w-auto mx-auto"
        dangerouslySetInnerHTML={{
          __html: parser.get("about_text", {
            date: (new Date().getFullYear() - 2016).toString(),
          }),
        }}
      />

      <div className="flex flex-wrap justify-center mt-5">
        {CONFIG.CONTACT.map((contact, index) => (
          <Link href={contact.href} key={index}>
            <contact.icon
              className={`m-1 sm:m-2 text-2xl w-8 h-8 text-gray-600 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
