import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import { options } from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { supabase } from "@libs/supabase";
import { toast } from "react-toastify";
import { perman } from "@libs/permissions";

export interface IStudentAddPage {
	session?: Session;
	works?;
	classes?;
	students?;
}

const StudentAddPage: NextPage<IStudentAddPage> = ({
	session,
	works,
	classes,
}) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const router = useRouter();

	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [sClass, setClass] = useState(null);
	const [schoolNo, setSchoolNo] = useState("");
	const [phoneNo, setPhoneNo] = useState("");
	const [workplace, setWorkplace] = useState("");
	const [email, setEmail] = useState("");

	const onClassChange = async (e: ChangeEvent<HTMLSelectElement>) => {
		const { data: classData, error } = await supabase
			.from("class")
			.select("id, date")
			.eq("id", e.target.value)
			.single();

		if (!error) {
			setClass(classData);
		}
	};
	const onWorkChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setWorkplace(e.target.value);
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			!name ||
			!surname ||
			!sClass ||
			!schoolNo ||
			!phoneNo ||
			!workplace ||
			!email
		)
			return toast.error("Lütfen boş bir alan bırakmayın.");

		if (
			perman.hasNone(session.user.permissions, [
				"okul_idaresi",
				"alan_sefleri",
			])
		) {
			toast.error(
				"Öğrenci eklemek için yeterli yetkiye sahip değilsiniz.",
			);
			return;
		}

		/*if(students.student_name == name && students.student_surname == surname && students.school_no == schoolNo) {
				toast.error("Aynı isim, soyisim ve okul numarasında öğrenci zaten kayıtlı.");
				return;
			}*/

		const { error } = await supabase.from("students").insert([
			{
				student_name: name,
				student_surname: surname,
				class: sClass.id,
				school_no: schoolNo,
				phone_no: phoneNo,
				workplace,
				email,
				adding: session.user.id,
			},
		]);

		if (error) {
			console.log(error);
			throw error;
		}

		toast.success("Başarıyla Öğrenci Eklendi.");
		router.push("/ogrenci");
	};

	//console.log(students)

	return (
		<Layout title="Öğrenci Ekle">
			<section className="mx-auto my-8 px-10 lg:px-48">
				<form
					className="flex flex-col items-center justify-center gap-4 rounded-sm bg-gray-300 px-10 py-8 shadow dark:bg-gray-700"
					onSubmit={onSubmit}
				>
					<h1 className="text-2xl font-semibold text-black dark:text-white">
						Öğrenci Bilgileri
					</h1>
					<input
						type="text"
						placeholder="Öğrenci Adı"
						className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Öğrenci Soyadı"
						className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
						onChange={(e) => setSurname(e.target.value)}
					/>
					<select
						className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
						placeholder="Sınıf"
						onChange={onClassChange}
					>
						<option>Öğrencinin Sınıfı</option>
						{classes.map((c, idx) => (
							<option key={idx} value={c.id}>
								{c.name}
							</option>
						))}
					</select>
					{sClass && (
						<div className="w-64 overflow-x-auto rounded-lg">
							<div className="font-sm bg-gray-100 text-sm text-gray-400 dark:bg-gray-900">
								<h5 className="py-3 px-6 text-center">
									Staj Gün Listesi
								</h5>
								<div className="border-b border-gray-700 bg-gray-200 dark:bg-gray-800">
									<div className="py-2 px-6 text-center">
										{(sClass.date &&
											"Pazartesi-Salı-Çarşamba") ||
											"Çarşamba-Perşembe-Cuma"}
									</div>
								</div>
							</div>
						</div>
					)}
					<input
						type="number"
						placeholder="Okul Numarası"
						className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
						onChange={(e) => setSchoolNo(e.target.value)}
					/>
					<input
						type="tel"
						placeholder="Telefon Numarası"
						maxLength={10}
						minLength={10}
						pattern="\d*"
						className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
						onChange={(e) => setPhoneNo(e.target.value)}
					/>
					<input
						type="email"
						placeholder="E-Mail Adresi"
						className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<select
						className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
						placeholder="Staj"
						onChange={onWorkChange}
					>
						<option selected value="">
							Staj Yeri
						</option>
						{(works ?? []).map((work, idx) => (
							<option key={idx} value={work.id}>
								{work.name}
							</option>
						))}
					</select>
					<button
						className="m-2 inline-flex cursor-pointer items-center whitespace-nowrap rounded-lg bg-green-600 px-3 py-2 text-center text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200"
						aria-label="Submit"
					>
						Öğrenciyi Ekle
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

	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	const { data } = await supabase
		.from("workplace")
		.select(`name, id`)
		.order("created_at", {
			ascending: false,
		});

	const { data: classes } = await supabase
		.from("class")
		.select("id, name, date")
		.order("created_at", {
			ascending: false,
		});

	const { data: students } = await supabase
		.from("students")
		.select(`student_name, student_surname, school_no`)
		.single();

	return {
		props: {
			session,
			works: data,
			classes,
			students,
		},
	};
}
