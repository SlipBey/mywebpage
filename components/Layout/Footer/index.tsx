import { Link } from "@components/Globals/Link";
import { CONFIG } from "@libs/config";
import type { FC } from "react";

export const Footer: FC = () => {
	return (
		<>
			<footer className="my-6 mx-6 rounded-lg bg-gray-100 p-4 shadow dark:bg-gray-900 md:flex md:items-center md:justify-between md:p-6 xl:p-8">
				<ul className="mb-6 flex flex-wrap items-center md:mb-0">
					{CONFIG.PAGES.FOOTER.map((page, idx) => (
						<li key={idx}>
							<Link
								underline
								href={page.href}
								className="mr-4 text-sm font-normal text-gray-600 dark:text-gray-400 md:mr-6"
							>
								{page.title}
							</Link>
						</li>
					))}
				</ul>
				<p className="text-center text-sm text-gray-600 dark:text-gray-400">
					&copy; {new Date().getFullYear()} Tüm Haklar Saklıdır. Bu
					proje{" "}
					<Link
						href="https://slip.slipyme.com"
						className="text-blue-500"
					>
						Berkant Günaydın
					</Link>{" "}
					ve{" "}
					<Link
						href="https://github.com/uinteger32"
						className="text-orange-500"
					>
						Melih Kılıç
					</Link>{" "}
					tarafından{" "}
					<Link
						href="https://www.topkapisurokullari.com/"
						className="text-green-500"
					>
						Topkapı Sur
					</Link>{" "}
					okulları için yapılmıştır. Sürüm: <b>(Beta-0.0.1)</b>
				</p>
			</footer>
		</>
	);
};
