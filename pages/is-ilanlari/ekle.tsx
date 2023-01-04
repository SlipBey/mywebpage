import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import { options } from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { FormEvent, useState, ChangeEvent } from "react";
import { supabase } from "@libs/supabase";
import { toast } from "react-toastify";
import { perman } from "@libs/permissions";

export interface IWorkPage {
	session?: Session;
	workplace?;
}

const WorkAddPage: NextPage<IWorkPage> = ({ session, workplace }) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const router = useRouter();

	const [department, setDepartment] = useState("");
	const [experience, setExperience] = useState("Tecrübesiz");
	const [education, setEducation] = useState("Lise Mezunu");
	const [work, setWork] = useState("Serbest Zamanlı");
	const [solider, setSolider] = useState("Yapıldı");
	const [language, setLanguage] = useState(null);
	const [task, setTask] = useState("");
	const [total, setTotal] = useState("");

	const onExperienceChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setExperience(e.target.value);
	};

	const onEducationChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setEducation(e.target.value);
	};

	const onWorkChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setWork(e.target.value);
	};

	const onSoliderChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSolider(e.target.value);
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!department || !experience || !education || !work || !task)
			return toast.error("Lütfen boş bir alan bırakmayın.");

		if (
			perman.hasNone(session.user.permissions, [
				"okul_idaresi",
				"alan_sefleri",
				"fabrika_yetkilisi",
			])
		) {
			toast.error("Firma eklemek için yeterli yetkiye sahip değilsiniz.");
			return;
		}

		const { error } = await supabase.from("workplaceAdvert").insert([
			{
				department,
				experience,
				education,
				work,
				solider,
				language,
				workplaceId: workplace.id,
				task,
				total,
			},
		]);

		if (error) {
			console.log(error);
			throw error;
		}

		toast.success("Başarıyla İş İlanı Eklendi.");
		router.push("/is-ilanlari");
	};

	return (
		<Layout title="İş İlanı Ekle">
			<section className="mx-auto my-8 px-10 lg:px-48">
				<div className="bg-gray-300 px-10 py-8 dark:bg-gray-700">
					<form
						className="mx-auto flex flex-col items-center justify-center gap-4"
						onSubmit={onSubmit}
					>
						<h1 className="text-2xl font-semibold text-black dark:text-white">
							İş İlanı Ekle
						</h1>
						<div className="flex flex-col justify-center gap-12 md:flex-row">
							<div className="items-cener flex flex-col gap-4">
								<input
									type="text"
									placeholder="Firma Adı"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									defaultValue={workplace?.name}
									disabled
								/>
								<input
									type="text"
									placeholder="Yetkili Adı"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									defaultValue={workplace?.workerName}
									disabled
								/>
								<input
									type="tel"
									maxLength={10}
									minLength={10}
									pattern="\d*"
									placeholder="Yetkili Numarası"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									defaultValue={workplace?.workerPhone}
									disabled
								/>
								<input
									type="email"
									placeholder="Yetkili Mail"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									defaultValue={workplace?.workerMail}
									disabled
								/>
								<input
									type="text"
									placeholder="Adres"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									defaultValue={workplace?.adress}
									disabled
								/>
								<input
									type="text"
									placeholder="Bölge"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									defaultValue={workplace?.region}
									disabled
								/>
							</div>

							<div className="items-cener flex flex-col gap-4">
								<input
									type="text"
									placeholder="Departman/Bölüm"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) =>
										setDepartment(e.target.value)
									}
								/>

								<input
									type="number"
									placeholder="İstenilen Kişi Sayısı"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setTotal(e.target.value)}
								/>

								<select
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									placeholder="Deneyim"
									onChange={onExperienceChange}
								>
									<option value={"Tecrübesiz"}>
										Tecrübesiz
									</option>
									<option value={"Tecrübeli"}>
										Tecrübeli
									</option>
									<option value={"Yetiştirmek Üzere"}>
										Yetiştirmek Üzere
									</option>
								</select>

								<select
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									placeholder="Eğitim"
									onChange={onEducationChange}
								>
									<option value={"Lise Mezunu"}>
										Lise Mezunu
									</option>
									<option value={"Üniversite"}>
										Üniversite
									</option>
									<option value={"Üniversite(Mezun)"}>
										Üniversite(Mezun)
									</option>
									<option value={"Yüksek Lisans"}>
										Yüksek Lisans
									</option>
								</select>

								<select
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									placeholder="Çalışma Şekli"
									onChange={onWorkChange}
								>
									<option value={"Serbest Zamanlı"}>
										Serbest Zamanlı
									</option>
									<option value={"Yarı Zamanlı"}>
										Yarı Zamanlı
									</option>
									<option value={"Tam Zamanlı"}>
										Tam Zamanlı
									</option>
								</select>

								<input
									type="text"
									placeholder="Yabancı Dil"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) =>
										setLanguage(e.target.value)
									}
								/>

								<select
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									placeholder="Askerlik"
									onChange={onSoliderChange}
								>
									<option value={"Yapıldı"}>
										Askerlik Durumu: Yapıldı
									</option>
									<option value={"Muaf"}>
										Askerlik Durumu: Muaf
									</option>
									<option value={"Tecilli"}>
										Askerlik Durumu: Tecilli
									</option>
								</select>
							</div>
						</div>

						<div className="w-full">
							<textarea
								placeholder="Firma Hakkında"
								className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
								rows={5}
								defaultValue={workplace.about}
								disabled
							/>
						</div>

						<div className="w-full">
							<textarea
								placeholder="Görev Tanımı"
								className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
								rows={5}
								onChange={(e) => setTask(e.target.value)}
							/>
						</div>

						<div>
							<button
								className="m-2 inline-flex cursor-pointer items-center whitespace-nowrap rounded-lg bg-green-600 px-3 py-2 text-center text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200"
								aria-label="Submit"
							>
								İlanı Ekle
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

	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	if (session.user.permissions != 8) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	const { data, error } = await supabase
		.from("workplace")
		.select("*")
		.eq("user", session.user.id)
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
			workplace: data,
		},
	};
}
