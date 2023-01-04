import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import { options } from "../api/auth/[...nextauth]";
import { Button } from "@components/Globals/Button";
import { supabase } from "@libs/supabase";
import { Link } from "@components/Globals/Link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Alert } from "@components/Globals/Alert";
import { perman } from "@libs/permissions";
import { CustomImage } from "@components/Globals/CustomImage";
import Swal from "sweetalert2";

export interface IWorkDetailPage {
	session?: Session;
	workplace?;
	work?;
	appUser?;
	app?;
}

const WorkDetailPage: NextPage<IWorkDetailPage> = ({
	session,
	workplace,
	work,
	appUser,
	app,
}) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const router = useRouter();

	const onApp = async () => {
		if (appUser) return toast.error("Zaten başvuru yapmışsınız.");

		const { error } = await supabase.from("applications").insert([
			{
				intership: workplace.id,
				user: session.user.id,
			},
		]);

		if (error) {
			console.log(error);
			throw error;
		}

		await supabase.from("notifications").insert([
			{
				user: workplace.user,
				text: `${session.user.name} ${session.user.surname} Öğrencisi ilanınıza başvuru yaptı.`,
				sender: session.user.id,
				href: `/staj-ilanlari/${workplace.id}#basvuranlar`,
				title: `${session.user.name} ${session.user.surname} Öğrencisi Başvuru Yaptı.`,
			},
		]);

		toast.success("Başvuru başarıyla yapıldı.");
		router.push(`/staj-ilanlari/${workplace.id}`);
	};

	const onReject = async (e) => {
		Swal.fire({
			title: "Emin Misin?",
			text: "Eğer bu başvuruyu reddedersen kullanıcı bir daha başvuramayacak.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Reddet Gitsin",
			cancelButtonText: "Reddetme Boşver",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const { error } = await supabase
					.from("applications")
					.update({
						reject: true,
					})
					.eq("id", e.id)
					.single();

				if (error) {
					console.log(error);
					throw error;
				}

				toast.success("Başvuru başarıyla reddedildi.");
				router.push(`/staj-ilanlari/${workplace.id}`);
			}
		});
	};

	return (
		<Layout title={`${work.name} Firmasının Staj İlanı`}>
			<section className="m-8 flex flex-col justify-between gap-4 lg:flex-row">
				<div className="w-full bg-gray-300 px-10 py-8 dark:bg-gray-700">
					<div className="mx-auto flex flex-col gap-4">
						<div className="flex flex-col justify-between lg:flex-row">
							<div className="flex flex-col items-center gap-2 lg:flex-row">
								<div>
									<CustomImage
										src={`https://dqupymeqnjgwzfgkrzwf.supabase.co/storage/v1/object/public/workplace/photos/${work.photos}`}
										alt=""
										className="w-32"
									/>
								</div>
								<div>
									<h5 className="text-xl font-bold text-black dark:text-white">
										{work.name} Firması
									</h5>
									<h5 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
										<b>Adres:</b>{" "}
										<span className="text-gray-800 dark:text-gray-200">
											{work.adress}
										</span>
									</h5>
									<h5 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
										<b>Yabancı Dil:</b>{" "}
										{(workplace.language && (
											<span className="text-gray-800 dark:text-gray-200">
												{workplace.language}
											</span>
										)) ||
											"-"}
									</h5>
									<div className="text-md font-medium text-gray-800 dark:text-gray-200">
										<strong>
											{new Date(
												workplace.created_at,
											).toLocaleDateString("tr-TR", {
												hour: "numeric",
												minute: "numeric",
												hour12: false,
											})}
										</strong>{" "}
										Tarihinde oluşturuldu.
									</div>
									<div className="text-md font-medium text-gray-800 dark:text-gray-200">
										Başvuru Sayısı:{" "}
										<strong>{app.length}</strong>
									</div>
									<div className="text-md font-medium text-gray-800 dark:text-gray-200">
										İstenen Stajyer Adedi:{" "}
										<strong>{workplace.total}</strong>
									</div>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<div className="text-xl font-semibold text-black dark:text-white">
									Firma İletişim Bilgileri
								</div>
								<div className="text-lg">
									<h5 className="text-gray-700 dark:text-gray-300">
										{work.workerName}
									</h5>
									<h5 className="text-gray-700 dark:text-gray-300">
										{work.workerPhone}
									</h5>
									<h5 className="text-gray-700 dark:text-gray-300">
										{work.workerMail}
									</h5>
								</div>
							</div>
							{perman.hasNone(session.user.permissions, [
								"fabrika_yetkilisi",
								"okul_idaresi",
								"alan_sefleri",
							]) && (
								<div>
									{(!appUser && (
										<Button
											type="success"
											onClick={() => onApp()}
										>
											Başvuru Yap
										</Button>
									)) || (
										<Alert type="success">
											Başvuruldu.
										</Alert>
									)}
								</div>
							)}
						</div>

						<div className="flex flex-col">
							<div className="text-xl font-semibold text-black dark:text-white">
								Görev Tanımı
							</div>
							<h5 className="text-lg text-gray-700 dark:text-gray-300">
								{workplace.task}
							</h5>
						</div>

						<div className="flex flex-col">
							<div className="text-xl font-semibold text-black dark:text-white">
								Firma Hakkında
							</div>
							<h5 className="text-lg text-gray-700 dark:text-gray-300">
								{work.about}
							</h5>
						</div>
					</div>
				</div>
			</section>
			{perman.has(session.user.permissions, "fabrika_yetkilisi") &&
				session.user.email == work.workerMail && (
					<section
						className="m-8 flex flex-col justify-between gap-4 lg:flex-row"
						id="basvuranlar"
					>
						<div className="w-full bg-gray-300 px-10 py-8 dark:bg-gray-700">
							<h5 className="mb-5 text-left text-xl font-bold text-black dark:text-white">
								Başvuranlar
							</h5>

							<div className="flex flex-col gap-4">
								{app
									.filter((post) => post.reject == false)
									.map((a, idx) => (
										<div
											key={idx}
											className="flex flex-row justify-between rounded-lg bg-gray-200 p-3 dark:bg-gray-800"
										>
											<div>
												<h5>
													Ad Soyad:{" "}
													{a.user.student_name}{" "}
													{a.user.student_surname}
												</h5>
												<h5>Bölüm: {a.user.area}</h5>
											</div>
											<div>
												<h5>
													Telefon:{" "}
													<Link
														href={`tel:${a.user.phone_no}`}
														className="text-blue-500"
													>
														{a.user.phone_no}
													</Link>
												</h5>
												<h5>
													E-Mail:{" "}
													<Link
														href={`mailto:${a.user.email}`}
														className="text-green-500"
													>
														{a.user.email}
													</Link>
												</h5>
											</div>
											<div>
												<Button
													type="error"
													onClick={() => onReject(a)}
												>
													Reddet
												</Button>
												<Button type="success">
													<Link
														href={`/mesajlar/${a.user.studentId}/${work.id}`}
													>
														Mesaj At
													</Link>
												</Button>
												<Button type="primary">
													<Link
														href={`/cv/${a.user.id}`}
													>
														Görüntüle
													</Link>
												</Button>
											</div>
										</div>
									))}
							</div>
						</div>
					</section>
				)}
		</Layout>
	);
};

export default WorkDetailPage;

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

	const { data: workplace, error } = await supabase
		.from("intership")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		context.res.writeHead(302, {
			location: "/",
		});
		context.res.end();
	}

	const { data: work } = await supabase
		.from("workplace")
		.select("*")
		.eq("id", workplace.workplace)
		.single();

	const { data: appUser } = await supabase
		.from("applications")
		.select("*")
		.eq("intership", workplace.id)
		.eq("user", session.user.id)
		.single();

	const { data: app } = await supabase
		.from("applications")
		.select("*")
		.eq("intership", id)
		.order("created_at", {
			ascending: false,
		});

	for (const a of app) {
		const { data: user } = await supabase
			.from("students")
			.select("*")
			.eq("studentId", a.user)
			.single();
		a.user = user;
	}

	return {
		props: {
			session,
			workplace,
			work,
			appUser,
			app,
		},
	};
}
