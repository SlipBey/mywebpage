import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import { options } from "../api/auth/[...nextauth]";
import { useState, FormEvent } from "react";
import { supabase } from "@libs/supabase";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export interface IVisitDetailPage {
	session?: Session;
	visit?;
	workplace?;
}

const VisitDetailPage: NextPage<IVisitDetailPage> = ({
	session,
	visit,
	workplace,
}) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const router = useRouter();

	const [month1, setMonth1] = useState(visit.month1);
	const [month2, setMonth2] = useState(visit.month2);
	const [month3, setMonth3] = useState(visit.month3);
	const [month4, setMonth4] = useState(visit.month4);
	const [month5, setMonth5] = useState(visit.month5);
	const [month6, setMonth6] = useState(visit.month6);
	const [month7, setMonth7] = useState(visit.month7);
	const [month8, setMonth8] = useState(visit.month8);
	const [month9, setMonth9] = useState(visit.month9);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			!month1 &&
			!month2 &&
			!month3 &&
			!month4 &&
			!month5 &&
			!month6 &&
			!month7 &&
			!month8 &&
			!month9
		)
			return toast.error("Lütfen boş bir alan bırakmayın.");

		const { error } = await supabase
			.from("visited")
			.update({
				month1,
				month2,
				month3,
				month4,
				month5,
				month6,
				month7,
				month8,
				month9,
			})
			.eq("id", visit.id)
			.single();

		if (error) {
			console.log(error);
			throw error;
		}

		toast.success("Ziyaretler Düzenlendi.");
		router.push("/ziyaret");
	};

	return (
		<Layout title={`${workplace.name} Ziyaret Bilgisi`}>
			<section className="mx-auto my-8 px-10 lg:px-48">
				<div className="bg-gray-300 px-10 py-8 dark:bg-gray-700">
					<form
						className="mx-auto flex flex-col items-center justify-center gap-4"
						onSubmit={onSubmit}
					>
						<h1 className="text-2xl font-semibold text-black dark:text-white">
							{workplace.name} Firmasının Ziyaret Bilgileri
						</h1>
						<div className="flex flex-col justify-center gap-12 md:flex-row">
							<div className="flex flex-col gap-4">
								<div className="w-full overflow-x-auto rounded-lg">
									<table className="min-w-max overflow-hidden text-center text-sm text-gray-400">
										<thead className="bg-gray-100 text-xs uppercase text-gray-400 dark:bg-gray-900">
											<tr>
												<th className="py-3 px-6">
													Eylül
												</th>
												<th className="py-3 px-6">
													Ekim
												</th>
												<th className="py-3 px-6">
													Kasım
												</th>
												<th className="py-3 px-6">
													Aralık
												</th>
												<th className="py-3 px-6">
													Ocak
												</th>
												<th className="py-3 px-6">
													Mart
												</th>
												<th className="py-3 px-6">
													Nisan
												</th>
												<th className="py-3 px-6">
													Mayıs
												</th>
												<th className="py-3 px-6">
													Haziran
												</th>
											</tr>
										</thead>
										<tbody>
											<tr className="mx-auto border-b border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-800">
												<td className="py-2">
													<input
														type="checkbox"
														className="h-6 w-6"
														onChange={() =>
															setMonth1(
																!visit.month1,
															)
														}
														defaultChecked={
															visit.month1
														}
													/>
												</td>
												<td className="py-2">
													<input
														type="checkbox"
														className="h-6 w-6"
														onChange={() =>
															setMonth2(
																!visit.month2,
															)
														}
														defaultChecked={
															visit.month2
														}
													/>
												</td>
												<td className="py-2">
													<input
														type="checkbox"
														className="h-6 w-6"
														onChange={() =>
															setMonth3(
																!visit.month3,
															)
														}
														defaultChecked={
															visit.month3
														}
													/>
												</td>
												<td className="py-2">
													<input
														type="checkbox"
														className="h-6 w-6"
														onChange={() =>
															setMonth4(
																!visit.month4,
															)
														}
														defaultChecked={
															visit.month4
														}
													/>
												</td>
												<td className="py-2">
													<input
														type="checkbox"
														className="h-6 w-6"
														onChange={() =>
															setMonth5(
																!visit.month5,
															)
														}
														defaultChecked={
															visit.month5
														}
													/>
												</td>
												<td className="py-2">
													<input
														type="checkbox"
														className="h-6 w-6"
														onChange={() =>
															setMonth6(
																!visit.month6,
															)
														}
														defaultChecked={
															visit.month6
														}
													/>
												</td>
												<td className="py-2">
													<input
														type="checkbox"
														className="h-6 w-6"
														onChange={() =>
															setMonth7(
																!visit.month7,
															)
														}
														defaultChecked={
															visit.month7
														}
													/>
												</td>
												<td className="py-2">
													<input
														type="checkbox"
														className="h-6 w-6"
														onChange={() =>
															setMonth8(
																!visit.month8,
															)
														}
														defaultChecked={
															visit.month8
														}
													/>
												</td>
												<td className="py-2">
													<input
														type="checkbox"
														className="h-6 w-6"
														onChange={() =>
															setMonth9(
																!visit.month9,
															)
														}
														defaultChecked={
															visit.month9
														}
													/>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
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

export default VisitDetailPage;

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

	const { data, error } = await supabase
		.from("visited")
		.select(
			"month1, month2, month3, month3, month4, month5, month6, month7, month8, month9, workplace, id",
		)
		.eq("id", id)
		.single();

	if (error) {
		context.res.writeHead(302, {
			location: "/",
		});
		context.res.end();
	}

	const { data: workData } = await supabase
		.from("workplace")
		.select("name, id, region, workerPhone, workerName")
		.eq("id", data.workplace)
		.single();

	return {
		props: {
			session,
			visit: data,
			workplace: workData,
		},
	};
}
