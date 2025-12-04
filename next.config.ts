import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'i.scdn.co' }
    ],
    qualities: [75, 90]
  },
  async redirects() {
    return [
      {
        source: '/github',
        destination: 'https://github.com/SlipBey',
        permanent: true
      },
      {
        source: '/instagram',
        destination: 'https://www.instagram.com/SlipBey',
        permanent: true
      },
      {
        source: '/youtube',
        destination: 'https://www.youtube.com/@SlipBeyYoutube/',
        permanent: true
      },
      {
        source: '/discord',
        destination: 'https://discord.gg/ttGpRCZZp6',
        permanent: true
      },
      {
        source: '/linkedin',
        destination: 'https://www.linkedin.com/in/slipbey/',
        permanent: true
      },
      {
        source: '/spotify',
        destination: 'https://open.spotify.com/artist/5i4GTYlGDGtlNIlEjFaOUp',
        permanent: true
      },
      {
        source: '/apple-music',
        destination: 'https://music.apple.com/tr/artist/slipbey/1851991817',
        permanent: true
      },
      {
        source: '/youtube-music',
        destination: 'https://www.youtube.com/@SlipymeMusic',
        permanent: true
      }
    ]
  }
}

export default nextConfig
