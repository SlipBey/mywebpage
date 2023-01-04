import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import { Button } from "@components/Globals/Button";
import { supabase } from "@libs/supabase";
import { useRouter } from "next/router";
import { options } from "../api/auth/[...nextauth]";
import { toast } from "react-toastify";
import { useState, ChangeEvent, FormEvent } from "react";
import { FiDownload, FiStar, FiUpload, FiX } from "react-icons/fi";
import { CustomImage } from "@components/Globals/CustomImage";
import { Link } from "@components/Globals/Link";
import { FaQuestionCircle } from "react-icons/fa";

export interface IStudentDetailPage {
	session?: Session;
	student?;
	classes?;
	user?;
	works?;
	cv?;
	cvPrograms?;
	cvCertificate?;
	cvHobi?;
	cvEgitim?;
}

const StudentDetailPage: NextPage<IStudentDetailPage> = ({
	session,
	student,
	classes,
	user,
	works,
	cv,
	cvPrograms,
	cvCertificate,
	cvHobi,
	cvEgitim,
}) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const router = useRouter();

	const [disabledTrue, setDisabled] = useState(true);

	const onDisabled = () => {
		if (student.student_name) {
			setDisabled(!disabledTrue);
			if (disabledTrue) {
				toast.info("Düzenleme Modu Açıldı.");
			} else {
				toast.info("Düzenleme Modu Kapatıldı.");
			}
		}
	};

	const [name, setName] = useState(student.student_name);
	const [surname, setSurname] = useState(student.student_surname);
	const [sClass, setClass] = useState(student.class?.id);
	const [schoolNo, setSchoolNo] = useState(student.school_no);
	const [area, setArea] = useState(student.class?.area);
	const [phoneNo, setPhoneNo] = useState(user.phoneNo);
	const [email, setEmail] = useState(user.email);
	const [status, setStatus] = useState(
		student.stastus || "Staj Görüyor (Lise)",
	);
	const [workplace, setWorkplace] = useState(student.workplace);
	const [avatar, setAvatar] = useState(user.avatarURL);

	//const [hobiler, setHobiler] = useState(cv.hobiler);
	const [adres, setAdres] = useState(cv.adres);
	const [posta, setPosta] = useState(cv.posta);
	const [sehir, setSehir] = useState(cv.sehir);
	const [bölge, setBölge] = useState(cv.bölge);
	const [cinsiyet, setCinsiyet] = useState(cv.cinsiyet);
	const [dogum, setDogum] = useState(cv.dogum);
	/*const [egitim, setEgitim] = useState(
		((status == "Staj Görüyor (Lise)" ||
			status == "Staj Yeri Arıyor (Lise)") &&
			"Topkapı Sur MTAL") ||
			cv.egitim,
	);*/
	const [is_deneyimi, setIs_Deneyimi] = useState(cv.is_deneyimi);
	const [aciklama, setAciklama] = useState(cv.aciklama);

	const [website, setWebsite] = useState(cv.website);
	const [github, setGithub] = useState(cv.github);
	const [linkedin, setLinkedin] = useState(cv.linkedin);
	const [instagram, setInstagram] = useState(cv.instagram);
	const [youtube, setYoutube] = useState(cv.youtube);
	const [behance, setBehance] = useState(cv.behance);

	const [programlar, setProgramlar] = useState([
		{
			id: 0,
			programName: "",
			rating: "",
		},
	]);

	const [sertifikalar, setSertifikalar] = useState([
		{
			id: 0,
			sertifika: "",
			alisTarihi: "",
			ismi: "",
		},
	]);

	const [hobiler, setHobiler] = useState([
		{
			id: 0,
			text: "",
		},
	]);

	const [egitim, setEgitim] = useState([
		{
			id: 0,
			eYear: "",
			sYear: "",
			school: "",
			mScore: "",
		},
	]);

	const updateEgitimScore = async (e, reference) => {
		reference.mScore = e.target.value;
		const index = egitim.findIndex((ref) => ref.id == reference.id);
		egitim[index] = reference;
		setEgitim(egitim);
	};

	const updateEgitimStartYear = async (e, reference) => {
		reference.sYear = e.target.value;
		const index = egitim.findIndex((ref) => ref.id == reference.id);
		egitim[index] = reference;
		setEgitim(egitim);
	};

	const updateEgitimEndYear = async (e, reference) => {
		reference.eYear = e.target.value;
		const index = egitim.findIndex((ref) => ref.id == reference.id);
		egitim[index] = reference;
		setEgitim(egitim);
	};

	const updateEgitimSchool = async (e, reference) => {
		reference.school = e.target.value;
		const index = egitim.findIndex((ref) => ref.id == reference.id);
		egitim[index] = reference;
		setEgitim(egitim);
	};

	const updateHobi = async (e, reference) => {
		reference.text = e.target.value;
		const index = programlar.findIndex((ref) => ref.id == reference.id);
		hobiler[index] = reference;
		setHobiler(hobiler);
	};

	const updateProgram = async (e, reference) => {
		reference.programName = e.target.value;
		const index = programlar.findIndex((ref) => ref.id == reference.id);
		programlar[index] = reference;
		setProgramlar(programlar);
	};
	const updateProgramRating = async (e, reference) => {
		reference.rating = e;
		const index = programlar.findIndex((ref) => ref.id == reference.id);
		programlar[index] = reference;
		setProgramlar(programlar);
	};

	const updateSertifika = async (e, reference) => {
		reference.alisTarihi = e.target.value;
		const index = sertifikalar.findIndex((ref) => ref.id == reference.id);
		sertifikalar[index] = reference;
		setSertifikalar(sertifikalar);
	};

	const updateSertifikaName = async (e, reference) => {
		reference.ismi = e.target.value;
		const index = sertifikalar.findIndex((ref) => ref.id == reference.id);
		sertifikalar[index] = reference;
		setSertifikalar(sertifikalar);
	};

	const updateSertifikaPdf = async (
		event: ChangeEvent<HTMLInputElement>,
		reference,
	) => {
		if (!event.target.files || event.target.files.length == 0) {
			toast.info("Sadece PNG ve JPEG formatları desteklenmektedir.");
		}

		const file = event.target.files[0];
		const fileExt = file.name.split(".").pop();
		const fileName = `4${Math.random()}.${fileExt}`;
		const filePath = `${fileName}`;

		reference.sertifika = filePath;
		const index = sertifikalar.findIndex((ref) => ref.id == reference.id);
		sertifikalar[index] = reference;
		setSertifikalar(sertifikalar);

		await supabase.storage
			.from("students")
			//.upload("/certificate/" + filePath, file)
			.upload("/certificate/" + filePath, file);
	};

	const onClassChange = async (e: ChangeEvent<HTMLSelectElement>) => {
		const { data: classData, error } = await supabase
			.from("class")
			.select("id, date")
			.eq("id", e.target.value)
			.single();

		if (!error) {
			setClass(classData);
		}
	};

	const onWorkChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setWorkplace(e.target.value);
	};

	const onStatusChange = async (e: ChangeEvent<HTMLSelectElement>) => {
		setStatus(e.target.value);
	};

	const onRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setBölge(e.target.value);
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

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		setDisabled(!disabledTrue);

		e.preventDefault();
		if (!name || !surname || !sClass || !schoolNo || !phoneNo || !email)
			return toast.error("Lütfen boş bir alan bırakmayın.");

		const { error } = await supabase
			.from("students")
			.update({
				student_name: name,
				student_surname: surname,
				class: sClass.id,
				school_no: schoolNo,
				phone_no: phoneNo,
				email,
				area,
				status,
				workplace,
				avatarURL: avatar,
			})
			.eq("id", student.id)
			.single();

		await supabase
			.from("users")
			.update({
				name,
				surname,
				email,
				phoneNo,
			})
			.eq("id", session.user.id)
			.single();

		const { error: err } = await supabase.from("studentLog").insert([
			{
				studentId: student.id,
				userId: session.user.id,
				reason: 1,
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

		toast.success("Profiliniz Başarıyla Düzenlenmiştir.");
		router.reload();
	};

	const onCvHobi = async (e: FormEvent<HTMLFormElement>) => {
		setDisabled(!disabledTrue);

		e.preventDefault();

		const { error } = await supabase.from("cvHobi").insert(
			hobiler.map((ref) => ({
				text: ref.text,
				studentId: student.id,
			})),
		);

		if (error) {
			console.warn(error);
		}

		toast.success("Hobi başarıyla eklendi.");
		router.reload();
	};

	const deleteHobi = async (e) => {
		const { error } = await supabase
			.from("cvHobi")
			.delete()
			.eq("id", e)
			.single();

		if (!error) {
			toast.success("Hobi başarıyla kaldırıldı.");
			router.reload();
		}
	};

	const onCvProgram = async (e: FormEvent<HTMLFormElement>) => {
		setDisabled(!disabledTrue);

		e.preventDefault();

		const { error } = await supabase.from("cvPrograms").insert(
			programlar.map((ref) => ({
				name: ref.programName,
				rating: ref.rating,
				studentId: student.id,
			})),
		);

		if (error) {
			console.warn(error);
		}

		toast.success("Program başarıyla eklendi.");
		router.reload();
	};

	const deletePrograms = async (e) => {
		const { error } = await supabase
			.from("cvPrograms")
			.delete()
			.eq("id", e)
			.single();

		if (!error) {
			toast.success("Program başarıyla kaldırıldı.");
			router.reload();
		}
	};

	const onCvSubmit = async (e: FormEvent<HTMLFormElement>) => {
		setDisabled(!disabledTrue);

		e.preventDefault();

		const { error } = await supabase
			.from("cv")
			.update({
				hobiler,
				bölge,
				adres,
				posta,
				sehir,
				cinsiyet,
				dogum,
				egitim,
				is_deneyimi,
				aciklama,
				/*edited_at:
					new Date().getUTCFullYear() +
					"-" +
					new Date().getUTCMonth() +
					"-" +
					new Date().getUTCDate() +
					" " +
					new Date().getUTCHours() +
					":" +
					new Date().getUTCMinutes() +
					":" +
					new Date().getUTCSeconds() +
					"." +
					new Date().getUTCMilliseconds(),*/
			})
			.eq("studentId", student.id)
			.single();

		if (!error) {
			toast.success("Kişisel bilgiler başarıyla güncellendi.");
			router.reload();
		}
	};

	const onSocialSubmit = async (e: FormEvent<HTMLFormElement>) => {
		setDisabled(!disabledTrue);

		e.preventDefault();

		const { error } = await supabase
			.from("cv")
			.update({
				website,
				github,
				linkedin,
				youtube,
				instagram,
				behance,
			})
			.eq("studentId", student.id)
			.single();

		if (!error) {
			toast.success("Sosyal medya bilgileri başarıyla güncellendi.");
			router.reload();
		}
	};

	const onCvSertifika = async (e: FormEvent<HTMLFormElement>) => {
		setDisabled(!disabledTrue);

		e.preventDefault();

		const { error } = await supabase.from("cvCertificate").insert(
			sertifikalar.map((ref) => ({
				studentId: student.id,
				alisTarihi: ref.alisTarihi,
				sertifika: ref.sertifika,
				ismi: ref.ismi,
			})),
		);

		if (!error) {
			toast.success("Sertifika başarıyla eklendi.");
			router.reload();
		}
	};

	const deleteCertificate = async (e) => {
		const { error } = await supabase
			.from("cvCertificate")
			.delete()
			.eq("id", e)
			.single();

		if (!error) {
			toast.success("Sertifika başarıyla kaldırıldı.");
			router.reload();
		}
	};

	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);

	const onCvEgitim = async (e: FormEvent<HTMLFormElement>) => {
		setDisabled(!disabledTrue);

		e.preventDefault();

		const { error } = await supabase.from("cvEgitim").insert(
			egitim.map((ref) => ({
				studentId: student.id,
				mScore: ref.mScore,
				school: ref.school,
				eYear: ref.eYear,
				sYear: ref.sYear,
			})),
		);

		if (!error) {
			toast.success("Eğitim başarıyla eklendi.");
			router.reload();
		}
	};

	const deleteEgitim = async (e) => {
		const { error } = await supabase
			.from("cvEgitim")
			.delete()
			.eq("id", e)
			.single();

		if (!error) {
			toast.success("Eğitim başarıyla kaldırıldı.");
			router.reload();
		}
	};

	return (
		<Layout title={"Profil"}>
			<section className="mx-auto my-8 flex flex-col space-y-5 px-10 lg:px-48">
				<div className="bg-gray-300 px-10 py-8 dark:bg-gray-700">
					<form
						className="mx-auto flex flex-col items-center justify-center gap-4"
						onSubmit={onSubmit}
					>
						<h1 className="text-2xl font-semibold text-black dark:text-white">
							Öğrenci Bilgileri
						</h1>
						<div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
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
							{/*<div className="grid grid-cols-1 lg:grid-cols-2 gap-2">*/}
							<div className="font-sm text-sm">
								<div className="rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400">
									<h5 className="py-3 px-6 text-center">
										Staj Gün Listesi
									</h5>
									<div className="rounded-b-lg border-b border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-800">
										<div className="py-2 px-6 text-center">
											{sClass?.date == true &&
												"Pazartesi-Salı-Çarşamba"}
											{sClass?.date == false &&
												"Çarşamba-Perşembe-Cuma"}
											{student.class?.date && (
												<div>
													{(student.class?.date &&
														"Pazartesi-Salı-Çarşamba") ||
														"Çarşamba-Perşembe-Cuma"}
												</div>
											)}
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-col">
								<label>
									Öğrenci Adı{" "}
									<span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									placeholder="İsim"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setName(e.target.value)}
									defaultValue={student.student_name}
									disabled={disabledTrue}
								/>
							</div>
							<div className="flex flex-col">
								<label>
									Öğrenci Soyadı{" "}
									<span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									placeholder="Soyisim"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setSurname(e.target.value)}
									defaultValue={student.student_surname}
									disabled={disabledTrue}
								/>
							</div>
							<div className="flex flex-col">
								<label>
									Sınıf{" "}
									<span className="text-red-500">*</span>
								</label>
								<select
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									placeholder="Sınıf"
									defaultValue={student.class?.id}
									onChange={onClassChange}
									disabled={disabledTrue}
								>
									<option>Sınıf Seçiniz..</option>
									{classes.map((c) => (
										<option key={c.id} value={c.id}>
											{c.name}
										</option>
									))}
								</select>
							</div>
							<div className="flex flex-col">
								<label>
									Okul Numaran{" "}
									<span className="text-red-500">*</span>
								</label>
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
							</div>
							<div className="flex flex-col">
								<label>
									Telefon Numaran{" "}
									<span className="text-red-500">*</span>
								</label>
								<input
									type="tel"
									placeholder="Telefon Numarası"
									maxLength={10}
									minLength={10}
									pattern="\d*"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setPhoneNo(e.target.value)}
									defaultValue={user.phoneNo}
									disabled={disabledTrue}
								/>
							</div>
							<div className="flex flex-col">
								<label>
									Mail Adresin{" "}
									<span className="text-red-500">*</span>
								</label>
								<input
									type="email"
									placeholder="E-Mail Adresi"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setEmail(e.target.value)}
									defaultValue={user.email}
									disabled={disabledTrue}
								/>
							</div>

							{/*<div className="flex flex-col gap-4">
								<div className="w-64 overflow-x-auto rounded-lg">*/}
							<div className="flex flex-col">
								<label>Okul Bölümün</label>
								<input
									type="text"
									placeholder="Bölüm"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setArea(e.target.value)}
									defaultValue={student.class?.area}
									disabled
								/>
							</div>

							<div className="flex flex-col">
								<label>
									İş Durumunuz{" "}
									<span className="text-red-500">*</span>
								</label>
								<select
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									placeholder="Durum"
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

							{status == "Staj Görüyor (Lise)" && (
								<div className="flex flex-col">
									<label>
										Staj Gördüğünüz Firma{" "}
										<span className="text-red-500">*</span>
									</label>
									<select
										className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
										placeholder="Firma"
										defaultValue={student.workplace}
										onChange={onWorkChange}
										disabled={disabledTrue}
									>
										<option selected value="">
											Staj Yeri
										</option>
										{(works ?? []).map((work, idx) => (
											<option key={idx} value={work.id}>
												{work.name}
											</option>
										))}
									</select>
								</div>
							)}
						</div>

						<div className="flex flex-row items-center justify-center">
							<Button type="warning">
								<Link href={`/cv/${student.id}`}>
									CV Görüntüle
								</Link>
							</Button>
							<Button type="primary" onClick={onDisabled}>
								Düzenleme Modu
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
							Düzenleme Modu{" "}
							<b>
								{(disabledTrue && "Kapalı") ||
									(!disabledTrue && "Açık")}
							</b>
						</p>
					</form>
				</div>
				<div
					className="bg-gray-300 px-10 py-8 dark:bg-gray-700"
					id="kisisel"
				>
					<form
						className="mx-auto flex flex-col items-center justify-center gap-4"
						onSubmit={onCvSubmit}
					>
						<h1 className="text-2xl font-semibold text-black dark:text-white">
							Kişisel Bilgiler
						</h1>
						<div className="flex flex-col justify-center gap-2">
							<div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
								<div className="flex flex-col">
									<label>
										Adres{" "}
										<span className="text-red-500">*</span>
									</label>
									<textarea
										placeholder="Mahalle, Sokak/Cadde"
										className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
										onChange={(e) =>
											setAdres(e.target.value)
										}
										defaultValue={cv.adres}
										disabled={disabledTrue}
										required
									/>
								</div>
								<div className="flex flex-col">
									<label>
										Doğum Tarihin{" "}
										<span className="text-red-500">*</span>
									</label>
									<input
										type="date"
										placeholder="dd-mm-yyyy"
										className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
										onChange={(e) =>
											setDogum(e.target.value)
										}
										defaultValue={cv.dogum}
										disabled={disabledTrue}
									/>
								</div>
								<div className="flex flex-col">
									<label>
										Posta Kodun{" "}
										<span className="text-red-500">*</span>
									</label>
									<input
										type="number"
										placeholder="Posta Kodu"
										className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
										onChange={(e) =>
											setPosta(e.target.value)
										}
										defaultValue={cv.posta}
										disabled={disabledTrue}
										required
									/>
								</div>
								<div className="flex flex-col">
									<label>
										Doğduğun Şehir{" "}
										<span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										placeholder="Şehir"
										className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
										onChange={(e) =>
											setSehir(e.target.value)
										}
										defaultValue={cv.sehir}
										disabled={disabledTrue}
									/>
								</div>
								<div className="flex flex-col">
									<label>
										Cinsiyet{" "}
										<span className="text-red-500">*</span>
									</label>
									<select
										className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
										placeholder="Cinsiyet"
										defaultValue={cv.cinsiyet}
										onChange={(e) =>
											setCinsiyet(e.target.value)
										}
										disabled={disabledTrue}
									>
										<option selected value="Erkek">
											Erkek
										</option>
										<option value="Kız">Kız</option>
									</select>
								</div>
								<div className="flex flex-col">
									<label>
										Oturduğun İlçe{" "}
										<span className="text-red-500">*</span>
									</label>
									<select
										className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
										placeholder="Bölge"
										defaultValue={cv.bölge}
										onChange={onRegionChange}
										disabled={disabledTrue}
									>
										<option selected value="">
											Bölge
										</option>
										<option value={"Çerkezköy"}>
											Çerkezköy
										</option>
										<option value={"Çorlu"}>Çorlu</option>
										<option value={"Ergene"}>Ergene</option>
										<option value={"Hayrabolu"}>
											Hayrabolu
										</option>
										<option value={"Kapaklı"}>
											Kapaklı
										</option>
										<option value={"Malkara"}>
											Malkara
										</option>
										<option value={"Marmaraereğlisi"}>
											Marmaraeğrelisi
										</option>
										<option value={"Muratlı"}>
											Muratlı
										</option>
										<option value={"Saray"}>Saray</option>
										<option value={"Şarköy"}>Şarköy</option>
										<option value={"Süleymanpaşa"}>
											Süleymanpaşa
										</option>
									</select>
								</div>
							</div>
							{(status == "Mezun (Lise)" ||
								status == "Çalışıyor" ||
								status == "İş Arıyor") && (
								<div className="flex flex-col">
									<label>İş Deneyimi</label>
									<textarea
										placeholder="İş Deneyimin"
										className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
										onChange={(e) =>
											setIs_Deneyimi(e.target.value)
										}
										defaultValue={cv.is_deneyimi}
										disabled={disabledTrue}
										rows={3}
									/>
								</div>
							)}
							<div className="flex flex-col">
								<label>
									Hakkında{" "}
									<span className="text-red-500">*</span>
								</label>
								<textarea
									placeholder="Hakkında Açıklama"
									className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) =>
										setAciklama(e.target.value)
									}
									defaultValue={cv.aciklama}
									disabled={disabledTrue}
									rows={3}
								/>
							</div>
						</div>
						<button
							className="m-2 inline-flex cursor-pointer items-center whitespace-nowrap rounded-lg bg-green-600 px-3 py-2 text-center text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200"
							aria-label="Submit"
							disabled={disabledTrue}
						>
							Kaydet
						</button>
					</form>
				</div>
				<div
					className="bg-gray-300 px-10 py-8 dark:bg-gray-700"
					id="hobiler"
				>
					<form
						className="mx-auto flex w-full flex-col items-center justify-center gap-4"
						onSubmit={onCvEgitim}
					>
						<h1 className="text-2xl font-semibold text-black dark:text-white">
							Eğitim
						</h1>
						<div className="flex flex-col justify-center gap-2">
							{cvEgitim.map((cv, idx) => (
								<div
									key={idx}
									className="flex flex-row items-center justify-center gap-2"
								>
									<div className="flex flex-col">
										<label>Bitirdiğiniz Puan</label>
										<input
											type="text"
											placeholder="Puan"
											className="w-48 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
											defaultValue={cv.mScore}
											disabled
										/>
									</div>
									<div className="flex flex-col">
										<label>Bitirdiğiniz Okul</label>
										<input
											type="text"
											placeholder="Okul"
											className="w-48 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
											defaultValue={cv.school}
											disabled
										/>
									</div>
									<div className="flex flex-col">
										<label>Başlangıç Tarihi</label>
										<input
											type="text"
											placeholder="Başlangıç Tarihi"
											className="w-48 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
											defaultValue={cv.sYear}
											disabled
										/>
									</div>
									<div className="flex flex-col">
										<label>Bitiş Tarihi</label>
										<input
											type="text"
											placeholder="Bitiş Tarihi"
											className="w-48 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
											defaultValue={cv.eYear}
											disabled
										/>
									</div>
									<span onClick={() => deleteEgitim(cv.id)}>
										<FiX className="inline-flex h-5 w-5" />
									</span>
								</div>
							))}
							{egitim.map((r, idx) => (
								<div
									className="grid grid-cols-4 gap-2"
									key={idx}
								>
									<div className="flex flex-col">
										<label>Bitirdiğiniz Puan</label>
										<input
											type="text"
											placeholder="Puan"
											className="w-48 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
											onChange={(e) =>
												updateEgitimScore(e, r)
											}
											disabled={disabledTrue}
											pattern="[0-9]+([\.,][0-9]+)?"
										/>
									</div>
									<div className="flex flex-col">
										<label>Bitirdiğiniz Okul</label>
										<input
											type="text"
											placeholder="Okul"
											className="w-48 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
											onChange={(e) =>
												updateEgitimSchool(e, r)
											}
											disabled={disabledTrue}
										/>
									</div>
									<div className="flex flex-col">
										<label>Başlangıç Tarihi</label>
										<select
											className="w-48 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
											placeholder="Okul Başlangıç Tarihi"
											onChange={(e) =>
												updateEgitimStartYear(e, r)
											}
											defaultValue="2020"
											disabled={disabledTrue}
										>
											<option value="2030">2030</option>
											<option value="2029">2029</option>
											<option value="2028">2028</option>
											<option value="2027">2027</option>
											<option value="2026">2026</option>
											<option value="2025">2025</option>
											<option value="2024">2024</option>
											<option value="2023">2023</option>
											<option value="2022">2022</option>
											<option value="2021">2021</option>
											<option selected value="2020">
												2020
											</option>
											<option value="2019">2019</option>
											<option value="2018">2018</option>
											<option value="2017">2017</option>
											<option value="2016">2016</option>
											<option value="2015">2015</option>
											<option value="2014">2014</option>
											<option value="2013">2013</option>
											<option value="2012">2012</option>
											<option value="2011">2011</option>
											<option value="2010">2010</option>
											<option value="2009">2009</option>
											<option value="2008">2008</option>
											<option value="2007">2007</option>
											<option value="2006">2006</option>
											<option value="2005">2005</option>
											<option value="2004">2004</option>
											<option value="2003">2003</option>
											<option value="2002">2002</option>
											<option value="2001">2001</option>
											<option value="2000">2000</option>
											<option value="1999">1999</option>
											<option value="1998">1998</option>
											<option value="1997">1997</option>
											<option value="1996">1996</option>
											<option value="1995">1995</option>
											<option value="1994">1994</option>
											<option value="1993">1993</option>
											<option value="1992">1992</option>
											<option value="1991">1991</option>
											<option value="1990">1990</option>
										</select>
									</div>
									<div className="flex flex-col">
										<label>Bitiş Tarihi</label>
										<select
											className="w-48 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
											placeholder="Okul Bitiş Tarihi"
											onChange={(e) =>
												updateEgitimEndYear(e, r)
											}
											defaultValue="2024"
											disabled={disabledTrue}
										>
											<option value="2030">2030</option>
											<option value="2029">2029</option>
											<option value="2028">2028</option>
											<option value="2027">2027</option>
											<option value="2026">2026</option>
											<option value="2025">2025</option>
											<option selected value="2024">
												2024
											</option>
											<option value="2023">2023</option>
											<option value="2022">2022</option>
											<option value="2021">2021</option>
											<option value="2020">2020</option>
											<option value="2019">2019</option>
											<option value="2018">2018</option>
											<option value="2017">2017</option>
											<option value="2016">2016</option>
											<option value="2015">2015</option>
											<option value="2014">2014</option>
											<option value="2013">2013</option>
											<option value="2012">2012</option>
											<option value="2011">2011</option>
											<option value="2010">2010</option>
											<option value="2009">2009</option>
											<option value="2008">2008</option>
											<option value="2007">2007</option>
											<option value="2006">2006</option>
											<option value="2005">2005</option>
											<option value="2004">2004</option>
											<option value="2003">2003</option>
											<option value="2002">2002</option>
											<option value="2001">2001</option>
											<option value="2000">2000</option>
											<option value="1999">1999</option>
											<option value="1998">1998</option>
											<option value="1997">1997</option>
											<option value="1996">1996</option>
											<option value="1995">1995</option>
											<option value="1994">1994</option>
											<option value="1993">1993</option>
											<option value="1992">1992</option>
											<option value="1991">1991</option>
											<option value="1990">1990</option>
										</select>
									</div>
								</div>
							))}
						</div>
						<div className="flex">
							<Button
								type="warning"
								onClick={() =>
									setEgitim([
										...egitim,
										{
											id: egitim.length + 1,
											eYear: "",
											sYear: "",
											school: "",
											mScore: "",
										},
									])
								}
							>
								Ekle
							</Button>
							<button
								className="m-2 inline-flex cursor-pointer items-center whitespace-nowrap rounded-lg bg-green-600 px-3 py-2 text-center text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200"
								aria-label="Submit"
								disabled={disabledTrue}
							>
								Kaydet
							</button>
						</div>
					</form>
				</div>
				<div
					className="bg-gray-300 px-10 py-8 dark:bg-gray-700"
					id="sosyal-medya"
				>
					<form
						className="mx-auto flex flex-col items-center justify-center gap-4"
						onSubmit={onSocialSubmit}
					>
						<h1 className="text-2xl font-semibold text-black dark:text-white">
							Sosyal Medya
						</h1>
						<div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
							<div className="flex flex-col">
								<label>Website</label>
								<input
									type="text"
									placeholder="Site Adresi"
									className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setWebsite(e.target.value)}
									defaultValue={cv.website}
									disabled={disabledTrue}
								/>
							</div>
							<div className="flex flex-col">
								<label>Github</label>
								<input
									type="text"
									placeholder="Github Kullanıcı Adı"
									className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setGithub(e.target.value)}
									defaultValue={cv.github}
									disabled={disabledTrue}
								/>
							</div>
							<div className="flex flex-col">
								<label>LinkedIn</label>
								<input
									type="text"
									placeholder="LinkedIn Profil Adı"
									className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) =>
										setLinkedin(e.target.value)
									}
									defaultValue={cv.linkedin}
									disabled={disabledTrue}
								/>
							</div>
							<div className="flex flex-col">
								<label className="flex gap-2">
									Youtube{" "}
									<FaQuestionCircle
										className="h-5 w-5"
										title="Sadece içerik üreticileri kanalını girsin."
									/>
								</label>
								<input
									type="text"
									placeholder="Youtube Kullanıcı Adı"
									className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setYoutube(e.target.value)}
									defaultValue={cv.youtube}
									disabled={disabledTrue}
								/>
							</div>
							<div className="flex flex-col">
								<label>İnstagram</label>
								<input
									type="text"
									placeholder="İnstagram Profil Adı"
									className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) =>
										setInstagram(e.target.value)
									}
									defaultValue={cv.instagram}
									disabled={disabledTrue}
								/>
							</div>
							<div className="flex flex-col">
								<label>Behance</label>
								<input
									type="text"
									placeholder="Behance Profil Adı"
									className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setBehance(e.target.value)}
									defaultValue={cv.behance}
									disabled={disabledTrue}
								/>
							</div>
						</div>
						<button
							className="m-2 inline-flex cursor-pointer items-center whitespace-nowrap rounded-lg bg-green-600 px-3 py-2 text-center text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200"
							aria-label="Submit"
							disabled={disabledTrue}
						>
							Kaydet
						</button>
					</form>
				</div>
				<div
					className="bg-gray-300 px-10 py-8 dark:bg-gray-700"
					id="programlar"
				>
					<form
						className="mx-auto flex w-full flex-col items-center justify-center gap-4"
						onSubmit={onCvProgram}
					>
						<h1 className="text-2xl font-semibold text-black dark:text-white">
							Kullanabildiğin Programlar
						</h1>
						<div className="flex flex-col gap-2">
							{cvPrograms.map((cv, idx) => (
								<div key={idx}>
									<div className="flex flex-col items-center gap-2 lg:flex-row">
										<input
											type="text"
											placeholder="İsim"
											className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
											defaultValue={cv.name}
											disabled
										/>
										<div className="star-rating">
											{[...Array(5)].map(
												(star, index) => {
													index += 1;
													return (
														<button
															type="button"
															key={index}
															className={`h-5 w-8 ${
																index <=
																cv.rating
																	? "on"
																	: "off"
															}`}
															disabled
														>
															<span className="star text-4xl">
																&#9733;
															</span>
														</button>
													);
												},
											)}
										</div>
										<span
											onClick={() =>
												deletePrograms(cv.id)
											}
										>
											<FiX className="inline-flex h-5 w-5" />
										</span>
									</div>
								</div>
							))}
							{programlar.map((r, idx) => (
								<div
									className="flex flex-col gap-2 lg:flex-row"
									key={idx}
								>
									<input
										type="text"
										placeholder="Programın ismi"
										className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
										onChange={(e) => updateProgram(e, r)}
										disabled={disabledTrue}
									/>
									<div className="star-rating">
										{[...Array(5)].map((star, index) => {
											index += 1;
											return (
												<button
													type="button"
													key={index}
													className={`h-5 w-8 ${
														index <=
														(hover || rating)
															? "on"
															: "off"
													}`}
													onClick={() =>
														updateProgramRating(
															index,
															r,
														) && setRating(index)
													}
													onMouseEnter={() =>
														setHover(index)
													}
													onMouseLeave={() =>
														setHover(rating)
													}
													disabled={disabledTrue}
												>
													<span className="star text-4xl">
														&#9733;
													</span>
												</button>
											);
										})}
									</div>
								</div>
							))}
						</div>
						<div className="flex">
							<Button
								type="warning"
								onClick={() =>
									setProgramlar([
										...programlar,
										{
											id: programlar.length + 1,
											programName: "",
											rating: "",
										},
									])
								}
							>
								Ekle
							</Button>
							<button
								className="m-2 inline-flex cursor-pointer items-center whitespace-nowrap rounded-lg bg-green-600 px-3 py-2 text-center text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200"
								aria-label="Submit"
								disabled={disabledTrue}
							>
								Kaydet
							</button>
						</div>
					</form>
				</div>
				<div
					className="bg-gray-300 px-10 py-8 dark:bg-gray-700"
					id="sertifikalar"
				>
					<form
						className="mx-auto flex w-full flex-col items-center justify-center gap-4"
						onSubmit={onCvSertifika}
					>
						<h1 className="text-2xl font-semibold text-black dark:text-white">
							Sertifikaların
						</h1>
						<div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
							{cvCertificate.map((cv, idx) => (
								<div
									className="rounded-lg bg-gray-200 px-4 py-6 dark:bg-gray-800"
									key={idx}
								>
									<div className="flex flex-col items-center gap-2">
										{cv.ismi} - {cv.alisTarihi}
										<div className="space-x-5">
											<Link
												className="group"
												href={`https://dqupymeqnjgwzfgkrzwf.supabase.co/storage/v1/object/public/students/certificate/${cv.sertifika}`}
											>
												<FiDownload className="inline-flex h-8 w-8 text-green-600 group-hover:text-green-700" />
											</Link>
											<span
												className="group hover:cursor-pointer"
												onClick={() =>
													deleteCertificate(cv.id)
												}
											>
												<FiX className="inline-flex h-8 w-8 text-red-600 group-hover:text-red-700" />
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
						{sertifikalar.map((r, idx) => (
							<div
								className="flex flex-col items-center justify-center gap-2"
								key={idx}
							>
								<input
									type="text"
									placeholder="Alış Tarihi"
									className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => updateSertifika(e, r)}
									disabled={disabledTrue}
								/>
								<input
									type="text"
									placeholder="İsmi"
									className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => updateSertifikaName(e, r)}
									disabled={disabledTrue}
								/>
								<input
									type="file"
									className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
									id="avatar"
									onChange={(e) => updateSertifikaPdf(e, r)}
								/>
							</div>
						))}
						<div className="flex">
							<Button
								type="warning"
								onClick={() =>
									setSertifikalar([
										...sertifikalar,
										{
											id: sertifikalar.length + 1,
											sertifika: "",
											alisTarihi: "",
											ismi: "",
										},
									])
								}
							>
								Ekle
							</Button>
							<button
								className="m-2 inline-flex cursor-pointer items-center whitespace-nowrap rounded-lg bg-green-600 px-3 py-2 text-center text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200"
								aria-label="Submit"
								disabled={disabledTrue}
							>
								Kaydet
							</button>
						</div>
					</form>
				</div>
				<div
					className="bg-gray-300 px-10 py-8 dark:bg-gray-700"
					id="hobiler"
				>
					<form
						className="mx-auto flex w-full flex-col items-center justify-center gap-4"
						onSubmit={onCvHobi}
					>
						<h1 className="text-2xl font-semibold text-black dark:text-white">
							Hobiler
						</h1>
						<div className="flex flex-col justify-center gap-2">
							{cvHobi.map((cv, idx) => (
								<div
									key={idx}
									className="flex flex-row items-center justify-center gap-2"
								>
									<input
										type="text"
										placeholder="Hobin"
										className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
										defaultValue={cv.text}
										disabled
									/>
									<span onClick={() => deleteHobi(cv.id)}>
										<FiX className="inline-flex h-5 w-5" />
									</span>
								</div>
							))}
							{hobiler.map((r, idx) => (
								<div
									className="flex flex-col gap-2 lg:flex-row"
									key={idx}
								>
									<input
										type="text"
										placeholder="Hobin"
										className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
										onChange={(e) => updateHobi(e, r)}
										disabled={disabledTrue}
									/>
								</div>
							))}
						</div>
						<div className="flex">
							<Button
								type="warning"
								onClick={() =>
									setHobiler([
										...hobiler,
										{
											id: hobiler.length + 1,
											text: "",
										},
									])
								}
							>
								Ekle
							</Button>
							<button
								className="m-2 inline-flex cursor-pointer items-center whitespace-nowrap rounded-lg bg-green-600 px-3 py-2 text-center text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200"
								aria-label="Submit"
								disabled={disabledTrue}
							>
								Kaydet
							</button>
						</div>
					</form>
				</div>
			</section>
			<div className="fixed bottom-2 right-2">
				<Button type="primary" onClick={onDisabled}>
					Düzenlemeyi{" "}
					{(disabledTrue && "Aç") || (!disabledTrue && "Kapat")}
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

	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	if (!session.user.student) {
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
		.eq("studentId", session.user.id)
		.single();

	if (error) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	const { data: studentClass } = await supabase
		.from("class")
		.select("date, area, name, id")
		.eq("id", student.class)
		.single();
	student.class = studentClass;

	const { data: classes } = await supabase
		.from("class")
		.select("id, name, date, area")
		.order("id", {
			ascending: true,
		});

	const { data: user } = await supabase
		.from("users")
		.select("phoneNo, email, avatarURL")
		.eq("id", session.user.id)
		.single();

	const { data: works } = await supabase
		.from("workplace")
		.select(`name, id`)
		.order("id", {
			ascending: true,
		});

	const { data: cv } = await supabase
		.from("cv")
		.select("*")
		.eq("studentId", student.id)
		.single();

	const { data: cvPrograms } = await supabase
		.from("cvPrograms")
		.select("*")
		.eq("studentId", student.id)
		.order("id", {
			ascending: true,
		});

	const { data: cvCertificate } = await supabase
		.from("cvCertificate")
		.select("*")
		.eq("studentId", student.id)
		.order("id", {
			ascending: true,
		});

	const { data: cvHobi } = await supabase
		.from("cvHobi")
		.select("*")
		.eq("studentId", student.id)
		.order("id", {
			ascending: true,
		});

	const { data: cvEgitim } = await supabase
		.from("cvEgitim")
		.select("*")
		.eq("studentId", student.id)
		.order("id", {
			ascending: true,
		});

	return {
		props: {
			session,
			student,
			classes,
			user,
			works,
			cv,
			cvPrograms,
			cvCertificate,
			cvHobi,
			cvEgitim,
		},
	};
}
