import { Layout } from "@components/Layout";
//import { useLocaleParser } from "@libs/localeParser";
import { NextPage } from "next";
import { useState } from "react";

import {
	BsFillDice1Fill,
	BsFillDice2Fill,
	BsFillDice3Fill,
	BsFillDice4Fill,
	BsFillDice5Fill,
	BsFillDice6Fill,
} from "react-icons/bs";
import { IconType } from "react-icons/lib";

const DiceGiveawayPage: NextPage = () => {
	//const parser = useLocaleParser();

	const [number, setNumber] = useState(0);
	const [numberTwo, setNumberTwo] = useState(0);
	const [numberTwo2, setNumberTwo2] = useState(0);

	const onDice = async () => {
		const winner = Math.floor(Math.random() * 7);
		if (winner > 0) {
			setNumber(winner);
			setNumberTwo(0);
			setNumberTwo2(0);
		}
	};
	const onDiceTwo = async () => {
		const oneDice = Math.floor(Math.random() * 7);
		const twoDice = Math.floor(Math.random() * 7);
		if (oneDice > 0 && twoDice > 0) {
			setNumberTwo(oneDice);
			setNumberTwo2(twoDice);
			setNumber(0);
		}
	};

	const getIcon = (num) => {
		let Icon: IconType;
		switch (num) {
			case 1:
				Icon = BsFillDice1Fill;
				break;
			case 2:
				Icon = BsFillDice2Fill;
				break;
			case 3:
				Icon = BsFillDice3Fill;
				break;
			case 4:
				Icon = BsFillDice4Fill;
				break;
			case 5:
				Icon = BsFillDice5Fill;
				break;
			case 6:
				Icon = BsFillDice6Fill;
				break;
			default:
				Icon = BsFillDice1Fill;
				break;
		}
		return <Icon className="w-6 h-6 my-2" />;
	};

	return (
		<Layout title="Zar At">
			<section className="p-5 mx-auto">
				<div className="bg-gray-300 dark:bg-gray-800 rounded-md m-h-96">
					<div className="text-center p-8">
						<div className="flex flex-col text-center justify-between relative space-y-5 mt-8">
							<h2 className="relative text-3xl w-full text-center font-bold">
								Zar At
							</h2>
							<div className="mx-auto lg:w-96">
								<div className="w-full flex flex-col lg:flex-row gap-2">
									<button
										onClick={onDice}
										className="mt-2 bg-blue-600 hover:bg-blue-700 w-full p-3 rounded-lg font-semibold text-lg duration-200 text-white"
									>
										Tek Zar At
									</button>
									<button
										onClick={onDiceTwo}
										className="mt-2 bg-green-600 hover:bg-green-700 w-full p-3 rounded-lg font-semibold text-lg duration-200 text-white"
									>
										Çift Zar At
									</button>
								</div>
								<div className="mt-5">
									{number > 0 && (
										<div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-left">
											<div>{getIcon(number)}</div>
											<div>
												Atılan Zar: <strong>Tek</strong>
											</div>
											<div>
												Sayı: <strong>{number}</strong>
											</div>
										</div>
									)}
									{numberTwo > 0 && numberTwo2 > 0 && (
										<div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-left">
											<div className="flex gap-2">
												{getIcon(numberTwo)}{" "}
												{getIcon(numberTwo2)}
											</div>
											<div>
												Atılan Zar:{" "}
												<strong>Çift</strong>
											</div>
											<div>
												İlk Zar:{" "}
												<strong>{numberTwo}</strong>
											</div>
											<div>
												İkinci Zar:{" "}
												<strong>{numberTwo2}</strong>
											</div>
											<div>
												Toplam:{" "}
												<strong>
													{numberTwo + numberTwo2}
												</strong>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default DiceGiveawayPage;
