import { Layout } from "@components/Layout";
import { NextPage } from "next";
import { useQRCode } from "next-qrcode";
import { useState } from "react";

const QrCodePage: NextPage = () => {
	const { Canvas } = useQRCode();

	const [url, setURL] = useState("https://www.slipyme.com");
	const [width, setWidth] = useState("150");
	const [color, setColor] = useState("#08788a");
	const [background, setBackground] = useState("#ffffff");

	/*const [src, setSrc] = useState("https://cdn.discordapp.com/icons/904103710903390218/38db5ce71748ce1cd044d9e32813a880");
    const [logoWidth, setLogoWidth] = useState("50");
    const [x, setX] = useState("50");
    const [y, setY] = useState("50");*/

	return (
		<Layout title="QR Oluşturucu">
			<section className="p-5 mx-auto">
				<div className="bg-gray-300 dark:bg-gray-800 rounded-md m-h-96">
					<div className="text-center p-8">
						<div className="flex flex-col text-center justify-between relative space-y-5 mt-8">
							<h2 className="relative text-3xl w-full text-center font-bold">
								QR Kod Oluşturucu
							</h2>
							<div className="mx-auto">
								<div className="flex flex-col lg:flex-row gap-3 justify-center w-full">
									<div className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded-lg gap-3 flex flex-col">
										<h1 className="my-3 text-xl font-semibold text-black dark:text-white">
											QR Kod
										</h1>
										<div className="flex flex-col justify-left text-left items-left w-full">
											<label>Yönlendirilecek URL</label>
											<input
												type="text"
												onChange={(e) =>
													setURL(e.target.value)
												}
												placeholder="Lütfen bir url giriniz."
												value={url}
												className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
												required
											/>
										</div>
										<div className="flex flex-col justify-left text-left items-left w-full">
											<label>Boyut</label>
											<input
												type="number"
												onChange={(e) =>
													setWidth(e.target.value)
												}
												placeholder="Lütfen bir sayı giriniz."
												value={width}
												className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
												required
											/>
										</div>
										<div className="flex flex-col justify-left text-left items-left w-full">
											<label>QR Rengi</label>
											<input
												type="color"
												onChange={(e) =>
													setColor(e.target.value)
												}
												placeholder="Lütfen bir renk giriniz."
												value={color}
												className="w-full h-12 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200 "
												required
											/>
										</div>
										<div className="flex flex-col justify-left text-left items-left w-full">
											<label>Arkaplan Rengi</label>
											<input
												type="color"
												onChange={(e) =>
													setBackground(
														e.target.value,
													)
												}
												placeholder="Lütfen bir renk giriniz."
												value={background}
												className="w-full h-12 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200 "
												required
											/>
										</div>
									</div>
								</div>

								<div className="mt-5">
									<h2 className="relative text-3xl w-full text-center font-bold">
										QR Kod (Oluşturulan Resim)
									</h2>

									<div className="flex justify-center my-3">
										<Canvas
											text={url}
											options={{
												//level: "L",
												margin: 2,
												scale: 5,
												width: Number(width),
												color: {
													dark: color,
													light: background,
												},
											}}
										/>
									</div>

									<p className="text-black dark:text-white text-md font-md">
										Resmi indirmek için sağ tıklayıp farklı
										kaydet diyebilirsin.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default QrCodePage;
