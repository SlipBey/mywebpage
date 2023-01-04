import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import { options } from "../api/auth/[...nextauth]";
import { ChangeEvent, useState, FormEvent } from "react";
import { supabase } from "@libs/supabase";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export interface IVisitAddPage {
	session?: Session;
	users?;
	workplace?;
}

const VisitAddPage: NextPage<IVisitAddPage> = ({
	session,
	users,
	workplace,
}) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const router = useRouter();

	const [workplaceId, setWorkplaceId] = useState("");
	const [userId, setUserId] = useState("");

	const onWorkChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setWorkplaceId(e.target.value);
	};
	const onUserChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setUserId(e.target.value);
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!workplaceId && !userId)
			return toast.error("Lütfen boş bir alan bırakmayın.");

		const { error } = await supabase.from("visited").insert([
			{
				workplace: workplaceId,
				visitUser: userId,
			},
		]);

		if (error) {
			console.log(error);
			throw error;
		}

		toast.success("Ziyaret Bilgisi Başarıyla Eklendi.");
		router.push("/ziyaret");
	};

	return (
		<Layout title={`Ziyaret Bilgisi Ekle`}>
			<section className="mx-auto my-8 px-10 lg:px-48">
				<div className="bg-gray-300 px-10 py-8 dark:bg-gray-700">
					<form
						className="mx-auto flex flex-col items-center justify-center gap-4"
						onSubmit={onSubmit}
					>
						<h1 className="text-2xl font-semibold text-black dark:text-white">
							Ziyaret Bilgileri
						</h1>
						<div className="flex flex-col justify-center gap-12 md:flex-row">
							<div className="flex flex-col gap-4">
								<select
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
									placeholder="İş"
									onChange={onWorkChange}
								>
									<option>Firmayı Seçiniz</option>
									{workplace.map((c, idx) => (
										<option key={idx} value={c.id}>
											{c.name}
										</option>
									))}
								</select>
								<select
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
									placeholder="Kullanıcı"
									onChange={onUserChange}
								>
									<option>Kişiyi Seçiniz</option>
									{users.map((c, idx) => (
										<option key={idx} value={c.id}>
											{c.name} {c.surname}
										</option>
									))}
								</select>
							</div>
						</div>
						<div>
							<button
								className="m-2 inline-flex cursor-pointer items-center whitespace-nowrap rounded-lg bg-green-600 px-3 py-2 text-center text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200"
								aria-label="Submit"
							>
								Kaydet
							</button>
						</div>
					</form>
				</div>
			</section>
		</Layout>
	);
};

export default VisitAddPage;

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

	const { data: users, error } = await supabase
		.from("users")
		.select("name, surname, id")
		.eq("permissions", 1)
		.order("id", {
			ascending: true,
		});

	const { data: workplace, error: err } = await supabase
		.from("workplace")
		.select("name, id")
		.order("created_at", {
			ascending: true,
		});

	if (error || err) {
		context.res.writeHead(302, {
			location: "/",
		});
		context.res.end();
	}

	return {
		props: {
			session,
			users,
			workplace,
		},
	};
}
