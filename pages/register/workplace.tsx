import type { GetServerSidePropsContext, NextPage } from "next";
import { type Session, unstable_getServerSession } from "next-auth";
import { Layout } from "@components/Layout";
import { useSessionStore } from "@store/SessionStore";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { supabase } from "@libs/supabase";
import { toast } from "react-toastify";
import { options } from "../api/auth/[...nextauth]";
import icon from "@assets/icon.svg";
import Image from "next/image";
import { Modal } from "@components/Globals/Modal";

export interface IRegister {
	session?: Session;
	users?;
}

const Register: NextPage<IRegister> = ({ session, users }) => {
	const setSession = useSessionStore((state) => state.setSession);
	setSession(session);

	const router = useRouter();

	const [disabledTrue, setDisabled] = useState(false);

	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [email, setMail] = useState("");
	const [phone, setPhone] = useState("");
	const [workname, setWorkName] = useState("");
	const [workerPhone, setWorkerPhone] = useState("");
	const [workerMail, setWorkerMail] = useState("");
	const [region, setRegion] = useState("");
	const [password, setPassword] = useState("");
	const [passwordReq, setPasswordReq] = useState("");

	const onRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setRegion(e.target.value);
	};

	const onStudent = async (e: FormEvent<HTMLFormElement>) => {
		setDisabled(!disabledTrue);

		e.preventDefault();
		if (
			!name ||
			!password ||
			!email ||
			!phone ||
			!workname ||
			!workerPhone ||
			!workerMail ||
			!region
		)
			return toast.error("Lütfen boş bir alan bırakmayın.");
		if (password != passwordReq)
			return toast.error("Şifreleriniz uyuşmuyor.");

		const { error } = await supabase.from("recordWorkplace").insert([
			{
				name,
				surname,
				email,
				phone,
				password,
				workname,
				workerPhone,
				workerMail,
				region,
			},
		]);

		await supabase.from("notifications").insert(
			users.map((u) => ({
				user: u.id,
				text: `${workname} İsimli firma kayıt olmuş.`,
				title: "Firma Kaydı",
				href: "/admin/kayitlar",
			})),
		);

		if (error) {
			console.log(error);
			throw error;
		}

		toast.success(
			"Kaydınız başarıyla alınmıştır, yönetici onaylayınca sizinle iletişime geçilecektir.",
		);
		router.push("/");
	};

	const [open, setOpen] = useState(false);

	const maddeler = [
		"E-Mail adresinizi girerken doğruluğuna lütfen dikkat ediniz. Kimlik doğrulaması yaparken, giriş yaparken ve firmalara iş başvurusu yaparken kullanılmaktadır.",
		"Eğer girişle alakalı herhangi bir sorun yaşıyorsanız lütfen danışman hocanıza veya okul idaresine bu durumu bildiriniz.",
		"Kayıt yaptıktan hemen sonra giriş yapamazsınız, idarenin sizi onaylamasını bekleyin. Onaylandığınızda size mail veya sms yoluyla haber verilecektir.",
	];

	return (
		<>
			<Layout title="Firma Kaydı">
				<section className="mx-auto my-8 w-full px-10 lg:px-36">
					<div className="flex h-full w-full flex-row justify-between gap-2 bg-gray-300 p-2 dark:bg-gray-700">
						<div className="justify-left flex flex-col gap-4 px-5 py-3 lg:w-96">
							<div className="flex items-center text-xl font-semibold text-black dark:text-white">
								<Image
									src={icon}
									width="50"
									height="50"
									alt=""
								/>
								Topkapı Sur Okulları
							</div>
							<div className="text-md font-semibold text-gray-800 dark:text-gray-200">
								<ul className="space-y-4 text-left">
									{maddeler.map((madde, idx) => (
										<li
											className="flex space-x-1"
											key={idx}
										>
											<svg
												className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fill-rule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clip-rule="evenodd"
												></path>
											</svg>
											<span>{madde}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
						<form
							className="flex flex-col items-center justify-center gap-4 rounded-lg bg-gray-200 px-10 py-8 shadow dark:bg-gray-800"
							onSubmit={onStudent}
						>
							<div className="text-center text-xl font-semibold text-black dark:text-white">
								Firma Kayıt
							</div>
							<div className="grid grid-cols-1 justify-items-center gap-4 lg:grid-cols-2">
								<input
									type="text"
									placeholder="Firma Yetkilisi Ad"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setName(e.target.value)}
									required
								/>
								<input
									type="text"
									placeholder="Firma Yetkilisi Soyad"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setSurname(e.target.value)}
									required
								/>
								<input
									type="email"
									placeholder="Firma Yetkilisi E-Mail"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setMail(e.target.value)}
									required
								/>
								<input
									type="tel"
									placeholder="Firma Yetkilisi Telefon"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) => setPhone(e.target.value)}
									required
								/>
								<input
									type="text"
									placeholder="Firmanın Adı"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) =>
										setWorkName(e.target.value)
									}
									required
								/>
								<input
									type="text"
									placeholder="Firmanın Telefonu"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) =>
										setWorkerPhone(e.target.value)
									}
									required
								/>
								<input
									type="text"
									placeholder="Firmanın Maili"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) =>
										setWorkerMail(e.target.value)
									}
									required
								/>
								<select
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200"
									placeholder="Bölge"
									onChange={onRegionChange}
									disabled={disabledTrue}
									required
								>
									<option selected value="">
										Bölge
									</option>
									<option value={"Çerkezköy"}>
										Çerkezköy
									</option>
									<option value={"Çorlu"}>Çorlu</option>
									<option value={"Ergene"}>Ergene</option>
									<option value={"Hayrabolu"}>
										Hayrabolu
									</option>
									<option value={"Kapaklı"}>Kapaklı</option>
									<option value={"Malkara"}>Malkara</option>
									<option value={"Marmaraereğlisi"}>
										Marmaraeğrelisi
									</option>
									<option value={"Muratlı"}>Muratlı</option>
									<option value={"Saray"}>Saray</option>
									<option value={"Şarköy"}>Şarköy</option>
									<option value={"Süleymanpaşa"}>
										Süleymanpaşa
									</option>
								</select>
								<input
									type="password"
									placeholder="Şifre"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
								/>
								<input
									type="password"
									placeholder="Şifre Tekrar"
									className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-900 dark:text-gray-200"
									onChange={(e) =>
										setPasswordReq(e.target.value)
									}
									required
								/>
							</div>
							<div className="mt-5 flex flex-col items-center justify-center">
								<div className="mb-5 inline-flex">
									<input
										type="checkbox"
										className="mr-2 h-6 w-6"
										id="kvkk"
										required
									/>{" "}
									<label htmlFor="kvkk">
										<span
											className="text-orange-500 hover:cursor-pointer dark:text-orange-600"
											onClick={() => setOpen(!open)}
										>
											Bilgilendirici Metini
										</span>{" "}
										Okudum Ve Kabul Ediyorum.
									</label>
								</div>

								<button
									className="w-64 cursor-pointer items-center whitespace-nowrap rounded-lg bg-green-600 py-2 text-white hover:bg-green-700"
									aria-label="Submit"
									disabled={disabledTrue}
								>
									Kayıt Ol
								</button>
							</div>
						</form>
					</div>
				</section>
			</Layout>
			<Modal
				title="AYDINLATMA METNİ"
				text="
				1. KİŞİSEL VERİLERİN İŞLENME AMAÇLARI
	
	<br/><br/>
	
	Kullanıcılarımızın kişisel verilerinin kullanılması konusunda çeşitli kanunlarda düzenlemeler bulunmaktadır. 6563 Sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun da kişisel verilerin korunmasına ilişkin hüküm içermektedir. 5237 Sayılı Türk Ceza Kanunu hükümleri yoluyla da kişisel verilerin korunması için bazı hallerde cezai yaptırımlar öngörülmüştür. Diğer yandan, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği’nden doğan yükümlülüklerimizin ifası amacıyla verilerin toplanması ve kullanılması gerekmektedir.
	
	<br/><br/>
	
	2. KİŞİSEL VERİLERİN TOPLANMA YÖNTEMLERİ İLE HUKUKİ SEBEPLERİ
	
	<br/><br/>
	
	Kişisel Veriler, CraftRise tarafından, müşterilerine ürün ve/veya hizmet sunması ve/veya herhangi bir nedenle CraftRise ile sözleşmeli ya da sözleşmesiz ticari ilişki kurulması ve ifası kapsamında olmak üzere bilumum araç ve kanallar aracılığıyla sözlü, yazılı veya elektronik ortamda ve yukarıda yer verilen amaçlar doğrultusunda ve bu kapsamda CraftRise'ın sözleşmeler ve kanunlardan doğan mesuliyetlerini eksiksiz ve doğru bir şekilde yerine getirebilmesi hukuki sebeplerine dayanılarak toplanmaktadır. Bu hukuki sebeplerle toplanan Kişisel Veriler, CraftRise tarafından Kanun tarafından öngörülen temel ilkelere uygun olarak, Kanun’un 5. ve 6. maddelerinde belirtilen Kişisel Veri işleme şartları ve amaçları kapsamında işbu metinde belirtilen amaçlarla da işlenebilmekte ve aktarılabilmektedir.
	
	<br/><br/>
	
	3. KİŞİSEL VERİLERİN KİMLERE VE HANGİ AMAÇLA AKTARILABİLECEĞİ
	
	<br/><br/>
	
	Toplanan kişisel verileriniz, hissedarlarımıza, iş ortaklarımıza, tedarikçilerimize, kanunen yetkili kamu kurumları ve özel kişilere, 6698 Sayılı KVK Kanunu’nun 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir.
	
	<br/><br/>
	
	4. KİŞİSEL VERİ SAHİBİNİN HAKLARI
	
	<br/><br/>
	
	6698 sayılı Kanunun 11.maddesi kapsamında verileri işlenen gerçek kişi olarak tarafımıza başvuru yaparak aşağıda sıralanan haklarınızı kullanabilirsiniz.
	
	<br/><br/>
	
	Kişisel verilerinizin işlenip işlenmediğini öğrenme,<br/>
	Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,<br/>
	Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,<br/>
	Kişisel verilerinizin kullanımına ilişkin bize daha önce verdiğiniz herhangi bir izni geri alma,<br/>
	Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme,<br/>
	Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,<br/>
	Amaç, süre ve meşruiyet prensipleri dahilinde değerlendirilmek üzere silinmesini veya yok edilmesini isteme,<br/>
	Kişisel verilerinizin düzeltilmesi, silinmesi ya da yok edilmesi halinde bu işlemlerin kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme,<br/>
	İşlenen verilerinizin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi durumunda aleyhinize bir sonucun ortaya çıkması halinde bu sonuca itiraz etme,<br/>
	Kişisel verilerin kanuna aykırı olarak işlenmesi ve bu sebeple zarara uğramanız hâlinde zararın giderilmesini talep etme,<br/>
	<br/><br/>
	Yukarıda belirtilmiş olan ve fakat bunlarla sınırlı olmayacak şekilde Kişisel verileriniz ile ilgili başvuru ve taleplerinizi, Kanun’un uygulanmasıyla ilgili taleplerinizi Kişisel Verilerin Korunması Kanunu Veri Sahibi Başvuru Formu ’nu kullanarak ilgili tesise şahsen yada Noter Kanalı ile yazılı olarak veya kayıtlı elektronik posta (KEP) adresi, güvenli elektronik imza, mobil imza ya da tarafımıza daha önce bildirdiğiniz ve sistemimizde kayıtlı bulunan elektronik posta adresini kullanmak suretiyle info@craftrise.com.tr üzerinden iletebilirsiniz. Şirketimiz başvuruda yer alan taleplerinizi, talebin niteliğine göre en kısa sürede ve her halükarda en geç otuz gün içinde ücretsiz olarak sonuçlandırır. Ancak söz konusu işlemin ayrıca bir maliyeti gerektirmesi halinde, Kurulca belirlenen tarifedeki ücret alınabilir.
	"
				type="primary"
				open={open}
				setOpen={setOpen}
				icon
				centered
			/>
		</>
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

	const { data: users } = await supabase
		.from("users")
		.select("id")
		.or("permissions.eq.1, permissions.eq.2");

	return {
		props: {
			session,
			users,
		},
	};
}
