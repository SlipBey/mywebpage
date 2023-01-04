import { CustomImage } from "@components/Utils/CustomImage";
import { Link } from "@components/Utils/Link";
import type { FC } from "react";

export interface IProject {
	name: string;
	image: string;
	desc: string;
	link: string;
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
			<Link href={link}>
				<CustomImage
					className="w-full rounded-t-md"
					src={image}
					alt={name}
				/>
				<div className="w-full p-3">
					<div className="flex items-center justify-between">
						<div className="text-lg font-bold">{name}</div>
					</div>
					<div className="flex flex-col space-y-1 items-left justify-left">
						<div>
							<p className="text-medium font-base text-gray-800 dark:text-gray-300 text-left">
								{desc}
							</p>
						</div>
						<div className="flex flex-wrap space-x-2 justify-left">
							{tags.map((tag, idx) => (
								<div
									key={idx}
									className="bg-gray-400 dark:bg-gray-900 py-1 px-2 rounded-lg"
								>
									{tag}
								</div>
							))}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};
