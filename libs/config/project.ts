import passwordGenerator from "@assets/projects/passwordGenerator.svg";
import memoryGame from "@assets/projects/memoryGame.svg";
import alert from "@assets/projects/sweetAlert.svg";
import arcadeGame from "@assets/projects/2048Game.svg";
import blog from "@assets/projects/blog.svg";
import xir from "@assets/projects/xir.svg";
import enderbot from "@assets/projects/enderbot.svg";
import marpel from "@assets/projects/marpel.svg";

export const PROJECTS = [
	{
		icon: blog,
		text: "Slipyme Blog",
		alt: "Güncel teknoloji haberleri, yazılımsal bilgiler, fizik ve psikoloji bilimi ile ilgili yazıların paylaşıldığı bir blog sistemi.",
		link: {
			url: "https://blog.slipyme.com",
		},
		tags: ["Website", "Blog"],
	},
	{
		icon: enderbot,
		text: "EnderBot",
		alt: "EnderRise Network için yapmış olduğum ancak herkese açık olarak sunduğum çok amaçlı discord botu.",
		link: {
			github: "https://github.com/SlipBey/enderbot-site",
			url: "https://enderbot.net",
		},
		tags: ["Website", "Discord-Bot"],
	},
	{
		icon: marpel,
		text: "Marpel Bot",
		alt: "Mapel isimli çok amaçlı Discord botunun eski webmasteriyim. Şuanda ise ufak tefek yardımlarda bulunuyorum.",
		link: {
			url: "https://marpel.net",
		},
		tags: ["Website", "Discord-Bot"],
	},
	{
		icon: xir,
		text: "XiR Developer",
		alt: "Zamanın efsanesi olan XiR'in baş yöneticisi ve geliştirici ekibindeyim.",
		link: {
			url: "https://xirdeveloper.blogspot.com",
		},
		tags: ["Blog", "Website", "Discord-Bot"],
	},
	{
		icon: passwordGenerator,
		text: "Password Generator",
		alt: "Rastgele şifreler oluşturabileceğiniz mükemmel bir kombinasyon uygulamasıdır.",
		link: {
			github: "https://github.com/SlipBey/mywebpage",
			url: "/password-generator",
		},
		tags: ["Website"],
	},
	{
		icon: memoryGame,
		text: "Memory Game",
		alt: "Oynaması zevk veren mobil uyumlu olan bir hafıza oyunudur.",
		link: {
			url: "https://hafiza-oyunu.vercel.app/",
		},
		tags: ["Website", "Game"],
	},
	{
		icon: alert,
		text: "SweetAlert Tanıtım",
		alt: "SweetAlert'in nasıl kullanıldığı ile ilgili açık kaynaklı bir docs sitesi.",
		link: {
			github: "https://github.com/SlipBey/alertbox",
			url: "https://alertbox.vercel.app/",
		},
		tags: ["Website", "Promotion", "Software"],
	},
	{
		icon: arcadeGame,
		text: "2048 Game",
		alt: "Çeşitlendirilmiş seçenekleri, kolay arayüzü ve mobil uyumu ile 2048 oyunu.",
		link: {
			url: "https://2048oyunu.vercel.app/",
		},
		tags: ["Website", "Game"],
	},
];
