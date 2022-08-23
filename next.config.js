/* eslint-disable */
const { withPlugins } = require("next-compose-plugins");
const withImages = require("next-images");

module.exports = withPlugins([withImages], {
	images: {
		domains: ["i.scdn.co", "cdn.discordapp.com"],
	},
	reactStrictMode: true,
	poweredByHeader: false,
	trailingSlash: false,
	async redirects() {
		return [
			{
				source: "/github",
				destination: "https://github.com/SlipBey",
				permanent: true,
			},
			{
				source: "/instagram",
				destination: "https://www.instagram.com/SlipBey",
				permanent: true,
			},
			{
				source: "/youtube",
				destination: "https://www.youtube.com/AngelCraftNW",
				permanent: true,
			},
			{
				source: "/discord",
				destination: "https://discord.gg/vvTZtRCK3X",
				permanent: true,
			},
			{
				source: "/linkedin",
				destination: "https://www.linkedin.com/in/slipbey/",
				permanent: true,
			},
			{
				source: "/npm",
				destination: "https://www.npmjs.com/~mynameisslik",
				permanent: true,
			},
			{
				source: "/spotify",
				destination: "spotify:user/g8l0pnh50bxsyb932y052ma4h",
				permanent: true,
			},
		];
	},
});
