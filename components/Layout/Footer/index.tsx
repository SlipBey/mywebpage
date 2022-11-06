import type { FC } from "react";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";

export const Footer: FC = () => {
	return (
		<div className="pb-5 px-3 text-center text-black dark:text-white text-sm">
			&copy; 2022 All rights reserved. Made with{" "}
			<FiHeart className="text-red-500 inline" /> by{" "}
			<Link href="https://github.com/SlipBey" legacyBehavior>
				<a className="text-blue-500" target="_blank">
					SlipBey
				</a>
			</Link>{" "}
			using{" "}
			<Link href="https://nextjs.org/" legacyBehavior>
				<a className="text-gray-500" target="_blank">
					NextJS
				</a>
			</Link>{" "}
			and{" "}
			<Link href="https://tailwindcss.com/" legacyBehavior>
				<a className="text-green-500" target="_blank">
					TailwindCSS
				</a>
			</Link>
			. <FiHeart className="text-red-500 inline" />{" "}
			<Link href="https://www.slipyme.com" legacyBehavior>
				<a className="text-blue-500" target="_blank">
					Slipyme
				</a>
			</Link>{" "}
		</div>
	);
};
