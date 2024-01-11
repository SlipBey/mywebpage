import { Layout } from "@/components/Layout";
import { CONFIG } from "@/libs/config";

import { useLocaleParser } from "@/libs/localeParser";
import { WorkCard } from "@/components/Works/WorkCard";
import { NextPage } from "next";

const WorksPage: NextPage = () => {
  const parser = useLocaleParser();

  return (
    <Layout title={parser.get("works")}>
      <section className="text-center p-8">
        <div className="flex flex-col text-center justify-between relative space-y-5 mt-8">
          <h2 className="relative text-3xl w-full text-center font-bold">
            {parser.get("works")}
          </h2>

          <div className="grid grid-cols-1 gap-12 md:gap-5 md:grid-cols-3 items-start">
            {CONFIG.WORKS.map((project, index) => (
              <WorkCard
                image={project.icon}
                name={project.text}
                desc={project.alt}
                link={project.link}
                key={index}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WorksPage;
