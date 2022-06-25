import { NextPage } from "next";
import { Layout } from "@components/Layout";
import { CustomImage } from "@components/Utils/CustomImage";
import { Link } from "@components/Utils/Link";
import { CONFIG } from "@libs/config";
import Tippy from "@tippyjs/react";

import slipbey from "@assets/icon.svg";

const HomePage: NextPage = () => {
	return (
		<Layout title="Anasayfa">
			<section className="p-5">
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
						<p className="mt-2 font-base text-medium text-gray-200 w-96 mx-auto">
							Merhaba, ben Berkant. Yaklaşık 4 senedir yazılımla
							ilgileniyorum. Kendimi frontend(arayüz) kısmında
							epeyce geliştirdim ve artık güzel projeler üretme
							aşamasındayım. Lisedeyim ve Mekatronik bölümünü
							okuyorum.
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

						<div className="mt-5 grid grid-rows-8 md:grid-rows-5 grid-flow-col gap-5 flex justify-center">
							{CONFIG.STACKS.map((stack, index) => (
								<Tippy content={stack.alt} key={index}>
									<div className="bg-gray-700 p-2 w-16 h-16 rounded-md">
										<CustomImage
											src={stack.icon}
											alt="Stack Image"
											className="w-12 h-12"
										/>
									</div>
								</Tippy>
							))}
						</div>

						<h1 className="mt-8 mb-2 text-gray-300 font-semibold text-4xl">
							PROJECTS
						</h1>

						<div className="grid grid-rows-5 md:grid-rows-2 grid-flow-col gap-5 mt-5 flex justify-center">
							{CONFIG.PROJECTS.map((project, index) => (
								<Link href={project.link} key={index}>
									<Tippy content={project.alt}>
										<div className="bg-gray-700 p-2 w-36 h-36 rounded-md flex flex-col justify-center">
											<h2 className="text-white mb-3">
												{project.text}
											</h2>
											<CustomImage
												src={project.icon}
												alt="Stack Image"
												className="w-16 h-16 mx-auto"
											/>
										</div>
									</Tippy>
								</Link>
							))}
						</div>

						<h1 className="mt-8 mb-2 text-gray-300 font-semibold text-4xl">
							PAGES
						</h1>

						<div className="grid grid-rows-2 grid-flow-col gap-5 mt-5 flex justify-center">
							{CONFIG.PAGES.map((page, index) => (
								<Link href={page.link} key={index}>
									<Tippy content={page.alt}>
										<div className="bg-gray-700 p-2 w-24 h-20 rounded-md flex flex-col justify-center">
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
			</section>
		</Layout>
	);
};

export default HomePage;
