import { BsFillDice3Fill } from "react-icons/bs";
import { FiBox } from "react-icons/fi";
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
];
