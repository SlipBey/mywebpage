import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import { options } from "../api/auth/[...nextauth]";
import { supabase } from "@libs/supabase";
import { Link } from "@components/Globals/Link";
import { CustomImage } from "@components/Globals/CustomImage";
import icon from "@assets/icon.svg";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Image from "next/image";
import { FiX } from "react-icons/fi";

export interface IWorksIndexPage {
	session?: Session;
	notification?;
}

const WorksIndexPage: NextPage<IWorksIndexPage> = ({
	session,
	notification,
}) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const router = useRouter();

	const onDelete = async (e) => {
		const { error } = await supabase
			.from("notifications")
			.delete()
			.eq("id", e)
			.single();

		if (!error) {
			toast.success("Bildirim başarıyla kaldırıldı.");
			router.reload();
		}
	};

	return (
		<Layout title="Bildirimler">
			<section className="mx-auto my-8 px-10 lg:px-48">
				<div className="flex w-full flex-row">
					<div className="mt-8 flex w-full flex-col gap-2">
						{(notification ?? []).map((w, idx) => (
							<div
								className="rounded-lg border border-gray-400 bg-gray-300 py-4 px-6 duration-200 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-700"
								key={idx}
							>
								<Link
									className="flex flex-row justify-between"
									href={w.href}
								>
									<div className="flex flex-col items-center gap-2 lg:flex-row">
										<div>
											{(w.sender && (
												<CustomImage
													src={`https://dqupymeqnjgwzfgkrzwf.supabase.co/storage/v1/object/public/students/photos/${w.sender.avatarURL}`}
													alt=""
													className="w-24"
												/>
											)) || (
												<Image
													src={icon}
													alt=""
													width="100"
													height="100"
												/>
											)}
										</div>

										<div className="flex flex-col">
											<h5 className="text-xl font-bold text-black dark:text-white">
												<strong>{w.title}</strong>
											</h5>
											<h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
												<strong>{w.text}</strong>
											</h5>
											<h5 className="font-lg text-lg text-gray-700 dark:text-gray-300">
												{(w.sender && (
													<strong>
														{w.sender.name}{" "}
														{w.sender.surname}
													</strong>
												)) || (
													<strong>Sistem</strong>
												)}{" "}
												Tarafından{" "}
												<strong>
													{new Date(
														w.created_at,
													).toLocaleDateString(
														"tr-TR",
														{
															hour: "numeric",
															minute: "numeric",
															hour12: false,
														},
													)}
												</strong>{" "}
												Tarihinde.
											</h5>
										</div>
									</div>
									<div>
										<button
											className="rounded-full p-1 duration-200 hover:bg-gray-400/50 dark:hover:bg-gray-800/50"
											onClick={() => onDelete(w.id)}
										>
											<FiX className="h-5 w-5" />
										</button>
									</div>
								</Link>
							</div>
						))}
					</div>
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
		.from("notifications")
		.select(`id, user, text, sender, created_at, href, title`)
		.eq("user", session.user.id)
		.order("id", {
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
			.select("name, surname, avatarURL")
			.eq("id", d.sender)
			.single();
		d.sender = user;
	}

	return {
		props: {
			session,
			notification: data,
		},
	};
}
