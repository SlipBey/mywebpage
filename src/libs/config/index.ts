import { CONTACT } from "@/libs/config/contact";
import { STACKS } from "@/libs/config/stack";
import { WORKS } from "@/libs/config/works";
import { PROJECTS } from "@/libs/config/project";
import { APPS } from "./apps";

const SEO = {
  layoutTitle: "%s - SlipBey",
  title: "SlipBey",
  publishDomain: "https://slip.slipyme.com",
  themeColor: "#2563eb",
  keywords: [
    "slipyme",
    "ender",
    "enderbot",
    "enderrise",
    "discord",
    "bot",
    "discord-bot",
    "blog",
    "react",
    "next",
    "reactjs",
    "nextjs",
    "slipbey",
    "slipy",
    "personalpage",
    "personal",
    "webpage",
    "websource",
    "tailwindcss",
    "sass",
    "scss",
    "portfolyo",
    "portfolio",
  ],
  description: "Welcome to SlipBey portfolio",
  domain: "https://slip.slipyme.com",
};

interface IMailProp {
  name: string;
  mail: string;
}

const MAILS = [
  {
    name: "contactMedia",
    mail: "media",
  },
  {
    name: "contactApp",
    mail: "contact",
  },
  {
    name: "contactPerson",
    mail: "berkant",
  },
] as IMailProp[];

export const CONFIG = {
  GA_TRACKING_ID: "G-B4FKG82G5X",
  YOUTUBE: {
    channelId: "UC3qq9Ul7xWt7A5MlNQnvITw",
    apiKey: process.env.youtubeApiKey,
  },
  SEO,
  CONTACT,
  STACKS,
  WORKS,
  PROJECTS,
  APPS,
  MAILS,
};
