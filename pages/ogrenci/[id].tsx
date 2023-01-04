import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import { options } from "../api/auth/[...nextauth]";
import { Button } from "@components/Globals/Button";
import { ChangeEvent, useState, FormEvent } from "react";
import { supabase } from "@libs/supabase";
import { Link } from "@components/Globals/Link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import classNames from "classnames";
import { perman } from "@libs/permissions";
import { FaPlus } from "react-icons/fa";
import { AiOutlineFileExcel } from "react-icons/ai";
import { CustomImage } from "@components/Globals/CustomImage";
import { FiUpload } from "react-icons/fi";
//import { useExcelDownloder } from "react-xls";

export interface IStudentDetailPage {
	session?: Session;
	student?;
	workData?;
	addingInfo?;
	studentLog?;
	classes?;
	studentClass?;
}

const StudentDetailPage: NextPage<IStudentDetailPage> = ({
	session,
	student,
	workData,
	addingInfo,
	studentLog,
	classes,
	studentClass,
}) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [openMenu, setOpenMenu] = useState(true);
	const [disabledTrue, setDisabled] = useState(true);

	const onOpen = () => {
		if (
			perman.has(
				session.user.permissions,
				"okul_idaresi" || "alan_sefleri",
			)
		) {
			setOpen(!open);
			if (open) {
				router.push("#");
			} else {
				router.push("#log");
			}
		} else {
			toast.error(
				"Öğrencinin loguna sadece İdare Amirleri ve Bölüm Şefleri Bakabilir.",
			);
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
				toast.info("Öğrenci Düzenleme Modu Açıldı.");
			} else {
				toast.info("Öğrenci Düzenleme Modu Kapatıldı.");
			}
		} else {
			toast.error(
				"Öğrenciler için düzenlemeleri sadece İdare Amirleri ve Bölüm Şefleri Yapabilir.",
			);
		}
	};

	const [name, setName] = useState(student.student_name);
	const [surname, setSurname] = useState(student.student_surname);
	const [sClass, setClass] = useState(student.class);
	const [schoolNo, setSchoolNo] = useState(student.school_no);
	const [phoneNo, setPhoneNo] = useState(student.phone_no);
	const [workplace, setWorkplace] = useState(student.workplace);
	const [email, setEmail] = useState(student.email);
	const [avatar, setAvatar] = useState(student.avatarURL);

	const [belge1, setBelge1] = useState(student.belge1);
	const [belge2, setBelge2] = useState(student.belge2);
	const [belge3, setBelge3] = useState(student.belge3);
	const [belge4, setBelge4] = useState(student.belge4);
	const [belge5, setBelge5] = useState(student.belge5);

	const [status, setStatus] = useState(
		student.stastus || "Staj Görüyor (Lise)",
	);

	const onClassChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setClass(e.target.value);
	};
	const onWorkChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setWorkplace(e.target.value);
	};
	const onStatusChange = async (e: ChangeEvent<HTMLSelectElement>) => {
		setStatus(e.target.value);
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			!name ||
			!surname ||
			!sClass ||
			!schoolNo ||
			!phoneNo ||
			!workplace ||
			!email
		)
			return toast.error("Lütfen boş bir alan bırakmayın.");

		const { error } = await supabase
			.from("students")
			.update({
				student_name: name,
				student_surname: surname,
				class: sClass,
				school_no: schoolNo,
				phone_no: phoneNo,
				workplace,
				email,
				belge1,
				belge2,
				belge3,
				belge4,
				belge5,
				status,
			})
			.eq("id", student.id)
			.single();

		const { error: err } = await supabase.from("studentLog").insert([
			{
				studentId: student.id,
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

		toast.success("Öğrenci başarıyla düzenlendi.");
		router.push("/ogrenci");
	};

	async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
		try {
			if (!event.target.files || event.target.files.length == 0) {
				toast.info("Sadece PNG ve JPEG formatları desteklenmektedir.");
			}

			const file = event.target.files[0];
			const fileExt = file.name.split(".").pop();
			const fileName = `4${Math.random()}.${fileExt}`;
			const filePath = `${fileName}`;

			const { error: uploadError } = await supabase.storage
				.from("students")
				.upload("/photos/" + filePath, file);

			if (uploadError) {
				throw uploadError;
			}

			const { error: updateError } = await supabase.from("users").upsert({
				id: session.user.id,
				avatarURL: filePath,
			});

			await supabase.from("students").upsert({
				studentId: session.user.id,
				avatarURL: filePath,
			});

			if (updateError) {
				throw updateError;
			}

			setAvatar(null);
			setAvatar(filePath);
		} catch (error) {
			toast.error("Lütfen dosya seçiniz.");
		} finally {
			toast.success("Profil fotoğrafınız başarıyla düzenlenmiştir.");
		}
	}

	return (
		<Layout
			title={`${
				student.student_name + " " + student.student_surname
			} Öğrencisi`}
		>
			<section className="mx-auto my-8 px-10">
				<div className="bg-gray-300 px-10 py-8 dark:bg-gray-700">
					<form
						className="mx-auto flex flex-col items-center justify-center gap-4"
						onSubmit={onSubmit}
					>
						<h1 className="text-2xl font-semibold text-black dark:text-white">
							Öğrenci Bilgileri
						</h1>
						<div className="flex flex-col justify-center gap-12 md:flex-row">
							<div className="flex flex-col gap-2">
								<label
									htmlFor="avatar"
									className="group flex flex-col items-center justify-center hover:cursor-pointer"
								>
									<CustomImage
										src={`https://dqupymeqnjgwzfgkrzwf.supabase.co/storage/v1/object/public/students/photos/${avatar}`}
										className="w-32 group-hover:blur-sm"
										alt=""
									/>
									<FiUpload className="absolute hidden h-12 w-12 rounded-full bg-gray-100 p-1 group-hover:block dark:bg-gray-900" />
								</label>
								<input
									className="hidden"
									type="file"
									accept="image/*"
									id="avatar"
									onChange={uploadAvatar}
								/>
							</div>
							<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
								<input
									type="text"
									placeholder="Öğrenci Adı"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setName(e.target.value)}
									defaultValue={student.student_name}
									disabled={disabledTrue}
								/>
								<input
									type="text"
									placeholder="Öğrenci Soyadı"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setSurname(e.target.value)}
									defaultValue={student.student_surname}
									disabled={disabledTrue}
								/>
								<select
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									placeholder="Sınıf"
									defaultValue={student.class}
									onChange={onClassChange}
									disabled={disabledTrue}
								>
									{classes.map((c) => (
										<option key={c.id} value={c.id}>
											{c.name}
										</option>
									))}
								</select>
								<input
									type="number"
									placeholder="Okul Numarası"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) =>
										setSchoolNo(e.target.value)
									}
									defaultValue={student.school_no}
									disabled={disabledTrue}
								/>
								<input
									type="tel"
									placeholder="Telefon Numarası"
									maxLength={10}
									minLength={10}
									pattern="\d*"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setPhoneNo(e.target.value)}
									defaultValue={student.phone_no}
									disabled={disabledTrue}
								/>
								<input
									type="email"
									placeholder="E-Mail Adresi"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setEmail(e.target.value)}
									defaultValue={student.email}
									disabled={disabledTrue}
								/>
								<select
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									placeholder="Staj"
									onChange={onWorkChange}
									defaultValue={student.workplace}
									disabled={disabledTrue}
								>
									<option>Staj Yeri Seçiniz..</option>
									{(workData ?? []).map((work, idx) => (
										<option key={idx} value={work.id}>
											{work.name}
										</option>
									))}
								</select>
								<input
									type="text"
									placeholder="Dönem"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed disabled:bg-gray-200 dark:bg-gray-900 dark:bg-gray-800 dark:text-gray-200"
									defaultValue={"2022-2023"}
									disabled
								/>
								<select
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									placeholder="Sınıf"
									defaultValue={student.status}
									onChange={onStatusChange}
									disabled={disabledTrue}
									required
								>
									<option>Durum Seçiniz..</option>
									<option value={"Staj Görüyor (Lise)"}>
										Staj Görüyor (Lise)
									</option>
									<option value={"Staj Yeri Arıyor (Lise)"}>
										Staj Yeri Arıyor (Lise)
									</option>
									<option value={"Mezun (Lise)"}>
										Mezun (Lise)
									</option>
									<option value={"Çalışıyor"}>
										Çalışıyor
									</option>
									<option value={"İş Arıyor"}>
										İş Arıyor
									</option>
								</select>
							</div>
							<div className="mx-auto w-64 space-y-5 lg:w-96">
								<div className="overflow-x-auto rounded-lg">
									<div className="font-sm bg-gray-100 text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-400">
										<h5 className="py-3 px-6 text-center">
											Staj Gün Listesi
										</h5>
										<div className="border-b border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-800">
											<div className="py-2 px-6 text-center">
												{(studentClass.date &&
													"Pazartesi-Salı-Çarşamba") ||
													"Çarşamba-Perşembe-Cuma"}
											</div>
										</div>
									</div>
								</div>
								{!perman.hasNone(session.user.permissions, [
									"okul_idaresi",
									"alan_sefleri",
								]) && (
									<>
										<div className="overflow-x-auto rounded-lg">
											<table className="w-full text-center text-sm text-gray-600 dark:text-gray-400">
												<thead className="bg-gray-100 text-xs uppercase text-gray-600 dark:bg-gray-900 dark:text-gray-400">
													<tr>
														<th className="py-3 px-6">
															1.Ara Tatil
														</th>
														<th className="py-3 px-6">
															Yayı Yıl Tatil
														</th>
														<th className="py-3 px-6">
															2.Ara Tatil
														</th>
													</tr>
												</thead>
												<tbody>
													<tr className="mx-auto border-b border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-800">
														<td className="py-2">
															<input
																type="checkbox"
																className="h-6 w-6 accent-green-500"
																onChange={() =>
																	setBelge1(
																		!student.belge1,
																	)
																}
																disabled={
																	disabledTrue
																}
																defaultChecked={
																	student.belge1
																}
															/>
														</td>
														<td className="py-2">
															<input
																type="checkbox"
																className="h-6 w-6 accent-green-500"
																onChange={() =>
																	setBelge2(
																		!student.belge2,
																	)
																}
																disabled={
																	disabledTrue
																}
																defaultChecked={
																	student.belge2
																}
															/>
														</td>
														<td className="py-2">
															<input
																type="checkbox"
																className="h-6 w-6 accent-green-500"
																onChange={() =>
																	setBelge3(
																		!student.belge3,
																	)
																}
																disabled={
																	disabledTrue
																}
																defaultChecked={
																	student.belge3
																}
															/>
														</td>
													</tr>
												</tbody>
											</table>
										</div>

										<div className="overflow-x-auto rounded-lg">
											<table className="w-full text-center text-sm text-gray-600 dark:text-gray-400">
												<thead className="bg-gray-100 text-xs uppercase text-gray-600 dark:bg-gray-900 dark:text-gray-400">
													<tr>
														<th className="py-3 px-6">
															Para Ödendi
														</th>
														<th className="py-3 px-6">
															Defter Teslim Edildi
														</th>
													</tr>
												</thead>
												<tbody>
													<tr className="mx-auto border-b border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-800">
														<td className="py-2">
															<input
																type="checkbox"
																className="h-6 w-6 accent-green-500"
																onChange={() =>
																	setBelge4(
																		!student.belge4,
																	)
																}
																disabled={
																	disabledTrue
																}
																defaultChecked={
																	student.belge4
																}
															/>
														</td>
														<td className="py-2">
															<input
																type="checkbox"
																className="h-6 w-6 accent-green-500"
																onChange={() =>
																	setBelge5(
																		!student.belge5,
																	)
																}
																disabled={
																	disabledTrue
																}
																defaultChecked={
																	student.belge5
																}
															/>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</>
								)}
							</div>
						</div>
						{!perman.hasNone(session.user.permissions, [
							"okul_idaresi",
							"alan_sefleri",
						]) && (
							<div className="mx-auto flex w-full items-center justify-center overflow-x-auto rounded-lg">
								<table className="min-w-max overflow-hidden text-center text-sm text-gray-600 dark:text-gray-400">
									<thead className="bg-gray-100 text-xs uppercase text-gray-600 dark:bg-gray-900 dark:text-gray-400">
										<tr>
											<th className="py-3 px-6">Eylül</th>
											<th className="py-3 px-6">Ekim</th>
											<th className="py-3 px-6">Kasım</th>
											<th className="py-3 px-6">
												Aralık
											</th>
											<th className="py-3 px-6">Ocak</th>
											<th className="py-3 px-6">Mart</th>
											<th className="py-3 px-6">Nisan</th>
											<th className="py-3 px-6">Mayıs</th>
											<th className="py-3 px-6">
												Haziran
											</th>
										</tr>
									</thead>
									<tbody>
										<tr className="mx-auto border-b border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-800">
											<td className="py-2">
												<input
													type="checkbox"
													className="h-6 w-6 accent-green-500"
													disabled={disabledTrue}
												/>
											</td>
											<td className="py-2">
												<input
													type="checkbox"
													className="h-6 w-6 accent-green-500"
													disabled={disabledTrue}
												/>
											</td>
											<td className="py-2">
												<input
													type="checkbox"
													className="h-6 w-6 accent-green-500"
													disabled={disabledTrue}
												/>
											</td>
											<td className="py-2">
												<input
													type="checkbox"
													className="h-6 w-6 accent-green-500"
													disabled={disabledTrue}
												/>
											</td>
											<td className="py-2">
												<input
													type="checkbox"
													className="h-6 w-6 accent-green-500"
													disabled={disabledTrue}
												/>
											</td>
											<td className="py-2">
												<input
													type="checkbox"
													className="h-6 w-6 accent-green-500"
													disabled={disabledTrue}
												/>
											</td>
											<td className="py-2">
												<input
													type="checkbox"
													className="h-6 w-6 accent-green-500"
													disabled={disabledTrue}
												/>
											</td>
											<td className="py-2">
												<input
													type="checkbox"
													className="h-6 w-6 accent-green-500"
													disabled={disabledTrue}
												/>
											</td>
											<td className="py-2">
												<input
													type="checkbox"
													className="h-6 w-6 accent-green-500"
													disabled={disabledTrue}
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						)}
						<div>
							<Button type="success">
								<Link href={`/cv/${student.id}`}>
									Cv&lsquo;Si
								</Link>
							</Button>
							<Button type="primary" onClick={onDisabled}>
								Öğrenciyi Düzenle
							</Button>
							<Button type="warning" onClick={onOpen}>
								Öğrenci Logu
							</Button>
							<button
								className="m-2 inline-flex cursor-pointer items-center whitespace-nowrap rounded-lg bg-green-600 px-3 py-2 text-center text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200"
								aria-label="Submit"
								disabled={disabledTrue}
							>
								Kaydet
							</button>
						</div>
						<p className="text-black dark:text-white">
							Öğrenciyi Düzenleme Modu{" "}
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
						Öğrencinin Log Bilgileri
					</h1>
					<ul className="text-lg">
						{studentLog.map((student, idx) => (
							<li key={idx}>
								Öğrenciyi düzenleyen:{" "}
								<Link
									href={`/users/${student.userId.id}`}
									className="text-green-500"
								>
									{student.userId.name}{" "}
									{student.userId.surname}
								</Link>
								, düzenleme tarihi:{" "}
								<strong>
									{new Date(
										student.created_at,
									).toLocaleDateString("tr-TR", {
										hour: "numeric",
										minute: "numeric",
										hour12: false,
									})}
								</strong>
							</li>
						))}

						<li>
							Öğrenciyi ekleyen:{" "}
							<Link
								href={`/users/${addingInfo.id}`}
								className="text-green-500"
							>
								{addingInfo.name} {addingInfo.surname}
							</Link>
							, ekleme tarihi:{" "}
							<strong>
								{new Date(
									student.created_at,
								).toLocaleDateString("tr-TR", {
									hour: "numeric",
									minute: "numeric",
									hour12: false,
								})}
							</strong>
						</li>
					</ul>
				</div>
			</section>
			<div className="fixed bottom-2 right-2">
				<div
					className={classNames("mb-2", {
						hidden: openMenu,
					})}
				>
					<Button className="h-12 w-12 rounded-full" type="success">
						<AiOutlineFileExcel className="h-6 w-6" />
						{/*<ExcelDownloder
							data={data}
							filename={
								student.student_name + student.student_surname
							}
							type={Type.Button}
						>
							<AiOutlineFileExcel className="h-6 w-6" />
						</ExcelDownloder> */}
					</Button>
				</div>
				<Button
					className="group h-12 w-12 rounded-full"
					onClick={() => setOpenMenu(!openMenu)}
					type="primary"
				>
					<FaPlus className="h-6 w-6 duration-300 group-hover:rotate-90" />
				</Button>
			</div>
		</Layout>
	);
};

export default StudentDetailPage;

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

	const { data: student, error } = await supabase
		.from("students")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		context.res.writeHead(302, {
			location: "/",
		});
		context.res.end();
	}

	const { data: workData } = await supabase
		.from("workplace")
		.select(`name, id`)
		.order("created_at", {
			ascending: false,
		});

	const { data: addingInfo } = await supabase
		.from("users")
		.select(`name, surname, id`)
		.eq("id", student.adding)
		.single();

	const { data: studentLog } = await supabase
		.from("studentLog")
		.select("*")
		.eq("studentId", id)
		.order("userId", {
			ascending: false,
		});

	for (const d of studentLog) {
		const { data: userData } = await supabase
			.from("users")
			.select("name, surname, id")
			.eq("id", d.userId)
			.single();
		d.userId = userData;
	}

	const { data: studentClass } = await supabase
		.from("class")
		.select("date")
		.eq("id", student.class)
		.single();

	const { data: classes } = await supabase
		.from("class")
		.select("id, name, date")
		.order("created_at", {
			ascending: false,
		});

	return {
		props: {
			session,
			student,
			workData,
			addingInfo,
			studentLog,
			classes,
			studentClass,
		},
	};
}
