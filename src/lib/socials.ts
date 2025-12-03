import { IconType } from 'react-icons'
import { FaDiscord, FaSpotify } from 'react-icons/fa6'
import { FiGithub, FiInstagram, FiLinkedin, FiYoutube } from 'react-icons/fi'

export type Social = { href: string; icon: IconType }

export const SOCIALS: Social[] = [
  { href: '/discord', icon: FaDiscord },
  { href: '/github', icon: FiGithub },
  { href: '/youtube', icon: FiYoutube },
  { href: '/instagram', icon: FiInstagram },
  { href: '/linkedin', icon: FiLinkedin },
  { href: '/spotify', icon: FaSpotify }
]
