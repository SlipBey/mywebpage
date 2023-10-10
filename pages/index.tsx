import { Layout } from "@components/Layout";
import { CustomImage } from "@components/Utils/CustomImage";
import { Link } from "@components/Utils/Link";
import { CONFIG } from "@libs/config";

import icon from "@assets/icon.svg";
import iconLight from "@assets/iconBeyaz.svg";
import { ProjectCard } from "@components/Projects/ProjectCard";
import { useLocaleParser } from "@libs/localeParser";
import { WorkCard } from "@components/Works/WorkCard";
import { VideoCard } from "@components/Videos/VideoCard";
import { FiEye, FiUsers, FiVideo, FiYoutube } from "react-icons/fi";

export default function HomePage({
	videos,
	subscriberCount,
	videoCount,
	viewCount,
}) {
	const parser = useLocaleParser();

	return (
		<Layout title={parser.get("home")}>
			<section className="p-5 mx-auto">
				<div className="bg-gray-300 dark:bg-gray-800 rounded-md m-h-96">
					<div className="text-center p-8">
						<section id="about" className="pb-12 md:pb-24 lg:pt-20">
							<div className="flex lg:flex-row flex-col justify-between items-center">
								<div className="w-full">
									<CustomImage
										src={icon}
										alt="Avatar Image"
										className="w-24 h-24 mx-auto dark:hidden"
									/>
									<CustomImage
										src={iconLight}
										alt="Avatar Image"
										className="w-24 h-24 mx-auto hidden dark:block"
									/>
									<h1 className="font-bold text-2xl text-black dark:text-white">
										SlipBey
									</h1>
									<h5 className="mt-1 font-semibold text-xl flex justify-center space-x-1">
										<div>
											<span className="text-blue-600">
												Full-Stack
											</span>{" "}
											Developer
										</div>
										<div> / </div>
										<div>
											<span className="text-red-600">
												{parser.get("contents")}
											</span>{" "}
											{parser.get("creator")}
										</div>
									</h5>
									<div
										className="mt-2 font-medium text-medium text-gray-900 dark:text-gray-200 w-auto mx-auto"
										dangerouslySetInnerHTML={{
											__html: parser.get("about_text", {
												date: (
													new Date().getFullYear() -
													2016
												).toString(),
											}),
										}}
									/>

									<div className="flex flex-wrap justify-center mt-5">
										{CONFIG.CONTACT.map(
											(contact, index) => (
												<Link
													href={contact.href}
													key={index}
												>
													<contact.icon
														className={`m-1 sm:m-2 text-2xl w-8 h-8 text-gray-600 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300`}
													/>
												</Link>
											),
										)}
									</div>
								</div>

								<div className="flex flex-col w-full">
									<h2 className="text-3xl text-center font-bold mb-8">
										{parser.get("stacks_title")}
									</h2>
									<div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
										{CONFIG.STACKS.map((stack, idx) => (
											<div
												className="w-10 mx-auto flex items-center flex-col justify-center"
												key={idx}
											>
												<CustomImage
													src={stack.icon}
													alt={stack.alt}
												/>
												<h2 className="text-xs dark:text-gray-200 font-bold mt-3 opacity-80">
													{stack.alt}
												</h2>
											</div>
										))}
									</div>
								</div>
							</div>
						</section>

						<section className="flex flex-col text-center justify-between pb-12 md:pb-24 lg:pt-20">
							<h2 className="text-3xl w-full text-center font-bold">
								You<span className="text-red-600">Tube</span>
							</h2>

							<div className="my-5 grid sm:grid-cols-3 gap-3">
								<div className="flex flex-col">
									<h5 className="text-xl font-semibold inline-flex justify-center items-center gap-2">
										<FiUsers className="text-black dark:text-white w-5 h-5" />{" "}
										{parser.get("subscriberCount")}
									</h5>
									<p className="text-2xl font-semibold">
										{subscriberCount}
									</p>
								</div>

								<div className="flex flex-col">
									<h5 className="text-xl font-semibold inline-flex justify-center items-center gap-2">
										<FiVideo className="text-black dark:text-white w-5 h-5" />{" "}
										{parser.get("videoCount")}
									</h5>
									<p className="text-2xl font-semibold">
										{videoCount}
									</p>
								</div>

								<div className="flex flex-col">
									<h5 className="text-xl font-semibold inline-flex justify-center items-center gap-2">
										<FiEye className="text-black dark:text-white w-5 h-5" />{" "}
										{parser.get("viewCount")}
									</h5>
									<p className="text-2xl font-semibold">
										{viewCount}
									</p>
								</div>
							</div>

							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center">
								{videos.items.map((video, idx) => (
									<VideoCard
										key={idx}
										link={video.id.videoId}
										image={
											video.snippet.thumbnails.medium.url
										}
										title={video.snippet.title}
									/>
								))}
							</div>

							<div className="relative w-full">
								<div>
									<Link href="/youtube">
										<button className="group flex items-center justify-center text-xl font-bold mx-auto">
											<div className="bg-gray-400 dark:bg-gray-700 p-3 rounded-full group-hover:bg-red-500 dark:group-hover:bg-red-600 mr-5 duration-300">
												<FiYoutube className="h-6 w-6" />
											</div>
											{parser.get("youtube_button")}
										</button>
									</Link>
								</div>

								<div className="mt-5">
									<Link href="/videos">
										<button className="rounded-full w-32 sm:w-64 h-12 px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium dark:border-gray-900 border-gray-400">
											<span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 dark:bg-gray-900 bg-gray-400 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
											<span className="relative text-gray-900 dark:text-gray-200 transition duration-300 group-hover:text-black dark:group-hover:text-white ease">
												{parser.get("view_button")}
											</span>
										</button>
									</Link>
								</div>
							</div>
						</section>

						<section className="flex flex-col text-center justify-between pt-12 pb-12 md:pb-24 lg:pt-20">
							<h2 className="text-3xl w-full text-center font-bold">
								{parser.get("works")}
							</h2>

							<div className="my-5 grid grid-cols-1 gap-12 md:gap-5 md:grid-cols-3">
								{CONFIG.WORKS.slice(0, 6).map(
									(project, index) => (
										<WorkCard
											image={project.icon}
											name={project.text}
											desc={project.alt}
											link={project.link}
											key={index}
										/>
									),
								)}
							</div>

							<div className="relative w-full">
								<Link href="/works">
									<button className="rounded-full w-32 sm:w-64 h-12 px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium dark:border-gray-900 border-gray-400">
										<span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 dark:bg-gray-900 bg-gray-400 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
										<span className="relative text-gray-900 dark:text-gray-200 transition duration-300 group-hover:text-black dark:group-hover:text-white ease">
											{parser.get("view_button")}
										</span>
									</button>
								</Link>
							</div>
						</section>

						<section className="flex flex-col text-center justify-between pb-12 md:pb-24 lg:pt-20">
							<h2 className="text-3xl w-full text-center font-bold">
								{parser.get("favorite_project_title")}
							</h2>

							<div className="my-5 grid grid-cols-1 gap-12 md:gap-5 md:grid-cols-3 items-start">
								{CONFIG.PROJECTS.slice(0, 6).map(
									(project, index) => (
										<ProjectCard
											image={project.icon}
											name={project.text}
											desc={project.alt}
											link={project.link}
											tags={project.tags}
											key={index}
										/>
									),
								)}
							</div>

							<div className="relative w-full">
								<Link href="/projects">
									<button className="rounded-full w-32 sm:w-64 h-12 px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium dark:border-gray-900 border-gray-400">
										<span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 dark:bg-gray-900 bg-gray-400 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
										<span className="relative text-gray-900 dark:text-gray-200 transition duration-300 group-hover:text-black dark:group-hover:text-white ease">
											{parser.get("view_button")}
										</span>
									</button>
								</Link>
							</div>
						</section>
					</div>
				</div>
			</section>
		</Layout>
	);
}

export async function getServerSideProps() {
	const videoRes = await fetch(
		"https://www.googleapis.com/youtube/v3/search?key=AIzaSyBFuA_ZoKLOb2K7fKg9tnUikPUqU_Iaqvc&channelId=UC3qq9Ul7xWt7A5MlNQnvITw&part=snippet,id&order=date&maxResults=3",
	);
	const videos = await videoRes.json();

	const statsRes = await fetch(
		"https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UC3qq9Ul7xWt7A5MlNQnvITw&key=AIzaSyC9qkOd0RKEZ1bQ8MNO9DXw7Lh3cf9CpHQ",
	);
	const stats = await statsRes.json();

	const { subscriberCount, videoCount, viewCount } =
		stats.items[0].statistics;

	return {
		props: {
			videos,
			subscriberCount,
			videoCount,
			viewCount,
		},
	};
}
