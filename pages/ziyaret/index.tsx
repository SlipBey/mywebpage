import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import { options } from "../api/auth/[...nextauth]";
import { ChangeEvent, useState } from "react";
import { supabase } from "@libs/supabase";
import { Link } from "@components/Globals/Link";
import { FiCheck, FiX } from "react-icons/fi";
import { Button } from "@components/Globals/Button";

export interface IStudentIndexPage {
	session?: Session;
	users?;
	visited?;
}

const VisitIndexPage: NextPage<IStudentIndexPage> = ({
	session,
	users,
	visited,
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
		<Layout title="Ziyaret">
			<section className="mx-auto my-8 px-10 lg:px-48">
				<div className="flex w-full flex-row">
					<select
						onChange={onCategoryChange}
						className="block w-64 rounded-l-lg border border-gray-400 bg-gray-300 p-3 text-black outline-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
					>
						<option value="">Görevli Seçiniz</option>
						{users.map((u, idx) => {
							return (
								<option key={idx} value={u.name}>
									{u.name} {u.surname}
								</option>
							);
						})}
					</select>

					<input
						onChange={onSearchChange}
						type="search"
						className="block w-full rounded-r-lg border border-gray-400 bg-gray-300 p-3 text-black outline-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
						placeholder="Aramak istediğiniz firmayı giriniz..."
						required
					/>

					<div>
						<Button type="success">
							<Link href="/ziyaret/ekle">Ziyaret Ekle</Link>
						</Button>
					</div>
				</div>

				<div className="mt-8 overflow-x-auto rounded-lg">
					<table className="w-full truncate text-center text-sm text-gray-400">
						<thead className="bg-gray-300 text-xs uppercase text-gray-400 dark:bg-gray-700">
							<tr>
								<th className="py-3 px-6">Firma Adı</th>
								<th className="py-3 px-6">Lokasyon</th>
								<th className="py-3 px-6">Yetkili İsim</th>
								<th className="py-3 px-6">Yetkili Telefon</th>

								<th className="py-3 px-6">Eylül</th>
								<th className="py-3 px-6">Ekim</th>
								<th className="py-3 px-6">Kasım</th>
								<th className="py-3 px-6">Aralık</th>
								<th className="py-3 px-6">Ocak</th>
								<th className="py-3 px-6">Mart</th>
								<th className="py-3 px-6">Nisan</th>
								<th className="py-3 px-6">Mayıs</th>
								<th className="py-3 px-6">Haziran</th>

								<th className="py-3 px-6" />
							</tr>
						</thead>
						<tbody>
							{(visited ?? [])
								.filter(
									(post) =>
										category == post.visitUser.name &&
										post.workplace.name
											.toLowerCase()
											.includes(search.toLowerCase()) /*||
											post.student_surname
												.toLowerCase()
												.includes(
													search.toLowerCase(),
												)*/,
								)
								.map((v, idx) => (
									<tr
										className="border-b border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-900"
										key={idx}
									>
										<td className="py-4 px-6">
											{v.workplace.name}
										</td>
										<td className="py-4 px-6">
											{v.workplace.region}
										</td>
										<td className="py-4 px-6">
											{v.workplace.workerName}
										</td>
										<td className="py-4 px-6">
											<Link
												href={`tel:${v.workplace.workerPhone}`}
												className="text-blue-500"
											>
												{v.workplace.workerPhone}
											</Link>
										</td>

										<td className="py-4 px-6">
											{(v.month1 && (
												<FiCheck className="mx-auto h-6 w-6 text-green-500" />
											)) || (
												<FiX className="mx-auto h-6 w-6 text-red-500" />
											)}
										</td>
										<td className="py-4 px-6">
											{(v.month2 && (
												<FiCheck className="mx-auto h-6 w-6 text-green-500" />
											)) || (
												<FiX className="mx-auto h-6 w-6 text-red-500" />
											)}
										</td>
										<td className="py-4 px-6">
											{(v.month3 && (
												<FiCheck className="mx-auto h-6 w-6 text-green-500" />
											)) || (
												<FiX className="mx-auto h-6 w-6 text-red-500" />
											)}
										</td>
										<td className="py-4 px-6">
											{(v.month4 && (
												<FiCheck className="mx-auto h-6 w-6 text-green-500" />
											)) || (
												<FiX className="mx-auto h-6 w-6 text-red-500" />
											)}
										</td>
										<td className="py-4 px-6">
											{(v.month5 && (
												<FiCheck className="mx-auto h-6 w-6 text-green-500" />
											)) || (
												<FiX className="mx-auto h-6 w-6 text-red-500" />
											)}
										</td>
										<td className="py-4 px-6">
											{(v.month6 && (
												<FiCheck className="mx-auto h-6 w-6 text-green-500" />
											)) || (
												<FiX className="mx-auto h-6 w-6 text-red-500" />
											)}
										</td>
										<td className="py-4 px-6">
											{(v.month7 && (
												<FiCheck className="mx-auto h-6 w-6 text-green-500" />
											)) || (
												<FiX className="mx-auto h-6 w-6 text-red-500" />
											)}
										</td>
										<td className="py-4 px-6">
											{(v.month8 && (
												<FiCheck className="mx-auto h-6 w-6 text-green-500" />
											)) || (
												<FiX className="mx-auto h-6 w-6 text-red-500" />
											)}
										</td>
										<td className="py-4 px-6">
											{(v.month9 && (
												<FiCheck className="mx-auto h-6 w-6 text-green-500" />
											)) || (
												<FiX className="mx-auto h-6 w-6 text-red-500" />
											)}
										</td>
										<td className="py-4 px-6">
											<Link
												href={`/ziyaret/${v.id}`}
												className="text-orange-500"
											>
												Düzenle
											</Link>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</section>
		</Layout>
	);
};

export default VisitIndexPage;

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

	const { data, error } = await supabase
		.from("visited")
		.select("*")
		.order("created_at", {
			ascending: false,
		});

	if (error) {
		context.res.writeHead(302, {
			location: "/",
		});
		context.res.end();
	}

	for (const d of data) {
		const { data: workData } = await supabase
			.from("workplace")
			.select("name, id, region, workerPhone, workerName")
			.eq("id", d.workplace)
			.single();
		d.workplace = workData;
		const { data: userData } = await supabase
			.from("users")
			.select("name, surname, id")
			.eq("id", d.visitUser)
			.single();
		d.visitUser = userData;
	}

	const { data: users } = await supabase
		.from("users")
		.select("name, surname, id")
		.eq("permissions", 1)
		.order("created_at", {
			ascending: false,
		});

	return {
		props: {
			session,
			visited: data,
			users,
		},
	};
}
