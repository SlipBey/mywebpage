import { NextPage } from "next";
import { Layout } from "@components/Layout";
import { Link } from "@components/Utils/Link";
import { FiHome } from "react-icons/fi";

const ResumePage: NextPage = () => {
	const TimeLine = [
		{
			title: "AngelCraft",
			date: "2018-2019 / 2020-2020",
			text: "İlk Minecraft sunucum.",
		},
		{
			title: "XiR",
			date: "2019-devam ediyor",
			text: "İlk yazılım ekibinde deneyim.",
		},
		{
			title: "AngelBot",
			date: "2019-2020",
			text: "İlk discord botum.",
		},
		{
			title: "SlipBey",
			date: "2020-devam ediyor",
			text: "Kendimi ilk piyasaya atmam",
		},
		{
			title: "CodeBook",
			date: "2020-2021",
			text: "İlk codeshare sunucu deneyimim.",
		},
		{
			title: "Marpel",
			date: "2020-2022 / devam edebilir",
			text: "İlk yazılım ekibi ve webmaster deneyimim.",
		},
		{
			title: "SoulCraft",
			date: "2021-2021 (2 Ay)",
			text: "İlk minecraft ekip deneyimi.",
		},
		{
			title: "Slipyme",
			date: "2021-devam ediyor",
			text: "Slipyme projesinin ilk çıkışı",
		},
		{
			title: "Lydoria",
			date: "2021-2022 (1 Yıl 2 Ay)",
			text: "Yönetici & Yazılım Ekibinde Görev.",
		},
		{
			title: "Slipyme Code",
			date: "2021-2022 (Artık Slipyme Land)",
			text: "Slipyme'nin yazılımcılar için projesi",
		},
		{
			title: "EnderRise",
			date: "2022-duraklatıldı (3 Ay)",
			text: "Yeni Minecraft Sunucum",
		},
		{
			title: "EnderBot",
			date: "2022-duraklatıldı (5 Ay)",
			text: "Yeni Discord Botum",
		},
		{
			title: "Slipyme Evrimi",
			date: "2022",
			text: "Slipyme Artık Resmen Açıldı",
		},
		{
			title: "Slipyme Blog",
			date: "2022-devam ediyor",
			text: "Slipyme'nin blog ve bilgi platformu.",
		},
		{
			title: "Slipyme Design",
			date: "2022-devam ediyor",
			text: "Slipyme'nin tasarımcılar için açtığı platform.",
		},
	];

	const Soon = [
		{
			title: "Slipyme Land",
			date: "Açılış: 2022",
			text: "Slipyme'nin, 338.rocks ile ortak olarak açtığı yazılımcılar için açtığı platformdur. Ayrıca Botlist, serverlist ve discord statsitic özellikleri yer alacaktır.",
		},
		{
			title: "Slipyme Shop",
			date: "Açılış: 2022",
			text: "Slipyme'nin satış yapmak için açacak olduğu platform.",
		},
		{
			title: "Slipyme Product",
			date: "Açılış: 2023",
			text: "Slipyme'nin film ve video çekimi için açacağı prodüksiyon şirketi.",
		},
		{
			title: "Slipyme LTD ŞTİ",
			date: "Açılış: 2023 (Tahmini)",
			text: "Slipyme'nin resmi şirketi ve ofisinin açılışı.",
		},
	];

	return (
		<Layout title="Resume Page">
			<section className="p-5 mx-auto">
				<div className="bg-gray-800 rounded-md m-h-96">
					<div className="px-8 py-4">
						<Link href="/">
							<button className="bg-gray-700 text-gray-200 p-2 rounded-full hover:bg-gray-900 duration-200">
								<FiHome className="w-5 h-5" />
							</button>
						</Link>
					</div>

					<div className="p-8">
						<h1 className="text-2xl font-semibold text-white mb-5">
							Proje Geçmişi
						</h1>
						<ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-3">
							{TimeLine.map((timeline, idx) => (
								<li className="relative mb-6 sm:mb-0" key={idx}>
									<div className="flex items-center">
										<div className="flex z-10 justify-center items-center w-6 h-6 rounded-full ring-0 bg-blue-900 sm:ring-8 ring-gray-900 shrink-0">
											<svg
												aria-hidden="true"
												className="w-3 h-3 text-blue-300"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
													clipRule="evenodd"
												></path>
											</svg>
										</div>
										<div className="flex w-full h-0.5 bg-gray-700"></div>
									</div>
									<div className="mt-3 sm:pr-8">
										<h3 className="text-lg font-semibold text-white">
											{timeline.title}
										</h3>
										<time className="block mb-2 text-sm font-normal leading-none text-gray-300">
											{timeline.date}
										</time>
										<p className="text-base font-normal text-gray-400">
											{timeline.text}
										</p>
									</div>
								</li>
							))}
						</ol>

						<h1 className="text-2xl font-semibold text-white mb-2">
							Gelecekler
						</h1>
						<p className="text-lg font-lg text-gray-200 mb-5">
							Dikkat! Buradaki yazılanlar geleceği kesin olan
							projelerdir. Her an beklenmedik yeni bir proje
							gelebilir.
						</p>
						<ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-3">
							{Soon.map((soon, idx) => (
								<li className="relative mb-6 sm:mb-0" key={idx}>
									<div className="flex items-center">
										<div className="flex z-10 justify-center items-center w-6 h-6 rounded-full ring-0 bg-blue-900 sm:ring-8 ring-gray-900 shrink-0">
											<svg
												aria-hidden="true"
												className="w-3 h-3 text-blue-300"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
													clipRule="evenodd"
												></path>
											</svg>
										</div>
										<div className="flex w-full h-0.5 bg-gray-700"></div>
									</div>
									<div className="mt-3 sm:pr-8">
										<h3 className="text-lg font-semibold text-white">
											{soon.title}
										</h3>
										<time className="block mb-2 text-sm font-normal leading-none text-gray-300">
											{soon.date}
										</time>
										<p className="text-base font-normal text-gray-400">
											{soon.text}
										</p>
									</div>
								</li>
							))}
						</ol>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default ResumePage;
