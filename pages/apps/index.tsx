import { Layout } from "@components/Layout";
import { CONFIG } from "@libs/config";

import { AppCard } from "@components/Apps/AppCard";
import { useLocaleParser } from "@libs/localeParser";
import { NextPage } from "next";

const AppsPage: NextPage = () => {
	const parser = useLocaleParser();

	return (
		<Layout title={parser.get("apps")}>
			<section className="p-5 mx-auto">
				<div className="bg-gray-300 dark:bg-gray-800 rounded-md m-h-96">
					<div className="text-center p-8">
						<div className="flex flex-col text-center justify-between relative space-y-5 mt-8">
							<h2 className="relative text-3xl w-full text-center font-bold">
								{parser.get("apps")}
							</h2>

							<div className="grid grid-cols-1 gap-12 md:gap-5 md:grid-cols-3 justify-items-center">
								{CONFIG.APPS.map((apps, index) => (
									<AppCard
										link={apps.href}
										name={apps.title}
										icon={apps.icon}
										text={apps.alt}
										color={apps.color}
										key={index}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default AppsPage;
