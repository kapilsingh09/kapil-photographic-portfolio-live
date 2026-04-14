/**
 * PORTFOLIO DATA SYSTEM
 * This is the single source of truth for all images and content in the project.
 * Update this file to change text, images, or metadata without touching components.
 */

export const portfolioData = {
  // ── HERO SECTION ──
  hero: {
    title: "A place to display your masterpiece.",
    subtitle: "Photographers can showcase their work and clients can easily book them.",
    images: [
      { id: 1, src: "/images/img-1.jpg", tag: "@morgan", color: "bg-red-500" },
      { id: 2, src: "/images/img-2.jpg", tag: "@coplin", color: "bg-blue-500" },
      { id: 3, src: "/images/img-3.jpg", tag: "@robin", color: "bg-violet-600" },
      { id: 7, src: "/images/img-7.jpg", tag: "@taylor", color: "bg-amber-500" },
      { id: 5, src: "/images/img-5.jpg", tag: "@jordan", color: "bg-pink-500" },
      { id: 4, src: "/images/img-4.jpg", tag: "@andrea", color: "bg-green-500" },
      { id: 6, src: "/images/img-6.jpg", tag: "@alex", color: "bg-cyan-500" },
    ],
    splitSection: {
        tagline: "Photography & Portfolio",
        title: "Showcase, Sell, \n & acquire arts \n to our marketplace.",
        description: "A place to display your masterpiece. Dynamic community where artists and buyers seamlessly merge and grow together.",
        ctaPrimary: "Join for $9.99/m",
        ctaSecondary: "Read More"
    }
  },

  // ── VISUAL ANTHOLOGY (SLIDING CARDS) ──
  anthology: {
    tagline: "Visual Anthology",
    title: "Gateway to \n artistic masterworks.",
    items: [
      { id: 1, place: "@tokyo", info: "Neon reflections across the bustling Shibuya crossing under a midnight drizzle.", src: "/photocard_imgs/pc-img-1.jpg" },
      { id: 2, place: "@kyoto", info: "A quiet morning illuminating ancient wooden temples and crimson autumn leaves.", src: "/photocard_imgs/pc-img-2.jpg" },
      { id: 3, place: "@sapporo", info: "Pristine snowscapes stretching through quiet streets beneath the winter moon.", src: "/photocard_imgs/pc-img-3.jpg" },
      { id: 4, place: "@osaka", info: "Vibrant street food stalls glowing amidst the electric energy of Dotonbori.", src: "/photocard_imgs/pc-img-4.jpg" },
      { id: 5, place: "@nara", info: "Sunlight filtering softly through ancient forests and mist-covered shrines.", src: "/photocard_imgs/pc-img-5.jpg" },
      { id: 6, place: "@fuji", info: "A breathtaking silhouette of the iconic peak against a clear twilight sky.", src: "/photocard_imgs/pc-img-6.jpg" },
      { id: 7, place: "@hakone", info: "Steaming hot springs hidden within emerald valleys and misty mountain trails.", src: "/photocard_imgs/pc-img-7.jpg" },
      { id: 8, place: "@kobe", info: "Glistening city lights reflecting off the calm harbor waters at dusk.", src: "/photocard_imgs/pc-img-8.jpg" },
      { id: 9, place: "@okinawa", info: "Crystal-clear turquoise waves crashing against dramatic coral coastlines.", src: "/photocard_imgs/pc-img-9.jpg" },
      { id: 10, place: "@yokohama", info: "A modern skyline gleaming bright against the backdrop of an endless urban sprawl.", src: "/photocard_imgs/pc-img-10.jpg" },
    ]
  },

  // ── PRICING SECTION ──
  pricing: {
    heading: ["Book for.", "Stories.", "Adventures."],
    subtext: "Every frame tells a story. Choose a plan that fits your vision.",
    plans: {
      INR: [
        { label: 'Monthly', sym: '₹', num: '4,999', dec: '', sub: 'Regular monthly billing', featured: false },
        { label: 'Quarterly', sym: '₹', num: '11,999', dec: '', sub: 'Save ₹3,000 vs monthly', featured: true },
        { label: 'Annually', sym: '₹', num: '39,999', dec: '', sub: 'Best value — 40% off', featured: false },
      ],
      USD: [
        { label: 'Monthly', sym: '$', num: '59', dec: '.99', sub: 'Regular monthly billing', featured: false },
        { label: 'Quarterly', sym: '$', num: '143', dec: '.99', sub: 'Save $35 vs monthly', featured: true },
        { label: 'Annually', sym: '$', num: '479', dec: '.99', sub: 'Best value — 40% off', featured: false },
      ]
    }
  },

  // ── MODEL / ARTIST SECTION ──
  featuredArtist: {
    hero: {
        name: "Trisha Woodward",
        handle: "@artist",
        source: "from ArtRoss",
        image: "https://picsum.photos/seed/modelorange88/700/1050",
        avatar: "https://picsum.photos/seed/avtr42/80/80"
    },
    mobile: {
        title: "Scroll-driven story, mobile-ready.",
        description: "Desktop keeps the full sticky animation. On mobile we show a clean, readable card so the page never overflows."
    },
    tiles: [
      { seed:"ti01", tag: "@alex",   color: "bg-red-500" },
      { seed:"ti02", tag: "@jordan", color: "bg-blue-500" },
      { seed:"ti03", tag: "@taylor", color: "bg-green-500" },
      { seed:"ti04", tag: "@sam",    color: "bg-purple-500" },
      { seed:"ti05", tag: "@casey",  color: "bg-yellow-500" },
      { seed:"ti06", tag: "@riley",  color: "bg-pink-500" },
      { seed:"ti07", tag: "@morgan", color: "bg-indigo-500" },
      { seed:"ti08", tag: "@quinn",  color: "bg-teal-500" },
      { seed:"ti09", tag: "@avery",  color: "bg-orange-500" },
      { seed:"ti10", tag: "@dakota", color: "bg-cyan-500" },
      { seed:"ti11", tag: "@reese",  color: "bg-rose-500" },
      { seed:"ti12", tag: "@cam",    color: "bg-lime-500" },
      { seed:"ti13", tag: "@blake",  color: "bg-fuchsia-500" },
      { seed:"ti14", tag: "@drew",   color: "bg-sky-500" },
    ]
  },

  // ── TEAM / ABOUT SECTION (LastSection) ──
  about: {
    hero: {
      title: "Meet\nour team",
      description: "A passionate crew of photographers and storytellers, dedicated to capturing moments that last forever.",
      image: "/Team_Photo/waguri.jpg",
      cta: "Let's Meet"
    },
    archive: {
      title: "Archive\nof new arts",
      description: "Our portfolio is the canvas where every shutter click becomes a timeless piece, showcasing work to a broad audience.",
      image: "/Team_Photo/img-2.jpg",
      cta: "Archives"
    }
  },

  // ── COMPANY / SITE INFO ──
  site: {
    name: "kapil photography",
    copyright: "All rights reserved.",
    tagline: "Made with ♥ for visual storytellers",
    branding: {
        heading: "Your vision, our lens.",
        description: "In the realm of visual storytelling, creativity knows no bounds. This eternal marketplace celebrates the timeless nature of photography and cinematic art."
    },
    socials: [
        { name: "Instagram", url: "#" },
        { name: "Twitter", url: "#" },
        { name: "LinkedIn", url: "#" },
        { name: "Dribbble", url: "#" },
        { name: "GitHub", url: "https://github.com/kapilsingh09" }
    ],
    services: [
        { name: "Photography", badge: "New", url: "#" },
        { name: "Videography", url: "#" },
        { name: "Color Grading", url: "#" },
        { name: "Drone Aerials", url: "#" },
        { name: "E-Commerce", url: "#" }
    ],
    portfolios: [
        { name: "Weddings", url: "#" },
        { name: "Commercial", badge: "Soon", url: "#" }
    ]
  },

  // ── NAVBAR ──
  navbar: {
    logo: {
      text: "kapilsingh09",
      href: "/",
    },
    links: [
      { name: "Home", href: "/" },
      { name: "Gallery", href: "/gallery" },
      // { name: "Pricing", href: "/pricing" },
      { name: "Contact", href: "/contact" },
      { name: "About", href: "/about" },
    ],
    profile: {
      name: "Kapil Singh",
      role: "Photographer & Visual Artist",
      image: "/Team_Photo/waguri.jpg",
    }
  },

  // ── VIDEO SECTION ──
  videoSection: {
    header: {
      badge: "Masterpiece",
      title: "Showreel",
    },
    showcase: {
      tag: "Client Showcase",
      titleStart: "Cinematic",
      titleEnd: "Language.",
      description: "Experience visual storytelling that transcends conventional videography. We blend technical mastery with an artistic soul to create high-end films that provoke thought and inspire emotion for brands that demand the absolute best.",
    },
    capabilities: {
      title: "Our Capabilities",
      items: [
        { title: "Visual Storytelling", description: "Crafting narrative-driven reels with cinematic depth.", icon: "FaCirclePlay" },
        { title: "Precision Grading", description: "Custom color science tailored to evoke specific moods.", icon: "FaPalette" },
        { title: "Dynamic Movement", description: "Fluid motion capture using high-end stabilizing rigs.", icon: "FaUpDownLeftRight" },
      ]
    },
    video: {
      src: "/videos/vid-1.mp4",
      buttonText: "See Pricing Plans"
    }
  },

  // ── CONTACT PAGE ──
  contactPage: {
    header: {
      tag: "Inquire",
      title: "Let's tell your story.",
      description: "We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.",
    },
    whatsappBanner: "Fill in the details below — it will pre-fill your WhatsApp message so we can get started faster.",
    services: [
      { id: "photography", label: "Photography" },
      { id: "videography", label: "Videography" },
      { id: "both", label: "Photo + Video" },
      { id: "other", label: "Other" }
    ]
  },

  // ── GALLERY PAGE ──
  galleryPage: {
    header: {
      title: "The Archive",
      subtitle: "A curated collection of moments, places, and faces locked in time.",
    },
    pages: [
      {
        volume: 'Volume I',
        month: 'March',
        year: '2025',
        caption: 'Figure 1–7',
        tagline: 'Quiet streets & golden light',
        description: 'A month spent wandering old alleys and rooftops — every corner held a frame worth keeping.',
        photos: [
          { id: 1, src: '/photocard_imgs/pc-img-1.jpg', location: 'Jaipur, Rajasthan', label: 'click click ✦', rot: 1.5, size: 'wide' },
          { id: 2, src: '/photocard_imgs/pc-img-2.jpg', location: 'Udaipur, Rajasthan', label: 'golden hour ✿', rot: -1.2, size: 'wide' },
          { id: 3, src: '/photocard_imgs/pc-img-3.jpg', location: 'Jodhpur, Rajasthan', label: 'zzzz ♡', rot: 2, size: 'tall' },
          { id: 4, src: '/photocard_imgs/pc-img-4.jpg', location: 'Pushkar, Rajasthan', label: 'candid ☆', rot: -2.5, size: 'tall' },
          { id: 5, src: '/photocard_imgs/pc-img-5.jpg', location: 'Bikaner, Rajasthan', label: 'attention! ✉', rot: 1, size: 'tall' },
          { id: 6, src: '/photocard_imgs/pc-img-6.jpg', location: 'Jaisalmer, Rajasthan', label: 'de la cruise ✈', rot: -1.8, size: 'tall' },
          { id: 7, src: '/photocard_imgs/pc-img-7.jpg', location: 'Mount Abu, Rajasthan', label: '♥ ♥ ♥', rot: 0.8, size: 'wide' },
        ],
      },
      {
        volume: 'Volume II',
        month: 'January',
        year: '2025',
        caption: 'Figure 1–8',
        tagline: 'Into the hills & misty mornings',
        description: 'January brought fog, fireside cafés, and strangers who became faces I will never forget.',
        photos: [
          { id: 8, src: '/photocard_imgs/pc-img-8.jpg', location: 'Manali, Himachal', label: 'cheeeeese ☃', rot: -1.5, size: 'wide' },
          { id: 9, src: '/photocard_imgs/pc-img-9.jpg', location: 'Kasol, Himachal', label: 'squad goals ♛', rot: 1.8, size: 'wide' },
          { id: 10, src: '/images/img-1.jpg', location: 'Spiti Valley, HP', label: 'shutter ✦', rot: -2, size: 'tall' },
          { id: 11, src: '/images/img-2.jpg', location: 'Dharamshala, HP', label: 'café vibes ☕', rot: 2.5, size: 'tall' },
          { id: 12, src: '/images/img-3.jpg', location: 'Bir Billing, HP', label: 'fly high ✈', rot: -1, size: 'tall' },
          { id: 13, src: '/images/img-4.jpg', location: 'Shimla, HP', label: 'portrait mode ♡', rot: 1.5, size: 'tall' },
          { id: 14, src: '/images/img-5.jpg', location: 'Kufri, HP', label: 'snow days ❄', rot: -0.8, size: 'wide' },
          { id: 15, src: '/images/img-6.jpg', location: 'Chail, HP', label: 'night walks ★', rot: 1.2, size: 'wide' },
        ],
      },
    ]
  },

  // ── ABOUT PAGE ──
  aboutPage: {
    stats: [
      { value: '6+', label: 'Years Active', icon: 'Camera' },
      { value: '320+', label: 'Shoots Done', icon: 'Aperture' },
      { value: '98%', label: 'Happy Clients', icon: 'Star' },
      { value: '12+', label: 'Awards Won', icon: 'Award' },
    ],
    skills: [
      { name: 'Portrait', pct: 97 },
      { name: 'Wedding', pct: 92 },
      { name: 'Commercial', pct: 88 },
      { name: 'Landscape', pct: 85 },
      { name: 'Street', pct: 90 },
    ],
    gear: [
      { category: 'Body', items: ['Sony A7 IV', 'Fujifilm X-T5'] },
      { category: 'Lens', items: ['35mm f/1.4', '85mm f/1.8', '24-70mm f/2.8'] },
      { category: 'Light', items: ['Godox AD400 Pro', 'Profoto B10'] },
    ],
    brands: ['Vogue India', 'Nike', 'Nykaa', 'Forbes India', 'Zara'],
    testimonials: [
      { name: 'Aisha Mehta', role: 'Bride — Wedding', text: 'He captured every single emotion of our day. The photos felt like living memories.', avatar: 'AM', color: '#f5c340' },
      { name: 'Rohan Sharma', role: 'CEO, Brand Studio', text: 'Our brand campaign results doubled after working with him. The visuals were iconic.', avatar: 'RS', color: '#ff6b6b' },
      { name: 'Priya Kapoor', role: 'Model & Influencer', text: 'Working with him felt effortless. He made me feel comfortable and the shots were stunning.', avatar: 'PK', color: '#6c63ff' },
    ]
  }
};
