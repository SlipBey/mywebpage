import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import { options } from "../api/auth/[...nextauth]";
import { supabase } from "@libs/supabase";
import { Link } from "@components/Globals/Link";
import { Button } from "@components/Globals/Button";
import { perman } from "@libs/permissions";
import { ChangeEvent, useState } from "react";
import { CustomImage } from "@components/Globals/CustomImage";

export interface IWorksIndexPage {
	session?: Session;
	student?;
}

const WorksIndexPage: NextPage<IWorksIndexPage> = ({ session, student }) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const [search, setSearch] = useState("");

	const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	return (
		<Layout title="Staj Yeri Arayanlar">
			<section className="mx-auto my-8 px-10 lg:px-48">
				<div className="flex w-full flex-row">
					<input
						onChange={onSearchChange}
						type="search"
						className="block w-full rounded-lg border border-gray-400 bg-gray-300 p-3 text-black outline-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
						placeholder="Aramak istediğiniz öğrenciyi veya bölümü giriniz..."
						required
					/>

					{!perman.hasNone(session.user.permissions, [
						"okul_idaresi",
						"alan_sefleri",
						"fabrika_yetkilisi",
					]) && (
						<div>
							<Button type="success">
								<Link href="/staj-ilanlari/ekle">
									İlan Ekle
								</Link>
							</Button>
						</div>
					)}
				</div>

				<div className="mt-8 grid grid-cols-1 gap-3 lg:grid-cols-2">
					{(student ?? [])
						.filter(
							(post) =>
								post.student_name
									.toLowerCase()
									.includes(search.toLowerCase()) ||
								post.area
									.toLowerCase()
									.includes(search.toLowerCase()) ||
								post.student_surname
									.toLowerCase()
									.includes(search.toLowerCase()) ||
								post.workplace.cinsiyet
									.toLowerCase()
									.includes(search.toLowerCase()),
						)
						.map((w, idx) => (
							<div
								className="rounded-lg border border-gray-400 bg-gray-300 py-4 px-6 duration-200 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-700"
								key={idx}
							>
								<Link
									href={`/ogrenci/${w.id}`}
									className="justify-left flex flex-row space-x-5"
								>
									<div>
										<CustomImage
											src={`https://dqupymeqnjgwzfgkrzwf.supabase.co/storage/v1/object/public/students/photos/${w.avatarURL}`}
											alt=""
											className="w-24"
										/>
									</div>
									<div className="flex flex-col">
										<div>
											{w.student_name} {w.student_surname}
										</div>
										<div className="flex flex-col">
											<span>{w.area}</span>
											<span>{w.status}</span>
										</div>
									</div>
									<div className="flex flex-col">
										<span>{w.workplace.adres}</span>
										<span>{w.workplace.cinsiyet}</span>
										<span>{w.workplace.dogum}</span>
									</div>
								</Link>
							</div>
						))}
				</div>
			</section>
		</Layout>
	);
};

export default WorksIndexPage;

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

	const { data, error } = await supabase
		.from("students")
		.select(
			`student_name, student_surname, area, status, id, workplace, avatarURL`,
		)
		.eq("status", "Staj Yeri Arıyor (Lise)")
		.order("id", {
			ascending: true,
		});

	if (error) {
		context.res.writeHead(302, {
			location: "/",
		});
		context.res.end();
	}

	for (const c of data) {
		const { data: cv } = await supabase
			.from("cv")
			.select("adres, cinsiyet, dogum")
			.eq("studentId", c.id)
			.single();
		c.workplace = cv;
	}

	return {
		props: {
			session,
			student: data,
		},
	};
}
