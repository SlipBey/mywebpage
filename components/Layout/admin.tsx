import type { FC, ReactNode } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { CONFIG } from "@libs/config";
import { Sidebar } from "./Sidebar/index";
import { Footer } from "./Footer";
import { Navbar } from "./Sidebar/navbar";

export interface ILayout {
	title: string;
	description?: string;
	children: ReactNode;
}

export const Layout: FC<ILayout> = ({ title, children }) => {
	const router = useRouter();

	return (
		<>
			<NextSeo
				title={title}
				canonical={`${CONFIG.SEO.publishDomain}${router.pathname}`}
			/>
			<Navbar />
			<div className="flex bg-gray-100 pt-16 dark:bg-gray-900">
				<Sidebar />
				<div className="relative h-full min-h-screen w-full bg-gray-200 dark:bg-gray-800">
					<div className="w-full p-7">{children}</div>
					<Footer />
				</div>
			</div>
		</>
	);
};
