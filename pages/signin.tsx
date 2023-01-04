import { Alert } from "@components/Globals/Alert";
import { Layout } from "@components/Layout";
import { unstable_getServerSession } from "next-auth";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import { options } from "./api/auth/[...nextauth]";

export default function SignIn({ csrfToken }) {
	const { query } = useRouter();

	return (
		<Layout title="Giriş Yap">
			<section className="mx-auto my-8 px-10 lg:px-48">
				<form
					className="flex flex-col items-center justify-center gap-4 rounded-sm bg-gray-300 px-10 py-8 shadow dark:bg-gray-700"
					method="post"
					action="/api/auth/callback/credentials"
				>
					<input
						name="csrfToken"
						type="hidden"
						defaultValue={csrfToken}
					/>

					{query.error && (
						<>
							<Alert type="error">
								Giriş Yapılamadı. Lütfen Bilgilerinizi Kontrol
								Edin.
							</Alert>
						</>
					)}

					<h1 className="text-2xl font-semibold text-black dark:text-white">
						Giriş Bilgileri
					</h1>
					<input
						type="email"
						name="email"
						placeholder="E-Mail"
						className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
					/>
					<input
						type="password"
						name="password"
						placeholder="Şifre"
						className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
					/>
					<button
						className="m-2 inline-flex cursor-pointer items-center whitespace-nowrap rounded-lg bg-green-600 px-3 py-2 text-center text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200"
						type="submit"
					>
						Giriş Yap
					</button>
				</form>
			</section>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		options,
	);

	if (session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			csrfToken: await getCsrfToken(context),
		},
	};
}
