import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiTailwindcss,
  SiExpress
} from 'react-icons/si'
import {
  FaFilm,
  FaMicrophoneLines,
  FaRoute,
  FaClipboardList,
  FaNetworkWired,
  FaPalette,
  FaRobot,
  FaMusic
} from 'react-icons/fa6'
import { FaFeatherAlt, FaUsersCog } from 'react-icons/fa'
import type React from 'react'
import { BsMicrosoft } from 'react-icons/bs'

export type Skill = {
  labelKey: string
  icon: React.ComponentType<{ className?: string }>
  group: 'software' | 'creative' | 'ops'
}

export const SKILLS: Skill[] = [
  { labelKey: 'home.hero.skills.next', icon: SiNextdotjs, group: 'software' },
  {
    labelKey: 'home.hero.skills.typescript',
    icon: SiTypescript,
    group: 'software'
  },
  {
    labelKey: 'home.hero.skills.reactNative',
    icon: SiReact,
    group: 'software'
  },
  { labelKey: 'home.hero.skills.node', icon: SiNodedotjs, group: 'software' },
  {
    labelKey: 'home.hero.skills.postgres',
    icon: SiPostgresql,
    group: 'software'
  },
  {
    labelKey: 'home.hero.skills.tailwind',
    icon: SiTailwindcss,
    group: 'software'
  },
  {
    labelKey: 'home.hero.skills.express',
    icon: SiExpress,
    group: 'software'
  },
  { labelKey: 'home.hero.skills.mlnet', icon: BsMicrosoft, group: 'software' },
  {
    labelKey: 'home.hero.skills.directing',
    icon: FaFilm,
    group: 'creative'
  },
  {
    labelKey: 'home.hero.skills.screenwriting',
    icon: FaFeatherAlt,
    group: 'creative'
  },
  {
    labelKey: 'home.hero.skills.songwriting',
    icon: FaMusic,
    group: 'creative'
  },
  {
    labelKey: 'home.hero.skills.speaking',
    icon: FaMicrophoneLines,
    group: 'creative'
  },
  {
    labelKey: 'home.hero.skills.visualDesign',
    icon: FaPalette,
    group: 'creative'
  },
  {
    labelKey: 'home.hero.skills.aiContent',
    icon: FaRobot,
    group: 'creative'
  },
  {
    labelKey: 'home.hero.skills.productRoadmap',
    icon: FaRoute,
    group: 'ops'
  },
  {
    labelKey: 'home.hero.skills.projectManagement',
    icon: FaClipboardList,
    group: 'ops'
  },
  {
    labelKey: 'home.hero.skills.teamCoord',
    icon: FaUsersCog,
    group: 'ops'
  },
  {
    labelKey: 'home.hero.skills.systemArch',
    icon: FaNetworkWired,
    group: 'ops'
  }
]
