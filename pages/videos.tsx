import { Layout } from "@components/Layout";
import Link from "next/link";

import { useLocaleParser } from "@libs/localeParser";
import { VideoCard } from "@components/Videos/VideoCard";
import { FiEye, FiUsers, FiVideo, FiYoutube } from "react-icons/fi";
import { useState } from "react";
import classNames from "classnames";

export default function VideosPage() {
	const parser = useLocaleParser();

	const [videoOption, setVideoOption] = useState(0);

	return (
		<Layout title={parser.get("videos")}>
			<section className="p-5 mx-auto">
				<div className="bg-gray-300 dark:bg-gray-800 rounded-md m-h-96">
					<div className="text-center p-8">
						<div className="flex flex-col text-center justify-between relative space-y-5 mt-8">
							<h2 className="relative text-3xl w-full text-center font-bold">
								{parser.get("statistics")}
							</h2>
							{/*
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

							<h2 className="relative text-3xl w-full text-center font-bold">
								{parser.get("videos")}
							</h2>

							<div className="flex justify-center flex-row w-full">
								<button
									onClick={() => setVideoOption(0)}
									className={classNames(
										"rounded-l-full border-2 border-gray-400 dark:border-gray-700 w-32 p-2 hover:bg-gray-400 dark:hover:bg-gray-700",
										{
											"bg-gray-400 dark:bg-gray-700":
												videoOption == 0,
										},
									)}
								>
									{parser.get("newVideo_button")}
								</button>
								<button
									onClick={() => setVideoOption(1)}
									className={classNames(
										"rounded-r-full border-2 border-gray-400 dark:border-gray-700 w-32 p-2 hover:bg-gray-400 dark:hover:bg-gray-700",
										{
											"bg-gray-400 dark:bg-gray-700":
												videoOption == 1,
										},
									)}
								>
									{parser.get("popularVideo_button")}
								</button>
							</div>

							<div
								className={classNames({
									hidden: videoOption != 0,
								})}
							>
								<h5 className="text-left text-xl font-semibold mb-5">
									{parser.get("newVideo_text")}
								</h5>

								<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center">
									{videos.items.map((video, idx) => (
										<VideoCard
											key={idx}
											link={video.id.videoId}
											image={
												video.snippet.thumbnails.medium
													.url
											}
											title={video.snippet.title}
										/>
									))}
								</div>
							</div>

							<div
								className={classNames({
									hidden: videoOption != 1,
								})}
							>
								<h5 className="text-left text-xl font-semibold mb-5">
									{parser.get("popularVideo_text")}
								</h5>

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
							</div>

							<div className="relative w-full">
								<div>
									<h3 className="mb-5 text-xl font-bold">
										{parser.get("more_text")}
									</h3>
									<Link href="/youtube" legacyBehavior>
										<a target="_blank">
											<button className="group flex items-center justify-center text-xl font-bold mx-auto">
												<div className="bg-gray-400 dark:bg-gray-700 p-3 rounded-full group-hover:bg-red-500 dark:group-hover:bg-red-600 mr-5 duration-300">
													<FiYoutube className="h-6 w-6" />
												</div>
												{parser.get("youtube_button")}
											</button>
										</a>
									</Link>
								</div>
							</div>*/}
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
}
/*
export async function getServerSideProps() {
	const videoRes = await fetch(
		"https://www.googleapis.com/youtube/v3/search?key=AIzaSyBFuA_ZoKLOb2K7fKg9tnUikPUqU_Iaqvc&channelId=UCdNQk7uEbiZh4Hyovavdo4A&part=snippet,id&order=date&maxResults=18",
	);
	const videos = await videoRes.json();

	const statsRes = await fetch(
		"https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCdNQk7uEbiZh4Hyovavdo4A&key=AIzaSyC9qkOd0RKEZ1bQ8MNO9DXw7Lh3cf9CpHQ",
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
}*/
