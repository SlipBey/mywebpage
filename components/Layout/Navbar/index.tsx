import { FC, useState } from "react";
import { Link } from "@components/Globals/Link";
import { CONFIG } from "@libs/config";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";

import icon from "@assets/icon.svg";
import { Button } from "@components/Globals/Button";
import classNames from "classnames";

import { useSessionStore } from "@store/SessionStore";
import { FiLogIn } from "react-icons/fi";
import { useRouter } from "next/router";
import { GiHamburgerMenu } from "react-icons/gi";
import { getRole, perman } from "@libs/permissions";
import { FaRegBell } from "react-icons/fa";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";
import { IconType } from "react-icons";

export const Navbar: FC = () => {
	const session = useSessionStore((state) => state.session);
	const [open, setOpen] = useState(false);
	const [hash, setHash] = useState(false);
	const { theme, setTheme } = useTheme();

	const router = useRouter();

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
		return <Icon className="h-5 w-5" />;
	};

	//if (session) {
	/*async function notification() {
			const { data, error } = await supabase
				.from("notifications")
				.select("id")
				.eq("user", session.user?.id)
				.order("created_at", {
					ascending: false,
				});

			if (!error) {
				setNoti(data);
			}
		};

		useEffect(() => {
			notification();
		}, [session]);*/
	//}

	return (
		<header className="sticky top-0 z-10 w-full border-b border-gray-200 bg-gray-100 shadow-lg shadow-gray-400/50 dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-600/50">
			<nav className="py-4 px-8">
				<div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
					<Link href="/" className="flex items-center">
						<Image
							src={icon}
							className="mr-3 h-6 rounded-md sm:h-9"
							alt="Navbar Logo"
						/>
						<span className="self-center whitespace-nowrap text-xl font-semibold">
							Öğrenci Takip
						</span>
					</Link>
					<div className="flex items-center lg:order-2">
						<div
							className={classNames("lg:hidden", {
								hidden: !session,
							})}
						>
							<Button
								type="success"
								onClick={() => setHash(!hash)}
							>
								<GiHamburgerMenu className="h-5 w-5" />
							</Button>
						</div>
						<div className="relative flex items-center space-x-2">
							{session ? (
								<>
									<Button onClick={onTheme} type="warning">
										{/*(theme == "light" && (
											<FiMoon className="h-5 w-5" />
										)) || <FiSun className="h-5 w-5" />*/}
										{getIcon()}
									</Button>
									<div className="relative inline-flex">
										<button
											type="button"
											className="inline-flex items-center rounded-full p-2 duration-300 hover:bg-gray-400/50 dark:hover:bg-gray-600/50"
										>
											<Link href="/bildirimler">
												<FaRegBell className="inline-flex h-6 w-6 text-black dark:text-white" />
											</Link>
										</button>

										<span className="absolute top-0 right-0 mt-1 mr-1 flex h-3 w-3">
											<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
											<span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
										</span>
									</div>
									<div className="relative inline-block">
										<Button
											type="primary"
											onClick={() => setOpen(!open)}
										>
											Merhaba, {session.user.name}
										</Button>
										<div
											className={classNames(
												"absolute top-full left-0 z-40 mt-3 w-full rounded-lg border border-gray-200 bg-gray-100 p-3 shadow-2xl transition-all dark:border-gray-800 dark:bg-gray-900",
												{
													hidden: !open,
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
												{!perman.hasNone(
													session.user.permissions,
													[
														"okul_idaresi",
														"alan_sefleri",
													],
												) && (
													<Link
														href="/admin"
														className="font-base block rounded-lg bg-sky-600 p-2 text-center text-base text-black hover:opacity-90 dark:text-white"
													>
														Yönetim Paneli
													</Link>
												)}
												{perman.hasNone(
													session.user.permissions,
													[
														"okul_idaresi",
														"alan_sefleri",
														"ogretmen",
													],
												) && (
													<Link
														href="/profil"
														className="font-base block rounded-lg bg-green-600 p-2 text-center text-base text-black hover:opacity-90 dark:text-white"
													>
														Profil
													</Link>
												)}
												{(session.user.permissions ==
													0 ||
													session.user.permissions ==
														8) && (
													<Link
														href="/bildirimler/gelen-kutusu"
														className="font-base block rounded-lg bg-sky-600 p-2 text-center text-base text-black hover:opacity-90 dark:text-white"
													>
														Gelen Kutusu
													</Link>
												)}
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
								<>
									<Button
										type="success"
										onClick={() => signIn()}
									>
										<FiLogIn className="mr-2" />
										Giriş Yapın
									</Button>
									<Button type="success">
										<Link href="/register">
											<FiLogIn className="mr-2 inline-flex" />
											Kayıt Olun
										</Link>
									</Button>
								</>
							)}
						</div>
					</div>
					<div
						className={classNames(
							"w-full items-center justify-between lg:order-1 lg:flex lg:w-auto",
							{
								hidden: !hash,
							},
						)}
					>
						{session ? (
							<ul className="mt-4 flex flex-col space-y-3 font-medium lg:mt-0 lg:flex-row lg:space-y-0 lg:space-x-8">
								{!perman.hasNone(session.user.permissions, [
									"okul_idaresi",
									"alan_sefleri",
								]) && (
									<div className="flex flex-col space-y-3 font-medium lg:mt-0 lg:flex-row lg:space-y-0 lg:space-x-8">
										{" "}
										{CONFIG.PAGES.NAVBAR.map(
											(nav, index) => (
												<li
													key={index}
													className="group"
												>
													<Link
														href={nav.href}
														className={classNames(
															"text-black dark:text-white lg:bg-transparent lg:hover:bg-transparent",
															"rounded-lg p-1 hover:bg-blue-600",
															{
																"lg:text-orange-500":
																	nav.href ==
																	router.asPath,
																"bg-orange-500 hover:bg-orange-500":
																	nav.href ==
																	router.asPath,
																"lg:hover:text-blue-500":
																	nav.href !=
																	router.asPath,
															},
														)}
													>
														{nav.title}
													</Link>
												</li>
											),
										)}
									</div>
								)}
								{!perman.hasNone(session.user.permissions, [
									"fabrika_yetkilisi",
								]) && (
									<div className="flex flex-col space-y-3 font-medium lg:mt-0 lg:flex-row lg:space-y-0 lg:space-x-8">
										{" "}
										{CONFIG.PAGES.WORKNAV.map(
											(nav, index) => (
												<li
													key={index}
													className="group"
												>
													<Link
														href={nav.href}
														className={classNames(
															"text-black dark:text-white lg:bg-transparent lg:hover:bg-transparent",
															"rounded-lg p-1 hover:bg-blue-600",
															{
																"lg:text-orange-500":
																	nav.href ==
																	router.asPath,
																"bg-orange-500 hover:bg-orange-500":
																	nav.href ==
																	router.asPath,
																"lg:hover:text-blue-500":
																	nav.href !=
																	router.asPath,
															},
														)}
													>
														{nav.title}
													</Link>
												</li>
											),
										)}
									</div>
								)}
								{session.user.permissions == 0 && (
									<div className="flex flex-col space-y-3 font-medium lg:mt-0 lg:flex-row lg:space-y-0 lg:space-x-8">
										{" "}
										{CONFIG.PAGES.STUDENTNAV.map(
											(nav, index) => (
												<li
													key={index}
													className="group"
												>
													<Link
														href={nav.href}
														className={classNames(
															"text-black dark:text-white lg:bg-transparent lg:hover:bg-transparent",
															"rounded-lg p-1 hover:bg-blue-600",
															{
																"lg:text-orange-500":
																	nav.href ==
																	router.asPath,
																"bg-orange-500 hover:bg-orange-500":
																	nav.href ==
																	router.asPath,
																"lg:hover:text-blue-500":
																	nav.href !=
																	router.asPath,
															},
														)}
													>
														{nav.title}
													</Link>
												</li>
											),
										)}
									</div>
								)}
							</ul>
						) : (
							<div className="w-full" />
						)}
					</div>
				</div>
			</nav>
		</header>
	);
};
