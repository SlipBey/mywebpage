import { IconType } from 'react-icons'
import { FaSpotify, FaApple } from 'react-icons/fa6'
import { SiYoutubemusic } from 'react-icons/si'

type MediaProfile = {
  label: string
  href: string
  icon: IconType
}

export const MEDIA_PROFILES: MediaProfile[] = [
  {
    label: 'Spotify',
    href: '/spotify',
    icon: FaSpotify
  },
  {
    label: 'Apple Music',
    href: '/apple-music',
    icon: FaApple
  },
  {
    label: 'YouTube Music',
    href: '/youtube-music',
    icon: SiYoutubemusic
  }
]
