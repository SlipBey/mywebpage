import type { FC } from "react";
import { Link } from "@components/Utils/Link";
import { FiHeart } from "react-icons/fi";

export const Footer: FC = () => {
	return (
		<div className="pb-5 px-3 text-center text-white text-sm">
			&copy; 2022 All rights reserved. Made with{" "}
			<FiHeart className="text-red-500 inline" /> by{" "}
			<Link
				underline
				href="https://github.com/SlipBey"
				className="text-blue-500"
			>
				SlipBey
			</Link>{" "}
			using{" "}
			<Link
				underline
				href="https://nextjs.org/"
				className="text-gray-500"
			>
				NextJS
			</Link>{" "}
			and{" "}
			<Link
				underline
				href="https://tailwindcss.com/"
				className="text-green-400"
			>
				TailwindCSS
			</Link>
			. <FiHeart className="text-red-500 inline" />{" "}
			<Link
				underline
				href="https://www.slipyme.com"
				className="text-blue-600"
			>
				Slipyme
			</Link>{" "}
		</div>
	);
};
