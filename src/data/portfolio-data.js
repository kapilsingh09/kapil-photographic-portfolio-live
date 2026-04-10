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
        { name: "Dribbble", url: "#" }
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
  }
};
