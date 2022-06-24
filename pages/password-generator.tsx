import type { NextPage } from "next";
import { useState } from "react";
import copy from "copy-to-clipboard";
import { Layout } from "@components/Layout";
import { toast } from "react-toastify";
import { PasswordGenerator } from "@components/PasswordGenerator";
import { IoMdCopy } from "react-icons/io";
import { Link } from "@components/Utils/Link";

import { FaHome } from "react-icons/fa";

const AccountsPage: NextPage = () => {
	const [passLength, setPassLength] = useState<number | string>(18);
	const [includeUppercase, setIncludeUppercase] = useState(true);
	const [includeNumber, setIncludeNumber] = useState(true);
	const [includeSymbol, setIncludeSymbol] = useState(true);
	const [password, setPassword] = useState(() => generatePassword());

	function generatePassword(
		characterAmount = passLength,
		includeUpper = includeUppercase,
		includeNumbers = includeNumber,
		includeSymbols = includeSymbol,
	) {
		const UPPERCASE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const LOWERCASE_CHAR = "abcdefghijklmnopqrstuvwxyz";
		const NUMBER_CHAR = "1234567890";
		const SYMBOL_CHAR = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

		let combinedCharacters = LOWERCASE_CHAR;

		if (includeUpper) combinedCharacters += UPPERCASE_CHAR;
		if (includeNumbers) combinedCharacters += NUMBER_CHAR;
		if (includeSymbols) combinedCharacters += SYMBOL_CHAR;

		let password = "";
		for (let i = 0; i < characterAmount; i++) {
			password += combinedCharacters.charAt(
				Math.floor(Math.random() * combinedCharacters.length),
			);
		}

		return password;
	}

	function handleCopy(password: string) {
		copy(password);
		toast.success("Şifre başarıyla kopyalandı.");
	}

	return (
		<Layout title="Şifre Oluşturucu">
			<section className="py-5 px-4 bg-gray-900 text-white text-center">
				<div className="container relative my-2 px-3 selection:bg-gray-100 selection:text-gray-800 sm:px-0 grid justify-items-center">
					<Link
						href="/"
						className="mb-5 bg-gray-800 p-3 rounded-full hover:text-gray-200"
					>
						<FaHome className="w-5 h-5" />
					</Link>

					<div className="mb-8 max-w-md rounded-lg py-10 px-5 text-center shadow-lg transition-all bg-gray-800 sm:px-10">
						<label htmlFor="password">
							<h1 className="mb-5 text-2xl font-bold transition-all text-white sm:text-3xl">
								Şifre Oluşturucu
							</h1>
						</label>

						<div className="mb-5 flex h-10 items-center transition-all sm:h-14">
							<input
								type="text"
								value={password}
								className="h-full w-full rounded-l-lg border p-3 border-gray-500 bg-gray-900 text-gray-100"
								id="password"
								disabled
							/>
							<button
								className="group flex h-full items-center rounded-r-lg bg-gray-900 "
								onClick={() => handleCopy(password)}
								data-tip="Copy"
								aria-label="Copy"
							>
								<IoMdCopy className="w-12 h-8 transition-all group-hover:scale-105 group-active:scale-95 text-gray-300" />
							</button>
						</div>

						<PasswordGenerator password={password} />

						<div className="grid grid-cols-2 gap-2 text-gray-100">
							<label
								htmlFor="password-length"
								className="text-left text-lg font-semibold"
							>
								Harf Sayısı
							</label>
							<div className="flex items-center justify-start">
								<input
									type="range"
									id="password-length"
									className="mr-2 h-2 w-4/6 appearance-none rounded bg-gray-900"
									min={1}
									max={50}
									value={passLength}
									onChange={(event) =>
										setPassLength(
											parseInt(event.target.value),
										)
									}
								/>
								<input
									type="number"
									min={1}
									max={50}
									value={passLength}
									onChange={(event) =>
										setPassLength(
											event.target.value === ""
												? ""
												: parseInt(event.target.value),
										)
									}
									className="w-2/6 rounded border border-gray-900 bg-gray-900"
									aria-labelledby="password-length"
								/>
							</div>

							<label
								htmlFor="include-uppercase"
								className="text-left text-lg font-semibold"
							>
								Büyük Harf
							</label>
							<div className="flex justify-start">
								<input
									type="checkbox"
									id="include-uppercase"
									className="h-5 w-5"
									defaultChecked={includeUppercase}
									onChange={() =>
										setIncludeUppercase(
											(prevIncludeUppercase) =>
												!prevIncludeUppercase,
										)
									}
								/>
							</div>

							<label
								htmlFor="include-number"
								className="text-left text-lg font-semibold"
							>
								Sayı
							</label>
							<div className="flex justify-start">
								<input
									type="checkbox"
									id="include-number"
									className="h-5 w-5"
									defaultChecked={includeNumber}
									onChange={() =>
										setIncludeNumber(
											(prevIncludeNumber) =>
												!prevIncludeNumber,
										)
									}
								/>
							</div>

							<label
								htmlFor="include-symbol"
								className="text-left text-lg font-semibold"
							>
								Karakter
							</label>
							<div className="flex justify-start">
								<input
									type="checkbox"
									id="include-symbol"
									className="h-5 w-5"
									defaultChecked={includeSymbol}
									onChange={() =>
										setIncludeSymbol(
											(prevIncludeSymbol) =>
												!prevIncludeSymbol,
										)
									}
								/>
							</div>
						</div>
						<button
							className="mt-3 w-full rounded bg-gradient-to-r from-blue-500 to-blue-600 p-3 font-bold shadow transition-all hover:scale-105 active:scale-100 bg-blue-900 text-blue-100 shadow-none"
							onClick={() =>
								setPassword(
									generatePassword(
										passLength,
										includeUppercase,
										includeNumber,
										includeSymbol,
									),
								)
							}
						>
							Oluştur
						</button>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default AccountsPage;
