import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiDotnet,
  SiTailwindcss,
  SiExpress,
  SiKotlin,
  SiDocker,
  SiPrisma,
  SiMongodb,
  SiRedis,
  SiRabbitmq,
  SiFirebase,
  SiGraphql,
  SiVite,
  SiAmazon
} from 'react-icons/si'

export type ToolKey =
  | 'next'
  | 'ts'
  | 'reactNative'
  | 'node'
  | 'postgres'
  | 'dotnet'
  | 'tailwind'
  | 'express'
  | 'kotlin'
  | 'mlnet'
  | 'docker'
  | 'prisma'
  | 'mongo'
  | 'redis'
  | 'rabbit'
  | 'firebase'
  | 'graphql'
  | 'aws'
  | 'vite'

export const TOOLS: { key: ToolKey; label: string; Icon: any }[] = [
  { key: 'next', label: 'Next.js', Icon: SiNextdotjs },
  { key: 'ts', label: 'TypeScript', Icon: SiTypescript },
  { key: 'reactNative', label: 'React Native', Icon: SiReact },
  { key: 'node', label: 'Node.js', Icon: SiNodedotjs },
  { key: 'postgres', label: 'PostgreSQL', Icon: SiPostgresql },
  { key: 'dotnet', label: '.NET 9 / EF Core', Icon: SiDotnet },
  { key: 'tailwind', label: 'TailwindCSS', Icon: SiTailwindcss },
  { key: 'express', label: 'Express', Icon: SiExpress },
  { key: 'kotlin', label: 'Kotlin (Android)', Icon: SiKotlin },
  { key: 'mlnet', label: 'ML.NET', Icon: SiDotnet },
  { key: 'docker', label: 'Docker', Icon: SiDocker },
  { key: 'prisma', label: 'Prisma', Icon: SiPrisma },
  { key: 'mongo', label: 'MongoDB', Icon: SiMongodb },
  { key: 'redis', label: 'Redis', Icon: SiRedis },
  { key: 'rabbit', label: 'RabbitMQ', Icon: SiRabbitmq },
  { key: 'firebase', label: 'Firebase', Icon: SiFirebase },
  { key: 'graphql', label: 'GraphQL', Icon: SiGraphql },
  { key: 'aws', label: 'AWS', Icon: SiAmazon },
  { key: 'vite', label: 'Vite', Icon: SiVite }
]
