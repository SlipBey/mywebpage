/* eslint-disable @typescript-eslint/no-explicit-any */

import { useLocaleParser } from "@/libs/localeParser";
import { FiEye, FiUsers, FiVideo } from "react-icons/fi";

export interface IYoutubeStats {
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
  videos?: any;
}

export const YoutubeStats: React.FC<IYoutubeStats> = ({
  subscriberCount,
  videoCount,
  viewCount,
}) => {
  const parser = useLocaleParser();

  return (
    <>
      <h2 className="text-3xl w-full text-center font-bold">
        You<span className="text-red-600">Tube</span>
      </h2>
      <div className="my-5 grid sm:grid-cols-3 gap-3">
        <div className="flex flex-col">
          <h5 className="text-xl font-semibold inline-flex justify-center items-center gap-2">
            <FiUsers className="text-black dark:text-white w-5 h-5" />{" "}
            {parser.get("subscriberCount")}
          </h5>
          <p className="text-2xl font-semibold">{subscriberCount}</p>
        </div>

        <div className="flex flex-col">
          <h5 className="text-xl font-semibold inline-flex justify-center items-center gap-2">
            <FiVideo className="text-black dark:text-white w-5 h-5" />{" "}
            {parser.get("videoCount")}
          </h5>
          <p className="text-2xl font-semibold">{videoCount}</p>
        </div>

        <div className="flex flex-col">
          <h5 className="text-xl font-semibold inline-flex justify-center items-center gap-2">
            <FiEye className="text-black dark:text-white w-5 h-5" />{" "}
            {parser.get("viewCount")}
          </h5>
          <p className="text-2xl font-semibold">{viewCount}</p>
        </div>
      </div>
    </>
  );
};
