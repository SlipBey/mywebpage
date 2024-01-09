import { CustomImage } from "@/components/Utils/CustomImage";
import Link from "next/link";
import type { FC } from "react";

export interface ITags {
  name: string;
}

export interface IProject {
  name: string;
  image: string;
  desc: string;
  link: string;
}

export const WorkCard: FC<IProject> = ({ name, image, desc, link }) => {
  return (
    <div className="p-3 hover:-translate-y-1 hover:shadow-2xl rounded-md duration-300">
      <Link href={link} legacyBehavior>
        <a
          className="flex flex-col justify-center items-center"
          target="_blank"
        >
          <CustomImage
            className="w-24 h-24 rounded-full"
            src={image}
            alt={name}
          />
          <div className="text-center">
            <h2 className="text-lg font-bold">{name}</h2>
            <p className="text-medium font-base text-gray-800 dark:text-gray-300">
              {desc}
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
};
