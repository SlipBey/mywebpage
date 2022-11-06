import { CustomImage } from "@components/Utils/CustomImage";
import Link from "next/link";
import type { FC } from "react";

import { AiOutlineGlobal } from "react-icons/ai";
import { FiGithub } from "react-icons/fi";

export interface IProject {
	name: string;
	image: string;
	desc: string;
	link?;
	tags;
}

export const ProjectCard: FC<IProject> = ({
	name,
	image,
	desc,
	link,
	tags,
}) => {
	return (
		<div className="max-w-sm mx-auto flex flex-col md:justify-center hover:-translate-y-1 hover:shadow-2xl rounded-md duration-300">
			<CustomImage
				className="w-full rounded-t-md"
				src={image}
				alt={name}
			/>
			<div className="w-full p-3">
				<div className="flex items-center justify-between">
					<div className="text-lg font-bold">{name}</div>
					<div className="flex space-x-2">
						{link.url && (
							<Link href={link.url} legacyBehavior>
								<a target="_blank">
									<AiOutlineGlobal className="text-blue-500 hover:text-blue-600 h-5 w-5" />
								</a>
							</Link>
						)}
						{link.github && (
							<Link href={link.github} legacyBehavior>
								<a target="_blank">
									<FiGithub className="text-blue-500 hover:text-blue-600 h-5 w-5" />
								</a>
							</Link>
						)}
					</div>
				</div>
				<div className="flex flex-col space-y-1 items-left justify-left">
					<div>
						<p className="text-medium font-base text-gray-800 dark:text-gray-300 text-left">
							{desc}
						</p>
					</div>
					<div className="flex flex-wrap space-x-2 justify-left">
						{tags.map((tag, idx) => (
							<Link href={`/projects`} key={idx} legacyBehavior>
								<a className="bg-gray-400 dark:bg-gray-900 hover:opacity-80 py-1 px-2 rounded-lg">
									{tag}
								</a>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
