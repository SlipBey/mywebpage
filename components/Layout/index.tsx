import { type FC, type ReactNode } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/dist/client/router";
import { CONFIG } from "@libs/config";
import { Footer } from "@components/Layout/Footer";
import { Navbar } from "@components/Layout/Navbar";

export interface ILayout {
	title: string;
	children: ReactNode;
}

export const Layout: FC<ILayout> = ({ title, children }) => {
	const router = useRouter();

	return (
		<div className="select-none">
			<NextSeo
				title={title}
				canonical={`${CONFIG.SEO.publishDomain}${router.pathname}`}
			/>
			<Navbar />
			{children}
			<Footer />
		</div>
	);
};
