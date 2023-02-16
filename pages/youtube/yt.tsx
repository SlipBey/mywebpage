import { Link } from "@components/Utils/Link";
import { CONFIG } from "@libs/config";
import classNames from "classnames";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState } from "react";

import { FaHome, FaMicrophone, FaYoutube } from "react-icons/fa";
import { FiMenu, FiSearch } from "react-icons/fi";
import { SiYoutubegaming } from "react-icons/si";

export default function HomePage() {
	const open = useState(false);
	const router = useRouter();

	const PAGES = [
		{
			title: "Ana Sayfa",
			icon: FaHome,
			href: "/youtube/yt",
		},
		{
			title: "Shorts",
			icon: FaYoutube,
			href: "/youtube/shorts",
		},
		{
			title: "Abonelikler",
			icon: SiYoutubegaming,
			href: "/youtube/abonelik",
			divide: true,
		},
	];

	return (
		<>
			<NextSeo
				title="Test"
				canonical={`${CONFIG.SEO.publishDomain}${router.pathname}`}
			/>
			<nav className="fixed z-30 w-full bg-[#0f0f0f]">
				<div className="px-3 py-3 lg:px-5 lg:pl-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center justify-start">
							<button className="hover:bg-[#272727] p-1 rounded-full">
								<FiMenu className="text-2xl" />
							</button>
							<Link
								href="/"
								className="flex items-center lg:ml-2.5"
							>
								<FaYoutube className="text-red-600 text-3xl" />
								<h1 className="text-white text-lg font-semibold">
									YouTube
								</h1>
							</Link>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-96 flex">
								<input
									className="w-full bg-transparent border border-[#242424] focus:border-blue-600 rounded-l-full py-1 px-3 outline-0"
									type="text"
									placeholder="Ara"
								/>
								<button className="bg-[#222222] w-16 rounded-r-full border border-[#242424]">
									<FiSearch className="text-xl mx-auto" />
								</button>
							</div>
							<div>
								<button className="bg-[#181818] hover:bg-[#303030] rounded-full w-8 h-8">
									<FaMicrophone className="mx-auto w-5 h-5" />
								</button>
							</div>
						</div>
						<div className="flex items-center">
							<div className="hidden items-center lg:flex">
								<Link
									href=""
									className="mr-5 text-base font-normal text-gray-500 dark:text-gray-400"
								>
									A
								</Link>
							</div>
						</div>
					</div>
				</div>
			</nav>

			<div className="flex pt-16 bg-[#0f0f0f]">
				<aside
					className={classNames(
						"fixed transition-width z-20 flex min-h-screen flex-col duration-300 bg-[#0f0f0f] w-48",
						{
							"w-20": !open,
							"w-64": open,
						},
					)}
				>
					<div className="flex min-h-0 flex-1 flex-col pt-0">
						<div className="flex flex-1 flex-col overflow-y-auto">
							<div className="flex-1">
								<ul className="overflow-hidden space-y-1">
									{PAGES.map((item, idx) => (
										<li key={idx}>
											<div className="px-2">
												<Link
													href={item.href}
													className={classNames(
														"group flex p-2 rounded-lg hover:bg-[#272727] font-lg space-x-5",
														{
															"bg-[#272727] font-bold":
																router.asPath ==
																item.href,
														},
													)}
												>
													<item.icon className="h-6 w-6 text-white" />
													<span
														className={classNames(
															"ml-3 flex-1 whitespace-nowrap",
															{
																hidden: !open,
															},
														)}
													>
														{item.title}
													</span>
												</Link>
												{item.divide && (
													<div className="px-2 h-[1px] bg-[#222222] my-3" />
												)}
											</div>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</aside>

				<div className="relative h-full min-h-screen w-full bg-[#0f0f0f]">
					<div className="w-full p-7"></div>
					{/*footer*/}
				</div>
			</div>
		</>
	);
}
