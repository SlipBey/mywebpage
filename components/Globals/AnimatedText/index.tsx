/* eslint-disable no-mixed-spaces-and-tabs */
import type { FC } from "react";
import { m } from "framer-motion";
import { CONFIG } from "@libs/config";

export interface IAnimatedText {
	children: string;
	word?: boolean;
}

export const AnimatedText: FC<IAnimatedText> = ({ children, word }) => {
	const letters = Array.from(children);
	const words = children.split(" ");

	return (
		<m.div
			className="flex flex-wrap"
			variants={CONFIG.MOTIONS.ANIMATED_TEXT.container}
			initial="hidden"
			animate="visible"
		>
			{word
				? words.map((word, idx) => (
						<m.span
							className="ml-2"
							variants={CONFIG.MOTIONS.ANIMATED_TEXT.child}
							key={idx}
						>
							{word}
						</m.span>
				  ))
				: letters.map((letter, idx) => (
						<m.span
							variants={CONFIG.MOTIONS.ANIMATED_TEXT.child}
							key={idx}
						>
							{letter === " " ? "\u00A0" : letter}
						</m.span>
				  ))}
		</m.div>
	);
};
