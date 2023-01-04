import type { FC, ReactNode } from "react";
import { m } from "framer-motion";
import classNames from "classnames";
import { CONFIG } from "@libs/config";
import { IThemes, TThemes } from "@libs/theme";

export interface IButton {
	children: ReactNode;
	type: TThemes;
	onClick?;
	className?: string;
	id?;
}

export const types: IThemes<string> = {
	primary: "bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-200 text-white",
	success: "bg-green-600 hover:bg-green-700 focus:ring-green-200 text-white",
	warning:
		"bg-orange-600 hover:bg-orange-700 focus:ring-orange-200 text-white",
	error: "bg-red-600 hover:bg-red-700 focus:ring-red-200 text-white",
};

export const Button: FC<IButton> = ({
	children,
	type,
	onClick,
	className,
	id,
}) => (
	<m.div
		onClick={onClick}
		className={classNames(
			"m-2 inline-flex cursor-pointer items-center whitespace-nowrap rounded-lg px-3 py-2 text-center focus:ring-4",
			types[type],
			className,
		)}
		whileHover={CONFIG.MOTIONS.BUTTON.hover}
		whileTap={CONFIG.MOTIONS.BUTTON.tap}
		id={id}
	>
		{children}
	</m.div>
);
