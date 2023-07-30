import { BsFillDice3Fill } from "react-icons/bs";
import { FaQrcode, FaWineBottle } from "react-icons/fa";
import { FiBox, FiKey } from "react-icons/fi";
import { GiPartyPopper } from "react-icons/gi";

export const APPS = [
	{
		href: "/giveaway",
		title: "Rastgele Çekiliş",
		icon: GiPartyPopper,
		alt: "İstediğiniz kadar kişinin ismini ekleyip içlerinden en şanslı olanı seçme şansını kaçırmayın.",
		color: "text-blue-600",
	},
	{
		href: "/dice",
		title: "Zar At",
		icon: BsFillDice3Fill,
		alt: "İstediğiniz kadar zar atabilir, tek mi çift mi olacağını seçebilirsiniz.",
		color: "text-green-600",
	},
	{
		href: "/tetris",
		title: "Tetris",
		icon: FiBox,
		alt: "Eğlenceli bir tetris oyunu.",
		color: "text-red-500",
	},
	{
		href: "/qrcode-generator",
		title: "QR Code Oluşturucu",
		icon: FaQrcode,
		alt: "Özelleştirilebilir seçenekleriyle qrcode oluşturucu.",
		color: "text-black",
	},
	{
		href: "/spin-bottle",
		title: "Şişe Çevirmece",
		icon: FaWineBottle,
		alt: "Arkadaşlarınızla eğlenmek için birebir şişe çevirmece.",
		color: "text-gray-600",
	},
	{
		href: "/password-generator",
		title: "Şifre Oluşturucu",
		icon: FiKey,
		alt: "Güvenli şifre oluşturucu.",
		color: "text-sky-600",
	},
];
