import { Button } from "@/components/Utils/Button";
import { WorkCard } from "@/components/Works/WorkCard";
import { CONFIG } from "@/libs/config";
import { useLocaleParser } from "@/libs/localeParser";

export const IndexWorks: React.FC = () => {
  const parser = useLocaleParser();

  return (
    <section className="flex flex-col text-center justify-between pt-12 pb-12 md:pb-24 lg:pt-20">
      <h2 className="text-3xl w-full text-center font-bold">
        {parser.get("works")}
      </h2>

      <div className="my-5 grid grid-cols-1 gap-12 md:gap-5 md:grid-cols-3">
        {CONFIG.WORKS.slice(0, 6).map((project, index) => (
          <WorkCard
            image={project.icon}
            name={project.text}
            desc={project.alt}
            link={project.link}
            key={index}
          />
        ))}
      </div>

      <Button url={"/works"} text={"view_button"} />
    </section>
  );
};
