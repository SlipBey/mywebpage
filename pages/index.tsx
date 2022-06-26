import { NextPage } from "next";
import { Layout } from "@components/Layout";
import { CustomImage } from "@components/Utils/CustomImage";
import { Link } from "@components/Utils/Link";
import { CONFIG } from "@libs/config";
import Tippy from "@tippyjs/react";
import { Status } from "@components/Status";

import slipbey from "@assets/icon.svg";

const HomePage: NextPage = () => {
	return (
		<Layout title="Homepage">
			<section className="p-5 mx-auto">
				<div className="bg-gray-800 rounded-md m-h-96">
					<div className="text-center p-8">
						<CustomImage
							src={slipbey}
							alt="Avatar Image"
							className="w-24 h-24 mx-auto"
						/>
						<h1 className="font-bold text-2xl text-white">
							SlipBey
						</h1>
						<h5 className="mt-1 font-semibold text-xl text-gray-300">
							Full-Stack Developer
						</h5>
						<p className="mt-2 font-base text-medium text-gray-200 w-auto mx-auto">
							Merhabalar, ben Berkant. Şuan lisedeyim ve
							Mekatronik bölümünü okuyorum. 4 Senedir yazılım
							üzerine uğraşıyorum. Kendimi neredeyse hep
							Frontend(arayüz) kısmında geliştirdim. Web tasarım,
							mobil uygulama tasarımı, masaüstü programlama,
							robotik kodlama gibi alanlarla ilgileniyorum.
							NextJS, TypeScript, TailwindCSS, C# ve Arduino en
							çok ilgilendiğim programlamalardır.
						</p>

						<div className="flex flex-wrap justify-center mt-5 space-x-5">
							{CONFIG.CONTACT.map((contact, index) => (
								<Link href={contact.href} key={index}>
									<contact.icon
										className={`text-2xl w-8 h-8 text-gray-500 hover:text-gray-300`}
									/>
								</Link>
							))}
						</div>

						<div className="flex justify-center mt-5 mb-5">
							<Status />
						</div>

						<div className="flex flex-col justify-center mt-5 mb-5">
							<div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 px-4">
								{CONFIG.STACKS.map((stack, index) => (
									<div
										className="p-4 rounded-lg flex justify-around items-center bg-gray-700 hover:bg-gray-600 duration-100 group"
										key={index}
									>
										<h3 className="hidden group-hover:block text-white sm:text-normal md:text-xl font-bold">
											{stack.alt}
										</h3>
										<CustomImage
											src={stack.icon}
											alt="Stack Image"
											className="w-12 h-12 group-hover:hidden"
										/>
									</div>
								))}
							</div>
						</div>

						<h1 className="mt-8 mb-2 text-gray-300 font-semibold text-4xl">
							PROJECTS
						</h1>

						<div className="flex flex-col justify-center mt-5 mb-5">
							<div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-3 px-4 mx-auto">
								{CONFIG.PROJECTS.map((project, index) => (
									<Link href={project.link} key={index}>
										<Tippy content={project.alt}>
											<div className="bg-gray-700 hover:bg-gray-600 duration-100 p-2 w-36 h-36 rounded-md flex flex-col justify-center group">
												<h2 className="text-white mb-3">
													{project.text}
												</h2>
												<CustomImage
													src={project.icon}
													alt="Stack Image"
													className="w-16 h-16 mx-auto group-hover:scale-105 duration-200"
												/>
											</div>
										</Tippy>
									</Link>
								))}
							</div>
						</div>

						<h1 className="mt-8 mb-2 text-gray-300 font-semibold text-4xl">
							PAGES
						</h1>

						<div className="flex flex-col justify-center mt-5 mb-5">
							<div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 px-4 mx-auto">
								{CONFIG.PAGES.map((page, index) => (
									<Link href={page.link} key={index}>
										<Tippy content={page.alt}>
											<div className="bg-gray-700 hover:bg-gray-600 duration-100 p-2 w-24 h-20 rounded-md flex flex-col justify-center">
												<h2 className="text-white">
													{page.text}
												</h2>
											</div>
										</Tippy>
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default HomePage;
