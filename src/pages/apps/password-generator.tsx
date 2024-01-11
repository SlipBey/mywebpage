import { NextPage } from "next";
import { useState } from "react";
import { useCopyToClipboard } from "react-use";
import { Layout } from "@/components/Layout";
import { toast } from "react-toastify";
import { PasswordGenerator } from "@/components/Apps/PasswordGenerator";
import { IoMdCopy } from "react-icons/io";

import { useLocaleParser } from "@/libs/localeParser";

const PasswordPage: NextPage = () => {
  const [, copyToClipboard] = useCopyToClipboard();
  const [passLength, setPassLength] = useState<number>(18);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [includeSymbol, setIncludeSymbol] = useState(true);
  const [password, setPassword] = useState<string>(() =>
    generatePassword(
      passLength,
      includeUppercase,
      includeNumber,
      includeSymbol,
    ),
  );

  function generatePassword(
    characterAmount: number,
    includeUpper: boolean,
    includeNumbers: boolean,
    includeSymbols: boolean,
  ) {
    const UPPERCASE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const LOWERCASE_CHAR = "abcdefghijklmnopqrstuvwxyz";
    const NUMBER_CHAR = "1234567890";
    const SYMBOL_CHAR = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

    let combinedCharacters = LOWERCASE_CHAR;

    if (includeUpper) combinedCharacters += UPPERCASE_CHAR;
    if (includeNumbers) combinedCharacters += NUMBER_CHAR;
    if (includeSymbols) combinedCharacters += SYMBOL_CHAR;

    let generatedPassword = "";
    for (let i = 0; i < characterAmount; i++) {
      generatedPassword += combinedCharacters.charAt(
        Math.floor(Math.random() * combinedCharacters.length),
      );
    }

    return generatedPassword;
  }

  function handleCopy(password: string) {
    copyToClipboard(password);
    toast.success("Şifre başarıyla kopyalandı.");
  }

  const parser = useLocaleParser();

  return (
    <Layout title={parser.get("password")}>
      <section className="text-center p-8">
        <div className="mx-auto mb-8 max-w-lg rounded-lg py-10 px-5 text-center bg-white dark:bg-gray-900 sm:px-10">
          <label htmlFor="password">
            <h1 className="mb-5 text-2xl font-bold transition-all sm:text-3xl">
              {parser.get("password")}
            </h1>
          </label>

          <div className="mb-5 flex h-10 items-center transition-all sm:h-14">
            <input
              type="text"
              value={password}
              className="h-full w-full rounded-l-lg border p-3 border-gray-300 dark:border-gray-800 bg-gray-200 dark:bg-gray-900 text-black dark:text-white"
              id="password"
              disabled
            />
            <button
              className="group flex h-full items-center rounded-r-lg border border-gray-300 dark:border-gray-800 bg-gray-200 dark:bg-gray-900"
              onClick={() => handleCopy(password)}
              data-tip="Copy"
              aria-label="Copy"
            >
              <IoMdCopy className="w-12 h-8 transition-all group-hover:scale-105 group-active:scale-95 text-gray-600 dark:text-white" />
            </button>
          </div>

          <PasswordGenerator password={password} />

          <div className="grid grid-cols-2 gap-2 text-gray-900 dark:text-gray-100">
            <label
              htmlFor="password-length"
              className="text-left text-lg font-semibold"
            >
              {parser.get("letters_number")}
            </label>
            <div className="flex items-center justify-start">
              <input
                type="range"
                id="password-length"
                className="mr-2 h-2 w-4/6 appearance-none rounded bg-gray-200 dark:bg-gray-800"
                min={1}
                max={50}
                value={passLength}
                onChange={(event) =>
                  setPassLength(parseInt(event.target.value))
                }
              />
              <input
                type="number"
                min={1}
                max={50}
                value={passLength}
                onChange={(event) => {
                  const value = parseInt(event.target.value);
                  setPassLength(isNaN(value) ? 1 : value);
                }}
                className="w-2/6 rounded border border-gray-300 bg-gray-200 dark:border-gray-900 dark:bg-gray-900"
                aria-labelledby="password-length"
              />
            </div>

            <label
              htmlFor="include-uppercase"
              className="text-left text-lg font-semibold"
            >
              {parser.get("uppercase_letter")}
            </label>
            <div className="flex justify-start">
              <input
                type="checkbox"
                id="include-uppercase"
                className="h-5 w-5"
                checked={includeUppercase}
                onChange={() =>
                  setIncludeUppercase(
                    (prevIncludeUppercase) => !prevIncludeUppercase,
                  )
                }
              />
            </div>

            <label
              htmlFor="include-number"
              className="text-left text-lg font-semibold"
            >
              {parser.get("number")}
            </label>
            <div className="flex justify-start">
              <input
                type="checkbox"
                id="include-number"
                className="h-5 w-5"
                checked={includeNumber}
                onChange={() =>
                  setIncludeNumber((prevIncludeNumber) => !prevIncludeNumber)
                }
              />
            </div>

            <label
              htmlFor="include-symbol"
              className="text-left text-lg font-semibold"
            >
              {parser.get("symbol")}
            </label>
            <div className="flex justify-start">
              <input
                type="checkbox"
                id="include-symbol"
                className="h-5 w-5"
                checked={includeSymbol}
                onChange={() =>
                  setIncludeSymbol((prevIncludeSymbol) => !prevIncludeSymbol)
                }
              />
            </div>
          </div>
          <button
            className="mt-3 w-full rounded bg-gradient-to-r from-blue-500 to-blue-600 p-3 font-bold shadow transition-all hover:scale-105 active:scale-100 bg-blue-900 text-white"
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
            {parser.get("create_button")}
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default PasswordPage;
