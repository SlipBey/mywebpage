import { useLocaleParser } from "@libs/localeParser";
import { type FC } from "react";
import zxcvbn from "zxcvbn";

export interface IProps {
	password: string;
}

export const PasswordGenerator: FC<IProps> = ({ password }) => {
	const getPasswordScore = (password: string) => {
		if (password.length >= 12) {
			return 4;
		}
		const checkPassword = zxcvbn(password);
		return checkPassword.score;
	};

	const score = getPasswordScore(password);

	const parser = useLocaleParser();

	const passwordProps = () => {
		switch (score) {
			case 0:
				return {
					color: ["#94a3b8", "#64748b"],
					label: parser.get("too_weak"),
				};
			case 1:
				return {
					color: ["#f87171", "#dc2626"],
					label: parser.get("weak"),
				};
			case 2:
				return {
					color: ["#facc15", "#f59e0b"],
					label: parser.get("middle"),
				};
			case 3:
				return {
					color: ["#a3e635", "#10b981"],
					label: parser.get("strong"),
				};
			case 4:
				return {
					color: ["#10b981", "#059669"],
					label: parser.get("very_strong"),
				};
			default: {
				return {
					color: ["#e2e8f0", "#e2e8f0"],
					label: parser.get("too_weak"),
				};
			}
		}
	};

	return (
		<div className="mb-8 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-900">
			<div
				className="h-full rounded-full transition-all"
				style={{
					width: `${(score * 100) / 4}%`,
					background: `linear-gradient(to right, ${
						passwordProps().color[0]
					}, ${passwordProps().color[1]})`,
				}}
			></div>
			<p
				className="text-right text-sm"
				style={{ color: passwordProps().color[1] }}
			>
				{passwordProps().label}
			</p>
		</div>
	);
};
