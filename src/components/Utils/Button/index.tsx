import { useLocaleParser } from "@/libs/localeParser";
import { Link } from "../Link";

interface IButtonProp {
  url: string;
  text: string;
}

export const Button: React.FC<IButtonProp> = ({ url, text }) => {
  const parser = useLocaleParser();

  return (
    <div className="relative w-full">
      <Link href={url}>
        <button className="rounded-full w-32 sm:w-64 h-12 px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium dark:border-gray-900 border-gray-300">
          <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 dark:bg-gray-900 bg-gray-200 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
          <span className="relative text-gray-700 dark:text-gray-200 transition duration-300 group-hover:text-black dark:group-hover:text-white ease">
            {parser.get(text)}
          </span>
        </button>
      </Link>
    </div>
  );
};
