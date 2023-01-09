/* eslint-disable no-mixed-spaces-and-tabs */
//import { useLocaleParser } from "@libs/localeParser";
import dynamic from "next/dynamic";
import { useEffect, type FC } from "react";

const Tetris = dynamic(() => import("react-simple-tetris"), { ssr: false });

export const TetrisGame: FC = () => {
	//const parser = useLocaleParser();

	//const [lose, setLose] = useState(false);

	const handleKeyDown = (e: KeyboardEvent) => e.preventDefault();

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<div>
			<Tetris>
				{({
					HeldPiece,
					Gameboard,
					PieceQueue,
					points,
					linesCleared,
					state,
					controller,
				}) => (
					<div className="relative flex flex-col items-center">
						<>
							<div className="flex gap-5 mb-3">
								<div>Puan: {points.toString()}</div>
								<div>Satır: {linesCleared.toString()}</div>
							</div>
							<div className="mb-4 w-full flex flex-row justify-center gap-5">
								<div className="px-2">
									<HeldPiece />
								</div>
								<div className="px-2">
									<Gameboard />
								</div>
								<div className="px-2">
									<PieceQueue />
								</div>
							</div>
							<div className="grid grid-cols-4 lg:flex lg:flex-row gap-2 mb-4 justify-center">
								<div>
									<button
										onClick={controller.moveLeft}
										className="mb-3 inline-block w-full rounded-xl bg-blue-600 px-6 py-2 font-semibold leading-loose text-white transition duration-200 hover:bg-blue-700 lg:mb-0"
									>
										Sol
									</button>
								</div>
								<div>
									<button
										onClick={controller.moveRight}
										className="mb-3 inline-block w-full rounded-xl bg-blue-600 px-6 py-2 font-semibold leading-loose text-white transition duration-200 hover:bg-blue-700 lg:mb-0"
									>
										Sağ
									</button>
								</div>
								<div>
									<button
										onClick={controller.flipClockwise}
										className="mb-3 inline-block w-full rounded-xl bg-blue-600 px-6 py-2 font-semibold leading-loose text-white transition duration-200 hover:bg-blue-700 lg:mb-0"
									>
										Döndür
									</button>
								</div>
								<div>
									<button
										onClick={controller.hardDrop}
										className="mb-3 inline-block w-full rounded-xl bg-blue-600 px-6 py-2 font-semibold leading-loose text-white transition duration-200 hover:bg-blue-700 lg:mb-0"
									>
										Düşür
									</button>
								</div>
								<div>
									<button
										onClick={controller.hold}
										className="mb-3 inline-block w-full rounded-xl bg-blue-600 px-6 py-2 font-semibold leading-loose text-white transition duration-200 hover:bg-blue-700 lg:mb-0"
									>
										Tut
									</button>
								</div>
								{(state == "PAUSED" && (
									<div>
										<button
											onClick={controller.resume}
											className="mb-3 inline-block w-full rounded-xl bg-blue-600 px-6 py-2 font-semibold leading-loose text-white transition duration-200 hover:bg-blue-700 lg:mb-0"
										>
											Devam Et
										</button>
									</div>
								)) || (
									<div>
										<button
											onClick={controller.pause}
											className="mb-3 inline-block w-full rounded-xl bg-green-600 px-6 py-2 font-semibold leading-loose text-white transition duration-200 hover:bg-green-700 lg:mb-0"
										>
											Durdur
										</button>
									</div>
								)}
								<div>
									<button
										onClick={() => controller.restart()}
										className="mb-3 inline-block w-full rounded-xl bg-red-600 px-6 py-2 font-semibold leading-loose text-white transition duration-200 hover:bg-red-700 lg:mb-0"
									>
										Yenile
									</button>
								</div>
							</div>

							{state === "PAUSED" && (
								<div className="absolute lg:top-[25%] bg-gray-700 p-5 lg:w-72 shadow-2xl rounded-lg text-center">
									<h5 className="text-xl font-bold">
										Oyun Durduruldu
									</h5>
									<button
										className="mt-5 bg-blue-600 p-2 rounded-lg text-lg font-semibold hover:bg-blue-700 duration-200"
										onClick={controller.resume}
									>
										Devam Et
									</button>
								</div>
							)}
							{state === "LOST" && (
								<div className="absolute lg:top-[25%] bg-gray-700 p-5 lg:w-72 shadow-2xl rounded-lg text-center">
									<h5 className="text-xl font-bold">
										Kaybettin
									</h5>
									<button
										className="mt-5 bg-blue-600 p-2 rounded-lg text-lg font-semibold hover:bg-blue-700 duration-200"
										onClick={controller.restart}
									>
										Yeniden Oyna
									</button>
								</div>
							)}
						</>
					</div>
				)}
			</Tetris>
		</div>
	);
};
