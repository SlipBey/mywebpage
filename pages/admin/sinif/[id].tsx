import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout/admin";
import { useSessionStore } from "@store/SessionStore";
import { options } from "../../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { supabase } from "@libs/supabase";
import { toast } from "react-toastify";
import { perman } from "@libs/permissions";

export interface IStudentAddPage {
	session?: Session;
	classes?;
}

const StudentAddPage: NextPage<IStudentAddPage> = ({ session, classes }) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const router = useRouter();

	const [name, setName] = useState(classes.name);
	const [date, setDate] = useState(classes.date);
	const [area, setArea] = useState(classes.area);

	const onDay = (e) => {
		if (e.target.value == "true") {
			setDate(true);
		} else {
			setDate(false);
		}
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!name || !date || !area)
			return toast.error("Lütfen boş bir alan bırakmayın.");

		if (
			perman.hasNone(session.user.permissions, [
				"okul_idaresi",
				"alan_sefleri",
			])
		) {
			toast.error(
				"Sınıf düzenlemek için yeterli yetkiye sahip değilsiniz.",
			);
			return;
		}

		const { error } = await supabase
			.from("class")
			.update({
				name,
				date,
				area,
			})
			.eq("id", classes.id)
			.single();

		if (error) {
			console.log(error);
			throw error;
		}

		toast.success("Başarıyla Sınıf Düzenlendi.");
		router.push("/admin/sinif");
	};

	//console.log(students)

	return (
		<Layout title="Sınıf Ekle">
			<section className="mx-auto my-8 px-10 lg:px-48">
				<form
					className="flex flex-col items-center justify-center gap-4 rounded-sm bg-gray-300 px-10 py-8 shadow dark:bg-gray-700"
					onSubmit={onSubmit}
				>
					<h1 className="text-2xl font-semibold text-black dark:text-white">
						Sınıf Bilgileri
					</h1>
					<input
						type="text"
						placeholder="Sınıfın Adı"
						className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
						onChange={(e) => setName(e.target.value)}
						defaultValue={classes.name}
					/>
					<input
						type="text"
						placeholder="Sınıfın Bölümü"
						className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
						onChange={(e) => setArea(e.target.value)}
						defaultValue={classes.area}
					/>
					<select
						className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
						placeholder="Gün"
						onChange={(e) => onDay(e.target.value)}
						defaultValue={classes.date}
					>
						<option value={"true"}>Pazartesi-Salı-Çarşamba</option>
						<option value={"false"}>Çarşamba-Perşembe-Cuma</option>
					</select>
					<button
						className="m-2 inline-flex cursor-pointer items-center whitespace-nowrap rounded-lg bg-green-600 px-3 py-2 text-center text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200"
						aria-label="Submit"
					>
						Sınıfı Düzenle
					</button>
				</form>
			</section>
		</Layout>
	);
};

export default StudentAddPage;

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
		.from("class")
		.select(`id, name, area, date`)
		.eq("id", id)
		.single();

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
