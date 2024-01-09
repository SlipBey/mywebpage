import { Layout } from "@/components/Layout";
import { CONFIG } from "@/libs/config";

import { AppCard } from "@/components/Apps/AppCard";
import { useLocaleParser } from "@/libs/localeParser";
import { NextPage } from "next";

const AppsPage: NextPage = () => {
  const parser = useLocaleParser();

  return (
    <Layout title={parser.get("apps")}>
      <div className="text-center p-8">
        <div className="flex flex-col text-center justify-between relative space-y-5 mt-8">
          <h2 className="relative text-3xl w-full text-center font-bold">
            {parser.get("apps")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
            {CONFIG.APPS.map((apps, index) => (
              <AppCard
                link={apps.href}
                name={apps.title}
                icon={apps.icon}
                text={apps.alt}
                color={apps.color}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AppsPage;
