import type { GetServerSidePropsContext, NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]";
import { Layout } from "@components/Layout/admin";
import { useSessionStore } from "@store/SessionStore";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "@components/Globals/Link";
import { perman } from "@libs/permissions";
import { supabase } from "@libs/supabase";

export interface IIndexPage {
	session?: Session;
	app?;
	work?;
	intership?;
	student?;
	workplace?;
}

const IndexPage: NextPage<IIndexPage> = ({
	session,
	app,
	work,
	intership,
	student,
	workplace,
}) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	return (
		<Layout title="Yönetim Paneli">
			<div className="my-6 mx-6 mt-5 rounded-lg bg-gray-100 p-4 shadow dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center gap-2 text-center">
					<section className="mx-auto w-full rounded-lg bg-gray-200 px-6 py-4 dark:bg-gray-800">
						<h5 className="text-center text-lg font-bold uppercase text-black dark:text-white">
							İstatistikler
						</h5>
						<div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">
							<div className="group flex w-full flex-col items-center justify-center rounded-lg px-4 py-6 duration-200">
								<span>Toplam Başvuru</span>
								<span>{app.length}</span>
							</div>
							<div className="group flex w-full flex-col items-center justify-center rounded-lg px-4 py-6 duration-200">
								<span>Toplam İş İlanı</span>
								<span>{work.length}</span>
							</div>
							<div className="group flex w-full flex-col items-center justify-center rounded-lg px-4 py-6 duration-200">
								<span>Toplam Staj İlanı</span>
								<span>{intership.length}</span>
							</div>
							<div className="group flex w-full flex-col items-center justify-center rounded-lg px-4 py-6 duration-200">
								<span>Toplam Kayıtlı Öğrenci</span>
								<span>{student.length}</span>
							</div>
							<div className="group flex w-full flex-col items-center justify-center rounded-lg px-4 py-6 duration-200">
								<span>Toplam Kayıtlı Firma</span>
								<span>{workplace.length}</span>
							</div>
						</div>
					</section>
					<section className="mx-auto w-full rounded-lg bg-gray-200 px-6 py-4 dark:bg-gray-800">
						<h5 className="text-center text-lg font-bold uppercase text-black dark:text-white">
							Sayfalar
						</h5>
						<div className="mt-5 flex w-full flex-wrap items-center justify-center gap-5">
							<Link
								href="/admin/haber/paylas"
								className="group flex w-full flex-col items-center justify-center rounded-lg bg-gray-300 px-4 py-6 duration-200 hover:bg-gray-400 dark:bg-gray-700  dark:hover:bg-gray-600"
							>
								Haber paylaş
							</Link>
							<Link
								href="/admin/haber"
								className="group flex w-full flex-col items-center justify-center rounded-lg bg-gray-300 px-4 py-6 duration-200 hover:bg-gray-400 dark:bg-gray-700  dark:hover:bg-gray-600"
							>
								Haberler
							</Link>
							<Link
								href="/admin/slider"
								className="group flex w-full flex-col items-center justify-center rounded-lg bg-gray-300 px-4 py-6 duration-200 hover:bg-gray-400 dark:bg-gray-700  dark:hover:bg-gray-600"
							>
								Slayt&apos;ı Güncelle
							</Link>
							<Link
								href="/admin/ogrenci"
								className="group flex w-full flex-col items-center justify-center rounded-lg bg-gray-300 px-4 py-6 duration-200 hover:bg-gray-400 dark:bg-gray-700  dark:hover:bg-gray-600"
							>
								Öğrenciler
							</Link>
							<Link
								href="/admin/firmalar"
								className="group flex w-full flex-col items-center justify-center rounded-lg bg-gray-300 px-4 py-6 duration-200 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
							>
								Firmalar
							</Link>
						</div>
					</section>
				</div>
			</div>
		</Layout>
	);
};

export default IndexPage;

export async function getServerSideProps({
	req,
	res,
}: GetServerSidePropsContext) {
	const session = await unstable_getServerSession(req, res, options);

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

	const { data: app } = await supabase
		.from("applications")
		.select("id")
		.order("created_at", {
			ascending: false,
		});

	const { data: work } = await supabase
		.from("workplaceAdvert")
		.select("id")
		.order("created_at", {
			ascending: false,
		});

	const { data: intership } = await supabase
		.from("intership")
		.select("id")
		.order("created_at", {
			ascending: false,
		});

	const { data: student } = await supabase
		.from("students")
		.select("id")
		.order("created_at", {
			ascending: false,
		});

	const { data: workplace } = await supabase
		.from("workplace")
		.select("id")
		.order("created_at", {
			ascending: false,
		});

	return {
		props: {
			session,
			app,
			work,
			intership,
			student,
			workplace,
		},
	};
}
