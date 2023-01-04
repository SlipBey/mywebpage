import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { supabase } from "@libs/supabase";
import { CustomImage } from "@components/Globals/CustomImage";

export interface IIndexPage {
	session?: Session;
	news?;
}

const NewsPage: NextPage<IIndexPage> = ({ session, news }) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	return (
		<Layout title={`${news.title} Haberi`}>
			<div className="my-6 mx-6 mt-5 px-10 lg:px-48">
				<div className="mb-4 flex flex-col items-center justify-center text-center">
					<section
						id="haberler"
						className="mx-auto w-full rounded-lg bg-gray-300 px-6 py-4 dark:bg-gray-700"
					>
						<div className="flex w-full flex-col items-center justify-center rounded-lg px-4 py-6">
							<div>
								<CustomImage
									src={`https://dqupymeqnjgwzfgkrzwf.supabase.co/storage/v1/object/public/news/image/${news.image}`}
									alt=""
									className="rounded-lg"
								/>
							</div>
							<div className="mt-5">
								<h5 className="text-2xl font-semibold text-black dark:text-white">
									{news.title}
								</h5>
								<p className="font-lg text-center text-lg text-gray-800 dark:text-gray-200">
									{news.desc}
								</p>
							</div>
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

	const id =
		typeof context.params["id"] == "string"
			? context.params["id"]
			: context.params["id"][0];

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
