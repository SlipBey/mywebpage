import type { FC, ReactNode } from "react";
import classNames from "classnames";
import {
	BiCheckCircle,
	BiError,
	BiErrorCircle,
	BiInfoCircle,
} from "react-icons/bi";
import { IThemes, TThemes } from "@libs/theme";
import { IconType } from "react-icons";

export interface IButton {
	children: ReactNode;
	type: TThemes;
}

const types: IThemes<string> = {
	primary: "bg-blue-200 text-blue-700 border-blue-600",
	success: "bg-green-200 text-green-700 border-green-600",
	warning: "bg-orange-200 text-orange-700 border-orange-600",
	error: "bg-red-200 text-red-700 border-red-700",
};

const iconType: IThemes<IconType> = {
	primary: BiInfoCircle,
	success: BiCheckCircle,
	warning: BiError,
	error: BiErrorCircle,
};

export const Alert: FC<IButton> = ({ children, type }) => {
	const Icon = iconType[type];

	return (
		<div
			className={classNames(
				"w-full rounded-lg border-t-4 p-2",
				types[type],
			)}
		>
			<div className="flex flex-row">
				<Icon className="mr-2 h-6 w-6" />
				{children}
			</div>
		</div>
	);
};
