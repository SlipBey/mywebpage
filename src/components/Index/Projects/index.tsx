import { ProjectCard } from "@/components/Projects/ProjectCard";
import { Button } from "@/components/Utils/Button";
import { CONFIG } from "@/libs/config";
import { useLocaleParser } from "@/libs/localeParser";

export const IndexProjects: React.FC = () => {
  const parser = useLocaleParser();

  return (
    <section className="flex flex-col text-center justify-between pb-12 md:pb-24 lg:pt-20">
      <h2 className="text-3xl w-full text-center font-bold">
        {parser.get("favorite_project_title")}
      </h2>

      <div className="my-5 grid grid-cols-1 gap-12 md:gap-5 md:grid-cols-3 items-start">
        {CONFIG.PROJECTS.slice(0, 6).map((project, index) => (
          <ProjectCard
            image={project.icon}
            name={project.text}
            desc={project.alt}
            link={project.link}
            tags={project.tags}
            key={index}
          />
        ))}
      </div>

      <Button url={"/projects"} text={"view_button"} />
    </section>
  );
};
