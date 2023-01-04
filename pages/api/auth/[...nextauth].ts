import { supabase } from "@libs/supabase";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "E-Mail",
					type: "email",
					placeholder: "Mail Adresiniz",
				},
				password: {
					label: "Parola",
					type: "password",
					placeholder: "Şifreniz",
				},
			},
			async authorize(credentials) {
				const { email, password } = credentials;

				const { data, error } = await supabase
					.from("users")
					.select("*")
					.eq("email", email)
					.eq("password", password);

				if (error) return null;

				if (data.length < 0) return null;

				return data[0];
			},
		}),
	],
	pages: {
		signIn: "/signin",
		newUser: "/profile",
	},
	secret: process.env.SECRET,
	callbacks: {
		jwt: async ({ token, account }) => {
			if (account) {
				token.id = account.providerAccountId;
			}
			return token;
		},
		session: async ({ session, token }) => {
			if (token.id) {
				session.user.id = token.id as string;
				session.user.permissions = 0;

				const user = await resolveUser(
					token.id as string,
					session.user.name,
					session.user.surname,
					session.user.image ??
						`https://avatars.dicebear.com/api/avataaars/${token.id}.svg`,
				);
				//session.user.email = user.mail;
				session.user.name = user.name;
				session.user.surname = user.surname;
				session.user.image = user.avatarURL;
				session.user.permissions = user.permissions;
				session.user.workplace = user.workplace;
				session.user.student = user.student;
			}
			return session;
		},
	},
};

async function resolveUser(
	id: string,
	name: string,
	surname: string,
	avatarURL: string,
) {
	let { data: user } = await supabase
		.from("users")
		.select("*")
		.eq("id", id)
		.single();

	if (!user?.id) {
		const { data } = await supabase
			.from("users")
			.insert({ id, name, surname, avatarURL, permission: 0 })
			.single();
		user = data;
	}

	const update: {
		[key: string]: unknown;
	} = {};
	if (user.name !== name) update.name = name;

	if (Object.keys(update).length)
		await supabase.from("users").update(update).eq("id", id);

	return user;
}

export default NextAuth(options);
