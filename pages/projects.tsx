import { Layout } from "@components/Layout";
import { CONFIG } from "@libs/config";

import { ProjectCard } from "@components/Projects/ProjectCard";
import { useLocaleParser } from "@libs/localeParser";
import { NextPage } from "next";

const ProjectsPage: NextPage = () => {
	const parser = useLocaleParser();

	return (
		<Layout title={parser.get("projects")}>
			<section className="p-5 mx-auto">
				<div className="bg-gray-300 dark:bg-gray-800 rounded-md m-h-96">
					<div className="text-center p-8">
						<div className="flex flex-col text-center justify-between relative space-y-5 mt-8">
							<h2 className="relative text-3xl w-full text-center font-bold">
								{parser.get("favorite_project_title")}
							</h2>

							<div className="grid grid-cols-1 gap-12 md:gap-5 md:grid-cols-3 items-start">
								{CONFIG.PROJECTS.map((project, index) => (
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
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default ProjectsPage;
