import { LazyMotion, domAnimation } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";
import { CONFIG } from "@libs/config";
import NextProgress from "nextjs-progressbar";
import Script from "next/script";
import Head from "next/head";
import Favicon from "@assets/icon.svg";

import "@styles/tailwind.css";
import "@styles/index.scss";
import "tippy.js/dist/tippy.css";
import "react-toastify/dist/ReactToastify.css";

const App = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<title>{CONFIG.SEO.title}</title>
				<link rel="manifest" href="/manifest.json" />
				<link rel="icon" href={Favicon.src} />
				<link rel="canonical" href={CONFIG.SEO.publishDomain} />
				<meta charSet="utf-8" />
				<meta name="HandheldFriendly" content="true" />
				<meta
					name="copyright"
					content="Berkant GÜNAYDIN, berkant@slipyme.com"
				/>
				<meta name="theme-color" content={CONFIG.SEO.themeColor} />
				<meta
					name="author"
					content="Berkant GÜNAYDIN, berkant@slipyme.com"
				/>
				<meta name="keywords" content={CONFIG.SEO.keywords.join(",")} />
				<meta name="description" content={CONFIG.SEO.description} />
				<meta property="og:title" content={CONFIG.SEO.title} />
				<meta
					property="og:description"
					content={CONFIG.SEO.description}
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content={CONFIG.SEO.publishDomain} />
				<meta property="og:site_name" content={CONFIG.SEO.title} />
				<meta property="og:image" content={Favicon.src} />
				<meta property="og:locale" content="en_GB" />
				<meta property="og:locale:alternate" content="tr_TR" />
				<meta property="og:locale:alternate" content="en_US" />
				<meta
					property="twitter:url"
					content={CONFIG.SEO.publishDomain}
				/>
				<meta property="twitter:title" content={CONFIG.SEO.title} />
				<meta
					property="twitter:description"
					content={CONFIG.SEO.description}
				/>
				<meta property="twitter:image" content={Favicon} />

				<meta property="twitter:card" content={Favicon} />
			</Head>
			<LazyMotion features={domAnimation}>
				<SessionProvider session={pageProps.session}>
					<ThemeProvider defaultTheme="light" attribute="class">
						<Script
							strategy="afterInteractive"
							data-domain={CONFIG.SEO.domain}
							src="https://plausible.io/js/plausible.js"
						/>
						<Script src="https://cdn.polyfill.io/v3/polyfill.min.js" />
						<NextProgress color={CONFIG.SEO.themeColor} />
						<DefaultSeo titleTemplate={CONFIG.SEO.layoutTitle} />
						<Component {...pageProps} />
						<ToastContainer position="bottom-right" theme="light" />
					</ThemeProvider>
				</SessionProvider>
			</LazyMotion>
		</>
	);
};

export default App;
