import { FC } from "react";
import { m } from "framer-motion";
import { Link } from "@components/Globals/Link";
import { CONFIG } from "@libs/config";
import classNames from "classnames";
import { useSidebarStore } from "@store/SidebarStore";
import { useRouter } from "next/router";

export const Sidebar: FC = () => {
	const open = useSidebarStore((state) => state.open);
	const router = useRouter();

	return (
		<aside
			className={classNames(
				"transition-width z-20 flex min-h-screen flex-col bg-gray-100 duration-300 dark:bg-gray-900",
				{
					"w-20": !open,
					"w-64": open,
				},
			)}
		>
			<div className="mt-3 flex min-h-0 flex-1 flex-col border-r border-gray-300 pt-0 dark:border-gray-700">
				<div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
					<div className="flex-1 space-y-1 divide-y divide-gray-400 px-3 dark:divide-gray-600">
						<ul className="space-y-2 overflow-hidden py-2">
							{CONFIG.PAGES.SIDEBAR[0].map((item, idx) => (
								<li key={idx}>
									<m.div
										className="px-2"
										whileTap={CONFIG.MOTIONS.BUTTON.tap}
										whileHover={CONFIG.MOTIONS.BUTTON.hover}
									>
										<Link
											href={item.href}
											className={classNames(
												"group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-800",
												{
													"bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100":
														router.asPath ==
														item.href,
												},
											)}
										>
											<item.icon className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-gray-100" />
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
									</m.div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</aside>
	);
};
