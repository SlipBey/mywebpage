/* eslint-disable @typescript-eslint/no-explicit-any */

import { Layout } from "@/components/Layout";
import { useLocaleParser } from "@/libs/localeParser";
import { NextPage } from "next";
import { IndexHero } from "@/components/Index/Hero";
import { IndexYoutube } from "@/components/Index/Youtube";
import { IndexWorks } from "@/components/Index/Works";
import { IndexProjects } from "@/components/Index/Projects";
import { IVideoProp } from "./videos";
import { CONFIG } from "@/libs/config";

const IndexPage: NextPage<IVideoProp> = ({
  videos,
  subscriberCount,
  videoCount,
  viewCount,
}) => {
  const parser = useLocaleParser();

  return (
    <Layout title={parser.get("home")}>
      <section className="text-center p-8">
        <div className="flex flex-col text-center justify-between relative space-y-5 mt-8">
          <div className="text-center p-8">
            <IndexHero />
            <IndexYoutube
              subscriberCount={subscriberCount}
              videoCount={videoCount}
              viewCount={viewCount}
              videos={videos}
            />
            <IndexWorks />
            <IndexProjects />
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default IndexPage;

export async function getServerSideProps() {
  const videoRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${CONFIG.YOUTUBE.apiKey}&channelId=${CONFIG.YOUTUBE.channelId}&part=snippet,id&order=date&maxResults=3`,
  );
  const videos = await videoRes.json();

  const statsRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CONFIG.YOUTUBE.channelId}&key=${CONFIG.YOUTUBE.apiKey}`,
  );
  const stats = await statsRes.json();

  const { subscriberCount, videoCount, viewCount } = stats.items[0].statistics;

  return {
    props: {
      videos,
      subscriberCount,
      videoCount,
      viewCount,
    },
  };
}
