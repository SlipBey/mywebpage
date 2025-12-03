export default {
  common: {
    brand: 'SlipBey',
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      apps: 'Apps',
      works: 'Works',
      contact: 'Contact'
    },
    add: 'Add',
    remove: 'Remove',
    clear: 'Clear'
  },
  home: {
    description: `Hello, I'm Berkant. I have been developing software for ${new Date().getFullYear() - 2016} years, creating projects from web to mobile by handling both the design and the architecture end-to-end. I focus on corporate ERP development and my Slipyme projects.`,
    hero: {
      name: 'SlipBey',
      subtitle: `Hi, I’m Berkant. I’ve been dealing with software for about ${
        new Date().getFullYear() - 2016
      } years. I build projects that jump between web, desktop, mobile and embedded systems, designing both the visuals and the infrastructure myself. By day I develop corporate ERP, and in the remaining time I try to grow my own venture Slipyme Company and my personal projects. Besides software, team management, script and lyric writing, blogging and film work are also part of my life.`,
      ctas: { about: 'About me', projects: 'My projects' },
      groups: {
        software: 'Software',
        creative: 'Creative',
        ops: 'Operations'
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
        directing: 'Directing',
        screenwriting: 'Screenwriting',
        songwriting: 'Songwriting',
        speaking: 'Public speaking',
        visualDesign: 'Visual design',
        aiContent: 'AI-powered content',
        productRoadmap: 'Product roadmapping',
        projectManagement: 'Project management',
        teamCoord: 'Team coordination',
        systemArch: 'System architecture'
      }
    },
    projects: {
      title: 'Projects',
      viewAll: 'View all'
    },
    works: {
      title: 'Works',
      seeAll: 'See all works',
      tabs: {
        youtube: 'YouTube',
        music: 'Music',
        film: 'Film & Screenwriting'
      },
      youtube: {
        empty:
          'YouTube data is currently not visible. The API is not responding; please stay tuned.',
        views: 'views'
      },
      music: {
        soonTitle: 'My Music Releases',
        soonHint:
          'Spotify data is currently not visible. The API is not responding; please stay tuned.'
      },
      film: {
        soonTitle: 'Film & script projects are in preparation.',
        soonHint: 'Once they are ready to share, they will appear here as well.'
      }
    },
    appsCta: {
      title: 'Apps',
      subtitle:
        'I wanted to keep my experimental projects, small tools and mini games together in one place.',
      viewApps: 'View apps'
    },
    contact: {
      title: 'Let’s build something together.',
      subtitle:
        'If you want to reach out for an idea, project or collaboration, I usually try to reply within the same day.',
      badges: { response: '24h avg. response' },
      cta: 'Contact page',
      stats: { years: 'years of experience', projects: 'completed projects' },
      mailHint: 'tap to write'
    }
  },
  footer: {
    about:
      'Whatever I am doing now is laying the foundation for what I want to build in the future.'
  },
  about: {
    title: 'About',
    description:
      'Full-stack developer, system architect, content creator and someone trying to build his own business on the side.',
    hero: {
      role: 'Full-Stack Developer',
      title: 'A bit about me',
      desc: 'Hi, I’m Berkant, a full-stack developer. I design and build products that run on web, mobile, desktop and embedded systems. Besides software, I’m also active in system architecture, project management and team coordination.\n\nMy project range is quite wide; during the day I work on corporate ERP systems, and in the evenings I dedicate time to my personal projects. Thanks to many years of experience in ERP, I have deep technical knowledge in this area.\n\nWhen I was in high school, we set up a technology lab with the support of my principal, and I became the team lead there, the most authorized person after the teachers. That experience was a turning point for me; for the first time I was managing a real team and coordinating all steps from planning to development.\n\nAt that time I didn’t just work on web or mobile; with Arduino, Raspberry Pi and custom PCBs we designed ourselves, I built many projects. Some of them drew a lot of attention and even received investment offers. But since I was still a student, I didn’t take those offers — looking back now, I think it was one of the biggest mistakes of my life.\n\nToday I’m literally “carving my bread out of stone”. I’m trying to build a startup from zero capital and grow it. I have many projects and I’m shipping them step by step in a planned way. After all the failures I’ve had in life, I want to succeed with these projects and one day fill this section with my achievements.',
      stats: [
        { k: 'years of experience', v: '10+' },
        { k: 'completed projects', v: '30+' },
        { k: 'active products', v: '6' },
        { k: 'total lines of code*', v: '1M+' }
      ],
      cta: 'View my projects'
    },
    tools: {
      title: 'Current Toolset'
    },
    cta: {
      title: 'Let’s turn an idea into a product together.',
      button: 'Get in touch'
    },
    focus: {
      title: 'What I Do',
      items: {
        youtube: {
          title: 'YouTube',
          desc: 'I create videos about technology and the strange sides of life. The script, shoot and edit are all done by me; I publish wherever it fits best.'
        },
        blog: {
          title: 'Blog / Tech Writing',
          desc: 'I take notes on technical problems I solve and architectural decisions I make. I write so that whoever reads can jump straight to the solution.'
        },
        screenplay: {
          title: 'Screenwriting & Film',
          desc: 'Short film ideas, scenes, characters… I collect the ones I like and develop them whenever I find time. Visual storytelling is something I enjoy.'
        },
        songwriting: {
          title: 'Songwriting / Music',
          desc: 'I turn the melodies in my head into lyrics. I also deal with the production side; not just vocals, but the whole structure.'
        },
        openSource: {
          title: 'Open Source',
          desc: 'I like turning recurring solutions from my projects into small tools and sharing them. It’s a note for myself and useful for others.'
        },
        productDesign: {
          title: 'Product & Design',
          desc: 'I design the look and flow of the products I use myself. I try to build clean, fast and non-confusing interfaces.'
        }
      }
    },
    domains: {
      title: 'Domains I Work In',
      items: {
        software: {
          title: 'Software Development',
          desc: 'I do full-stack work across web, desktop and backend. TypeScript, .NET, Node.js and PostgreSQL are my daily routine.'
        },
        mobile: {
          title: 'Mobile Apps',
          desc: 'On React Native and Kotlin; I write apps that really talk to the device with Bluetooth, sensors and native modules.'
        },
        design: {
          title: 'UI & Design',
          desc: 'I design clear, clean and non-confusing interfaces. Icons, flow, animations… I try to keep everything in the same visual language.'
        },
        cloud: {
          title: 'Cloud & DevOps',
          desc: 'I move projects from local to real environments. Next.js deployments, API security, CI/CD and performance tuning are my playground.'
        },
        systems: {
          title: 'System Architecture',
          desc: 'I like building readable, extensible systems. It’s important for me to clearly see where and how an application flows.'
        },
        ai: {
          title: 'AI & ML',
          desc: 'I experiment with models for task assignment, prediction and simple ML scenarios. Building decision support systems is fun for me.'
        },
        automation: {
          title: 'Automation & Hardware',
          desc: 'With Arduino, Raspberry Pi and PCB designs I build systems that talk to the physical world. Combining sensor data with software is satisfying.'
        },
        media: {
          title: 'Media & Content',
          desc: 'Whether video, music or narrative, I’m active at every step from idea to final cut.'
        }
      }
    }
  },
  project: {
    badge: 'Portfolio / Products',
    title: 'Projects',
    description:
      'I gathered the projects I’ve worked on in one place. Detail pages include long descriptions as well as visuals/presentations.',
    total: 'Total projects:',
    labels: {
      site: 'Site',
      github: 'GitHub'
    },
    status: {
      active: 'Active',
      inactive: 'Inactive',
      wip: 'In progress'
    },
    github: {
      title: 'GitHub',
      pinnedTitle: 'Pinned projects',
      updated: 'Updated',
      moreOnGithub: 'See all projects on GitHub',
      pinnedChip: 'Pinned'
    }
  },
  projects: {
    items: {
      slipyme: {
        title: 'Slipyme Company',
        short:
          'Slipyme is my main workspace where I collect the software, design, game and media work I’ve done over the years.',
        description: [
          'For me, Slipyme is not just a brand; it’s the main umbrella where everything I produce is organized. Web apps, mobile work, game experiments and design projects all gather here.',
          'On the tech side I use whatever the job needs. Next.js, TypeScript, Tailwind, React Native… The common point is building a clean and maintainable structure.',
          'The goal of Slipyme is to group the things I do in different areas and offer a place where people can browse them comfortably. Some projects are finished, some experimental, some are simply early steps for the future.',
          'In the long run I want Slipyme to become a stable ecosystem where I both launch my own products and provide infrastructure for external projects.'
        ]
      },

      oguzhanPortfolio: {
        title: 'Oguzhan Tanitmis – Personal Portfolio',
        short:
          'A portfolio I built to clearly present Oguzhan’s game servers and infrastructure projects.',
        description: [
          'This project was created to present Oguzhan’s work in network and game servers in a structured, readable and clear way.',
          'Design-wise, speed, simplicity and order were the main goals. I wanted visitors to instantly understand “what is where”.',
          'On the technical side I used Next.js, TypeScript and Tailwind. With multi-language support and responsive design, both content and performance came together nicely.',
          'The aim was to explain complex work not with fancy sentences, but as it is, with a clear voice and a simple interface.'
        ]
      },

      game2048: {
        title: '2048 – Modern Web Game',
        short:
          'A fast and smooth web version of 2048 that I rebuilt using modern web technologies.',
        description: [
          'This project is a playground where I rebuilt the mechanics of classic 2048 with modern frontend.',
          'I implemented the grid system, tile animations, merge logic and score calculation from scratch. It supports both keyboard and touch.',
          'With LocalStorage the score persists; you can continue even after closing the browser.',
          'The interface is minimal and easy on the eyes. It turned into a compact game focused on performance and smoothness.'
        ]
      },

      enderbot: {
        title: 'EnderBot – Multipurpose Discord Bot',
        short:
          'A multipurpose Discord bot where I combined moderation, automation and fun features.',
        description: [
          'EnderBot is a multi-module bot I built to automate things in Discord servers.',
          'With a modular command structure and event-driven architecture, I designed a core that can adapt to different scenarios.',
          'I eventually shelved the project, but the infrastructure is still solid and can be the base of other projects later.',
          'This bot gave me serious experience with the Discord API and event-driven systems.'
        ]
      },

      slipyapp: {
        title: 'SlipyApp – Modern SuperApp Experiment',
        short:
          'A SuperApp-style experiment I built to bring forum, blog and content feed into the same platform.',
        description: [
          'SlipyApp was born from the idea of merging different content types into a single stream.',
          'On Next.js + TypeScript + PostgreSQL I set up a solid data model and API structure.',
          'In the first phase I completed the blog and forum side with categories, tags, markdown editor and voting system.',
          'It’s on hold for now but the infrastructure is modern and open to expansion. I can pick it up and grow it whenever I want.'
        ]
      },

      kutuphaneTakip: {
        title: 'Library Book Tracking App',
        short:
          'A mobile app experiment I built to track borrowed books and reading history.',
        description: [
          'This project started when I realized I couldn’t properly track books I borrowed from the library.',
          'With a mobile-first approach, clear cards and onboarding flows, I built a simple but useful interface.',
          'I quickly prototyped it in React Native and planned a PostgreSQL-based data model.',
          'It’s not under active development right now but it’s a project that can later be expanded with features like badges and reading analytics.'
        ]
      },

      akilliSera: {
        title: 'Smart Greenhouse & Plant Tracking System',
        short:
          'My smart greenhouse project that measures plant environment with sensors and sends it to a mobile UI.',
        description: [
          'Smart Greenhouse is a system I built to monitor values like light, temperature and humidity for plants in real time.',
          'I collected data wirelessly with Raspberry Pi and ESP sensors and sent it to a mobile interface.',
          'The UI has plant selection, sensor cards and weather widgets; the system can scale from a single pot to multiple greenhouses.',
          'The project is currently passive, but the goal is to turn it into a fully automated, comprehensive structure.'
        ]
      },

      akilliMama: {
        title: 'Smart Automatic Feeder System',
        short:
          'An Arduino-based automation system I built to feed pets on schedule.',
        description: [
          'This project is a system I developed to automate feeding routines for pets.',
          'It runs on Arduino, servo motors and sensors; you can control it manually or automatically via an app.',
          'I kept the mobile UI simple with large buttons so anyone can use it comfortably.',
          'For now it’s a prototype, but in the future it could become much smarter with notifications, consumption analytics and Wi-Fi modules.'
        ]
      },

      marpel: {
        title: 'Marpel – Web Platform',
        short:
          'The web interface and admin panel I built for the Marpel Discord bot.',
        description: [
          'Marpel is a bot that provides moderation and automation for Discord servers. I worked on its web side.',
          'With Next.js + TypeScript + Tailwind I built an interface where users can learn about the bot and see premium features.',
          'On the backend I designed an Express + TypeScript API that manages payments, subscriptions and verification flows.',
          'The goal was to turn the bot into a complete platform instead of just a command list.'
        ]
      },

      marpelNetwork: {
        title: 'Marpel Network – Web Platform & Admin System',
        short:
          'The website, store and admin panel I developed for Marpel Network.',
        description: [
          'Marpel Network is a Minecraft server with custom economy and task systems. I took on most of the web side.',
          'With Next.js and Tailwind I built an interface where players can access the store, events and stats.',
          'Using an Express + TypeScript API I implemented the backend that manages the store, role mapping and user flows.',
          'In this project I played an active role in design, technical decisions and team coordination.'
        ]
      },

      akilliGorevAtama: {
        title: 'Smart Task Assignment System',
        short:
          'An experimental task assignment system that analyzes employee workload and suggests reasonable priorities.',
        description: [
          'Smart Task Assignment is a system I built to help managers assign tasks faster and more logically.',
          'The backend is .NET + PostgreSQL; I experiment with ML.NET models in some scenarios.',
          'Managers can create tasks and see a suggested employee list; employees see their assigned tasks and dates.',
          'My goal is to create a flexible, modular core that can integrate with different systems.'
        ]
      },

      cafus: {
        title: 'Cafus – Customizable Cafe Automation and QR Menu System',
        short:
          'A system I built to manage table layout, QR menus and order flow for cafes from a single panel.',
        description: [
          'Cafus is a platform I designed to bring classic POS logic into a modern structure.',
          'Table layout drawing, QR generation, reservations and order flows are all managed from the same panel.',
          'On the customer side the goal is a frictionless experience: scan QR → open menu → place order.',
          'In the background I aim for a structure that tracks all activity and provides analytics to businesses.'
        ]
      },

      webErp: {
        title: 'Web ERP – Customizable Corporate Management Platform',
        short:
          'A corporate ERP interface that feels like a desktop app, with a UI kit I wrote from scratch.',
        description: [
          'Web ERP is a project I built to give a desktop-app feeling in the browser.',
          'There is no ready-made theme; I designed all UI components myself, from buttons to grids.',
          'With a dynamic sidebar, shortcuts, recent screens and modular structure it offers flexible usage.',
          'The goal is to place different company processes into a scalable and well-structured system.'
        ]
      },

      stok: {
        title: 'Inventory Management and Warehouse Automation',
        short:
          'A stock automation core I developed to manage inventory, warehouse and counting processes in an organized way.',
        description: [
          'This project is a stock system I built to escape the pain of managing inventory in Excel.',
          'Product cards, variants, warehouses, movement slips, transfer flows and reports are gathered in one place.',
          'With barcode/QR support, receiving, issuing and counting operations can be done quickly and accurately.',
          'The interface is entirely my own UI kit; I built it around speed, order and clarity.'
        ]
      }
    }
  },
  apps: {
    title: 'Apps',
    description:
      'Small tools, mini games and experimental things I add whenever they come to mind.',
    badge: 'All kinds of tools and games',
    tabs: {
      all: 'All',
      tools: 'Tools',
      games: 'Games',
      fun: 'Fun'
    },
    common: {
      add: 'Add',
      clear: 'Clear',
      remove: 'Remove',
      copy: 'Copy',
      copied: 'Copied!'
    },
    items: {
      randomPicker: {
        title: 'Random Picker',
        desc: 'Randomly picks from the items you enter.'
      },
      dice: {
        title: 'Roll Dice',
        desc: 'Roll as many dice as you want with one click.'
      },
      tetris: {
        title: 'Tetris',
        desc: 'Classic Tetris with a simple, clean interface.'
      },
      qr: {
        title: 'QR Code Generator',
        desc: 'Generate QR codes from text or URLs; customize color and size.'
      },
      spin: {
        title: 'Spin the Bottle',
        desc: 'A small tool that brings the classic truth/dare style game to digital.'
      },
      pass: {
        title: 'Password Generator',
        desc: 'Helps you generate strong passwords based on the rules you set.'
      },
      color: {
        title: 'Color Tools',
        desc: 'Enter background/text colors and see their contrast ratio and grade.'
      },
      uuid: {
        title: 'UUID Generator',
        desc: 'A tiny helper to generate as many UUID v4 values as you need.'
      },
      minesweeper: {
        title: 'Minesweeper',
        desc: 'Classic mine puzzle: open tiles, mark mines, clear the board.'
      },
      tictactoe: {
        title: 'Tic-Tac-Toe',
        desc: 'X and O battle on a 3x3 board. Play in single or two player mode.'
      },
      snake: {
        title: 'Snake',
        desc: 'Classic snake game: collect dots, grow longer, don’t crash.'
      },
      memory: {
        title: 'Memory Match',
        desc: 'Flip cards and match emojis. Try to finish in as few moves as possible.'
      },
      json: {
        title: 'JSON Tool',
        desc: 'Format, validate, minify/pretty-print JSON and quickly copy keys.'
      },
      imgcompress: {
        title: 'Image Compressor',
        desc: 'Set width and quality, then get a lighter JPEG output with one click.'
      },
      unit: {
        title: 'Unit Converter',
        desc: 'Quickly convert length, weight, temperature, data and speed units.'
      },

      meme: {
        title: 'Meme Maker',
        desc: 'Add top/bottom captions to a photo and download classic caption-style memes as PNG.'
      },
      namewheel: {
        title: 'Name Wheel',
        desc: 'Enter names, spin the wheel; a fair and visually fun way to pick someone.'
      }
    },
    randomPicker: {
      modes: { single: 'Single Add', bulk: 'Bulk Add' },
      placeholderSingle: 'Enter a name/item',
      placeholderBulk: 'One item per line...',
      trim: 'Clean Lines',
      shuffle: 'Shuffle',
      dedupe: 'Remove Duplicates',
      allowRepeats: 'Allow repeated picks',
      counts: 'Counts',
      items: 'items',
      picks: 'draws',
      empty: 'The list is empty. Add items above.',
      pickWinner: 'Pick Winner',
      clearHistory: 'Clear History',
      winner: 'Winner',
      noWinner: 'Not decided yet',
      history: 'History',
      noHistory: 'No records yet'
    },
    spin: {
      placeholder: 'Add player',
      playersEmpty: 'No players added yet.',
      spin: 'Spin',
      asker: 'Asking the question',
      answerer: 'Answering'
    },

    dice: {
      count: 'Number of dice',
      roll: 'Shake & Roll',
      total: 'Total',
      empty: 'No dice have been rolled yet.',
      face: 'Face',
      quick: '{{n}} dice',
      size: { sm: 'Small', md: 'Medium', lg: 'Large' }
    },

    pass: {
      length: 'Length',
      upper: 'Use uppercase letters',
      digit: 'Use digits',
      symbol: 'Use symbols',
      generate: 'Generate Password',
      copied: 'Copied',
      strength: {
        tooWeak: 'Too weak',
        weak: 'Weak',
        medium: 'Medium',
        strong: 'Strong',
        veryStrong: 'Very strong'
      }
    },

    qr: {
      tabUrl: 'URL QR Code',
      tabText: 'Text QR Code',
      url: 'Target URL',
      text: 'Text',
      size: 'Size',
      fg: 'QR Color',
      bg: 'Background',
      fileLogo: 'Logo (optional file)',
      download: 'Download',
      fallback: 'QR library not found (dev).',
      chooseFile: 'Choose File',
      noFile: 'No file selected.'
    },

    uuid: {
      create: 'Generate',
      empty: 'No UUID has been generated yet.',
      countPlaceholder: 'Amount'
    },

    tetris: {
      points: 'Score',
      lines: 'Lines',
      paused: 'Game Paused',
      lost: 'You lost!',
      resume: 'Resume',
      pause: 'Pause',
      restart: 'Restart',
      controls: {
        left: 'Left',
        right: 'Right',
        rotate: 'Rotate',
        down: 'Down',
        drop: 'Drop',
        hold: 'Hold'
      }
    },
    color: {
      button: 'Button',
      previewTitle: 'Preview',
      previewDesc:
        'You can test button/text visibility in a glass-ice themed block here.',
      contrast: 'Contrast Ratio',
      invert: 'Invert',
      low: 'low',
      bg: 'Background',
      fg: 'Foreground'
    },
    minesweeper: {
      title: 'Minesweeper',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      refresh: 'Refresh',
      remaining: 'Mines left',
      flagHint: 'Right click: 🚩 flag',
      win: 'You won 🎉',
      lose: 'You lost 😢'
    },
    tictactoe: {
      twoPlayer: '2 Players',
      smartBot: 'Smart Bot',
      refresh: 'Refresh',
      turn: 'Turn',
      winner: 'Winner',
      draw: 'Draw'
    },
    snake: {
      speed: { slow: 'Slow', mid: 'Medium', fast: 'Fast' },
      start: 'Start',
      pause: 'Pause',
      reset: 'Reset',
      score: 'Score',
      paused: 'Game paused',
      gameOver: 'Game over!',
      hint: 'Use arrow keys to play.'
    },
    memory: {
      moves: 'Moves',
      refresh: 'Refresh',
      finished: 'Finished',
      time: 'Time',
      pause: 'Pause',
      resume: 'Resume',
      startHint: 'Flip a card to start.'
    },
    imgcompress: {
      file: 'File',
      width: 'Width',
      original: 'Original',
      quality: 'Quality',
      preview: 'Preview',
      download: 'Download',
      stats: 'Stats',
      source: 'Source',
      output: 'Output (approx.)',
      ratio: 'Ratio',
      hint: 'The canvas scales to fit the screen; the downloaded file is generated based on the canvas pixel size.',
      noFile: 'No file has been added yet.'
    },
    unit: {
      value: 'Value',
      from: 'From Unit',
      cats: {
        length: 'Length',
        weight: 'Weight',
        temp: 'Temperature',
        data: 'Data',
        speed: 'Speed'
      },
      names: {
        meter: 'Meter',
        kilometer: 'Kilometer',
        centimeter: 'Centimeter',
        inch: 'Inch',
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
        kmh: 'km/h',
        mph: 'mph'
      }
    },
    meme: {
      top: 'Top text',
      bottom: 'Bottom text',
      topDefault: 'TOP TEXT',
      bottomDefault: 'BOTTOM TEXT',
      size: 'Size',
      download: 'Download',
      uppercase: 'Uppercase',
      stroke: 'Stroke',
      margin: 'Margin',
      align: {
        left: 'Left',
        center: 'Center',
        right: 'Right'
      },
      chooseImage: 'Image',
      noFile: 'No file uploaded yet.'
    },
    namewheel: {
      placeholder: 'Name',
      empty: 'No names have been added yet.',
      spin: 'Spin'
    }
  },
  works: {
    description:
      'My YouTube videos, upcoming music and film & script projects come together here.',
    heroTitle: 'The maker side: videos, music, films',
    heroDesc:
      'As SlipBey, I gathered the videos I make, the music I’ll release and the short film/script projects I write in the background on a single page.',
    youtube: {
      title: 'My YouTube Videos',
      empty: 'The API is currently not responding, please stay tuned.',
      watch: 'Views'
    },
    music: {
      type: {
        single: 'Single',
        ep: 'EP',
        album: 'Album'
      }
    }
  },
  contact: {
    title: 'Contact',
    description:
      'You can reach me directly from this page for ideas, projects, software development or content collaborations.',
    hero: {
      badge: 'Contact',
      title: 'Talk directly with SlipBey.',
      subtitle:
        'New product ideas, support for your current projects or content collaborations… Briefly tell me what you have in mind and we’ll plan it together.',
      ctaMail: 'Send mail'
    },
    formTitle: 'Contact Form',
    formDescription:
      'Keeping it short and clear is enough. I usually reply within the same day.',
    name: {
      label: 'Full Name',
      placeholder: 'Write your name and surname'
    },
    subjects: {
      label: 'Subject',
      options: {
        general: 'General',
        project: 'Project / development',
        collab: 'Collaboration & partnership',
        media: 'YouTube / content & media'
      }
    },
    mail: {
      label: 'E-mail',
      placeholder: 'example@gmail.com'
    },
    phone: {
      label: 'Phone'
    },
    message: {
      label: 'Message',
      placeholder: 'Briefly write what you’d like to talk about...'
    },
    button: 'Send Message',
    sending: 'Sending...',
    success:
      'Your message has been received. I’ll get back to you as soon as possible.',
    error:
      'There was a problem sending your message. Please try again later or contact me via e-mail.',
    sidebar: {
      title: 'Contact channels',
      subtitle:
        'You can use the form, send an e-mail directly or reach out via social accounts.',
      socialsTitle: 'Social accounts',
      response: 'I usually reply within 24 hours.'
    }
  },
  notFound: {
    badge: 'Lost pixel',
    title: 'I couldn’t find the page you’re looking for.',
    description:
      'The link may have changed, the project may have moved or it might never have existed. You can check the URL or go back to the homepage.',
    hint: 'If you think something is wrong, you can write to me via the contact page.',
    label: 'page not found',
    actions: {
      home: 'Back to homepage',
      projects: 'View my projects'
    }
  }
} as const
