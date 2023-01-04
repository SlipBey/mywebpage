import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout/admin";
import { useSessionStore } from "@store/SessionStore";
import { Button } from "@components/Globals/Button";
import { supabase } from "@libs/supabase";
import { useRouter } from "next/router";
import { options } from "../api/auth/[...nextauth]";
import { toast } from "react-toastify";
import { perman } from "@libs/permissions";
import Swal from "sweetalert2";

export interface IStudentDetailPage {
	session?: Session;
	record?;
	recordWorkplace?;
}

const StudentDetailPage: NextPage<IStudentDetailPage> = ({
	session,
	record,
	recordWorkplace,
}) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const router = useRouter();

	const onConfirmStudent = async (e) => {
		Swal.fire({
			title: "Emin Misin?",
			text: "Öğrenciyi kabul etmek istediğinden emin misin?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Evet",
			cancelButtonText: "Hayır",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const { error } = await supabase.from("users").insert([
					{
						name: e.name,
						surname: e.surname,
						email: e.email,
						phoneNo: e.phone,
						password: e.password,
						permissions: 0,
						student: true,
						workplace: false,
					},
				]);

				if (!error) {
					const { data } = await supabase
						.from("users")
						.select("id")
						.eq("email", e.email)
						.eq("name", e.name)
						.eq("surname", e.surname)
						.single();

					await supabase.from("students").insert([
						{
							student_name: e.name,
							student_surname: e.surname,
							class: e.class.id,
							school_no: e.schoolNo,
							phone_no: e.phone,
							email: e.email,
							adding: session.user.id,
							studentId: data.id,
							avatarURL: "avatar.png",
						},
					]);

					const { data: student } = await supabase
						.from("students")
						.select("id")
						.eq("email", e.email)
						.single();

					await supabase.from("cv").insert([
						{
							studentId: student.id,
						},
					]);

					await supabase.from("notifications").insert([
						{
							user: data.id,
							text: "Kaydınız başarıyla tamamlanmıştır. Fakat öğrenci kaydını oluşturmak için lütfen profil kısmından bilgilerinizi eksiksiz ve doğru giriniz.",
							sender: session.user.id,
							href: "/profil/ogrenci",
							title: "Profil Tamamlama",
						},
					]);
				}

				const { error: err } = await supabase
					.from("recordStudent")
					.delete()
					.eq("id", e.id)
					.single();

				if (err) {
					console.log(err);
					throw err;
				}

				toast.success("Öğrenci Başarıyla Onaylandı.");
				router.reload();
			}
		});
	};

	const onConfirmWorkplace = async (e) => {
		Swal.fire({
			title: "Emin Misin?",
			text: "Firmayı kabul etmek istediğinden emin misin?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Evet",
			cancelButtonText: "Hayır",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const { error } = await supabase.from("users").insert([
					{
						name: e.name,
						surname: e.surname,
						email: e.email,
						phoneNo: e.phone,
						password: e.password,
						permissions: 8,
						student: false,
						workplace: true,
					},
				]);

				if (!error) {
					const { data } = await supabase
						.from("users")
						.select("id")
						.eq("email", e.email)
						.eq("name", e.name)
						.eq("surname", e.surname)
						.single();

					await supabase.from("workplace").insert([
						{
							name: e.workname,
							adress: e.adress,
							workerName: e.workerName,
							workerPhone: e.workerPhone,
							workerMail: e.workerMail,
							adding: session.user.id,
							region: e.region,
							about: e.about,
							user: data.id,
						},
					]);

					await supabase.from("notifications").insert([
						{
							user: data.id,
							text: "Kaydınız başarıyla tamamlanmıştır. Fakat firma kaydını oluşturmak için lütfen profil kısmından bilgilerinizi eksiksiz ve doğru giriniz.",
							sender: session.user.id,
							href: "/profil/firma",
							title: "Profil Tamamlama",
						},
					]);
				}

				const { error: err } = await supabase
					.from("recordWorkplace")
					.delete()
					.eq("id", e.id)
					.single();

				if (err) {
					console.log(err);
					throw err;
				}

				toast.success("Firma Başarıyla Onaylandı.");
				router.reload();
			}
		});
	};

	const onDeleteStudent = async (e) => {
		Swal.fire({
			title: "Emin Misin?",
			text: "Kullanıcıyı reddetmek istediğine emin misin?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Evet",
			cancelButtonText: "Hayır",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const { error } = await supabase
					.from("recordStudent")
					.delete()
					.eq("id", e)
					.single();

				if (error) {
					console.log(error);
					throw error;
				}

				toast.success("Kullanıcı Başarıyla Reddedildi.");
				router.reload();
			}
		});
	};

	const onDeleteWorkplace = async (e) => {
		Swal.fire({
			title: "Emin Misin?",
			text: "Kullanıcıyı reddetmek istediğine emin misin?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Evet",
			cancelButtonText: "Hayır",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const { error } = await supabase
					.from("recordWorkplace")
					.delete()
					.eq("id", e)
					.single();

				if (error) {
					console.log(error);
					throw error;
				}

				toast.success("Kullanıcı Başarıyla Reddedildi.");
				router.reload();
			}
		});
	};

	return (
		<Layout title={"Kayıtlar"}>
			<section className="mx-auto my-8 flex flex-col space-y-5 px-10 lg:px-48">
				<div className="bg-gray-300 px-10 py-8 dark:bg-gray-700">
					<h1 className="text-center text-2xl font-bold text-black dark:text-white">
						Öğrenci Kayıtları
					</h1>
					<div className="mx-auto mt-5">
						<div className="grid grid-cols-1 justify-items-center gap-2 lg:grid-cols-2">
							{record.map((r, idx) => (
								<div
									className="flex flex-col gap-4 rounded-lg bg-gray-200 px-4 py-6 dark:bg-gray-800/50"
									key={idx}
								>
									<div className="font-lg text-left text-lg text-gray-800 dark:text-gray-200">
										{r.name} {r.surname} <br />
										{r.phone} {r.email} <br />
										{r.class?.name} <br />
										{r.schoolNo}
									</div>

									<div className="flex justify-center">
										<Button
											type="success"
											onClick={() => onConfirmStudent(r)}
										>
											Onayla
										</Button>
										<Button
											type="error"
											onClick={() =>
												onDeleteStudent(r.id)
											}
										>
											Reddet
										</Button>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="bg-gray-300 px-10 py-8 dark:bg-gray-700">
					<h1 className="text-center text-2xl font-bold text-black dark:text-white">
						Firma Kayıtları
					</h1>
					<div className="mx-auto mt-5">
						<div className="grid grid-cols-1 justify-items-center gap-2 lg:grid-cols-2">
							{recordWorkplace.map((r, idx) => (
								<div
									className="flex flex-col gap-4 rounded-lg bg-gray-200 px-4 py-6 dark:bg-gray-800/50"
									key={idx}
								>
									<div className="font-lg text-left text-lg text-gray-800 dark:text-gray-200">
										{r.name} {r.surname} <br />
										{r.phone} {r.email} <br />
										<br />
										{r.workname} <br />
										{r.workerPhone} {r.workerMail} <br />
										<br />
										{r.adress} <br />
										{r.region} <br />
										{r.about}
									</div>

									<div className="flex justify-center">
										<Button
											type="success"
											onClick={() =>
												onConfirmWorkplace(r)
											}
										>
											Onayla
										</Button>
										<Button
											type="error"
											onClick={() =>
												onDeleteWorkplace(r.id)
											}
										>
											Reddet
										</Button>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
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

	if (
		perman.hasNone(session.user.permissions, [
			"okul_idaresi",
			"alan_sefleri",
		])
	) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	const { data: record, error } = await supabase
		.from("recordStudent")
		.select("*")
		.order("created_at", {
			ascending: true,
		});

	const { data: recordWorkplace } = await supabase
		.from("recordWorkplace")
		.select("*")
		.order("created_at", {
			ascending: true,
		});

	if (error) {
		context.res.writeHead(302, {
			location: "/",
		});
		context.res.end();
	}

	for (const r of record) {
		const { data: classes } = await supabase
			.from("class")
			.select("name, id")
			.eq("id", r.class)
			.single();
		r.class = classes;
	}

	return {
		props: {
			session,
			record,
			recordWorkplace,
		},
	};
}
