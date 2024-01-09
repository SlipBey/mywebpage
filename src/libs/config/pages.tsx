import { DiPhotoshop } from "react-icons/di";
import { FaCode, FaHome } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

export const PAGES = [
  {
    name: "home",
    link: "/",
  },
  {
    name: "about",
    link: "/#about",
  },
  {
    name: "videos",
    link: "/videos",
  },
  {
    name: "works",
    link: "/works",
  },
  {
    name: "works",
    link: "/projects",
  },
  {
    name: "apps",
    link: "/apps",
  },
];

export const NotFoundPages = [
  {
    icon: FaHome,
    color: "bg-blue-100 text-blue-600",
    name: "home",
    link: "/",
  },
  {
    icon: FiEdit,
    color: "bg-pink-100 text-pink-600",
    name: "works",
    link: "/works",
  },
  {
    icon: FaCode,
    color: "bg-cyan-100 text-cyan-600",
    name: "Slipyme",
    link: "https://www.slipyme.com",
  },
  {
    icon: DiPhotoshop,
    color: "bg-green-100 text-green-600",
    name: "SlipymeDesign",
    link: "https://design.slipyme.com",
  },
];
