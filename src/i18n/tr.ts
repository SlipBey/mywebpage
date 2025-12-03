export default {
  common: {
    brand: 'SlipBey',
    nav: {
      home: 'Ana Sayfa',
      about: 'Hakkımda',
      projects: 'Projeler',
      apps: 'Uygulamalar',
      works: 'Çalışmalarım',
      contact: 'İletişim'
    },
    add: 'Ekle',
    remove: 'Sil',
    clear: 'Temizle'
  },
  home: {
    description: `Merhaba, ben Berkant. ${new Date().getFullYear() - 2016} yıldır yazılım geliştiriyor, webden mobile kadar birçok projeyi tasarım ve mimariyle birlikte tek elden üretiyorum. Kurumsal ERP ve Slipyme projelerine odaklanıyorum`,
    hero: {
      name: 'SlipBey',
      subtitle: `Merhabalar, ben Berkant. Yaklaşık ${
        new Date().getFullYear() - 2016
      } yıldır yazılımla uğraşıyorum. Web, masaüstü, mobil ve gömülü sistemler arasında gidip gelen; hem tasarımını hem altyapısını kendim kurduğum projeler üretiyorum. Gündüzleri kurumsal ERP geliştiriyor, kalan zamanda ise kendi girişimim Slipyme Company’yi ve kişisel projelerimi büyütmeye çalışıyorum. Yazılımın yanında ekip yönetimi, senaryo ve söz yazarlığı, blog ve film işleri de hayatımın parçası.`,
      ctas: { about: 'Hakkımda', projects: 'Projelerim' },
      groups: {
        software: 'Yazılım',
        creative: 'Yaratıcı',
        ops: 'Operasyon'
      },
      skills: {
        next: 'Next.js',
        typescript: 'TypeScript',
        reactNative: 'React Native',
        node: 'Node.js',
        postgres: 'PostgreSQL',
        tailwind: 'TailwindCSS',
        express: 'Express.js',
        mlnet: 'ML.NET',
        directing: 'Yönetmenlik',
        screenwriting: 'Senaryo Yazımı',
        songwriting: 'Söz Yazarlığı',
        speaking: 'Sunum & Anlatım',
        visualDesign: 'Görsel Tasarım',
        aiContent: 'Yapay Zekâ İçerikleri',
        productRoadmap: 'Ürün Yol Haritası',
        projectManagement: 'Proje Yönetimi',
        teamCoord: 'Takım Koordinasyonu',
        systemArch: 'Sistem Mimarisi'
      }
    },
    projects: {
      title: 'Projelerim',
      viewAll: 'Tümünü Gör'
    },
    works: {
      title: 'Çalışmalarım',
      seeAll: 'Tüm Çalışmaları Gör',
      tabs: {
        youtube: 'YouTube',
        music: 'Müzik',
        film: 'Film & Senaryo'
      },
      youtube: {
        empty:
          'YouTube verisi şimdilik görünmüyor. API yanıt vermiyor, lütfen beklemede kalın.',
        views: 'görüntüleme'
      },
      music: {
        soonTitle: 'Müzik Yayınlarım',
        soonHint:
          'Spotify verisi şimdilik görünmüyor. API yanıt vermiyor, lütfen beklemede kalın.'
      },
      film: {
        soonTitle: 'Film & senaryo projeleri hazırlık aşamasında.',
        soonHint: 'Paylaşmaya hazır hale geldiklerinde buraya da eklenecekler.'
      }
    },
    appsCta: {
      title: 'Uygulamalar',
      subtitle:
        'Kafama estikçe yaptığım deneysel projeler, küçük araçlar ve mini oyunlar tek bir yerde toplansın istedim.',
      viewApps: 'Uygulamaları Gör'
    },
    contact: {
      title: 'Birlikte üretelim.',
      subtitle:
        'Fikir, proje ya da işbirliği için ulaşmak istersen; genelde aynı gün içinde dönüş yapmaya çalışıyorum.',
      badges: { response: '24h ort. dönüş' },
      cta: 'İletişim Sayfası',
      stats: { years: 'yıl deneyim', projects: 'tamamlanan proje' },
      mailHint: 'tıkla ve yaz'
    }
  },
  footer: {
    about:
      'Şu an ne yapıyorsam, gelecekte yapmak istediklerimin temelini atıyor.'
  },
  about: {
    title: 'Hakkımda',
    description:
      'Full-stack geliştirici, sistem mimarı, içerik üreticisi ve yan tarafta kendi işini kurmaya çalışan bir insanım.',
    hero: {
      role: 'Full-Stack Developer',
      title: 'Birazda Hakkımda',
      desc: 'Merhaba ben Berkant Full-stack geliştiriciyim. Web, mobil, masaüstü ve gömülü sistemler üzerinde çalışan ürünler tasarlıyor ve geliştiriyorum. Yazılımın yanında sistem mimarisi, proje yönetimi ve ekip koordinasyonu gibi alanlarda da aktifim.\n\nProje yelpazem oldukça geniş; gündüzleri kurumsal ERP sistemleri geliştirirken, akşamları kişisel projelerime zaman ayırıyorum. ERP alanındaki uzun yıllara dayanan deneyimim sayesinde bu konuda derin bir teknik bilgiye sahibim.\n\nLisede okurken okul müdürümün desteğiyle bir teknoloji atölyesi kurduk ve burada ekip lideri olarak öğretmenlerden sonraki en yetkili kişi oldum. Bu deneyim benim için dönüm noktasıydı; ilk kez gerçek bir ekibi yönetiyor, projelerin planlamasından geliştirilmesine kadar tüm süreçleri koordine ediyordum.\n\nO dönem yalnızca web veya mobil değil; Arduino, Raspberry Pi ve kendi tasarladığımız PCB’lerle birçok proje geliştirdim. Hatta bazıları büyük ilgi gördü ve yatırım teklifleri bile aldım. Ancak öğrenci olduğum için o dönemde bu teklifleri değerlendirmedim — şimdi geriye dönüp baktığımda hayatımın en yanlış kararlarından biri olduğunu düşünüyorum.\n\nBugün “ekmeğini taştan çıkarmak” deyimini birebir yaşıyorum. Gerçekten sıfır sermayeyle bir startup kurup bunu büyütme hedefindeyim. Çok sayıda projem var ve bunları planlı bir şekilde hayata geçiriyorum. Hayatta edindiğim tüm başarısızlıklardan sonra, bu projelerde başarıya ulaşmak ve bir gün bu bölümü başarılarımla doldurmak istiyorum.',
      stats: [
        { k: 'yıl deneyim', v: '10+' },
        { k: 'tamamlanan proje', v: '30+' },
        { k: 'aktif ürün', v: '6' },
        { k: 'toplam satır kod*', v: '1M+' }
      ],
      cta: 'Projelerimi Gör'
    },
    tools: {
      title: 'Güncel Araç Seti'
    },
    cta: {
      title: 'Bir fikri beraber ürüne dönüştürelim.',
      button: 'İletişime Geç'
    },
    focus: {
      title: 'Ne Yapıyorum',
      items: {
        youtube: {
          title: 'YouTube',
          desc: 'Teknoloji ve hayatın garip tarafları üzerine videolar hazırlıyorum. Senaryosu da çekimi de kurgusu da benden çıkıyor; hangi platforma uygunsa oraya gidiyor.'
        },
        blog: {
          title: 'Blog / Teknik Yazılar',
          desc: 'Çözdüğüm teknik dertleri ve aldığım mimari kararları not düşüyorum. Okuyan kişi uğraşmasın, direkt çözüme atlasın diye yazıyorum.'
        },
        screenplay: {
          title: 'Senaryo & Film',
          desc: 'Kısa film fikirleri, sahneler, karakterler… Aklıma yatan şeyleri biriktirip zaman buldukça geliştiriyorum. Görsel anlatı tarafı hoşuma gidiyor.'
        },
        songwriting: {
          title: 'Söz Yazarlığı / Müzik',
          desc: 'Kafamdaki melodileri sözlere döküyorum. Prodüksiyon kısmıyla da uğraşıyorum; sadece vokal değil, yapının tamamına bulaşıyorum.'
        },
        openSource: {
          title: 'Açık Kaynak',
          desc: 'Projelerde çözdüğüm tekrar eden şeyleri ufak araçlara dönüştürüp paylaşmayı seviyorum. Hem bana not oluyor hem başkasına iş görüyor.'
        },
        productDesign: {
          title: 'Ürün & Tasarım',
          desc: 'Kullandığım ürünlerin görünüşünü ve akışını kendim tasarlıyorum. Net, hızlı ve kafa karıştırmayan arayüzler çıkarmaya çalışıyorum.'
        }
      }
    },
    domains: {
      title: 'Çalışma Alanlarım',
      items: {
        software: {
          title: 'Yazılım Geliştirme',
          desc: 'Web, masaüstü ve backend tarafında full-stack işler yapıyorum. TypeScript, .NET, Node.js ve PostgreSQL benim günlük rutinim.'
        },
        mobile: {
          title: 'Mobil Uygulamalar',
          desc: 'React Native ve Kotlin tarafında; Bluetooth, sensörler ve native modüllerle gerçekten cihazla konuşan uygulamalar yazıyorum.'
        },
        design: {
          title: 'Arayüz & Tasarım',
          desc: 'Net, temiz ve kafa karıştırmayan arayüzler tasarlıyorum. İkonu, akışı, animasyonu… her şeyi aynı dilde tutmaya çalışıyorum.'
        },
        cloud: {
          title: 'Bulut & DevOps',
          desc: 'Projeleri lokalden çıkartıp gerçek ortama taşıyorum. Next.js dağıtımları, API güvenliği, CI/CD ve performans işleri benim alanım.'
        },
        systems: {
          title: 'Sistem Mimarisi',
          desc: 'Okunabilir, genişleyebilir sistemler kurmayı seviyorum. Uygulamanın nereden nereye aktığını net görmek benim için önemli.'
        },
        ai: {
          title: 'Yapay Zekâ & ML',
          desc: 'Görev atama, tahmin ve basit ML senaryolarında modellerle oynuyorum. Karar destek sistemleri kurmak hoşuma gidiyor.'
        },
        automation: {
          title: 'Otomasyon & Donanım',
          desc: 'Arduino, Raspberry Pi ve PCB tasarımlarıyla fiziksel dünyayla konuşan sistemler geliştiriyorum. Sensör verisini yazılımla birleştirmek keyifli.'
        },
        media: {
          title: 'Medya & İçerik',
          desc: 'Video, müzik ya da anlatı fark etmez; fikirden kurguya kadar sürecin her noktasında aktifim.'
        }
      }
    }
  },
  project: {
    badge: 'Portföy / Ürünler',
    title: 'Projelerim',
    description:
      'Üzerinde çalıştığım projeleri tek sayfada topladım. Detay sayfalarda hem uzun açıklamalar hem de görseller/sunumlar var.',
    total: 'Toplam proje:',
    labels: {
      site: 'Site',
      github: 'GitHub'
    },
    status: {
      active: 'Aktif',
      inactive: 'Pasif',
      wip: 'Yapım Aşamasında'
    },
    github: {
      title: 'GitHub',
      pinnedTitle: 'Öne çıkardığım projeler',
      updated: 'Güncellendi',
      moreOnGithub: "Tüm projeleri GitHub'da gör",
      pinnedChip: 'Sabitlenmiş'
    }
  },
  projects: {
    items: {
      slipyme: {
        title: 'Slipyme Company',
        short:
          'Slipyme, yıllardır yaptığım yazılım, tasarım, oyun ve medya işlerini tek yerde topladığım kendi çalışma alanım.',
        description: [
          'Slipyme benim için bir marka değil; ürettiğim her şeyin düzenli bir şekilde durduğu ana çatı. Web uygulamaları, mobil işler, oyun denemeleri ve tasarım projeleri burada birikiyor.',
          'Teknoloji tarafında ihtiyaç neyse onu kullanıyorum. Next.js, TypeScript, Tailwind, React Native… Hepsinin ortak noktası: temiz ve sürdürülebilir bir yapı kurmak.',
          'Slipyme’nin amacı, farklı alanlarda yaptığım işleri kategori halinde toplamak ve insanların rahatça gezebileceği bir alan sunmak. Kimi proje hazır, kimi deneysel, kimi de tamamen ilerisi için atılmış bir adım.',
          'Uzun vadede Slipyme’nin hem kendi ürünlerimi çıkardığım hem de dış projelere altyapı sağladığım stabil bir ekosisteme dönüşmesini hedefliyorum.'
        ]
      },

      oguzhanPortfolio: {
        title: 'Oğuzhan Tanıtmış – Kişisel Portföy',
        short:
          'Oğuzhan’ın oyun sunucuları ve altyapı projelerini sade ve anlaşılır şekilde anlatan bir portföy oluşturdum.',
        description: [
          'Bu proje, Oğuzhan’ın network ve oyun sunucusu alanındaki işlerini düzenli, okunabilir ve net bir yapıda göstermek için hazırlandı.',
          'Tasarımda hız, sadelik ve düzen ön plandaydı. İnsan girince ‘ne nerede’ hemen anlayabilsin istedim.',
          'Teknik tarafta Next.js, TypeScript ve Tailwind kullandım. Çok dilli yapı ve responsive tasarım ile hem içerik hem de performans tarafı temiz bir bütün haline geldi.',
          'Amaç, karmaşık işleri süslü cümlelerle değil; olduğu gibi, anlaşılır bir dille ve sade bir arayüzle anlatmaktı.'
        ]
      },

      game2048: {
        title: '2048 – Modern Web Oyun Uygulaması',
        short:
          '2048’i modern web teknolojileriyle yeniden yazdığım hızlı ve akıcı bir web oyunu.',
        description: [
          'Bu proje, klasik 2048’in mekaniklerini modern frontend ile yeniden kurcalamak için yaptığım bir çalışma.',
          'Grid sistemi, tile animasyonları, birleşme mantığı ve skor hesaplamasını tamamen kendim kurguladım. Hem klavye hem de dokunma desteği var.',
          'LocalStorage ile skor kaydını kalıcı tuttum; tarayıcı kapansa bile devam edilebiliyor.',
          'Arayüzü sade ve gözü yormayan bir şekilde tasarladım. Hem performans hem de akıcılık odaklı kompakt bir oyun oldu.'
        ]
      },

      enderbot: {
        title: 'EnderBot – Çok Amaçlı Discord Botu',
        short:
          'Moderasyon, otomasyon ve eğlence özelliklerini tek botta topladığım çok amaçlı Discord projem.',
        description: [
          'EnderBot, Discord sunucularındaki işleri otomatikleştirmek için geliştirdiğim çok modüllü bir bot.',
          'Modüler komut yapısı ve event odaklı mimariyle farklı senaryolara uyum sağlayan bir çekirdek kurdum.',
          'Zamanla projeyi rafa kaldırdım ama altyapısı hâlâ sağlam ve ileride başka projelere temel olabilecek durumda.',
          'Bu bot, Discord API ve event-driven sistemler konusunda ciddi bir deneyim kazanmamı sağladı.'
        ]
      },

      slipyapp: {
        title: 'SlipyApp – Modern SuperApp Girişimi',
        short:
          'Forum, blog ve içerik akışını aynı platformda toplamak için geliştirdiğim SuperApp denemesi.',
        description: [
          'SlipyApp, farklı içerik türlerini tek bir akışta birleştirme fikriyle ortaya çıktı.',
          'Next.js + TypeScript + PostgreSQL üzerinde sağlam bir veri modeli ve API yapısı kurdum.',
          'Blog ve forum tarafını; kategoriler, etiketler, markdown editör ve oylama sistemiyle birlikte ilk fazda tamamladım.',
          'Şimdilik beklemede ama altyapısı modern ve genişlemeye açık. İstersem kaldığım yerden büyütülebilecek bir proje.'
        ]
      },

      kutuphaneTakip: {
        title: 'Kütüphane Kitap Takip Uygulaması',
        short:
          'Kütüphaneden alınan kitapları ve okuma geçmişini takip etmek için yaptığım mobil uygulama denemesi.',
        description: [
          'Bu proje, kütüphaneden aldığım kitapları düzgünce takip edemediğimi fark etmemle ortaya çıktı.',
          'Mobil odaklı, anlaşılır kartlar ve onboarding akışlarıyla basit ama iş gören bir arayüz kurdum.',
          'React Native üzerinde hızlı bir prototip hazırladım; veri modeli için PostgreSQL tabanlı bir yapı planladım.',
          'Aktif geliştirmede değil ama ileride rozet sistemi, okuma analizi gibi özelliklerle genişletilebilecek bir proje.'
        ]
      },

      akilliSera: {
        title: 'Akıllı Sera ve Bitki Takip Sistemi',
        short:
          'Bitki ortamını sensörlerle ölçen ve mobil arayüze aktaran akıllı sera çalışmam.',
        description: [
          'Akıllı Sera, bitkilerin ışık, sıcaklık, nem gibi değerlerini gerçek zamanlı takip etmek için geliştirdiğim bir sistem.',
          'Raspberry Pi ve ESP sensörleriyle verileri kablosuz topladım ve mobil arayüze aktardım.',
          'Arayüzde bitki seçimi, sensör kartları ve hava durumu gibi bileşenler var; sistem tek saksıdan çoklu seraya ölçeklenebiliyor.',
          'Proje şu an pasif ama hedef bütün süreci otomasyona bağlayan kapsamlı bir yapıya dönüştürmek.'
        ]
      },

      akilliMama: {
        title: 'Akıllı Otomatik Mama Dağıtım Sistemi',
        short:
          'Evcil hayvanlara zamanlı mama veren Arduino tabanlı otomasyon sistemim.',
        description: [
          'Bu proje, evcil hayvanların mama düzenini otomatik hale getirmek için geliştirdiğim bir sistem.',
          'Arduino, servo motor ve sensörlerle çalışıyor; uygulama üzerinden manuel veya otomatik komut verilebiliyor.',
          'Mobil arayüzü sade ve büyük butonlu tutarak herkesin rahat kullanabileceği bir düzen kurdum.',
          'Şimdilik prototip aşamasında ama ileride bildirim, tüketim analizi ve Wi-Fi modülleriyle çok daha akıllı hale gelebilir.'
        ]
      },

      marpel: {
        title: 'Marpel – Web Platformu',
        short:
          'Marpel Discord botunun web arayüzünü ve yönetim panelini geliştirdiğim proje.',
        description: [
          'Marpel, Discord sunucuları için moderasyon ve otomasyon sağlayan bir bot. Ben de bunun web tarafını geliştirdim.',
          'Next.js + TypeScript + Tailwind ile kullanıcıların botu tanıyabildiği ve premium özellikleri görebildiği bir arayüz hazırladım.',
          'Backend tarafında Express + TypeScript ile ödeme, üyelik ve doğrulama süreçlerini yöneten bir API tasarladım.',
          'Amaç botu sadece komut listesi olmaktan çıkarıp tam bir platform haline getirmekti.'
        ]
      },

      marpelNetwork: {
        title: 'Marpel Network – Web Platformu & Yönetim Sistemi',
        short:
          'Marpel Network için web arayüzü, mağaza ve yönetim panelini geliştirdiğim proje.',
        description: [
          'Marpel Network, özel ekonomi ve görev sistemleri olan bir Minecraft sunucusu. Ben web tarafının büyük kısmını üstlendim.',
          'Next.js ve Tailwind ile oyuncuların mağaza, etkinlik ve istatistiklere ulaşabildiği bir arayüz oluşturdum.',
          'Express + TypeScript tabanlı API ile mağaza, rol eşleştirmeleri ve kullanıcı akışlarını yöneten bir backend hazırladım.',
          'Projede hem tasarım hem teknik kararlar hem de ekip koordinasyonu tarafında aktif rol aldım.'
        ]
      },

      akilliGorevAtama: {
        title: 'Akıllı Görev Atama Sistemi',
        short:
          'Çalışanların iş yükünü analiz edip mantıklı görev önceliği çıkaran deneysel görev atama sistemi.',
        description: [
          'Akıllı Görev Atama, yöneticilerin görev atarken daha hızlı ve mantıklı karar vermesini sağlamak için geliştirdiğim bir sistem.',
          'Backend .NET + PostgreSQL; bazı senaryolarda ML.NET ile tahmin modelleri deniyorum.',
          'Yönetici tarafında görev oluşturma ve önerilen çalışan listesi; çalışan tarafında ise atanan işler ve tarihler yer alıyor.',
          'Hedefim; farklı sistemlerle entegre olabilen esnek ve modüler bir çekirdek oluşturmak.'
        ]
      },

      cafus: {
        title: 'Cafus – Özelleştirilebilir Kafe Otomasyon ve QR Menü Sistemi',
        short:
          'Kafelerin masa düzeni, QR menü ve sipariş akışını tek panelde toplamak için geliştirdiğim sistem.',
        description: [
          'Cafus, klasik POS mantığını modern bir yapıya taşımak için tasarladığım bir platform.',
          'Masa düzeni çizimi, QR üretimi, rezervasyon ve sipariş akışları aynı panelden yönetiliyor.',
          'Müşteri tarafında hedef; QR okut → menü açıl → sipariş ver akışıyla friksiyonsuz bir deneyim.',
          'Arka planda tüm hareketleri izleyip işletmelere analitik sağlayan bir yapı hedefliyorum.'
        ]
      },

      webErp: {
        title: 'Web ERP – Özelleştirilebilir Kurumsal Yönetim Platformu',
        short:
          'UI kitini sıfırdan yazdığım, masaüstü uygulaması hissi veren kurumsal ERP arayüzü.',
        description: [
          'Web ERP, tarayıcıda masaüstü uygulaması hissi vermek için geliştirdiğim bir proje.',
          'Hazır tema yok; butonundan grid’ine kadar tüm arayüz bileşenlerini kendim tasarladım.',
          'Dinamik sidebar, kısayollar, son kullanılan ekranlar ve modüler yapı ile esnek bir kullanım sağlıyor.',
          'Amaç, farklı firma süreçlerini büyütülebilir ve düzenli bir yapıya oturtmak.'
        ]
      },

      stok: {
        title: 'Stok Yönetimi ve Depo Otomasyonu',
        short:
          'Stok, depo ve sayım süreçlerini düzenli şekilde yönetmek için geliştirdiğim stok otomasyon çekirdeği.',
        description: [
          'Bu proje, envanteri Excel’le yönetmenin zorluğunu ortadan kaldırmak için geliştirdiğim bir stok sistemi.',
          'Ürün kartları, varyantlar, depolar, hareket fişleri, transfer süreçleri ve raporlamalar tek yerde toplanıyor.',
          'Barkod/QR desteğiyle giriş, çıkış ve sayım işlemleri hızlı ve hatasız yapılabiliyor.',
          'Arayüz tamamen kendi UI kitim; hız, düzen ve netlik odaklı bir yapı kurdum.'
        ]
      }
    }
  },
  apps: {
    title: 'Uygulamalar',
    description:
      'Küçük araçlar, mini oyunlar ve aklıma geldikçe eklediğim deneysel şeyler.',
    badge: 'Her türlü araç/gereç ve oyunlar',
    tabs: {
      all: 'Tümü',
      tools: 'Araçlar',
      games: 'Oyunlar',
      fun: 'Eğlence'
    },
    common: {
      add: 'Ekle',
      clear: 'Temizle',
      remove: 'Sil',
      copy: 'Kopyala',
      copied: 'Kopyalandı!'
    },
    items: {
      randomPicker: {
        title: 'Rastgele Çekiliş',
        desc: 'Yazdığın maddeler arasından rastgele seçim yapar.'
      },
      dice: {
        title: 'Zar At',
        desc: 'İstediğin sayıda zarı tek tıkla at.'
      },
      tetris: {
        title: 'Tetris',
        desc: 'Klasik tetris, basit ve temiz bir arayüzle.'
      },
      qr: {
        title: 'QR Kod Oluşturucu',
        desc: 'Metin veya URL’den QR üret; renk ve boyutunu istediğin gibi ayarla.'
      },
      spin: {
        title: 'Şişe Çevirmece',
        desc: 'Klasik doğruluk/cesaret oyununu dijitale taşıyan küçük bir araç.'
      },
      pass: {
        title: 'Şifre Oluşturucu',
        desc: 'Belirlediğin kurallara göre güçlü şifreler üretmene yardım eder.'
      },
      color: {
        title: 'Renk Araçları',
        desc: 'Arka plan/yazı renklerini gir; kontrast uyumunu ve derecesini gör.'
      },
      uuid: {
        title: 'UUID Üretici',
        desc: 'İstediğin sayıda UUID v4 üretmek için ufak bir yardımcı.'
      },
      minesweeper: {
        title: 'Mayın Tarlası',
        desc: 'Klasik mayın bulmaca: kareleri aç, mayınları işaretle, alanı temizle.'
      },
      tictactoe: {
        title: 'XOX',
        desc: '3x3 tahtada X ve O savaşı. Tek veya iki kişilik modlarda oyna.'
      },
      snake: {
        title: 'Yılan',
        desc: 'Noktaları toplayıp uzayan klasik yılan oyunu. Çarpmamaya dikkat.'
      },
      memory: {
        title: 'Hafıza Eşleştirme',
        desc: 'Kartları çevir, aynı emojileri yakala. En az hamlede bitirmeye çalış.'
      },
      json: {
        title: 'JSON Aracı',
        desc: 'JSON’u biçimlendir, doğrula, küçült/büyüt; anahtarları hızlıca kopyala.'
      },
      imgcompress: {
        title: 'Görsel Sıkıştırıcı',
        desc: 'Genişlik ve kalite ver; tek tıkla daha hafif JPEG çıktısı al.'
      },
      unit: {
        title: 'Birim Dönüştürücü',
        desc: 'Uzunluk, ağırlık, sıcaklık, veri ve hız birimlerini hızlıca çevir.'
      },

      meme: {
        title: 'Meme Üretici',
        desc: 'Fotoğrafa üst/alt yazı ekle; klasik kapak tarzı memeleri PNG olarak indir.'
      },
      namewheel: {
        title: 'İsim Çarkı',
        desc: 'İsimleri yaz, çarkı çevir; adil ve görsel olarak keyifli bir seçim aracı.'
      }
    },
    randomPicker: {
      modes: { single: 'Tek Ekle', bulk: 'Toplu Ekle' },
      placeholderSingle: 'İsim/öğe girin',
      placeholderBulk: 'Her satıra bir öğe...',
      trim: 'Satırları Temizle',
      shuffle: 'Karıştır',
      dedupe: 'Yinelenenleri Sil',
      allowRepeats: 'Tekrar eden çekilişe izin ver',
      counts: 'Sayım',
      items: 'öğe',
      picks: 'çekiliş',
      empty: 'Liste boş. Yukarıdan öğe ekleyin.',
      pickWinner: 'Kazananı Seç',
      clearHistory: 'Geçmişi Temizle',
      winner: 'Kazanan',
      noWinner: 'Henüz belirlenmedi',
      history: 'Geçmiş',
      noHistory: 'Kayıt yok'
    },
    spin: {
      placeholder: 'Oyuncu ekle',
      playersEmpty: 'Henüz oyuncu eklenmemiş.',
      spin: 'Çevir',
      asker: 'Soruyu soran',
      answerer: 'Soruyu cevaplayan'
    },

    dice: {
      count: 'Zar adedi',
      roll: 'Salla & At',
      total: 'Toplam',
      empty: 'Henüz zar atılmadı.',
      face: 'Yüz',
      quick: '{{n}} adet',
      size: { sm: 'Küçük', md: 'Orta', lg: 'Büyük' }
    },

    pass: {
      length: 'Uzunluk',
      upper: 'Büyük harf kullan',
      digit: 'Rakam kullan',
      symbol: 'Sembol kullan',
      generate: 'Şifre Oluştur',
      copied: 'Kopyalandı',
      strength: {
        tooWeak: 'Çok zayıf',
        weak: 'Zayıf',
        medium: 'Orta',
        strong: 'Güçlü',
        veryStrong: 'Çok güçlü'
      }
    },

    qr: {
      tabUrl: 'URL QR Kodu',
      tabText: 'Metin QR Kodu',
      url: 'Yönlendirilecek URL',
      text: 'Metin',
      size: 'Boyut',
      fg: 'QR Rengi',
      bg: 'Arka Plan',
      fileLogo: 'Logo (Dosya, isteğe bağlı)',
      download: 'İndir',
      fallback: 'QR kütüphanesi bulunamadı (dev).',
      chooseFile: 'Dosya Seç',
      noFile: 'Seçili dosya yok.'
    },

    uuid: {
      create: 'Oluştur',
      empty: 'Henüz bir UUID oluşturulmadı.',
      countPlaceholder: 'Miktar'
    },

    tetris: {
      points: 'Puan',
      lines: 'Satır',
      paused: 'Oyun Durduruldu',
      lost: 'Kaybettin!',
      resume: 'Devam Et',
      pause: 'Durdur',
      restart: 'Yeniden Oyna',
      controls: {
        left: 'Sol',
        right: 'Sağ',
        rotate: 'Döndür',
        down: 'Aşağı',
        drop: 'Bırak',
        hold: 'Tut'
      }
    },
    color: {
      button: 'Buton',
      previewTitle: 'Önizleme',
      previewDesc:
        'Glass-ice temada buton/metin görünürlüğünü bu blokta test edebilirsin.',
      contrast: 'Kontrast Oranı',
      invert: 'Ters Çevir',
      low: 'düşük',
      bg: 'Arka Plan',
      fg: 'Ön Plan'
    },
    minesweeper: {
      title: 'Mayın Tarlası',
      easy: 'Kolay',
      medium: 'Orta',
      hard: 'Zor',
      refresh: 'Yenile',
      remaining: 'Kalan mayın',
      flagHint: 'Sağ tık: 🚩 bayrak',
      win: 'Kazandın 🎉',
      lose: 'Kaybettin 😢'
    },
    tictactoe: {
      twoPlayer: '2 Oyuncu',
      smartBot: 'Zeki Bot',
      refresh: 'Yenile',
      turn: 'Sıra',
      winner: 'Kazanan',
      draw: 'Berabere'
    },
    snake: {
      speed: { slow: 'Yavaş', mid: 'Orta', fast: 'Hızlı' },
      start: 'Başlat',
      pause: 'Duraklat',
      reset: 'Sıfırla',
      score: 'Skor',
      paused: 'Oyun durduruldu',
      gameOver: 'Oyun bitti!',
      hint: 'Ok tuşları ile oynanır.'
    },
    memory: {
      moves: 'Hamle',
      refresh: 'Yenile',
      finished: 'Bitti',
      time: 'Süre',
      pause: 'Durdur',
      resume: 'Devam Et',
      startHint: 'Başlamak için bir kart aç.'
    },
    imgcompress: {
      file: 'Dosya',
      width: 'Genişlik',
      original: 'Orijinal',
      quality: 'Kalite',
      preview: 'Önizleme',
      download: 'İndir',
      stats: 'İstatistik',
      source: 'Kaynak',
      output: 'Çıktı (yaklaşık)',
      ratio: 'Oran',
      hint: 'Canvas ekrana sığacak şekilde ölçeklenir; indirilen dosya canvas’ın iç piksel boyutuna göre üretilir.',
      noFile: 'Henüz dosya eklenmemiş.'
    },
    unit: {
      value: 'Değer',
      from: 'Kaynak Birim',
      cats: {
        length: 'Uzunluk',
        weight: 'Ağırlık',
        temp: 'Sıcaklık',
        data: 'Veri',
        speed: 'Hız'
      },
      names: {
        meter: 'Metre',
        kilometer: 'Kilometre',
        centimeter: 'Santimetre',
        inch: 'İnç',
        feet: 'Feet',
        kilogram: 'Kilogram',
        gram: 'Gram',
        pound: 'Pound',
        celsius: '°C',
        fahrenheit: '°F',
        kelvin: 'K',
        byte: 'Byte',
        kb: 'KB',
        mb: 'MB',
        gb: 'GB',
        mps: 'm/s',
        kmh: 'km/s',
        mph: 'mph'
      }
    },
    meme: {
      top: 'Üst yazı',
      bottom: 'Alt yazı',
      topDefault: 'ÜST YAZI',
      bottomDefault: 'ALT YAZI',
      size: 'Boyut',
      download: 'İndir',
      uppercase: 'Büyük harf',
      stroke: 'Kontur',
      margin: 'Kenar boşluğu',
      align: {
        left: 'Sol',
        center: 'Orta',
        right: 'Sağ'
      },
      chooseImage: 'Dosya',
      noFile: 'Henüz dosya yüklenmemiş'
    },
    namewheel: {
      placeholder: 'İsim',
      empty: 'Henüz isim eklenmedi.',
      spin: 'Çevir'
    }
  },
  works: {
    description:
      'YouTube videolarım, çıkacak müziklerim ve üzerinde çalıştığım film & senaryo projeleri burada birleşiyor.',
    heroTitle: 'Üreten taraf: videolar, müzikler, filmler',
    heroDesc:
      'SlipBey olarak anlattığım videolar, yayınlayacağım müzikler ve arka planda yazdığım kısa film/senaryo projelerini tek sayfada topladım.',
    youtube: {
      title: 'YouTube Videolarım',
      empty: 'API şuanda yanıt vermiyor, lütfen beklemede kalın.',
      watch: 'Görüntülenme'
    },
    music: {
      type: {
        single: 'Müzik',
        ep: 'EP',
        album: 'Albüm'
      }
    }
  },
  contact: {
    title: 'İletişim',
    description:
      'Fikir, proje, yazılım geliştirme ya da içerik işbirliği için bu sayfadan doğrudan ulaşabilirsin.',
    hero: {
      badge: 'İletişim',
      title: 'Doğrudan SlipBey ile konuş.',
      subtitle:
        'Yeni ürün fikirleri, mevcut projelerin için destek ya da içerik işbirliği… Kısaca ne düşündüğünü anlat, birlikte planlayalım.',
      ctaMail: 'Mail at'
    },
    formTitle: 'İletişim Formu',
    formDescription:
      'Kısa ve net yazman yeterli. Genellikle aynı gün içinde dönüş yapıyorum.',
    name: {
      label: 'Ad Soyad',
      placeholder: 'Adını ve soyadını yaz'
    },
    subjects: {
      label: 'Konu',
      options: {
        general: 'Genel',
        project: 'Proje / geliştirme',
        collab: 'İşbirliği & ortaklık',
        media: 'YouTube / içerik & medya'
      }
    },
    mail: {
      label: 'E-posta',
      placeholder: 'ornek@gmail.com'
    },
    phone: {
      label: 'Telefon'
    },
    message: {
      label: 'Mesajın',
      placeholder: 'Kısaca ne hakkında konuşmak istediğini yaz...'
    },
    button: 'Mesajı Gönder',
    sending: 'Gönderiliyor...',
    success: 'Mesajın alındı. En kısa sürede dönüş yapacağım.',
    error:
      'Mesaj gönderilirken bir sorun oluştu. Lütfen daha sonra tekrar dene veya e-posta ile ulaş.',
    sidebar: {
      title: 'İletişim kanalları',
      subtitle:
        'Formu kullanabilir, doğrudan e-posta atabilir veya sosyal hesaplar üzerinden ulaşabilirsin.',
      socialsTitle: 'Sosyal hesaplar',
      response: 'Genelde 24 saat içinde dönüş yapıyorum.'
    }
  },
  notFound: {
    badge: 'Kaybolmuş piksel',
    title: 'Aradığın sayfayı bulamadım.',
    description:
      'Link değişmiş, proje taşınmış ya da hiç var olmamış olabilir. URL’yi kontrol edebilir veya ana sayfaya dönebilirsin.',
    hint: 'Bir şeylerin yanlış olduğunu düşünüyorsan, iletişim sayfasından bana yazabilirsin.',
    label: 'sayfa bulunamadı',
    actions: {
      home: 'Ana sayfaya dön',
      projects: 'Projelerimi gör'
    }
  }
} as const
