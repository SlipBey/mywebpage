/* eslint-disable @typescript-eslint/no-explicit-any */

import { Layout } from "@/components/Layout";
import { useLocaleParser } from "@/libs/localeParser";
import { NextPage } from "next";
import { IndexHero } from "@/components/Index/Hero";
import { IndexYoutube } from "@/components/Index/Youtube";
import { IndexWorks } from "@/components/Index/Works";
import { IndexProjects } from "@/components/Index/Projects";
import { IVideoProp } from "./videos";

const IndexPage: NextPage<IVideoProp> = ({
  videos,
  subscriberCount,
  videoCount,
  viewCount,
}) => {
  const parser = useLocaleParser();

  return (
    <Layout title={parser.get("home")}>
      <section className="p-5 mx-auto">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-md m-h-96">
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
    "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBFuA_ZoKLOb2K7fKg9tnUikPUqU_Iaqvc&channelId=UC3qq9Ul7xWt7A5MlNQnvITw&part=snippet,id&order=date&maxResults=3",
  );
  const videos = await videoRes.json();

  const statsRes = await fetch(
    "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UC3qq9Ul7xWt7A5MlNQnvITw&key=AIzaSyC9qkOd0RKEZ1bQ8MNO9DXw7Lh3cf9CpHQ",
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
