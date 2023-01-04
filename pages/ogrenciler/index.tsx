import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import { options } from "../api/auth/[...nextauth]";
import { ChangeEvent, useState } from "react";
import { supabase } from "@libs/supabase";
import { Link } from "@components/Globals/Link";
import { Button } from "@components/Globals/Button";
import { CustomImage } from "@components/Globals/CustomImage";

export interface IStudentIndexPage {
	session?: Session;
	student?;
	workData?;
}

const StudentIndexPage: NextPage<IStudentIndexPage> = ({
	session,
	student,
	workData,
}) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const [category, setCategory] = useState("");
	const [search, setSearch] = useState("");

	const onCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCategory(e.target.value);
	};

	const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	return (
		<Layout title="Öğrenciler">
			<section className="mx-auto my-8 px-10 lg:px-48">
				<div className="flex w-full flex-col">
					<div className="flex w-full flex-row">
						<select
							onChange={onCategoryChange}
							className="block w-64 rounded-l-lg border border-gray-400 bg-gray-300 p-2.5 text-sm text-black placeholder-gray-400 outline-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
						>
							<option value="">Bölüm Seçiniz</option>
							<option value="Mekatronik">Mekatronik</option>
							<option value="Makine">Makine</option>
							<option value="Elektrik">Elektrik</option>
							<option value="Kimya">Kimya</option>
						</select>

						<input
							onChange={onSearchChange}
							type="search"
							className="block w-full rounded-r-lg border border-gray-400 bg-gray-300 p-3 text-black outline-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
							placeholder="Aramak istediğiniz öğrenciyi giriniz..."
							required
						/>
					</div>

					<div className="mt-8 grid grid-cols-1 justify-items-center gap-3 lg:grid-cols-2">
						{(student ?? [])
							.filter(
								(post) =>
									category == post.area &&
									(post.student_name || post.student_surname)
										.toLowerCase()
										.includes(search.toLowerCase()),
							)
							.map((s, idx) => (
								<div
									className="hover:shadow-2x rounded-lg border border-gray-800 bg-gray-300 py-4 px-6 duration-200 dark:bg-gray-700"
									key={idx}
								>
									<div className="flex flex-row justify-between space-x-3">
										<div>
											<CustomImage
												src={`https://dqupymeqnjgwzfgkrzwf.supabase.co/storage/v1/object/public/students/photos/${s.avatarURL}`}
												alt=""
												className="w-24"
											/>
										</div>
										<div className="mt-2 flex flex-col">
											<div>
												{s.student_name}{" "}
												{s.student_surname}
											</div>
											<div className="flex flex-col">
												<span>{s.phone_no}</span>{" "}
												<span>{s.email}</span>
											</div>
										</div>
										<div>
											<Button type="success">
												<Link href={`/ogrenci/${s.id}`}>
													Görüntüle
												</Link>
											</Button>
											<Button type="primary">
												<Link
													href={`/mesajlar/${s.studentId}/${workData.id}`}
												>
													Mesaj At
												</Link>
											</Button>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default StudentIndexPage;

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
		.select("*")
		.order("id", {
			ascending: true,
		});

	if (error) {
		context.res.writeHead(302, {
			location: "/",
		});
		context.res.end();
	}

	const { data: workData } = await supabase
		.from("workplace")
		.select("id")
		.eq("user", session.user.id)
		.single();

	return {
		props: {
			session,
			student: data,
			workData,
		},
	};
}
