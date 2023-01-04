import type { NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import { options } from "../api/auth/[...nextauth]";

export interface IStudentDetailPage {
	session?: Session;
}

const StudentDetailPage: NextPage<IStudentDetailPage> = ({ session }) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	return (
		<Layout title={"Profil"}>
			<section className="mx-auto my-8 px-10 lg:px-48">
				<div className="bg-gray-300 px-10 py-8 dark:bg-gray-700"></div>
			</section>
		</Layout>
	);
};

export default StudentDetailPage;

export async function getServerSideProps(context) {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		options,
	);

	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	if (session.user.student) {
		return {
			redirect: {
				destination: "/profil/ogrenci",
				permanent: false,
			},
		};
	}
	if (session.user.workplace) {
		return {
			redirect: {
				destination: "/profil/firma",
				permanent: false,
			},
		};
	}

	/*const { data: record, error } = await supabase
		.from("record")
		.select("*")
		.order("created_at", {
			ascending: false,
		});

	if (error) {
		context.res.writeHead(302, {
			location: "/",
		});
		context.res.end();
	}*/

	return {
		props: {
			session,
		},
	};
}
