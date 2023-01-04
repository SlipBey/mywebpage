import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import { options } from "../../api/auth/[...nextauth]";
import { Button } from "@components/Globals/Button";
import { supabase } from "@libs/supabase";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { perman } from "@libs/permissions";
import Swal from "sweetalert2";
import { CustomImage } from "@components/Globals/CustomImage";
import { Link } from "@components/Globals/Link";

export interface IMessagePage {
	session?: Session;
	workplace?;
	user?;
	messages?;
	workid?;
	mUsers?;
	mWorks?;
	id?;
	mClose?;
}

const MessagePage: NextPage<IMessagePage> = ({
	session,
	workplace,
	user,
	messages,
	workid,
	mUsers,
	mWorks,
	id,
	mClose,
}) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const router = useRouter();

	const [message, setMessage] = useState("");

	const onConfirm = async () => {
		if (session.user.student) {
			if (mClose) {
				return toast.error("Mesajlaşma kapatılmış.");
			}

			await supabase.from("messages").insert([
				{
					userId: session.user.id,
					workUserId: workplace.user,
					workplace: workplace.id,
					message,
					sender: session.user.id,
				},
			]);
		}
		if (session.user.workplace) {
			await supabase.from("messages").insert([
				{
					userId: user.id,
					workUserId: session.user.id,
					workplace: workplace.id,
					message,
					sender: session.user.id,
				},
			]);
		}

		if (session.user.workplace) {
			await supabase.from("notifications").insert([
				{
					user: user.id,
					text: `"${message}"`,
					sender: session.user.id,
					href: `/mesajlar/${user.id}/${workplace.id}`,
					title: `${workplace.name} Firmasından Mesaj Geldi`,
				},
			]);
		}
		if (session.user.student) {
			await supabase.from("notifications").insert([
				{
					user: workplace.user,
					text: `"${message}"`,
					sender: session.user.id,
					href: `/mesajlar/${user.id}/${workplace.id}`,
					title: `${user.name} ${user.surname} Öğrencisinden Mesaj Geldi`,
				},
			]);
		}
		router.reload();
	};

	const onClose = async () => {
		if (!mClose) {
			Swal.fire({
				title: "Emin Misin?",
				text: "Mesajlaşmayı sonlandırmak istediğinden emin misin?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Evet",
				cancelButtonText: "Hayır",
			}).then(async (result) => {
				if (result.isConfirmed) {
					const { error } = await supabase
						.from("messageClose")
						.insert([
							{
								userId: user.id,
								workId: workplace.id,
							},
						]);

					if (error) {
						console.log(error);
						throw error;
					}

					toast.success("Mesajlaşma başarıyla sonlandırıldı.");
					router.reload();
				}
			});
		} else {
			return toast.error("Mesajlaşma zaten sonlandırılmış.");
		}
	};

	const onOpen = async () => {
		if (mClose) {
			Swal.fire({
				title: "Emin Misin?",
				text: "Mesajlaşmayı sonlandırmak istediğinden emin misin?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Evet",
				cancelButtonText: "Hayır",
			}).then(async (result) => {
				if (result.isConfirmed) {
					const { error } = await supabase
						.from("messageClose")
						.delete()
						.eq("userId", user.id)
						.eq("workId", workplace.id)
						.single();

					if (error) {
						console.log(error);
						throw error;
					}

					toast.success("Mesajlaşma başarıyla açıldı.");
					router.reload();
				}
			});
		} else {
			return toast.error("Mesajlaşma zaten açık.");
		}
	};

	if (session.user.student && messages.length == 0) {
		router.push("/");
		return;
	}

	return (
		<Layout title={`Mesajlar`}>
			<section className="mx-auto my-8 px-10">
				<div className="flex w-full flex-col gap-2 lg:flex-row">
					<div className="flex flex-col lg:w-[690px]">
						<div className="rounded-lg bg-gray-300 px-6 py-2 dark:bg-gray-700">
							{session.user.workplace &&
								mUsers
									.filter(
										(m, idx, self) =>
											idx ===
											self.findIndex(
												(f) =>
													f.userId?.id ===
													m.userId?.id,
											),
									)
									.map((m, idx) => (
										<Link
											href={`/mesajlar/${m.userId?.id}/${m.workplace}`}
											key={idx}
										>
											<div
												className={classNames(
													"my-4 rounded-lg p-2 duration-200",
													{
														"bg-gray-200 bg-opacity-60 dark:bg-gray-800 dark:bg-opacity-60":
															m.userId.id == id,
														"bg-gray-200 hover:bg-opacity-70 dark:bg-gray-800 dark:hover:bg-opacity-70":
															m.userId.id != id,
													},
												)}
											>
												<CustomImage
													className="mr-2 inline-flex w-8"
													src={`https://dqupymeqnjgwzfgkrzwf.supabase.co/storage/v1/object/public/students/photos/${m.userId?.avatarURL}`}
													alt=""
												/>
												{m.userId?.name}{" "}
												{m.userId?.surname}
											</div>
										</Link>
									))}
							{session.user.student &&
								mWorks
									.filter(
										(m, idx, self) =>
											idx ===
											self.findIndex(
												(f) =>
													f.workUserId?.id ===
													m.workUserId?.id,
											),
									)
									.map((m, idx) => (
										<Link
											href={`/mesajlar/${m.userId}/${m.workUserId?.id}`}
											key={idx}
										>
											<div
												className={classNames(
													"my-4 rounded-lg p-2 duration-200",
													{
														"bg-gray-200 bg-opacity-60 dark:bg-gray-800 dark:bg-opacity-60":
															m.workUserId?.id ==
															workid,
														"bg-gray-200 hover:bg-opacity-70 dark:bg-gray-800 dark:hover:bg-opacity-70":
															m.workUserId.id !=
															workid,
													},
												)}
											>
												<CustomImage
													className="mr-2 inline-flex w-8"
													src={`https://dqupymeqnjgwzfgkrzwf.supabase.co/storage/v1/object/public/workplace/photos/${m.workUserId?.photos}`}
													alt=""
												/>
												{m.workUserId?.name}
											</div>
										</Link>
									))}
						</div>
					</div>

					<div className="flex w-full flex-col">
						<div className="w-full space-y-3 rounded-lg bg-gray-300 px-6 py-4 dark:bg-gray-700">
							{messages.map((m) => (
								<div
									className="rounded-xl bg-gray-200 p-4 dark:bg-gray-800"
									key={m.id}
								>
									{(m.sender?.id != session.user.id && (
										<div className="flex flex-row gap-2">
											<div>
												<CustomImage
													src={`https://dqupymeqnjgwzfgkrzwf.supabase.co/storage/v1/object/public/students/photos/${m.sender?.avatarURL}`}
													className="inline-flex w-12"
													alt=""
												/>
											</div>
											<div className="flex flex-col text-left">
												<div className="flex flex-row gap-2">
													<b>
														{m.sender?.name}{" "}
														{m.sender?.surname}
													</b>
													•
													<b>
														{new Date(
															m.created_at,
														).toLocaleDateString(
															"tr-TR",
															{
																hour: "numeric",
																minute: "numeric",
																hour12: false,
															},
														)}
													</b>
												</div>
												<div>
													<p>{m.message}</p>
												</div>
											</div>
										</div>
									)) || (
										<div className="flex flex-row justify-end gap-2">
											<div className="flex flex-col text-right">
												<div className="flex flex-row gap-2">
													<b>
														{new Date(
															m.created_at,
														).toLocaleDateString(
															"tr-TR",
															{
																hour: "numeric",
																minute: "numeric",
																hour12: false,
															},
														)}
													</b>
													•
													<b>
														{m.sender?.name}{" "}
														{m.sender?.surname}
													</b>
												</div>
												<div>
													<p>{m.message}</p>
												</div>
											</div>
											<div>
												<CustomImage
													src={`https://dqupymeqnjgwzfgkrzwf.supabase.co/storage/v1/object/public/students/photos/${m.sender?.avatarURL}`}
													className="inline-flex w-12"
													alt=""
												/>
											</div>
										</div>
									)}
								</div>
							))}
						</div>
						<div className="mt-5 flex">
							{!mClose && (
								<textarea
									placeholder="Mesajınız"
									className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									rows={3}
									onChange={(e) => setMessage(e.target.value)}
								/>
							)}
							<div>
								{!mClose && (
									<Button type="success" onClick={onConfirm}>
										Gönder
									</Button>
								)}
								{perman.has(
									session.user.permissions,
									"fabrika_yetkilisi",
								) &&
									!mClose &&
									messages.length > 0 && (
										<Button type="error" onClick={onClose}>
											Mesajlaşmayı Sonlandır
										</Button>
									)}
								{perman.has(
									session.user.permissions,
									"fabrika_yetkilisi",
								) &&
									mClose &&
									messages.length > 0 && (
										<Button type="success" onClick={onOpen}>
											Mesajlaşmayı Aç
										</Button>
									)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default MessagePage;

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
	const workid =
		typeof context.params["workid"] == "string"
			? context.params["workid"]
			: context.params["workid"][0];

	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	if (session.user.student && session.user.id != id) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	const { data: workplace, error } = await supabase
		.from("workplace")
		.select("name, workerName, id, user")
		.eq("id", workid)
		.single();

	const { data: user, error: err } = await supabase
		.from("users")
		.select("name, surname, id")
		.eq("id", id)
		.single();

	if (error) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	if (err) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	const { data: mClose } = await supabase
		.from("messageClose")
		.select("id")
		.eq("userId", id)
		.eq("workId", workid)
		.single();

	const { data: messages } = await supabase
		.from("messages")
		.select(
			"workplace, workUserId, userId, message, created_at, id, sender",
		)
		.eq("workplace", workid)
		.eq("userId", id)
		.eq("workUserId", workplace.user)
		.order("id", { ascending: true });

	for (const m of messages) {
		const { data: user } = await supabase
			.from("users")
			.select("name, surname, id, avatarURL")
			.eq("id", m.sender)
			.single();
		m.sender = user;
		const { data: workplace } = await supabase
			.from("workplace")
			.select("workerName, name, user")
			.eq("id", m.workplace)
			.single();
		m.workplace = workplace;
	}

	const { data: mUsers } = await supabase
		.from("messages")
		.select("userId, workplace")
		.eq("workplace", workid)
		.order("created_at", {
			ascending: false,
		});
	for (const mUser of mUsers) {
		const { data: user } = await supabase
			.from("users")
			.select("name, surname, id, avatarURL")
			.eq("id", mUser.userId)
			.single();
		mUser.userId = user;
	}

	const { data: mWorks } = await supabase
		.from("messages")
		.select("workUserId, userId")
		.eq("userId", id)
		.order("created_at", {
			ascending: false,
		});
	for (const mWork of mWorks) {
		const { data: workplace } = await supabase
			.from("workplace")
			.select("id, name, photos")
			.eq("user", mWork.workUserId)
			.single();
		mWork.workUserId = workplace;
	}

	return {
		props: {
			session,
			workplace,
			user,
			messages,
			workid,
			mUsers,
			mWorks,
			id,
			mClose,
		},
	};
}
