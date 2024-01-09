import { Button } from "@/components/Utils/Button";
import { YoutubeButton } from "@/components/Video/Button";
import { IYoutubeStats, YoutubeStats } from "@/components/Video/Stats";
import { VideoCard } from "@/components/Video/VideoCard";

export const IndexYoutube: React.FC<IYoutubeStats> = ({
  subscriberCount,
  videoCount,
  viewCount,
  videos,
}) => {
  return (
    <section className="flex flex-col text-center justify-between pb-12 md:pb-24 lg:pt-20">
      <YoutubeStats
        subscriberCount={subscriberCount}
        videoCount={videoCount}
        viewCount={viewCount}
      />

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

      <div className="relative w-full">
        <YoutubeButton />

        <div className="mt-5">
          <Button url={"/videos"} text={"view_button"} />
        </div>
      </div>
    </section>
  );
};
