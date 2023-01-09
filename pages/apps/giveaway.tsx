import { Layout } from "@components/Layout";
//import { useLocaleParser } from "@libs/localeParser";
import { NextPage } from "next";
import { FormEvent, useState } from "react";

const RandomGiveawayPage: NextPage = () => {
	//const parser = useLocaleParser();

	const [name, setName] = useState("");
	const [winner, setWinner] = useState("1");
	const [reWinner, setReWinner] = useState("0");
	const [peoples, setPeoples] = useState([
		{
			name: "",
			id: 0,
		},
	]);

	const [resultWinner, setResultWinner] = useState("");

	const [histWinner, setHistWinner] = useState([
		{
			name: "",
			id: 0,
		},
	]);

	const updatePeople = async (e, reference) => {
		reference.name = e.target.value;
		const index = peoples.findIndex((ref) => ref.id == reference.id);
		peoples[index] = reference;
		setPeoples(peoples);
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const result = (num) => {
			const winnerNumber = Math.floor(Math.random() * num);
			const winner = peoples[winnerNumber];

			return winner;
		};
		const numberOfEntries = peoples.length;

		const winner = result(numberOfEntries).name;

		setResultWinner(winner);
		setHistWinner([
			...histWinner,
			{
				name: winner,
				id: histWinner.length + 1,
			},
		]);
	};

	return (
		<Layout title="Rastgele Çekiliş Yap">
			<section className="p-5 mx-auto">
				<div className="bg-gray-300 dark:bg-gray-800 rounded-md m-h-96">
					<div className="text-center p-8">
						<div className="flex flex-col text-center justify-between relative space-y-5 mt-8">
							<h2 className="relative text-3xl w-full text-center font-bold">
								Rastgele Çekiliş Yap
							</h2>

							<form
								className="mx-auto lg:w-96"
								onSubmit={onSubmit}
							>
								<div className="flex flex-col justify-center items-center gap-3">
									<div className="flex flex-col justify-left text-left items-left w-full">
										<label>Çekiliş İsmi </label>
										<input
											type="text"
											onChange={(e) =>
												setName(e.target.value)
											}
											placeholder="Opsiyonel"
											className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
										/>
									</div>
									<div className="flex flex-col lg:flex-row w-full gap-2">
										<div className="flex flex-col justify-left text-left items-left w-full">
											<label>Kazanan Sayısı </label>
											<input
												type="number"
												onChange={(e) =>
													setWinner(e.target.value)
												}
												disabled
												defaultValue={1}
												className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
											/>
										</div>
										<div className="flex flex-col justify-left text-left items-left w-full">
											<label>Yedek Kazanan Sayısı </label>
											<input
												type="number"
												onChange={(e) =>
													setReWinner(e.target.value)
												}
												disabled
												defaultValue="0"
												className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
											/>
										</div>
									</div>
									<div className="flex flex-col justify-left text-left items-left w-full">
										<label>
											Kişiler({peoples.length}){" "}
											<span className="text-red-600">
												*
											</span>
										</label>
										<div className="flex flex-col gap-3">
											{peoples.map((r, idx) => (
												<input
													key={idx}
													type="text"
													placeholder="İsim"
													className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
													onChange={(e) =>
														updatePeople(e, r)
													}
													minLength={3}
													required
												/>
											))}
										</div>
									</div>
									<div className="flex w-full">
										<button
											onClick={() =>
												setPeoples([
													...peoples,
													{
														name: "",
														id: peoples.length + 1,
													},
												])
											}
											className="bg-green-600 hover:bg-green-700 w-full p-3 rounded-lg font-semibold text-lg duration-200 text-white"
										>
											Kişi Ekle
										</button>
									</div>
									<div className="w-full">
										<button
											aria-label="submit"
											className="mt-2 bg-blue-600 hover:bg-blue-700 w-full p-3 rounded-lg font-semibold text-lg duration-200 text-white"
										>
											Kazananı Belirle
										</button>
									</div>
								</div>
								<div className="mt-5">
									{resultWinner.length > 1 && (
										<div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-left">
											<div>
												Çekiliş Adı:{" "}
												<strong>{name}</strong>
											</div>
											<div>
												Kazanan Sayısı:{" "}
												<strong>{winner}</strong>
											</div>
											{reWinner != "0" && (
												<div>
													Yedek Kazanan Sayısı:{" "}
													<strong>{reWinner}</strong>
												</div>
											)}
											<div>
												Geçmiş Kazananlar:{" "}
												{histWinner
													.filter(
														(w) =>
															w.name.length >= 3,
													)
													.map((w) => (
														<strong key={w.id}>
															{w.id - 1}-{w.name}{" "}
														</strong>
													))}
											</div>
											<div>
												Toplam Çekiliş Sayısı:{" "}
												<strong>
													{histWinner.length - 1}
												</strong>
											</div>
											<div>
												Kazanan:{" "}
												<strong>{resultWinner}</strong>{" "}
											</div>
										</div>
									)}
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default RandomGiveawayPage;
