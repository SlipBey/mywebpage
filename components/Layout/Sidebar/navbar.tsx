import { FC } from "react";
import { FiLogIn, FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { signIn, signOut } from "next-auth/react";
import { m } from "framer-motion";
import { AnimatedText } from "@components/Globals/AnimatedText";
import { Button } from "@components/Globals/Button";
import { Link } from "@components/Globals/Link";
import { CONFIG } from "@libs/config";
import Image from "next/image";
import Favicon from "@assets/icon.svg";
import { useSidebarStore } from "@store/SidebarStore";
import { useSessionStore } from "@store/SessionStore";
import classNames from "classnames";
import { getRole } from "@libs/permissions";
import { useState } from "react";
import { useTheme } from "next-themes";

export const Navbar: FC = () => {
	const open = useSidebarStore((state) => state.open);
	const setOpen = useSidebarStore((state) => state.setOpen);
	const sidebarHandler = () => setOpen(!open);
	const session = useSessionStore((state) => state.session);
	const { theme, setTheme } = useTheme();

	const [profileOpen, setProfileOpen] = useState(false);

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

	return (
		<nav className="fixed z-30 w-full border-b border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-900">
			<div className="px-3 py-3 lg:px-5 lg:pl-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-start">
						<m.button
							whileHover={CONFIG.MOTIONS.BUTTON.hover}
							whileTap={CONFIG.MOTIONS.BUTTON.tap}
							onClick={sidebarHandler}
							className="mr-2 rounded border border-gray-400 bg-gray-300 p-2 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
						>
							{open ? <FiX /> : <FiMenu />}
						</m.button>
						<Link
							href="/"
							className="flex items-center text-xl font-bold lg:ml-2.5"
						>
							<Image
								src={Favicon}
								width={32}
								height={32}
								alt="Logo"
								className="mr-2 h-6"
							/>
							<span className="self-center whitespace-nowrap text-black dark:text-white">
								<AnimatedText>Yönetim Paneli</AnimatedText>
							</span>
						</Link>
					</div>
					<div className="flex items-center">
						<div className="hidden items-center lg:flex">
							{CONFIG.PAGES.ADMIN.map((page, idx) => (
								<Link
									key={idx}
									underline
									href={page.href}
									className="mr-5 text-base font-normal text-gray-500 dark:text-gray-400"
								>
									{page.title}
								</Link>
							))}
						</div>
						{session ? (
							<>
								<Button onClick={onTheme} type="warning">
									{(theme == "light" && (
										<FiMoon className="h-5 w-5" />
									)) || <FiSun className="h-5 w-5" />}
								</Button>
								<div className="relative inline-block">
									<Button
										type="primary"
										onClick={() =>
											setProfileOpen(!profileOpen)
										}
									>
										Merhaba, {session.user.name}
									</Button>
									<div
										className={classNames(
											"absolute top-full left-0 z-40 mt-3 w-full rounded-lg border border-gray-200 bg-gray-100 p-3 shadow-2xl transition-all dark:border-gray-800 dark:bg-gray-900",
											{
												hidden: !profileOpen,
											},
										)}
									>
										<div className="flex flex-col space-y-2">
											<div className="font-base block rounded-lg p-2 text-base text-gray-800 dark:text-gray-200">
												{
													getRole(
														session.user
															.permissions,
													).name
												}
											</div>
											<button
												onClick={() => signOut()}
												className="font-base block rounded-lg bg-red-600 p-2 text-base text-black hover:opacity-90 dark:text-white"
											>
												Çıkış Yap
											</button>
										</div>
									</div>
								</div>
							</>
						) : (
							<Button type="primary" onClick={() => signIn()}>
								<FiLogIn className="-ml-1 mr-2 h-4 w-4" />
								Giriş Yap
							</Button>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};
