import type { GetServerSidePropsContext, NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import { options } from "../api/auth/[...nextauth]";
import { Link } from "@components/Globals/Link";

export interface IRegister {
	session?: Session;
}

const Register: NextPage<IRegister> = ({ session }) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const ogrenci = [
		"Kayıt olduktan sonra, hemen giriş yapamazsınız. Kaydınız onaylanması için idare amirlerine iletilir ve onlar onaylarlar.",
		"Giriş yapmak için mail ve şifre kullanılır, bu yüzden dolayı gireceğiniz mail ve şifreleriniz önemlidir.",
		"İstenilen bilgiler gerçek kişi olup olmadığınızı kontrol etmek amacıyla sadece idareciler tarafından görüntülenir.",
		"Verilen bilgiler sahteyse kaydınız silinir.",
		"Sistem geliştirilme aşamasında olduğu için şuanlık sadece Topkapı Sur öğrencilerinin kaydı alınmaktadır.",
	];

	const workplace = [
		"Kayıt olduktan sonra, hemen giriş yapamazsınız. Kaydınız onaylanması için idare amirlerine iletilir ve onlar onaylarlar.",
		"Giriş yapmak için mail ve şifre kullanılır, bu yüzden dolayı gireceğiniz mail ve şifreleriniz önemlidir.",
		"Girdiğiniz bilgilerin doğru olup olmadığıyı teyit etmek amacıyla sizinle iletişime geçilir.",
		"Verilen bilgiler sahteyse kaydınız silinir.",
	];

	return (
		<Layout title="Kayıt Ol">
			<section className="mx-auto my-8 px-10 lg:px-48">
				<div className="flex h-full w-full flex-col space-x-5 lg:flex-row">
					<div className="max-h-screen w-full rounded-xl bg-gray-300 p-5 duration-300 hover:-translate-y-5 dark:bg-gray-700">
						<Link href="/register/student">
							<div className="text-center text-2xl font-bold uppercase text-black dark:text-white">
								Öğrenci Kaydı
							</div>
							<div className="px-5 text-lg font-semibold text-gray-800 dark:text-gray-200">
								<ul className="list-disc">
									{ogrenci.map((o, idx) => (
										<li key={idx}>{o}</li>
									))}
								</ul>
							</div>
						</Link>
					</div>

					<div className="max-h-screen w-full rounded-xl bg-gray-300 p-5 duration-300 hover:-translate-y-5 dark:bg-gray-700">
						<Link href="/register/workplace">
							<div className="text-center text-2xl font-bold uppercase text-black dark:text-white">
								Firma Kaydı
							</div>
							<div className="px-5 text-lg font-semibold text-gray-800 dark:text-gray-200">
								<ul className="list-disc">
									{workplace.map((o, idx) => (
										<li key={idx}>{o}</li>
									))}
								</ul>
							</div>
						</Link>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Register;

export async function getServerSideProps({
	req,
	res,
}: GetServerSidePropsContext) {
	const session = await unstable_getServerSession(req, res, options);

	if (session) {
		return {
			redirect: {
				destination: "/profil",
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
		},
	};
}
