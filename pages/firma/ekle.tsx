import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import { options } from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { supabase } from "@libs/supabase";
import { toast } from "react-toastify";
import { perman } from "@libs/permissions";

export interface ICompanyAddPage {
	session?: Session;
}

const CompanyAddPage: NextPage<ICompanyAddPage> = ({ session }) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const router = useRouter();

	const [name, setName] = useState("");
	const [sgkNo, setSgkNo] = useState("");
	const [adress, setAdress] = useState("");
	const [region, setRegion] = useState("");
	const [workerName, setWorkerName] = useState("");
	const [workerPhone, setWorkerPhone] = useState("");
	const [ibanNo, setIbanNo] = useState("");
	const [note, setNote] = useState("");
	const [workerMail, setWorkerMail] = useState("");
	const [vergiNo, setVergiNo] = useState("");

	const [mek, setMek] = useState("0");
	const [mak, setMak] = useState("0");
	const [elek, setElek] = useState("0");
	const [kim, setKim] = useState("0");

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			!name &&
			!sgkNo &&
			!adress &&
			!workerName &&
			!workerPhone &&
			!region &&
			!workerMail &&
			!ibanNo &&
			!vergiNo
		)
			return toast.error("Lütfen boş bir alan bırakmayın.");

		if (
			perman.hasNone(session.user.permissions, [
				"okul_idaresi",
				"alan_sefleri",
			])
		) {
			toast.error("Firma eklemek için yeterli yetkiye sahip değilsiniz.");
			return;
		}

		const { error } = await supabase.from("workplace").insert([
			{
				name,
				sgkNo,
				adress,
				workerName,
				workerPhone,
				workerMail,
				ibanNo,
				note,
				adding: session.user.id,
				mek,
				mak,
				elek,
				kim,
				region,
				vergiNo,
			},
		]);

		if (error) {
			console.log(error);
			throw error;
		}

		toast.success("Başarıyla Firma Eklendi.");
		router.push("/firma");
	};

	return (
		<Layout title="Firma Ekle">
			<section className="mx-auto my-8 px-10 lg:px-48">
				<div className="bg-gray-300 px-10 py-8 dark:bg-gray-700">
					<form
						className="mx-auto flex flex-col items-center justify-center gap-4"
						onSubmit={onSubmit}
					>
						<h1 className="text-2xl font-semibold text-black dark:text-white">
							Firma Bilgileri
						</h1>
						<div className="flex flex-col justify-center gap-12 md:flex-row">
							<div className="items-cener flex flex-col gap-4">
								<input
									type="text"
									placeholder="Firma Adı"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setName(e.target.value)}
								/>
								<textarea
									placeholder="Adres"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setAdress(e.target.value)}
								/>
								<input
									type="text"
									placeholder="Bölge"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setRegion(e.target.value)}
								/>
								<input
									type="text"
									placeholder="Yetkili İsmi"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) =>
										setWorkerName(e.target.value)
									}
								/>
								<input
									type="tel"
									placeholder="Yetkili Numarası"
									maxLength={10}
									minLength={10}
									pattern="\d*"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) =>
										setWorkerPhone(e.target.value)
									}
								/>
								<input
									type="email"
									placeholder="Yetkili E-Mail"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) =>
										setWorkerMail(e.target.value)
									}
								/>
								<textarea
									placeholder="Not"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setNote(e.target.value)}
								/>
							</div>

							<div className="flex flex-col items-center gap-4">
								<input
									type="text"
									placeholder="Iban No"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setIbanNo(e.target.value)}
								/>
								<input
									type="text"
									placeholder="Vergi No"
									maxLength={11}
									minLength={11}
									pattern="\d*"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setVergiNo(e.target.value)}
								/>
								<input
									type="text"
									placeholder="SGK No"
									maxLength={26}
									minLength={23}
									pattern="\d*"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setSgkNo(e.target.value)}
								/>
								{/*<input
						type="text"
						placeholder="TC No (SGK Yoksa Yazınız)"
						maxLength={11}
						minLength={11}
						pattern="\d*"
						className="w-64 rounded bg-gray-100 dark:bg-gray-900 px-2 py-2 font-medium text-gray-800 dark:text-gray-200 outline-none"
						onChange={(e) => setSgkNo(e.target.value)}
					/> */}

								<h5 className="text-2xl font-bold text-black dark:text-white">
									Talep Edilen Öğrenciler
								</h5>

								<div className="overflow-x-auto rounded-lg">
									<table className="text-center text-sm text-gray-400">
										<thead className="bg-gray-100 text-xs uppercase text-gray-400 dark:bg-gray-900">
											<tr>
												<th className="py-3 px-6">
													Mek
												</th>
												<th className="py-3 px-6">
													Mak
												</th>
												<th className="py-3 px-6">
													Elek
												</th>
												<th className="py-3 px-6">
													Kim
												</th>
											</tr>
										</thead>
										<tbody>
											<tr className="mx-auto border-b border-gray-700 bg-gray-200 dark:bg-gray-800">
												<td className="py-2">
													<input
														type="number"
														className="w-12 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
														defaultValue={"0"}
														onChange={(e) =>
															setMek(
																e.target.value,
															)
														}
													/>
												</td>
												<td className="py-2">
													<input
														type="number"
														className="w-12 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
														defaultValue={"0"}
														onChange={(e) =>
															setMak(
																e.target.value,
															)
														}
													/>
												</td>
												<td className="py-2">
													<input
														type="number"
														className="w-12 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
														defaultValue={"0"}
														onChange={(e) =>
															setElek(
																e.target.value,
															)
														}
													/>
												</td>
												<td className="py-2">
													<input
														type="number"
														className="w-12 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
														defaultValue={"0"}
														onChange={(e) =>
															setKim(
																e.target.value,
															)
														}
													/>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>

						<div>
							<button
								className="m-2 inline-flex cursor-pointer items-center whitespace-nowrap rounded-lg bg-green-600 px-3 py-2 text-center text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200"
								aria-label="Submit"
							>
								Firmayı Ekle
							</button>
						</div>
					</form>
				</div>
			</section>
		</Layout>
	);
};

export default CompanyAddPage;

export async function getServerSideProps(context) {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		options,
	);

	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
		},
	};
}
