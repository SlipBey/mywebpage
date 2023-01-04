import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import { Button } from "@components/Globals/Button";
import { supabase } from "@libs/supabase";
import { useRouter } from "next/router";
import { options } from "../api/auth/[...nextauth]";
import { toast } from "react-toastify";
import { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "@components/Globals/Link";
import { FiUpload } from "react-icons/fi";
import { CustomImage } from "@components/Globals/CustomImage";
import Swal from "sweetalert2";

export interface IStudentDetailPage {
	session?: Session;
	workplace?;
	user?;
	workplaceAdvert?;
	workplaceIntership?;
}

const StudentDetailPage: NextPage<IStudentDetailPage> = ({
	session,
	workplace,
	user,
	workplaceAdvert,
	workplaceIntership,
}) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const router = useRouter();

	const [disabledTrue, setDisabled] = useState(true);

	const onDisabled = () => {
		setDisabled(!disabledTrue);
		if (disabledTrue) {
			toast.info("Düzenleme Modu Açıldı.");
		} else {
			toast.info("Düzenleme Modu Kapatıldı.");
		}
	};

	const [name, setName] = useState(user.name);
	const [surname, setSurname] = useState(user.surname);
	const [phoneNo, setPhoneNo] = useState(user.phoneNo);
	const [email, setEmail] = useState(user.email);

	const [workplaceName, setWorkplaceName] = useState(workplace.name);
	const [workerName, setWorkerName] = useState(workplace.workerName);
	const [workerPhone, setWorkerPhone] = useState(workplace.workerPhone);
	const [workerMail, setWorkerMail] = useState(workplace.workerMail);
	const [region, setRegion] = useState(workplace.region);
	const [about, setAbout] = useState(workplace.about);
	const [adress, setAdress] = useState(workplace.adress);
	const [photos, setPhotos] = useState(workplace.photos);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		setDisabled(!disabledTrue);

		e.preventDefault();
		if (!name || !surname || !phoneNo || !email)
			return toast.error("Lütfen boş bir alan bırakmayın.");

		const { error } = await supabase
			.from("users")
			.update({
				name,
				surname,
				email,
				phoneNo,
			})
			.eq("id", session.user.id)
			.single();

		if (error) {
			console.log(error);
			throw error;
		}

		toast.success("Profiliniz Başarıyla Düzenlenmiştir.");
		router.reload();
	};

	const onWorkplaceSubmit = async (e: FormEvent<HTMLFormElement>) => {
		setDisabled(!disabledTrue);

		e.preventDefault();
		if (
			!workplaceName ||
			!workerName ||
			!workerMail ||
			!workerPhone ||
			!region ||
			!about ||
			!adress
		)
			return toast.error("Lütfen boş bir alan bırakmayın.");

		const { error } = await supabase
			.from("workplace")
			.update({
				name: workplaceName,
				workerName,
				workerMail,
				workerPhone,
				region,
				about,
				adress,
			})
			.eq("user", session.user.id)
			.single();

		if (error) {
			console.log(error);
			throw error;
		}

		toast.success("Firmanız Başarıyla Düzenlenmiştir.");
		router.reload();
	};

	const onDeleteAdvert = async (e) => {
		Swal.fire({
			title: "Emin Misin?",
			text: "Eğer bu ilanı silersen bir daha geri getiremezsin!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sil Gitsin",
			cancelButtonText: "Silme Boşver",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const { error } = await supabase
					.from("workplaceAdvert")
					.delete()
					.eq("id", e)
					.single();

				if (!error) {
					toast.success("İlan başarıyla kaldırıldı.");
					router.reload();
				}
			}
		});
	};

	const onDeleteIntership = async (e) => {
		Swal.fire({
			title: "Emin Misin?",
			text: "Eğer bu ilanı silersen bir daha geri getiremezsin!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sil Gitsin",
			cancelButtonText: "Silme Boşver",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const { error } = await supabase
					.from("intership")
					.delete()
					.eq("id", e)
					.single();

				if (!error) {
					toast.success("İlan başarıyla kaldırıldı.");
					router.reload();
				}
			}
		});
	};

	async function uploadPhotos(event: ChangeEvent<HTMLInputElement>) {
		try {
			if (!event.target.files || event.target.files.length == 0) {
				toast.info("Sadece PNG ve JPEG formatları desteklenmektedir.");
			}

			const file = event.target.files[0];
			const fileExt = file.name.split(".").pop();
			const fileName = `4${Math.random()}.${fileExt}`;
			const filePath = `${fileName}`;

			const { error: uploadError } = await supabase.storage
				.from("workplace")
				.upload("/photos/" + filePath, file);

			if (uploadError) {
				throw uploadError;
			}

			const { error: updateError } = await supabase
				.from("workplace")
				.upsert({
					user: session.user.id,
					photos: filePath,
				});

			if (updateError) {
				throw updateError;
			}

			setPhotos(null);
			setPhotos(filePath);
		} catch (error) {
			toast.error("Lütfen dosya seçiniz.");
		} finally {
			toast.success("Firma fotoğrafınız başarıyla düzenlenmiştir.");
		}
	}

	return (
		<Layout title={"Profil"}>
			<section className="mx-auto my-8 flex flex-col space-y-5 px-10 lg:px-48">
				<div className="bg-gray-300 px-10 py-8 dark:bg-gray-700">
					<form
						className="mx-auto flex flex-col items-center justify-center gap-4"
						onSubmit={onSubmit}
					>
						<h1 className="text-2xl font-semibold text-black dark:text-white">
							Kullanıcı Bilgileri
						</h1>
						<div className="flex flex-col justify-center gap-12 md:flex-row">
							<div className="flex flex-col gap-4">
								<input
									type="text"
									placeholder="İsim"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setName(e.target.value)}
									defaultValue={user.name}
									disabled={disabledTrue}
								/>
								<input
									type="text"
									placeholder="Soyisim"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setSurname(e.target.value)}
									defaultValue={user.surname}
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
									defaultValue={user.phoneNo}
									disabled={disabledTrue}
								/>
								<input
									type="email"
									placeholder="E-Mail Adresi"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setEmail(e.target.value)}
									defaultValue={user.email}
									disabled={disabledTrue}
								/>
							</div>
						</div>

						<div className="flex flex-row items-center justify-center">
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
								{(disabledTrue && "Aç") ||
									(!disabledTrue && "Kapat")}
							</b>
						</p>
					</form>
				</div>

				<div className="bg-gray-300 px-10 py-8 dark:bg-gray-700">
					<form
						className="mx-auto flex flex-col items-center justify-center gap-4"
						onSubmit={onWorkplaceSubmit}
					>
						<h1 className="text-2xl font-semibold text-black dark:text-white">
							Firma Bilgileri
						</h1>
						<div className="flex flex-col justify-center gap-2">
							<div className="flex flex-col gap-2">
								<label
									htmlFor="avatar"
									className="group flex flex-col items-center justify-center hover:cursor-pointer"
								>
									<CustomImage
										src={`https://dqupymeqnjgwzfgkrzwf.supabase.co/storage/v1/object/public/workplace/photos/${photos}`}
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
									onChange={uploadPhotos}
								/>
							</div>
							<div className="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-2">
								<input
									type="text"
									placeholder="Firma Adı"
									className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) =>
										setWorkplaceName(e.target.value)
									}
									defaultValue={workplace.name}
									disabled={disabledTrue}
								/>
								<input
									type="text"
									placeholder="Yetkili Adı"
									className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) =>
										setWorkerName(e.target.value)
									}
									defaultValue={workplace.workerName}
									disabled={disabledTrue}
								/>
								<input
									type="tel"
									placeholder="Yetkilinin Telefon Numarası"
									maxLength={10}
									minLength={10}
									pattern="\d*"
									className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) =>
										setWorkerPhone(e.target.value)
									}
									defaultValue={workplace.workerPhone}
									disabled={disabledTrue}
								/>
								<input
									type="email"
									placeholder="Yetkilinin E-Mail Adresi"
									className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) =>
										setWorkerMail(e.target.value)
									}
									defaultValue={workplace.workerMail}
									disabled={disabledTrue}
								/>
								<input
									type="text"
									placeholder="Firmanın Bölgesi"
									className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setRegion(e.target.value)}
									defaultValue={workplace.region}
									disabled={disabledTrue}
								/>
							</div>
							<div className="flex w-full flex-col gap-2">
								<textarea
									placeholder="Firmanın Adresi"
									className="rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setAdress(e.target.value)}
									defaultValue={workplace.adress}
									disabled={disabledTrue}
								/>
								<textarea
									placeholder="Firma Hakkında"
									className="rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setAbout(e.target.value)}
									defaultValue={workplace.about}
									disabled={disabledTrue}
								/>
							</div>
						</div>

						<div className="flex flex-row items-center justify-center">
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

				<div className="mt-5 flex flex-col gap-2">
					<div className="bg-gray-300 px-10 py-8 dark:bg-gray-700">
						<div className="mx-auto flex flex-col items-center justify-center gap-4">
							<h1 className="text-center text-2xl font-semibold text-black dark:text-white">
								İş İlanlarınız
							</h1>
							<div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
								{workplaceAdvert.map((w) => (
									<div
										className="flex flex-col items-center justify-center rounded-lg bg-gray-200 px-4 py-6 dark:bg-gray-800"
										key={w.id}
									>
										<div className="text-center text-xl font-semibold text-black dark:text-white">
											Departman: {w.department}
											<br />
											Kişi Sayısı: {w.total}
										</div>
										<div>
											<Button type="success">
												<Link
													href={`/is-ilanlari/${w.id}`}
												>
													Görüntüle
												</Link>
											</Button>
											<Button type="primary">
												<Link
													href={`/is-ilanlari/duzenle/${w.id}`}
												>
													Düzenle
												</Link>
											</Button>
											<Button
												type="error"
												onClick={() =>
													onDeleteAdvert(w.id)
												}
											>
												Sil
											</Button>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="bg-gray-300 px-10 py-8 dark:bg-gray-700">
						<div className="mx-auto flex flex-col items-center justify-center gap-4">
							<h1 className="text-center text-2xl font-semibold text-black dark:text-white">
								Staj İlanlarınız
							</h1>

							<div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
								{workplaceIntership.map((w) => (
									<div
										className="flex flex-col items-center justify-center rounded-lg bg-gray-200 px-4 py-6 dark:bg-gray-800"
										key={w.id}
									>
										<div className="text-center text-xl font-semibold text-black dark:text-white">
											Departman: {w.department}
											<br />
											Kişi Sayısı: {w.total}
										</div>
										<div className="flex flex-col justify-between text-xl font-semibold text-black dark:text-white lg:flex-row">
											<div>
												Başvuru: <strong>{}</strong>
											</div>
										</div>
										<div>
											<Button type="success">
												<Link
													href={`/staj-ilanlari/${w.id}`}
												>
													Görüntüle
												</Link>
											</Button>
											<Button type="primary">
												<Link
													href={`/staj-ilanlari/duzenle/${w.id}`}
												>
													Düzenle
												</Link>
											</Button>
											<Button
												type="error"
												onClick={() =>
													onDeleteIntership(w.id)
												}
											>
												Sil
											</Button>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="fixed bottom-2 right-2">
				<Button type="primary" onClick={onDisabled}>
					Düzenlemeyi{" "}
					{(disabledTrue && "Kapat") || (!disabledTrue && "Aç")}
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

	if (!session.user.workplace) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	const { data: workplace, error } = await supabase
		.from("workplace")
		.select("*")
		.eq("user", session.user.id)
		.single();

	if (error) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	const { data: user } = await supabase
		.from("users")
		.select("name, surname, email, phoneNo")
		.eq("id", session.user.id)
		.single();

	const { data: workplaceAdvert } = await supabase
		.from("workplaceAdvert")
		.select("*")
		.eq("workplaceId", workplace.id)
		.order("id", {
			ascending: true,
		});

	const { data: workplaceIntership } = await supabase
		.from("intership")
		.select("*")
		.eq("workplace", workplace.id)
		.order("id", {
			ascending: true,
		});

	return {
		props: {
			session,
			workplace,
			user,
			workplaceAdvert,
			workplaceIntership,
		},
	};
}
