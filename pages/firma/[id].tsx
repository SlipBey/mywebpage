import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import { options } from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { supabase } from "@libs/supabase";
import { toast } from "react-toastify";
import { Button } from "@components/Globals/Button";
import classNames from "classnames";
import Link from "next/link";
import { perman } from "@libs/permissions";

export interface ICompanyEditPage {
	session?: Session;
	work?;
	workLog?;
	addingInfo?;
	students?;
	workAdvert?;
}

const CompanyEditPage: NextPage<ICompanyEditPage> = ({
	session,
	work,
	workLog,
	addingInfo,
	students,
	/*workAdvert*/
}) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [disabledTrue, setDisabled] = useState(true);

	const onOpen = () => {
		setOpen(!open);
		if (open) {
			router.push("#");
		} else {
			router.push("#log");
		}
	};

	const onDisabled = () => {
		if (
			perman.has(
				session.user.permissions,
				"okul_idaresi" || "alan_sefleri",
			)
		) {
			setDisabled(!disabledTrue);
			if (disabledTrue) {
				toast.info("Firma Düzenleme Modu Açıldı.");
			} else {
				toast.info("Firma Düzenleme Modu Kapatıldı.");
			}
		} else {
			toast.error(
				"Öğrenciler için düzenlemeleri sadece İdare Amirleri ve Bölüm Şefleri Yapabilir.",
			);
		}
	};

	const [name, setName] = useState(work.name);
	const [sgkNo, setSgkNo] = useState(work.sgkNo);
	const [adress, setAdress] = useState(work.adress);
	const [region, setRegion] = useState(work.region);
	const [workerName, setWorkerName] = useState(work.workerName);
	const [note, setNote] = useState(work.note);
	const [workerPhone, setWorkerPhone] = useState(work.workerPhone);
	const [ibanNo, setIbanNo] = useState(work.ibanNo);
	const [workerMail, setWorkerMail] = useState(work.workerMail);
	const [vergiNo, setVergiNo] = useState(work.vergiNo);
	const [about, setAbout] = useState(work.about);

	const [mek, setMek] = useState(work.mek);
	const [mak, setMak] = useState(work.mak);
	const [elek, setElek] = useState(work.elek);
	const [kim, setKim] = useState(work.kim);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		/*if (
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
			return toast.error("Lütfen boş bir alan bırakmayın.");*/

		const { error } = await supabase
			.from("workplace")
			.update({
				name,
				sgkNo,
				adress,
				workerName,
				workerPhone,
				workerMail,
				ibanNo,
				note,
				mek,
				mak,
				elek,
				kim,
				region,
				vergiNo,
				about,
			})
			.eq("id", work.id)
			.single();

		const { error: err } = await supabase.from("workplaceLog").insert([
			{
				workId: work.id,
				userId: session.user.id,
			},
		]);

		if (error) {
			console.log(error);
			throw error;
		}
		if (err) {
			console.log(err);
			throw err;
		}
		toast.success("Başarıyla Firma Düzenlendi.");
		router.push("/firma");
	};

	//console.log(students)

	return (
		<Layout title={`${work.name} Firması`}>
			<section className="mx-auto my-8 px-10">
				<div className="bg-gray-300 px-10 py-8 dark:bg-gray-700">
					<form
						className="mx-auto flex flex-col items-center justify-center gap-4"
						onSubmit={onSubmit}
					>
						<h1 className="text-2xl font-semibold text-black dark:text-white">
							Firma Bilgileri
						</h1>
						<div className="flex flex-col justify-center gap-12 lg:flex-row">
							<div className="flex flex-col items-center gap-4">
								<input
									type="text"
									placeholder="Firma Adı"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setName(e.target.value)}
									defaultValue={work.name}
									disabled={disabledTrue}
								/>
								<textarea
									placeholder="Adres"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setAdress(e.target.value)}
									defaultValue={work.adress}
									disabled={disabledTrue}
								/>
								<input
									type="text"
									placeholder="Bölge"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setRegion(e.target.value)}
									defaultValue={work.region}
									disabled={disabledTrue}
								/>
								<input
									type="text"
									placeholder="Iban No"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setIbanNo(e.target.value)}
									defaultValue={work.ibanNo}
									disabled={disabledTrue}
								/>
								<input
									type="text"
									placeholder="Vergi No"
									maxLength={11}
									minLength={11}
									pattern="\d*"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setVergiNo(e.target.value)}
									defaultValue={work.vergiNo}
									disabled={disabledTrue}
								/>
								<input
									type="text"
									placeholder="SGK NO"
									maxLength={26}
									minLength={23}
									pattern="\d*"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setSgkNo(e.target.value)}
									defaultValue={work.sgkNo}
									disabled={disabledTrue}
								/>
							</div>

							<div className="flex flex-col items-center gap-4">
								<input
									type="text"
									placeholder="Yetkili İsmi"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) =>
										setWorkerName(e.target.value)
									}
									defaultValue={work.workerName}
									disabled={disabledTrue}
								/>
								<input
									type="tel"
									placeholder="Yetkili Numarası"
									maxLength={10}
									minLength={10}
									pattern="\d*"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) =>
										setWorkerPhone(e.target.value)
									}
									defaultValue={work.workerPhone}
									disabled={disabledTrue}
								/>
								<input
									type="email"
									placeholder="Yetkili E-Mail"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) =>
										setWorkerMail(e.target.value)
									}
									defaultValue={work.workerMail}
									disabled={disabledTrue}
								/>
							</div>

							<div>
								<textarea
									placeholder="Not"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setNote(e.target.value)}
									defaultValue={work.note}
									disabled={disabledTrue}
								/>
							</div>
						</div>

						<div>
							<h5 className="text-md text-center font-bold text-black dark:text-white md:text-xl">
								Talep Edilen Öğrenciler
							</h5>

							<div className="w-full overflow-x-auto rounded-lg">
								<table className="min-w-max overflow-hidden text-center text-sm text-gray-600 dark:text-gray-400">
									<thead className="bg-gray-100 text-xs uppercase text-gray-600 dark:bg-gray-900 dark:text-gray-400">
										<tr>
											<th className="py-3 px-6">Mek</th>
											<th className="py-3 px-6">Mak</th>
											<th className="py-3 px-6">Elek</th>
											<th className="py-3 px-6">Kim</th>
										</tr>
									</thead>
									<tbody>
										<tr className="mx-auto border-b border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-800">
											<td className="py-2">
												<input
													type="number"
													className="w-12 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
													defaultValue={work.mek}
													disabled={disabledTrue}
													onChange={(e) =>
														setMek(e.target.value)
													}
												/>
											</td>
											<td className="py-2">
												<input
													type="number"
													className="w-12 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
													defaultValue={work.mak}
													disabled={disabledTrue}
													onChange={(e) =>
														setMak(e.target.value)
													}
												/>
											</td>
											<td className="py-2">
												<input
													type="number"
													className="w-12 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
													defaultValue={work.elek}
													disabled={disabledTrue}
													onChange={(e) =>
														setElek(e.target.value)
													}
												/>
											</td>
											<td className="py-2">
												<input
													type="number"
													className="w-12 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
													defaultValue={work.kim}
													disabled={disabledTrue}
													onChange={(e) =>
														setKim(e.target.value)
													}
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<div className="flex flex-col gap-4 lg:flex-row">
							<div>
								<h5 className="text-md text-center font-bold text-black dark:text-white md:text-xl">
									PAZARTESİ-SALI-ÇARŞAMBA
								</h5>
								<div className="max-h-96 overflow-x-auto rounded-lg">
									<table className="relative w-full text-center text-sm text-gray-600 dark:text-gray-400">
										<thead className="sticky top-0 bg-gray-200 text-xs uppercase text-gray-600 dark:bg-gray-800 dark:text-gray-400">
											<tr>
												<th className="py-3 px-6">
													İsim Soyisim
												</th>
												<th className="py-3 px-6">
													Sınıf
												</th>
												<th className="py-3 px-6" />
											</tr>
										</thead>
										<tbody>
											{(students ?? [])
												.filter(
													(post) => post.class.date,
												)
												.map((s, idx) => (
													<tr
														className="border-b border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-900"
														key={idx}
													>
														<td className="py-4 px-6">
															{s.student_name}{" "}
															{s.student_surname}
														</td>
														<td className="py-4 px-6">
															{s.class.name}
														</td>
														<td className="py-4 px-6">
															<Link
																href={`/ogrenci/${s.id}`}
																className="text-blue-500"
															>
																Görüntüle
															</Link>
														</td>
													</tr>
												))}
										</tbody>
									</table>
								</div>
							</div>

							<div>
								<h5 className="text-md text-center font-bold text-black dark:text-white md:text-xl">
									ÇARŞAMBA-PERŞEMBE-CUMA
								</h5>
								<div className="max-h-96 overflow-x-auto rounded-lg">
									<table className="relative w-full text-center text-sm text-gray-600 dark:text-gray-400">
										<thead className="sticky top-0 bg-gray-200 text-xs uppercase text-gray-600 dark:bg-gray-800 dark:text-gray-400">
											<tr>
												<th className="py-3 px-6">
													İsim Soyisim
												</th>
												<th className="py-3 px-6">
													Sınıf
												</th>
												<th className="py-3 px-6" />
											</tr>
										</thead>
										<tbody>
											{(students ?? [])
												.filter(
													(post) => !post.class.date,
												)
												.map((s, idx) => (
													<tr
														className="border-b border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-900"
														key={idx}
													>
														<td className="py-4 px-6">
															{s.student_name}{" "}
															{s.student_surname}
														</td>
														<td className="py-4 px-6">
															{s.class.name}
														</td>
														<td className="py-4 px-6">
															<Link
																href={`/ogrenci/${s.id}`}
																className="text-blue-500"
															>
																Görüntüle
															</Link>
														</td>
													</tr>
												))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div className="w-full">
							<textarea
								placeholder="Firma Hakkında"
								className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
								onChange={(e) => setAbout(e.target.value)}
								defaultValue={work.about}
								disabled={disabledTrue}
								rows={6}
							/>
						</div>
						<div></div>

						<div>
							<Button type="primary" onClick={onDisabled}>
								Firmayı Düzenle
							</Button>
							<Button type="warning" onClick={onOpen}>
								Firma Logu
							</Button>
							<button
								className="m-2 inline-flex cursor-pointer items-center whitespace-nowrap rounded-lg bg-green-600 px-3 py-2 text-center text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200"
								aria-label="Submit"
								disabled={disabledTrue}
							>
								Kaydet
							</button>
						</div>
						<p>
							Firmayı Düzenleme Modu{" "}
							<b>
								{(disabledTrue && "Kapalı") ||
									(!disabledTrue && "Açık")}
							</b>
						</p>
					</form>
				</div>
			</section>
			<section
				className={classNames("mx-auto my-8 px-10", {
					hidden: !open,
				})}
				id="log"
			>
				<div className="flex flex-col gap-4 rounded-sm bg-gray-300 px-10 py-8 shadow dark:bg-gray-700">
					<h1 className="text-center text-2xl font-bold">
						Firmanın Log Bilgileri
					</h1>
					<ul className="text-lg">
						{workLog.map((work, idx) => (
							<li key={idx}>
								Firmayı düzenleyen:{" "}
								<Link
									href={`/users/${work.userId.id}`}
									className="text-green-500"
								>
									{work.userId.name} {work.userId.surname}
								</Link>
								, düzenleme tarihi:{" "}
								<strong>
									{new Date(
										work.created_at,
									).toLocaleDateString("tr-TR", {
										hour: "numeric",
										minute: "numeric",
										hour12: false,
									})}
								</strong>
							</li>
						))}

						<li>
							Firmayı ekleyen:{" "}
							<Link
								href={`/users/${addingInfo.id}`}
								className="text-green-500"
							>
								{addingInfo.name} {addingInfo.surname}
							</Link>
							, ekleme tarihi:{" "}
							<strong>
								{new Date(work.created_at).toLocaleDateString(
									"tr-TR",
									{
										hour: "numeric",
										minute: "numeric",
										hour12: false,
									},
								)}
							</strong>
						</li>
					</ul>
				</div>
			</section>
		</Layout>
	);
};

export default CompanyEditPage;

export async function getServerSideProps(context) {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		options,
	);
	const id =
		typeof context.params["id"] == "string"
			? context.params["id"]
			: context.params["id"][0];

	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	const { data, error } = await supabase
		.from("workplace")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		context.res.writeHead(302, {
			location: "/",
		});
		context.res.end();
	}

	const { data: addingInfo } = await supabase
		.from("users")
		.select(`name, surname, id`)
		.eq("id", data.adding)
		.single();

	const { data: workLog } = await supabase
		.from("workplaceLog")
		.select("*")
		.eq("workId", id)
		.order("userId", {
			ascending: false,
		});

	for (const d of workLog) {
		const { data: userData } = await supabase
			.from("users")
			.select("name, surname, id")
			.eq("id", d.userId)
			.single();
		d.userId = userData;
	}

	const { data: students } = await supabase
		.from("students")
		.select(`student_name, student_surname, class, id`)
		.eq("workplace", id)
		.order("workplace", {
			ascending: false,
		});

	for (const c of students) {
		const { data: studentData } = await supabase
			.from("class")
			.select("date, name, id")
			.eq("id", c.class)
			.single();
		c.class = studentData;
	}

	const { data: workAdvert } = await supabase
		.from("workplaceAdvert")
		.select("id")
		.eq("workplaceId", id)
		.order("id", {
			ascending: true,
		});

	return {
		props: {
			session,
			work: data,
			workLog,
			addingInfo,
			students,
			workAdvert,
		},
	};
}
