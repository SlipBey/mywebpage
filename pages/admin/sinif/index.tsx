import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout/admin";
import { useSessionStore } from "@store/SessionStore";
import { options } from "../../api/auth/[...nextauth]";
import { ChangeEvent, useState } from "react";
import { supabase } from "@libs/supabase";
import { Link } from "@components/Globals/Link";
import { Button } from "@components/Globals/Button";

export interface IWorksIndexPage {
	session?: Session;
	classes?;
}

const WorksIndexPage: NextPage<IWorksIndexPage> = ({ session, classes }) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const [search, setSearch] = useState("");

	const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	return (
		<Layout title="Sınıflar">
			<section className="mx-auto my-8 px-10 lg:px-48">
				<div className="flex w-full flex-row">
					<input
						onChange={onSearchChange}
						type="search"
						className="block w-full rounded-lg border border-gray-400 bg-gray-300 p-3 text-black outline-0 dark:border-gray-800 dark:bg-gray-700 dark:text-white"
						placeholder="Aramak istediğiniz sınıfı giriniz..."
						required
					/>

					<div>
						<Button type="success">
							<Link href="/admin/sinif/ekle">Sınıf Ekle</Link>
						</Button>
					</div>
				</div>

				<div className="mt-8 grid grid-cols-1 justify-items-center gap-3 md:grid-cols-2 lg:grid-cols-3">
					{(classes ?? [])
						.filter((post) =>
							post.name
								.toLowerCase()
								.includes(search.toLowerCase()),
						)
						.map((w, idx) => (
							<div
								className="rounded-lg border border-gray-400 bg-gray-300 py-4 px-6 duration-200 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-700"
								key={idx}
							>
								<Link
									href={`/admin/sinif/${w.id}`}
									className="flex flex-row justify-between space-x-3"
								>
									<div className="mt-2 flex flex-col">
										<div>{w.name}</div>
										<div className="flex flex-col">
											<div>{w.area}</div>
										</div>
										<div className="flex flex-col">
											{(w.date &&
												"Pazartesi-Salı-Çarşamba") ||
												"Çarşamba-Perşembe-Cuma"}
										</div>
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

	const { data, error } = await supabase
		.from("class")
		.select(`id, name, area, date`)
		.order("name", {
			ascending: true,
		});

	if (error) {
		context.res.writeHead(302, {
			location: "/",
		});
		context.res.end();
	}

	return {
		props: {
			session,
			classes: data,
		},
	};
}
