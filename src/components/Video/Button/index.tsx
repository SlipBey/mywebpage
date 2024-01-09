import { Link } from "@/components/Utils/Link";
import { useLocaleParser } from "@/libs/localeParser";
import { FiYoutube } from "react-icons/fi";

export const YoutubeButton: React.FC = () => {
  const parser = useLocaleParser();

  return (
    <div className="relative w-full">
      <div>
        <h3 className="mb-5 text-xl font-bold">{parser.get("more_text")}</h3>
        <Link href="/youtube">
          <button className="group flex items-center justify-center text-xl font-bold mx-auto">
            <div className="bg-gray-300 dark:bg-gray-700 p-3 rounded-full group-hover:bg-red-600 mr-5 duration-300">
              <FiYoutube className="h-6 w-6" />
            </div>
            {parser.get("youtube_button")}
          </button>
        </Link>
      </div>
    </div>
  );
};
