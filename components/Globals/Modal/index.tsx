import type { FC } from "react";
import {
	FiAlertCircle,
	FiCheckCircle,
	FiHelpCircle,
	FiX,
	FiXCircle,
} from "react-icons/fi";
import classNames from "classnames";
import { Button } from "../Button";
import { IThemes, TThemes } from "@libs/theme";
import { IconType } from "react-icons";

export interface IButton {
	title: string;
	type: TThemes;
	onClick?;
	id?;
}

export interface IModal {
	title: string;
	text: string;
	type: TThemes;
	open: boolean;
	icon?: boolean;
	setOpen: (open: boolean) => void;
	buttons?: IButton[];
	centered?: boolean;
}

const icons: IThemes<IconType> = {
	primary: FiCheckCircle,
	success: FiAlertCircle,
	warning: FiHelpCircle,
	error: FiXCircle,
};

const colors: IThemes<string> = {
	primary: "text-cyan-500",
	success: "text-green-500",
	warning: "text-yellow-500",
	error: "text-red-500",
};

export const Modal: FC<IModal> = ({
	title,
	text,
	type,
	open,
	setOpen,
	icon,
	buttons,
	centered,
}) => {
	const Icon = icons[type];

	return (
		<div
			onClick={() => setOpen(false)}
			className={classNames(
				"fixed top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5",
				{
					hidden: !open,
				},
			)}
			style={{ zIndex: "100" }}
		>
			<div className="max-h-full w-full max-w-[570px] overflow-y-auto rounded-[20px] bg-white py-12 px-8 text-center dark:bg-gray-900 md:py-[60px] md:px-[70px]">
				<div className="flex justify-end">
					<button
						onClick={() => setOpen(false)}
						className="rounded-full bg-gray-300 p-1 duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:bg-gray-800"
					>
						<FiX />
					</button>
				</div>
				<div className="mb-3 grid justify-items-center">
					<Icon
						className={classNames("h-16 w-16", colors[type], {
							hidden: icon,
						})}
					/>
				</div>
				<h3 className="text-4xl font-extrabold uppercase text-gray-700 dark:text-gray-300">
					{title}
				</h3>
				<span className="mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-blue-500" />
				<p
					className={classNames(
						"mt-3 text-xl font-bold leading-8 text-gray-800 dark:text-gray-200",
						{
							"text-left": centered,
						},
					)}
					dangerouslySetInnerHTML={{ __html: text }}
				/>
				{buttons && buttons.length && (
					<div className="mt-3">
						<div className="flex flex-row justify-center">
							{buttons.map((button, idx) => (
								<Button
									key={idx}
									type={button.type}
									onClick={button.onClick}
									id={button.id}
								>
									{button.title}
								</Button>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
