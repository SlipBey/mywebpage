import type { NextPage } from "next";
import { Layout } from "@/components/Layout";
import Link from "next/link";
import { useLocaleParser } from "@/libs/localeParser";
import { NotFoundPages } from "@/libs/config/pages";

const NotFoundPage: NextPage = () => {
  const parser = useLocaleParser();

  return (
    <Layout title={parser.get("notFound")}>
      <div className="flex flex-col justify-center items-center gap-5 text-center">
        <h1 className="mt-12 text-blue-600 text-5xl font-bold">
          404 {parser.get("notFound")}
        </h1>
        <h2 className="mt-5 dark:text-gray-400 text-3xl font-semibold">
          {parser.get("notFound_text")}
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {NotFoundPages.map((page, index) => (
            <div
              className="hover:bg-gray-200 dark:bg-gray-800 border border dark:border-gray-700 rounded-md p-5 dark:hover:bg-gray-700 duration-300"
              key={index}
            >
              <Link href={page.link}>
                <div
                  className={`${page.color} rounded-md justify-center items-center w-12 h-12 mb-5 mx-auto flex`}
                >
                  <page.icon className="w-7 h-7" />
                </div>
                <h5 className="dark:text-gray-400 font-semibold text-xl">
                  {parser.get(page.name)}
                </h5>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
