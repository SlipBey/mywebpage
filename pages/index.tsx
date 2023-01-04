import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { supabase } from "@libs/supabase";
import { Button } from "@components/Globals/Button";
import { Link } from "@components/Globals/Link";
import { CustomImage } from "@components/Globals/CustomImage";

export interface IIndexPage {
	session?: Session;
	news?;
}

const IndexPage: NextPage<IIndexPage> = ({ session, news }) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	return (
		<Layout title="Anasayfa">
			<div className="my-6 mx-6 mt-5 rounded-lg bg-gray-100 p-4 shadow dark:bg-gray-100 dark:bg-gray-900">
				<div className="mb-4 flex flex-col items-center justify-center text-center">
					<div className="mx-auto max-w-screen-xl">
						<Carousel
							showArrows={true}
							showThumbs={false}
							autoPlay
							interval={5000}
							transitionTime={1000}
							infiniteLoop
						>
							<div>
								<CustomImage
									src="https://cdn.discordapp.com/attachments/1002110836296396890/1050471335740055552/WhatsApp20Image202022-06-3020at2016.png"
									alt=""
								/>
								<p className="legend">Haber 1</p>
							</div>
							<div>
								<CustomImage
									src="https://cdn.discordapp.com/attachments/1002110836296396890/1050471464224182333/meslekslide_1.png"
									alt=""
								/>
								<p className="legend">Haber 2</p>
							</div>
						</Carousel>
					</div>

					<section
						id="haberler"
						className="mx-auto mt-5 w-full rounded-lg bg-gray-200 px-6 py-4 dark:bg-gray-800"
					>
						<h5 className="text-center text-lg font-bold uppercase text-black dark:text-white">
							Haberler
						</h5>
						<div className="grid w-full grid-cols-1 justify-items-center gap-3 md:grid-cols-2 lg:grid-cols-3">
							{news.map((n, idx) => (
								<div
									className="group flex w-full flex-col items-center justify-center rounded-lg bg-gray-300 px-4 py-6 dark:bg-gray-700"
									key={idx}
								>
									<div>
										<CustomImage
											src={`https://dqupymeqnjgwzfgkrzwf.supabase.co/storage/v1/object/public/news/image/${n.image}`}
											alt=""
											className="rounded-lg duration-200 group-hover:scale-105"
										/>
									</div>
									<div className="mt-5">
										<h5 className="text-2xl font-semibold text-black dark:text-white">
											{n.title}
										</h5>
										<p className="font-lg text-center text-lg text-gray-800 dark:text-gray-200">
											{n.desc.slice(0, 50)}
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

					<section
						id="hakkimizda"
						className="mx-auto mt-5 w-full rounded-lg bg-gray-200 px-6 py-4 dark:bg-gray-800"
					>
						<h5 className="text-center text-lg font-bold uppercase text-black dark:text-white">
							Sistem Hakkında
						</h5>
						<p className="text-md font-md mt-5 text-left text-gray-800 dark:text-gray-200">
							Bu sistem okul idarecilerininin, fabrika
							yetkililerinin ve öğrencilerin bilgileri ile
							iletişim kurmasını kolaylaştıracak bir sistemdir.
							Amacı öğrencilerin takibini yapabilmek, öğrencilerin
							staj işlemlerini daha kolay bir şekilde
							halledebilmek, mezun olduktan sonra bile öğrencinin
							işi rahatça bulabilmesidir.
							<br />
							Firmalar isterlerse staj, isterlerse iş ilanı
							oluşturabilirler. Böylelikle öğrenciler kendilerine
							uygun ilanları seçip başvurabilir bu sayede öğrenci
							işsiz kalmamış olur, firmada elinde çalıştıracak bir
							eleman bulmuş olur.
							<br />
							Firmalar isterlerse öğrencilerle mesajlaşabilir bu
							sayede haberleşme olayını sağlamış olurlar.
							<br />
							Staja giden öğrenciler hangi gün, hangi firmaya
							gideceğini görebilirler.
							<br />
							Öğrenciler isterlerse kendilerine bir CV
							hazırlayabilir ve mezun olduktan sonra bir işe
							başvuru yapabilirler.
						</p>
					</section>

					<section
						id="referanslar"
						className="mx-auto mt-5 w-full rounded-lg bg-gray-200 px-6 py-4 dark:bg-gray-800"
					>
						<h5 className="mb-3 text-center text-lg font-bold uppercase text-black dark:text-white">
							Çözüm Ortaklarımız
						</h5>
						<div className="flex justify-center">
							<CustomImage
								src="https://cdn.discordapp.com/attachments/1002110836296396890/1050387812375068793/image.png"
								alt=""
							/>
						</div>
					</section>
				</div>
			</div>
		</Layout>
	);
};

export default IndexPage;

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

	for (const d of data) {
		const { data: user } = await supabase
			.from("users")
			.select("username")
			.eq("id", d.user)
			.single();
		d.user = user;
	}

	return {
		props: {
			session,
			news: data,
		},
	};
}
