import { FC, useState } from "react";
import { Link } from "@components/Utils/Link";
import { FiMoon, FiSun, FiX } from "react-icons/fi";
import { useTheme } from "next-themes";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import { IconType } from "react-icons/lib";

import icon from "@assets/icon.svg";
import iconLight from "@assets/iconBeyaz.svg";
import { useLocaleParser } from "@libs/localeParser";
import { FaHamburger } from "react-icons/fa";
import { CustomImage } from "@components/Utils/CustomImage";

import Favicon from "@assets/icon.svg";

export const Navbar: FC = () => {
	const { theme, setTheme } = useTheme();
	const [hash, setHash] = useState(false);
	const router = useRouter();
	const parser = useLocaleParser();

	const onTheme = () => {
		switch (theme) {
			case "light":
				setTheme("dark");
				break;
			case "dark":
				setTheme("light");
				break;
			default:
				setTheme("dark");
				break;
		}
	};

	const getIcon = () => {
		let Icon: IconType;
		switch (theme) {
			case "dark":
				Icon = FiMoon;
				break;
			case "light":
				Icon = FiSun;
				break;
			default:
				Icon = FiMoon;
				break;
		}
		return <Icon className={classNames("text-bold h-full w-full p-2")} />;
	};

	const onClose = () => {
		setHash(!hash);
	};

	const Pages = [
		{
			name: parser.get("home"),
			link: "/",
		},
		{
			name: parser.get("about"),
			link: "/#about",
		},
		{
			name: parser.get("videos"),
			link: "/videos",
		},
		{
			name: parser.get("works"),
			link: "/works",
		},
		{
			name: parser.get("projects"),
			link: "/projects",
		},
		{
			name: parser.get("apps"),
			link: "/apps",
		},
	];

	return (
		<header className="sticky top-0 w-full z-10 bg-gray-100 dark:bg-gray-900">
			<nav className="py-4 px-8 flex items-center justify-between">
				<div className="flex items-center space-x-6">
					<div className="flex items-center">
						<Image
							src={icon}
							alt="Header Image"
							width="50"
							height="50"
							className="rounded-full dark:hidden"
						/>
						<Image
							src={iconLight}
							alt="Header Image"
							width="50"
							height="50"
							className="hidden dark:block rounded-full"
						/>
						<h1 className="ml-3 text-xl text-black dark:text-white font-semibold">
							<Link href="/">
								<a>
									<span className="text-blue-600">Slip</span>
									Bey
								</a>
							</Link>
						</h1>
					</div>
					<div>
						<ul className="hidden md:flex items-center space-x-4">
							{Pages.map((page, idx) => (
								<li key={idx}>
									<Link href={page.link}>
										<a
											className={classNames(
												"border-b-2 border-transparent pb-3 transtion-all duration-200 font-medium",
												{
													"text-blue-600 border-blue-500":
														page.link ==
														router.asPath,
													"text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white":
														page.link !=
														router.asPath,
												},
											)}
										>
											{page.name}
										</a>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div
					className={classNames("relative", "z-50", {
						hidden: !hash,
					})}
				>
					<div
						onClick={onClose}
						className="fixed inset-0 bg-white opacity-25 dark:bg-gray-600"
					/>
					<nav className="fixed top-0 left-0 bottom-0 flex w-5/6 max-w-sm flex-col overflow-y-auto bg-gray-100 py-6 px-6 dark:bg-gray-900">
						<div className="mb-8 flex items-center">
							<Link href="/#">
								<CustomImage
									src={Favicon}
									alt="Favicon"
									className="w-16 h-16"
								/>
							</Link>
							<div className="flex-grow" />
							<button
								aria-label="Close"
								onClick={onClose}
								className="focus:outline-none"
							>
								<FiX className="h-6 w-6 cursor-pointer text-black hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500" />
							</button>
						</div>
						<div>
							<ul>
								{Pages.map((link, idx) => (
									<li
										key={idx}
										className="mb-1 block cursor-pointer rounded-xl p-4 text-sm font-semibold text-gray-500 hover:bg-blue-600 hover:text-white"
									>
										<Link href={link.link}>
											<span>{link.name}</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</nav>
				</div>
				<div className="flex items-center gap-2">
					<div>
						<Link href="/contact">
							<span className="hidden cursor-pointer rounded-xl bg-blue-600 py-2 px-6 text-sm font-bold text-white hover:bg-blue-700 lg:block">
								{parser.get("contact")}
							</span>
						</Link>
					</div>
					<div className="md:hidden">
						<button
							aria-label="Open/Close Navbar"
							onClick={onClose}
							className="bg-gray-500 dark:bg-gray-600 text-white w-10 h-10 rounded-xl hover:opacity-80 transtion-all duration-300"
						>
							<FaHamburger className="text-bold h-full w-full p-2" />
						</button>
					</div>
					<div>
						<button
							aria-label="Change Theme"
							onClick={onTheme}
							className="mr-2 hidden h-10 w-10 rounded-xl bg-blue-600 text-sm text-white hover:bg-blue-700 focus:outline-none lg:block"
						>
							{getIcon()}
						</button>
					</div>
				</div>
			</nav>
		</header>
	);
};
