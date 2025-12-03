import type { Metadata } from 'next'

const domain = 'slip.slipyme.com'
export const CONFIG = {
  SEO: {
    title: 'SlipBey',
    layoutTitle: '%s ・ SlipBey',
    publishDomain: `https://www.${domain}`,
    themeColor: '#2563eb',
    keywords: [
      'Slipyme Company',
      'Slipyme şirketi',
      'slipy',
      'slipybey',
      'slipbey',
      'slipyme',
      'enderrise',
      'blog',
      'react',
      'next',
      'reactjs',
      'nextjs',
      'tailwind',
      'tailwindcss',
      'software',
      'yazilim',
      'web',
      'programming',
      'css',
      'js',
      'nodejs',
      'mobil uygulama geliştirme',
      'masaüstü uygulama geliştirme',
      'web tabanlı uygulama geliştirme',
      'website tasarımı',
      'gömülü sistemler',
      'elektronik projeler',
      'Arduino projeleri',
      'oyun geliştirme',
      'kaliteli hizmet',
      'çözüm odaklı',
      'teknoloji',
      'yazılım çözümleri',
      'tasarım hizmetleri',
      'entegre çözümler',
      'üst düzey hizmet',
      'sektör entegrasyonu'
    ],
    description:
      'Slipyme, çeşitli sektörlerde üst düzey hizmet sunma amacıyla kurulmuştur. Misyonumuz, faaliyet gösterdiğimiz sektörleri birbirleriyle entegre ederek kaliteli çözümler ortaya koymaktır. Şu anda, yazılım, tasarım ve oyun sektörlerinde etkinlik göstermekteyiz. Yazılım alanında, mobil, masaüstü, web tabanlı, website, gömülü, elektronik ve Arduino gibi geniş bir yelpazede projeler gerçekleştiriyoruz.'
  }
}

type Opt = {
  title?: string;
  description?: string;
  alternates?: { canonical?: string };
  images?: string[];
};

export function buildMetadata(opt: Opt = {}): Metadata {
  const pageTitle = opt.title ?? CONFIG.SEO.title;
  const description = opt.description ?? CONFIG.SEO.description;
  const canonical = opt.alternates?.canonical
    ? `${CONFIG.SEO.publishDomain}${opt.alternates.canonical}`
    : CONFIG.SEO.publishDomain;

  const images = (opt.images?.length ? opt.images : ["/images/logo.png"]).map(
    (url) => ({ url }),
  );

  return {
    metadataBase: new URL(CONFIG.SEO.publishDomain),
    title: opt.title
      ? `${opt.title} - Slipyme Company`
      : { default: CONFIG.SEO.title, template: CONFIG.SEO.layoutTitle },

    description,
    keywords: CONFIG.SEO.keywords,
    icons: { icon: "/images/logo.png", apple: "/apple-touch-icon.png" },

    openGraph: {
      type: "website",
      url: canonical,
      siteName: CONFIG.SEO.title,
      title: pageTitle,
      description,
      images,
      locale: "tr_TR",
      alternateLocale: ["en_GB", "en_US"],
    },
    twitter: {
      card: "summary",
      title: pageTitle,
      description,
      images: images.map((i) => i.url ?? "/images/logo.png"),
    },
  };
}
