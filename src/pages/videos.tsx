/* eslint-disable @typescript-eslint/no-explicit-any */

import { Layout } from "@/components/Layout";
import { useLocaleParser } from "@/libs/localeParser";
import { VideoCard } from "@/components/Video/VideoCard";
import { useState } from "react";
import classNames from "classnames";
import { NextPage } from "next";
import { YoutubeButton } from "@/components/Video/Button";
import { YoutubeStats } from "@/components/Video/Stats";
import { CONFIG } from "@/libs/config";

export interface IVideoProp {
  videos: any;
  subscriberCount: any;
  videoCount: any;
  viewCount: any;
}

const VideoPage: NextPage<IVideoProp> = ({
  videos,
  subscriberCount,
  videoCount,
}) => {
  const parser = useLocaleParser();

  const [videoOption, setVideoOption] = useState(0);

  return (
    <Layout title={parser.get("videos")}>
      <section className="text-center p-8">
        <div className="flex flex-col text-center justify-between relative space-y-5 mt-8">
          <YoutubeStats
            subscriberCount={subscriberCount}
            videoCount={videoCount}
            viewCount={videoCount}
          />

          <h2 className="relative text-3xl w-full text-center font-bold">
            {parser.get("videos")}
          </h2>

          <div className="flex justify-center flex-row w-full">
            <button
              onClick={() => setVideoOption(0)}
              className={classNames(
                "rounded-l-full border-2 border-gray-300 dark:border-gray-700 w-32 p-2 hover:bg-gray-200 dark:hover:bg-gray-700",
                {
                  "bg-gray-200 dark:bg-gray-700": videoOption == 0,
                },
              )}
            >
              {parser.get("newVideo_button")}
            </button>
            <button
              onClick={() => setVideoOption(1)}
              className={classNames(
                "rounded-r-full border-2 border-gray-300 dark:border-gray-700 w-32 p-2 hover:bg-gray-200 dark:hover:bg-gray-700",
                {
                  "bg-gray-200 dark:bg-gray-700": videoOption == 1,
                },
              )}
            >
              {parser.get("popularVideo_button")}
            </button>
          </div>

          <div
            className={classNames({
              hidden: videoOption != 0,
            })}
          >
            <h5 className="text-left text-xl font-semibold mb-5">
              {parser.get("newVideo_text")}
            </h5>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center">
              {videos.items.map((video, idx) => (
                <VideoCard
                  key={idx}
                  link={video.id.videoId}
                  image={video.snippet.thumbnails.medium.url}
                  title={video.snippet.title}
                />
              ))}
            </div>
          </div>

          <div
            className={classNames({
              hidden: videoOption != 1,
            })}
          >
            <h5 className="text-left text-xl font-semibold mb-5">
              {parser.get("popularVideo_text")}
            </h5>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center">
              {videos.items.map((video, idx) => (
                <VideoCard
                  key={idx}
                  link={video.id.videoId}
                  image={video.snippet.thumbnails.medium.url}
                  title={video.snippet.title}
                />
              ))}
            </div>
          </div>

          <YoutubeButton />
        </div>
      </section>
    </Layout>
  );
};

export default VideoPage;

export async function getServerSideProps() {
  const videoRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${CONFIG.YOUTUBE.apiKey}&channelId=${CONFIG.YOUTUBE.channelId}&part=snippet,id&order=date&maxResults=18`,
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
