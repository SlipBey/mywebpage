import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import { options } from "../api/auth/[...nextauth]";
import { Button } from "@components/Globals/Button";
import { supabase } from "@libs/supabase";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Modal } from "@components/Globals/Modal";
import { FiCheck, FiX } from "react-icons/fi";

export interface IWorksDayPage {
	session?: Session;
	classes?;
}

const WorksDayPage: NextPage<IWorksDayPage> = ({ session, classes }) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [id, setId] = useState("");

	const onOpen = (e) => {
		setOpen(!open);
		setId(e.target.id);
	};

	const onDay = async (e) => {
		if (e.target.id == 0) {
			const { error } = await supabase
				.from("class")
				.update({
					date: true,
				})
				.eq("id", id)
				.single();

			if (!error) {
				toast.success("Başarıyla Staj Günü Ayarlandı.");
				router.push("/staj/gun-ayarla");
				setOpen(!open);
			}
			return;
		} else {
			const { error } = await supabase
				.from("class")
				.update({
					date: false,
				})
				.eq("id", id)
				.single();

			if (!error) {
				toast.success("Başarıyla Staj Günü Ayarlandı.");
				router.push("/staj/gun-ayarla");
				setOpen(!open);
			}
			return;
		}
	};

	return (
		<>
			<Layout title="Staj Günü Belirleme">
				<section className="mx-auto my-8 px-10">
					<div className="mt-8 max-h-96 overflow-x-auto rounded-lg">
						<table className="relative w-full text-center text-sm text-gray-600 dark:text-gray-400">
							<thead className="sticky top-0 bg-gray-300 text-xs uppercase text-gray-600 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th className="py-3 px-6">
										Sınıf/Bölüm/Şube
									</th>
									<th className="py-3 px-6">
										Pazartesi/Salı/Çarşamba
									</th>
									<th className="py-3 px-6">
										Çarşamba/Perşembe/Cuma
									</th>
									<th className="py-3 px-6" />
								</tr>
							</thead>
							<tbody>
								{(classes ?? []).map((c) => (
									<tr
										className="border-b border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-900"
										key={c.id}
									>
										<td className="py-4 px-6">{c.name}</td>
										<td className="py-4 px-6">
											{(c.date && (
												<FiCheck className="mx-auto h-6 w-6 text-green-600" />
											)) || (
												<FiX className="mx-auto h-6 w-6 text-red-600" />
											)}
										</td>
										<td className="py-4 px-6">
											{(c.date && (
												<FiX className="mx-auto h-6 w-6 text-red-600" />
											)) || (
												<FiCheck className="mx-auto h-6 w-6 text-green-600" />
											)}
										</td>
										<td className="py-4 px-6">
											<Button
												type="primary"
												onClick={onOpen}
												id={c.id}
											>
												Seçim
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</section>
			</Layout>
			<Modal
				title="Gün Ayarlayınız"
				text=""
				type="primary"
				open={open}
				setOpen={setOpen}
				icon
				buttons={[
					{
						type: "error",
						title: "P S Ç",
						onClick: onDay,
						id: "0",
					},
					{
						type: "success",
						title: "Ç P C",
						onClick: onDay,
						id: "1",
					},
				]}
			/>
		</>
	);
};

export default WorksDayPage;
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
		.select(`id, name, date`)
		.order("created_at", {
			ascending: false,
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
