import { Link } from "@components/Utils/Link";
import classNames from "classnames";
import type { FC } from "react";
import { IconType } from "react-icons/lib";

export interface IAppProps {
	link: string;
	name: string;
	text: string;
	icon: IconType;
	color: string;
}

export const AppCard: FC<IAppProps> = ({ name, link, text, icon, color }) => {
	const Icon = icon;

	return (
		<Link href={`/apps${link}`}>
			<div className="max-w-md p-3 hover:-translate-y-1 hover:shadow-2xl rounded-md duration-300">
				<div className="flex items-center justify-center">
					<Icon className={classNames("text-6xl", color)} />
				</div>
				<h5 className="text-lg font-bold text-center">{name}</h5>
				<p className="text-medium font-base text-gray-800 dark:text-gray-300 text-center">
					{text}
				</p>
			</div>
		</Link>
	);
};
