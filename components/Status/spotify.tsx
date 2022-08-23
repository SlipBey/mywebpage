import { CustomImage } from "@components/Utils/CustomImage";
import type { FC } from "react";
import { useLanyard } from "react-use-lanyard";

export const SpotifyStatus: FC = () => {
	const { status } = useLanyard({
		userId: "407564231580581888",
		socket: true,
	});
	return (
		<div>
			{status?.spotify && (
				<div className="sm:w-84 sm:h-24 bg-gray-700 p-2 justify-between flex flex-col items-center sm:flex-row rounded-md">
					<div>
						<CustomImage
							src={status?.spotify.album_art_url}
							className="h-[80px] w-[80px]"
							alt="Spotify_Image"
						/>
					</div>
					<div className="ml-3 text-center sm:text-left">
						<h3 className="text-gray-300 text-lg font-semibold">
							{status?.spotify.song}
						</h3>
						<p className="text-gray-300 text-medium font-lg">
							{status?.spotify.artist} Tarafından
						</p>
						<p className="text-gray-300 text-medium font-lg">
							{status?.spotify.album} Albümünde
						</p>
					</div>
				</div>
			)}
		</div>
	);
};
