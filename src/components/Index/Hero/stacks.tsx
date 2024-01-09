import { CustomImage } from "@/components/Utils/CustomImage";
import { CONFIG } from "@/libs/config";
import { useLocaleParser } from "@/libs/localeParser";

export const HeroStacks: React.FC = () => {
  const parser = useLocaleParser();

  return (
    <div className="flex flex-col w-full">
      <h2 className="text-3xl text-center font-bold mb-8">
        {parser.get("stacks_title")}
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {CONFIG.STACKS.map((stack, idx) => (
          <div
            className="w-10 mx-auto flex items-center flex-col justify-center"
            key={idx}
          >
            <CustomImage src={stack.icon} alt={stack.alt} />
            <h2 className="text-xs dark:text-gray-200 font-bold mt-3 opacity-80">
              {stack.alt}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};
