import { Layout } from "@components/Layout";
import { useLocaleParser } from "@libs/localeParser";
import { NextPage } from "next";
import { CustomImage } from "@components/Utils/CustomImage";
import slipyme from "@assets/works/slipyme.svg";
import { Link } from "@components/Utils/Link";
import { FiMail } from "react-icons/fi";
import { FaWpforms } from "react-icons/fa";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import webhook from "webhook-discord";

const ContactPage: NextPage = () => {
	const parser = useLocaleParser();

	const [disabledTrue, setDisabled] = useState(false);

	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("istek");
	const [message, setMessage] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const formattedNumber = formatPhoneNumber(event.target.value);
		setPhoneNumber(formattedNumber);
	};

	const formatPhoneNumber = (input: string) => {
		const cleaned = ("" + input).replace(/\D/g, "");
		const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,4})$/);
		if (match) {
			const formatted = `${match[1]} ${match[2]} ${match[3]}`;
			return formatted.trim();
		}
		return input;
	};

	const Hook = new webhook.Webhook(
		"https://ptb.discord.com/api/webhooks/1135216977259008061/0V_Xn8_CpI9B0Djmg8kDMlKQ-CUKsJVgxF9LnhPR4artJUviAu8D6rFoHBskHgZ5zMGK",
	);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (name && surname && email && subject && message) {
			const msg = new webhook.MessageBuilder()
				.setName(name + " " + surname)
				.setText(
					`Mail: ${email} - Telefon: ${phoneNumber} - Konu: ${subject} \nMesaj: ${message}`,
				);
			Hook.send(msg);

			setDisabled(!disabledTrue);
			toast.success("Mesajınız başarıyla iletildi!");
		} else {
			toast.error("Lütfen boş alan bırakmayınız!");
		}
	};

	return (
		<Layout title={parser.get("contact")}>
			<section className="p-5 mx-auto">
				<div className="bg-gray-300 dark:bg-gray-800 rounded-md m-h-96">
					<div className="text-center p-8">
						<div className="flex flex-col lg:flex-row gap-2 text-center justify-between relative">
							<div className="flex flex-col lg:flex-row gap-3 items-center justify-left">
								<div className="w-48">
									<CustomImage
										className="w-full"
										src={slipyme}
										alt=""
									/>
								</div>
								<div className="flex flex-col gap-5 text-left">
									<h3 className="text-2xl font-bold text-black dark:text-white flex items-center gap-2">
										<FiMail className="w-5 h-5" /> Mail
									</h3>
									<h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
										{parser.get("contactMedia")}:{" "}
										<Link
											className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-600"
											href="mailto:media@slipyme.com"
										>
											media@slipyme.com
										</Link>
									</h5>
									<h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
										{parser.get("contactApp")}:{" "}
										<Link
											className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-600"
											href="mailto:contact@slipyme.com"
										>
											contact@slipyme.com
										</Link>
									</h5>
									<h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
										{parser.get("contactPerson")}:{" "}
										<Link
											className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-600"
											href="mailto:berkant@slipyme.com"
										>
											berkant@slipyme.com
										</Link>
									</h5>
								</div>
							</div>
							<div>
								<div className="flex flex-col gap-5">
									<h3 className="text-2xl font-bold text-black dark:text-white flex items-center justify-center gap-2">
										<FaWpforms className="w-5 h-5" />{" "}
										{parser.get("contact")}
									</h3>
									<form
										className="grid grid-cols-1 gap-2"
										onSubmit={onSubmit}
									>
										<div className="flex flex-col lg:flex-row gap-2">
											<div className="flex flex-col justify-left text-left items-left">
												<label>
													İsminiz{" "}
													<span className="text-red-600">
														*
													</span>
												</label>
												<input
													type="text"
													onChange={(e) =>
														setName(e.target.value)
													}
													className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
													required
													disabled={disabledTrue}
												/>
											</div>
											<div className="flex flex-col justify-left text-left items-left">
												<label>
													Soyisminiz{" "}
													<span className="text-red-600">
														*
													</span>
												</label>
												<input
													type="text"
													onChange={(e) =>
														setSurname(
															e.target.value,
														)
													}
													className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
													required
													disabled={disabledTrue}
												/>
											</div>
										</div>
										<div className="flex flex-col lg:flex-row gap-2">
											<div className="flex flex-col justify-left text-left items-left">
												<label>
													Mail Adresiniz{" "}
													<span className="text-red-600">
														*
													</span>
												</label>
												<input
													onChange={(e) =>
														setEmail(e.target.value)
													}
													type="email"
													className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
													required
													disabled={disabledTrue}
												/>
											</div>
											<div className="flex flex-col justify-left text-left items-left">
												<label>Telefon Numaranız</label>
												<input
													type="tel"
													disabled={disabledTrue}
													maxLength={12}
													minLength={12}
													placeholder="Başına 0 koymayın."
													className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
													pattern="\d{0,3} \d{0,3} \d{0,4} \d{0,4}"
													value={phoneNumber}
													onChange={handleChange}
												/>
											</div>
										</div>
										<div className="flex flex-col justify-left text-left items-left">
											<label>
												Konu{" "}
												<span className="text-red-600">
													*
												</span>
											</label>
											<select
												disabled={disabledTrue}
												onChange={(e) =>
													setSubject(e.target.value)
												}
												defaultValue="istek"
												className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
												required
											>
												<option value="istek">
													İstek/Öneri
												</option>
												<option value="teklif">
													İş Teklifi
												</option>
												<option value="bildirim">
													Geri Bildirim
												</option>
											</select>
										</div>
										<div className="flex flex-col justify-left text-left items-left">
											<label>
												Mesajınız{" "}
												<span className="text-red-600">
													*
												</span>
											</label>
											<textarea
												onChange={(e) =>
													setMessage(e.target.value)
												}
												className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
												required
											/>
										</div>
										<div>
											<button
												aria-label="submit"
												className="mt-2 bg-blue-600 hover:bg-blue-700 w-full p-3 rounded-lg font-semibold text-lg duration-200 text-white"
												disabled={disabledTrue}
											>
												Gönder
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default ContactPage;
