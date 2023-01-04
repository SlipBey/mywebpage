import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout/admin";
import { useSessionStore } from "@store/SessionStore";
import { options } from "../../api/auth/[...nextauth]";
import { supabase } from "@libs/supabase";
import { Link } from "@components/Globals/Link";
import { Button } from "@components/Globals/Button";
import { perman } from "@libs/permissions";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export interface IWorksIndexPage {
	session?: Session;
	news?;
}

const WorksIndexPage: NextPage<IWorksIndexPage> = ({ session, news }) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const [search, setSearch] = useState("");

	const router = useRouter();

	const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const onDelete = async (e) => {
		Swal.fire({
			title: "Emin Misin?",
			text: "Haberi silmek istediğine emin misin? Bunun geri dönüşü yok.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sil Gitsin",
			cancelButtonText: "Silme Boşver",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const { error } = await supabase
					.from("news")
					.delete()
					.eq("id", e)
					.single();

				if (!error) {
					toast.success("Haber başarıyla silindi.");
					router.reload();
				}
			}
		});
	};

	return (
		<Layout title="Haberler">
			<section className="mx-auto my-8 px-10 lg:px-48">
				<div className="flex w-full flex-row">
					<input
						onChange={onSearchChange}
						type="search"
						className="block w-full rounded-lg border border-gray-600 bg-gray-300 p-3 text-black outline-0 dark:bg-gray-700 dark:text-white"
						placeholder="Aramak istediğiniz haberi giriniz..."
						required
					/>

					{!perman.hasNone(session.user.permissions, [
						"okul_idaresi",
						"alan_sefleri",
					]) && (
						<div>
							<Button type="success">
								<Link href="/admin/haber/paylas">
									Haber Paylaş
								</Link>
							</Button>
						</div>
					)}
				</div>

				<div className="mt-8 grid grid-cols-1 gap-3 lg:grid-cols-2">
					{(news ?? [])
						.filter((post) =>
							post.title
								.toLowerCase()
								.includes(search.toLowerCase()),
						)
						.map((n, idx) => (
							<div
								className="w-full rounded-lg border border-gray-800 bg-gray-300 py-4 px-6 duration-200 hover:shadow-2xl dark:bg-gray-700"
								key={idx}
							>
								<div className="flex flex-col items-center justify-center space-x-3">
									<div>
										<Image
											src="https://cdn.discordapp.com/attachments/1002110836296396890/1050391663404666920/279322981_1370335140096825_4030928193421842178_n.png"
											alt=""
											width="100"
											height="100"
										/>
									</div>
									<div className="mt-5 flex flex-col text-center">
										<div className="text-xl font-semibold text-black dark:text-white">
											{n.title}
										</div>
										<div className="text-md text-gray-800 dark:text-gray-200">
											{n.desc.slice(0, 50)}
										</div>
									</div>
									<div className="mt-3 flex flex-col text-left">
										<div>
											Paylaşan: {n.user.name}{" "}
											{n.user.surname}
										</div>
										<div>
											{new Date(
												n.created_at,
											).toLocaleDateString("tr-TR", {
												hour: "numeric",
												minute: "numeric",
												hour12: false,
											})}
										</div>
									</div>

									<div className="mt-5 flex flex-wrap">
										<Button type="primary">
											<Link href={`/haberler/${n.id}`}>
												Habere Git
											</Link>
										</Button>
										<Button type="success">
											<Link href={`/admin/haber/${n.id}`}>
												Düzenle
											</Link>
										</Button>
										<Button
											type="error"
											onClick={() => onDelete(n.id)}
										>
											Sil
										</Button>
									</div>
								</div>
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

	const { data, error } = await supabase
		.from("news")
		.select(`id, user, title, desc, created_at`)
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
		const { data: user } = await supabase
			.from("users")
			.select("name, surname")
			.eq("id", d.user)
			.single();
		d.user = user;
	}

	return {
		props: {
			session,
			news: data,
		},
	};
}
