import { CustomImage } from "@components/Utils/CustomImage";
import classNames from "classnames";
import type { FC } from "react";
import { useLanyard } from "react-use-lanyard";

export const Status: FC = () => {
	const { loading, status } = useLanyard({
		userId: "407564231580581888",
		socket: true,
	});

	const getStatus = () => {
		switch (status?.discord_status) {
			case "online":
				return {
					status: "Çevrimiçi",
					color: "border-green-500",
				};
			case "idle":
				return {
					status: "Boşta",
					color: "border-yellow-500",
				};
			case "dnd":
				return {
					status: "Rahatsız Etmeyin",
					color: "border-red-500",
				};
			default:
				return {
					status: "Çevrimdışı veya Görünmez",
					color: "border-gray-500",
				};
		}
	};

	const getStatusName = () => {
		if (loading || !status || status.discord_status == "offline")
			return (
				<div className="flex flex-row h-[150px] justify-center items-center">
					<p className="text-center h-auto text-gray-400 font-normal italic">
						{getStatus().status}
					</p>
				</div>
			);

		const filtered = status.activities
			?.filter((activity) => activity.type !== 4)
			?.pop();

		if (!filtered)
			return (
				<div className="flex flex-row h-[150px] justify-center items-center">
					<p className="text-center h-auto text-gray-400 font-normal italic">
						Şuanda hiç bir şey oynamıyor.
					</p>
				</div>
			);

		switch (filtered.name) {
			case "Spotify":
				return;
			case "CraftRise":
				return (
					<div className="flex flex-row text-normal mt-2 ml-5 pb-2">
						<div className="mr-5">
							<CustomImage
								src={`https://cdn.discordapp.com/app-assets/${filtered.application_id}/${filtered.assets.large_image}`}
								className="w-24 rounded-lg border border-gray-800"
								alt="CraftRise_Image"
							/>
						</div>
						<div className="text-gray-800 mt-0 ml-2 w-64">
							<p className="text-orange-500 text-base font-bold text-left mb-2">
								CraftRise Oynuyor
							</p>
							<p className="text-gray-300 text-sm text-left">
								{filtered.assets.small_text}, {filtered.details}
							</p>
							<p className="text-gray-300 text-sm text-left">
								{filtered.state}
							</p>
						</div>
					</div>
				);
			case "Code":
				return (
					<div className="flex flex-row text-normal mt-2 ml-5 pb-2">
						<div className="mr-5">
							<CustomImage
								src={`https://cdn.discordapp.com/app-assets/${filtered.application_id}/${filtered.assets.large_image}`}
								className="w-24 rounded-lg border border-gray-800"
								alt="Visual_Studio_Code_Image"
							/>
						</div>
						<div className="text-gray-800 mt-0 ml-2 w-64">
							<p className="text-blue-500 text-base font-bold text-left mb-2">
								Kod Yazıyor
							</p>
							<p className="text-white text-base font-bold text-left">
								Visual Studio Code
							</p>
							<p className="text-gray-300 text-sm text-left truncate">
								{filtered.details}
							</p>
							<p className="text-gray-300 text-sm text-left truncate">
								{filtered.state}
							</p>
						</div>
					</div>
				);
			case "Visual Studio Code":
				return (
					<div className="flex flex-col md:flex-row text-normal mt-2 ml-5 pb-2">
						<div className="mr-5">
							<CustomImage
								src={`https://cdn.discordapp.com/app-assets/${filtered.application_id}/${filtered.assets.large_image}`}
								className="w-24 rounded-lg border border-gray-800"
								alt="Visual_Studio_Code_Image"
							/>
						</div>
						<div className="text-gray-800 mt-0 ml-2 w-64">
							<p className="text-blue-500 text-base font-bold text-left mb-2">
								Kod Yazıyor
							</p>
							<p className="text-white text-base font-bold text-left">
								Visual Studio Code
							</p>
							<p className="text-gray-300 text-sm text-left truncate">
								{filtered.details}
							</p>
							<p className="text-gray-300 text-sm text-left truncate">
								{filtered.state}
							</p>
						</div>
					</div>
				);
			default:
				if (filtered.name) return filtered.name;
		}
	};

	return (
		<div className="flex space-x-2 items-center text-gray-300">
			{status?.discord_user && (
				<div className="h-[300px] w-[220px] sm:w-[300px] md:w-[400px] md:h-[200px] inset-0 bg-gray-700 text-white flex flex-col rounded-lg pr-2 pb-5 overflow-hidden">
					<div className="inset-0 flex flex-row pb-2 border border-transparent border-b-gray-600">
						<div className="flex flex-row h-[80px] w-[80px]">
							<CustomImage
								src={`https://cdn.discordapp.com/avatars/${status?.discord_user.id}/${status?.discord_user.avatar}`}
								className={classNames(
									"border-[3px] relative w-[55px] h-[55px] top-[50px] left-[50px] rounded-full",
									getStatus().color,
								)}
								style={{ transform: "translate(-50%, -50%)" }}
								alt="Profile_Image"
							/>
							<div className="h-[80px] w-[260px]">
								<div
									className="flex flex-row relative top-[50%] h-[25px] ml-8"
									style={{ transform: "translate(0, -50%)" }}
								>
									<h1 className="text-lg font-semibold sm:text-xl sm:font-bold">
										{status?.discord_user.username}
										<span className="font-normal text-normal text-gray-400">
											#
											{status?.discord_user.discriminator}
										</span>
									</h1>
								</div>
							</div>
						</div>
					</div>
					{getStatusName()}
				</div>
			)}
		</div>
	);
};
