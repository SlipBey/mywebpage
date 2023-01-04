import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import { supabase } from "@libs/supabase";
import { options } from "../api/auth/[...nextauth]";
import { Button } from "@components/Globals/Button";
import { CustomImage } from "@components/Globals/CustomImage";
import {
	FiCalendar,
	FiDownload,
	FiHome,
	FiMail,
	FiPhone,
	FiUser,
} from "react-icons/fi";
import { Link } from "@components/Globals/Link";
import { FaLocationArrow } from "react-icons/fa";

export interface IStudentDetailPage {
	session?: Session;
	cv?;
	cvProgramlar?;
	cvCertificate?;
	cvHobi?;
	cvEgitim?;
}

const StudentDetailPage: NextPage<IStudentDetailPage> = ({
	session,
	cv,
	cvProgramlar,
	cvCertificate,
	cvHobi,
	cvEgitim,
}) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	return (
		<Layout
			title={`${cv.studentId.student_name} ${cv.studentId.student_surname} Kişisinin CV'si`}
		>
			<section className="mx-auto my-8 px-10 lg:px-48">
				<div className="flex flex-col gap-2 bg-gray-300 dark:bg-gray-700 lg:flex-row">
					<div className="flex flex-col items-center justify-center gap-2 bg-sky-400 px-10 py-8 dark:bg-sky-600 lg:w-96">
						<div>
							<CustomImage
								src={`https://dqupymeqnjgwzfgkrzwf.supabase.co/storage/v1/object/public/students/photos/${cv.studentId.avatarURL}`}
								className="w-32"
								alt=""
							/>
						</div>
						<div className="mt-5">
							<h3 className="text-lg font-semibold text-black dark:text-white">
								{cv.studentId.area}
							</h3>
						</div>
						<div className="mt-5 flex items-center gap-2 before:h-1 before:w-2 before:bg-gray-800 after:h-1 after:w-2 after:bg-gray-800 dark:before:bg-gray-200 dark:after:bg-gray-200">
							<h1 className="text-xl font-bold text-black dark:text-white">
								Kişisel Bilgiler
							</h1>
						</div>
						<div className="mt-3 flex flex-col gap-2 text-black dark:text-white">
							<div className="text-lg font-semibold">
								<FiUser className="inline-flex h-6 w-6" />{" "}
								{cv.studentId.student_name}{" "}
								{cv.studentId.student_surname}
							</div>
							<div className="text-lg font-semibold">
								<FiMail className="inline-flex h-6 w-6" />{" "}
								{cv.studentId.email}
							</div>
							<div className="text-lg font-semibold">
								<FiPhone className="inline-flex h-6 w-6" />{" "}
								{cv.studentId.phone_no}
							</div>
							<div className="text-lg font-semibold">
								<FiHome className="inline-flex h-6 w-6" />{" "}
								{cv.adres}
							</div>
							<div className="text-lg font-semibold">
								<FaLocationArrow className="inline-flex h-6 w-6" />{" "}
								{cv.bölge}
							</div>
							<div className="text-lg font-semibold">
								<FiCalendar className="inline-flex h-6 w-6" />{" "}
								<input
									type="date"
									defaultValue={cv.dogum}
									className="bg-transparent"
									disabled
								/>
							</div>
						</div>
						<div className="mt-5 flex items-center gap-2 before:h-1 before:w-2 before:bg-gray-800 after:h-1 after:w-2 after:bg-gray-800 dark:before:bg-gray-200 dark:after:bg-gray-200">
							<h1 className="text-xl font-bold text-black dark:text-white">
								Diller
							</h1>
						</div>
						<div className="mt-3 flex flex-col gap-2 text-black dark:text-white">
							<div className="text-lg font-semibold">
								{cv.dil}
							</div>
						</div>
						<div className="mt-5">
							<div className="text-md font-semibold">
								<strong>
									{new Date(cv.edited_at).toLocaleDateString(
										"tr-TR",
										{
											hour: "numeric",
											minute: "numeric",
											hour12: false,
										},
									)}
								</strong>{" "}
								Tarihinde Güncellendi.
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-2 px-10 py-8">
						<div className="mt-5 flex items-center gap-2">
							<h1 className="text-xl font-bold text-black dark:text-white">
								Profil
							</h1>
						</div>
						<div className="flex flex-col gap-2 text-black dark:text-white">
							<div className="text-lg font-semibold">
								{cv.aciklama}
							</div>
						</div>

						<div className="mt-5 flex items-center gap-2">
							<h1 className="text-xl font-bold text-black dark:text-white">
								Eğitim
							</h1>
						</div>
						<div className="flex flex-col gap-2 text-black dark:text-white">
							<div className="text-lg font-semibold">
								{cvEgitim.map((cv) => (
									<div
										key={cv.id}
										className="flex flex-row gap-2"
									>
										<div>
											{cv.sYear}-{cv.eYear}
										</div>
										<div>
											<strong>{cv.school}</strong> -{" "}
											{cv.mScore}
										</div>
									</div>
								))}
							</div>
						</div>

						{cv.is_Deneyimi && (
							<>
								<div className="mt-5 flex items-center gap-2">
									<h1 className="text-xl font-bold text-black dark:text-white">
										İş Deneyimi
									</h1>
								</div>
								<div className="flex flex-col gap-2 text-black dark:text-white">
									<div className="text-lg font-semibold">
										{cv.is_deneyimi}
									</div>
								</div>
							</>
						)}

						<div className="gap- mt-5 flex items-center">
							<h1 className="text-xl font-bold text-black dark:text-white">
								Kullanabildiği Programlar
							</h1>
						</div>
						<div className="flex flex-col gap-2 text-black dark:text-white">
							{cvProgramlar.map((c) => (
								<div
									className="flex flex-col gap-2 text-lg font-semibold text-black dark:text-white lg:flex-row"
									key={c.id}
								>
									Program:{" "}
									<strong className="text-gray-900 dark:text-gray-100">
										{c.name}
									</strong>{" "}
									<div className="star-rating">
										{[...Array(5)].map((star, index) => {
											index += 1;
											return (
												<button
													type="button"
													key={index}
													className={`h-5 w-5 ${
														index <= c.rating
															? "on"
															: "off"
													}`}
													disabled
												>
													<span className="star text-xl">
														&#9733;
													</span>
												</button>
											);
										})}
									</div>
								</div>
							))}
						</div>

						<div className="gap- mt-5 flex items-center">
							<h1 className="text-xl font-bold text-black dark:text-white">
								Sertifikaları
							</h1>
						</div>
						<div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
							{cvCertificate.map((c) => (
								<div
									className="rounded-lg bg-gray-100 px-4 py-6 dark:bg-gray-900"
									key={c.id}
								>
									<div className="flex flex-col items-center gap-2">
										{c.ismi} - {c.alisTarihi}
										<div>
											<Link
												className="group"
												href={`https://dqupymeqnjgwzfgkrzwf.supabase.co/storage/v1/object/public/students/certificate/${c.sertifika}`}
											>
												<FiDownload className="inline-flex h-8 w-8 text-green-600 group-hover:text-green-700" />
											</Link>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="mt-5 flex items-center gap-2">
							<h1 className="text-xl font-bold text-black dark:text-white">
								Hobiler
							</h1>
						</div>
						<div className="flex flex-col gap-2 text-black dark:text-white">
							<div className="text-lg font-semibold">
								{/*cv.hobiler*/}
								{cvHobi.map((c) => (
									<span key={c.id}>{c.text} </span>
								))}
							</div>
						</div>

						<div className="mt-5 flex items-center gap-2">
							<h1 className="text-xl font-bold text-black dark:text-white">
								Sosyal Medya
							</h1>
						</div>
						<div className="flex flex-col gap-2 text-black dark:text-white">
							<div className="text-lg font-semibold">
								<ul>
									<li>Website: {cv.website}</li>
									<li>Github: {cv.github}</li>
									<li>Linkedin: {cv.linkedin}</li>
									<li>Youtube: {cv.youtube}</li>
									<li>Behance: {cv.behance}</li>
									<li>İnstagram: {cv.instagram}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<Button type="success">PDF Olarak İndir</Button>
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

	const { data: cv, error } = await supabase
		.from("cv")
		.select("*")
		.eq("studentId", id)
		.single();

	if (error) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	const { data: student } = await supabase
		.from("students")
		.select(
			"phone_no, email, student_name, student_surname, class, area, avatarURL",
		)
		.eq("id", id)
		.single();
	cv.studentId = student;

	const { data: cvProgramlar } = await supabase
		.from("cvPrograms")
		.select("*")
		.eq("studentId", id)
		.order("id", {
			ascending: true,
		});

	const { data: cvCertificate } = await supabase
		.from("cvCertificate")
		.select("*")
		.eq("studentId", id)
		.order("id", {
			ascending: true,
		});

	const { data: cvHobi } = await supabase
		.from("cvHobi")
		.select("*")
		.eq("studentId", id)
		.order("id", {
			ascending: true,
		});

	const { data: cvEgitim } = await supabase
		.from("cvEgitim")
		.select("*")
		.eq("studentId", id)
		.order("id", {
			ascending: true,
		});

	return {
		props: {
			session,
			cv,
			cvProgramlar,
			cvCertificate,
			cvHobi,
			cvEgitim,
		},
	};
}
