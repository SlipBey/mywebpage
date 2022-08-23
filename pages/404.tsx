import type { NextPage } from "next";
import { Layout } from "@components/Layout";
import { Link } from "@components/Utils/Link";

import { FaHome, FaCode } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { DiPhotoshop } from "react-icons/di";

const NotFoundPage: NextPage = () => {
	const Pages = [
		{
			icon: FaHome,
			color: "bg-blue-100 text-blue-600",
			name: "Homepage",
			link: "/",
		},
		{
			icon: FiEdit,
			color: "bg-pink-100 text-pink-600",
			name: "My Resume",
			link: "/resume",
		},
		{
			icon: FaCode,
			color: "bg-cyan-100 text-cyan-600",
			name: "Slipyme",
			link: "https://www.slipyme.com",
		},
		{
			icon: DiPhotoshop,
			color: "bg-green-100 text-green-600",
			name: "Slipyme Design",
			link: "https://design.slipyme.com",
		},
	];

	return (
		<Layout title="Not Found">
			<section className="py-8 px-4 text-center">
				<h1 className="mt-12 text-blue-600 text-5xl font-bold">
					404 Not Found
				</h1>
				<h2 className="mt-5 text-gray-400 text-3xl font-semibold">
					Whoops! That page doesn&apos;t exit.
				</h2>

				<div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
					{Pages.map((page, index) => (
						<div
							className="bg-gray-800 border border-1 border-gray-700 rounded-md p-5 hover:bg-gray-700"
							key={index}
						>
							<Link href={page.link}>
								<div
									className={`${page.color} rounded-md justify-center items-center w-12 h-12 mb-5 mx-auto flex`}
								>
									<page.icon className="w-7 h-7" />
								</div>
								<h5 className="text-gray-400 font-semibold text-xl">
									{page.name}
								</h5>
							</Link>
						</div>
					))}
				</div>
			</section>
		</Layout>
	);
};

export default NotFoundPage;
