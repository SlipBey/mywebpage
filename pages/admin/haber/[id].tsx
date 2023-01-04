import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import { options } from "../../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { FormEvent, useState, ChangeEvent } from "react";
import { supabase } from "@libs/supabase";
import { toast } from "react-toastify";
import { perman } from "@libs/permissions";
import { CustomImage } from "@components/Globals/CustomImage";
import { FiUpload } from "react-icons/fi";

export interface IWorkPage {
	session?: Session;
	news?;
}

const WorkAddPage: NextPage<IWorkPage> = ({ session, news }) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const router = useRouter();

	const [disabledTrue, setDisabled] = useState(false);

	const [title, setTitle] = useState(news.title);
	const [desc, setDesc] = useState(news.desc);
	const [avatar, setAvatar] = useState(news.image);

	async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
		try {
			if (!event.target.files || event.target.files.length == 0) {
				toast.info("Sadece PNG ve JPEG formatları desteklenmektedir.");
			}

			const file = event.target.files[0];
			const fileExt = file.name.split(".").pop();
			const fileName = `4${Math.random()}.${fileExt}`;
			const filePath = `${fileName}`;

			const { error: uploadError } = await supabase.storage
				.from("news")
				.upload("/image/" + filePath, file);

			if (uploadError) {
				throw uploadError;
			}

			setAvatar(filePath);
		} catch (error) {
			toast.error("Lütfen dosya seçiniz.");
		} finally {
			toast.success("Fotoğraf başarıyla eklendi.");
		}
	}

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		setDisabled(!disabledTrue);

		e.preventDefault();
		if (!title || !desc)
			return toast.error("Lütfen boş bir alan bırakmayın.");

		if (
			perman.hasNone(session.user.permissions, [
				"okul_idaresi",
				"alan_sefleri",
			])
		) {
			toast.error(
				"Haber düzenlemek için yeterli yetkiye sahip değilsiniz.",
			);
			return;
		}

		const { error } = await supabase.from("news").update({
			title,
			desc,
			image: avatar,
		});

		if (error) {
			console.log(error);
			throw error;
		}

		toast.success("Başarıyla Haber Düzenlendi.");
		router.push("/admin/haber");
	};

	return (
		<Layout title={`${news.title} Haberini Düzenleme`}>
			<section className="mx-auto my-8 px-10 lg:px-48">
				<div className="bg-gray-300 px-10 py-8 dark:bg-gray-700">
					<form
						className="mx-auto flex flex-col items-center justify-center gap-4"
						onSubmit={onSubmit}
					>
						<h1 className="text-2xl font-semibold text-black dark:text-white">
							Haberi Düzenle
						</h1>
						<div className="flex w-full flex-col items-center justify-center gap-4">
							<input
								type="text"
								placeholder="Haber Başlığı"
								className="w-72 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
								onChange={(e) => setTitle(e.target.value)}
								defaultValue={news.title}
							/>
							<textarea
								placeholder="Haberin Detayları"
								className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
								rows={5}
								onChange={(e) => setDesc(e.target.value)}
								defaultValue={news.desc}
							/>
							<div className="flex flex-col gap-2">
								<label
									htmlFor="avatar"
									className="group flex flex-col items-center justify-center hover:cursor-pointer"
								>
									<CustomImage
										src={`https://dqupymeqnjgwzfgkrzwf.supabase.co/storage/v1/object/public/news/image/${avatar}`}
										className="w-32 group-hover:blur-sm"
										alt=""
									/>
									<FiUpload className="absolute hidden h-12 w-12 rounded-full bg-gray-100 p-1 group-hover:block dark:bg-gray-900" />
								</label>
								<input
									className="hidden"
									type="file"
									accept="image/*"
									id="avatar"
									onChange={uploadAvatar}
								/>
							</div>
						</div>

						<div>
							<button
								className="m-2 inline-flex cursor-pointer items-center whitespace-nowrap rounded-lg bg-green-600 px-3 py-2 text-center text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200"
								aria-label="Submit"
								disabled={disabledTrue}
							>
								Haberi Düzenle
							</button>
						</div>
					</form>
				</div>
			</section>
		</Layout>
	);
};

export default WorkAddPage;

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
		.select(`id, user, title, desc, created_at, image`)
		.eq("id", id)
		.single();

	if (error) {
		context.res.writeHead(302, {
			location: "/",
		});
		context.res.end();
	}

	const { data: user } = await supabase
		.from("users")
		.select("username")
		.eq("id", data.user)
		.single();
	data.user = user;

	return {
		props: {
			session,
			news: data,
		},
	};
}
