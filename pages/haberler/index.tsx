import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { supabase } from "@libs/supabase";
import { Button } from "@components/Globals/Button";
import { Link } from "@components/Globals/Link";
import { CustomImage } from "@components/Globals/CustomImage";

export interface IIndexPage {
	session?: Session;
	news?;
}

const NewsPage: NextPage<IIndexPage> = ({ session, news }) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	return (
		<Layout title="Haberler">
			<div className="my-6 mx-6 mt-5 px-10 lg:px-48">
				<div className="mb-4 flex flex-col items-center justify-center text-center">
					<section
						id="haberler"
						className="mx-auto w-full rounded-lg bg-gray-300 px-6 py-4 dark:bg-gray-700"
					>
						<h5 className="text-center text-lg font-bold uppercase text-black dark:text-white">
							Haberler
						</h5>
						<div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
							{news.map((n, idx) => (
								<div
									className="group flex w-full flex-col items-center justify-center rounded-lg bg-gray-200 px-4 py-6 dark:bg-gray-800"
									key={idx}
								>
									<div>
										<CustomImage
											src={`https://dqupymeqnjgwzfgkrzwf.supabase.co/storage/v1/object/public/news/image/${n.image}`}
											alt=""
											className="w-96 rounded-lg duration-200 group-hover:scale-105"
										/>
									</div>
									<div className="mt-5">
										<h5 className="text-2xl font-semibold text-black dark:text-white">
											{n.title}
										</h5>
										<p className="font-lg text-center text-lg text-gray-800 dark:text-gray-200">
											{n.desc.slice(0, 80)}
										</p>
									</div>
									<div className="mt-3">
										<Button type="success">
											<Link href={`/haberler/${n.id}`}>
												Haberin Devamı
											</Link>
										</Button>
									</div>
								</div>
							))}
						</div>
					</section>
				</div>
			</div>
		</Layout>
	);
};

export default NewsPage;

export async function getServerSideProps(context) {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		options,
	);

	const { data, error } = await supabase
		.from("news")
		.select(`id, user, title, desc, created_at, image`)
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
			news: data,
		},
	};
}
