import { CustomImage } from "@/components/Utils/CustomImage";
import Link from "next/link";
import type { FC } from "react";

export interface IVideo {
  link: string;
  image: string;
  title: string;
}

export const VideoCard: FC<IVideo> = ({ link, image, title }) => {
  return (
    <div className="p-3 hover:-translate-y-1 hover:shadow-2xl rounded-md duration-300">
      <Link href={"https://youtu.be/" + link} legacyBehavior>
        <a
          className="flex flex-col justify-center items-center"
          target="_blank"
        >
          <CustomImage src={image} alt="" className="h-48 rounded-lg" />
          <div className="mt-3 text-center">
            <h2 className="text-lg font-bold">{title.slice(0, 80)}</h2>
          </div>
        </a>
      </Link>
    </div>
  );
};
