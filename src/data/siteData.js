// Galaxy Marble - Architectural Stone & Luxury Marble Collection
// Categories are strictly in ALL CAPS
// No prices displayed (Price on Request / WhatsApp Enquiry)

export const HERO_SLIDES = [
  {
    id: 1,
    image: "/herosection/image copy.png",
    mobileImage: "/herosection/image copy.png",
    badge: "Heritage Makrana & Sacred Art",
    title: "Timeless Luxury In Handcrafted Stone",
    subtitle: "Exquisite hand-carved Radha Krishna stone reliefs, bespoke pooja sanctums, and luxury architectural marble.",
    primaryBtn: "Explore Products",
    primaryLink: "/products",
    secondaryBtn: "Enquire on WhatsApp",
    secondaryLink: "#enquiry"
  },
  {
    id: 2,
    image: "/herosection/image.png",
    mobileImage: "/herosection/image.png",
    badge: "Architectural Wall Murals",
    title: "Sculpted 3D Fluted Stone Paneling",
    subtitle: "Transform your estate interiors with monumental fluted marble feature walls chiseled by Rajasthani master artisans.",
    primaryBtn: "View Collections",
    primaryLink: "/products",
    secondaryBtn: "Book Consultation",
    secondaryLink: "#consultation"
  },
  {
    id: 3,
    image: "/herosection/image copy 2.png",
    mobileImage: "/herosection/image copy 2.png",
    badge: "Monumental Wall Art & Carvings",
    title: "Artisanal Stone & Grand Architectural Facades",
    subtitle: "Bespoke 3D stone murals, sacred temple sanctums, and luxury monolithic installations crafted to perfection.",
    primaryBtn: "Explore Catalog",
    primaryLink: "/products",
    secondaryBtn: "Request Quote",
    secondaryLink: "#enquiry"
  }
];

export const TRUST_BADGES = [
  {
    title: "100% Pure Makrana & Italian Marble",
    desc: "Direct from historic Makrana and Carrara quarries, guaranteeing generational grandeur."
  },
  {
    title: "Master Architectural Artisans",
    desc: "Precision carving and CNC-aided hand chiseling by multi-generational stone sculptors."
  },
  {
    title: "Worldwide Insured Wooden Crating",
    desc: "Robust export-grade sea & air crating with 100% door-to-door transit insurance."
  },
  {
    title: "Custom Architectural Solutions",
    desc: "Tailored 3D CAD modeling, custom cut-to-size slabs, and site installation assistance."
  }
];

// Category Normalizer to guarantee consistent category matching
export const normalizeCategory = (cat) => {
  if (!cat) return 'TEMPLE';
  const c = cat.trim().toUpperCase();
  if (c === 'MANDIR' || c === 'MARBLE MANDIR' || c === 'MARBLE TEMPLE' || c === 'TEMPLE') return 'TEMPLE';
  if (c === 'FOUNTAIN' || c === 'WATER FOUNTAIN') return 'FOUNTAIN';
  if (c === 'TULSI POT' || c === 'MARBLE TULSI POT') return 'TULSI POT';
  if (c === 'KIBLA WORK' || c === 'KIBLA WORKS' || c === 'KIBLA-WORK') return 'KIBLA WORK';
  if (c === 'PEDESTAL BASIN' || c === 'PADESTIAL BASIN') return 'PEDESTAL BASIN';
  if (c === 'MARBLE BASIN' || c === 'BASIN') return 'MARBLE BASIN';
  if (c === 'MARBLE CONSOLE TABLE' || c === 'CONSOLE TABLE') return 'MARBLE CONSOLE TABLE';
  if (c === 'MARBLE FLOORING' || c === 'FLOORING') return 'MARBLE FLOORING';
  if (c === 'MASJID MIMBAR' || c === 'MIMBAR') return 'MASJID MIMBAR';
  if (c === 'CNC STONE WALL ART' || c === 'CNC STONE WALL PANEL' || c === 'WALL ART' || c === 'STONE WALL ART' || c === 'STONE ART') return 'CNC STONE WALL ART';
  return c;
};

// All Categories strictly in ALL CAPS - 10 Curated Disciplines with real image folders
export const ARCHITECTURAL_CATEGORIES = [
  {
    title: "TEMPLE",
    image: "/mandir/WhatsApp Image 2026-09-14 at 4.00.16 PM.jpeg",
    link: "/products?category=TEMPLE",
    count: 8,
    description: "Hand-carved pure Makrana white marble home pooja mandirs, shikhara temples, and sacred sanctums."
  },
  {
    title: "FOUNTAIN",
    image: "/fountain/WhatsApp Image 2026-09-13 at 6.14.38 PM.jpeg",
    link: "/products?category=FOUNTAIN",
    count: 12,
    description: "Multi-tiered classical courtyard fountains with lion spouts and reflecting pools."
  },
  {
    title: "KIBLA WORK",
    image: "/kibla-work/image.png",
    link: "/products?category=KIBLA%20WORK",
    count: 5,
    description: "Sacred Islamic Mihrabs, geometric arabesque arches, and Qibla wall stone carvings."
  },
  {
    title: "MARBLE BASIN",
    image: "/marble-basin/countertopmarblebasin.png",
    link: "/products?category=MARBLE%20BASIN",
    count: 15,
    description: "Counter-top hand-carved monolithic marble basins and luxury washbowls."
  },
  {
    title: "MARBLE CONSOLE TABLE",
    image: "/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.38 PM (1).jpeg",
    link: "/products?category=MARBLE%20CONSOLE%20TABLE",
    count: 7,
    description: "Luxury fluted marble console tables, side tables, and center table pedestals."
  },
  {
    title: "MARBLE FLOORING",
    image: "/marble-flooring/WhatsApp Image 2026-09-14 at 4.00.33 PM (1).jpeg",
    link: "/products?category=MARBLE%20FLOORING",
    count: 5,
    description: "Premium Italian & Makrana marble floor tiles, medallions, and bookmatched slab flooring."
  },
  {
    title: "MASJID MIMBAR",
    image: "/masjid-mimbar/image.png",
    link: "/products?category=MASJID%20MIMBAR",
    count: 7,
    description: "Hand-carved marble Masjid Mimbars, sacred pulpits, and Islamic architectural stone art."
  },
  {
    title: "PEDESTAL BASIN",
    image: "/padestial-basin/image.png",
    link: "/products?category=PEDESTAL%20BASIN",
    count: 5,
    description: "Monolithic freestanding fluted marble pedestal columns and powder room basins."
  },
  {
    title: "TULSI POT",
    image: "/tulsi-pot/WhatsApp Image 2026-09-13 at 6.13.25 PM.jpeg",
    link: "/products?category=TULSI%20POT",
    count: 5,
    description: "Sacred royal Makrana marble Tulsi Kyaras and carved botanical planters."
  },
  {
    title: "CNC STONE WALL ART",
    image: "/wall-art/image.png",
    link: "/products?category=CNC%20STONE%20WALL%20ART",
    count: 18,
    description: "Precision CNC 3D stone wall panels, wave reliefs, geometric murals, and bespoke architectural wall cladding."
  }
];

export const CATEGORIES = ARCHITECTURAL_CATEGORIES;

export const STONE_TYPES = [
  "Pure Makrana White",
  "Italian Statuario",
  "Vietnam Crystal White",
  "Black Banswara",
  "Jade Onyx",
  "Caramel Travertine"
];

// =====================================================
// SEED PRODUCTS - Real products from image folders
// =====================================================

export const SEED_PRODUCTS = [
  // ── MARBLE MANDIR (from public/mandir/) ──
  {
    id: "seed-mandir-01",
    title: "Royal Makrana White Marble Mandir with Shikhara Dome",
    category: "TEMPLE",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/mandir/WhatsApp Image 2026-09-14 at 4.00.16 PM.jpeg",
    images: ["/mandir/WhatsApp Image 2026-09-14 at 4.00.16 PM.jpeg", "/mandir/WhatsApp Image 2026-09-14 at 4.00.16 PM (1).jpeg"],
    description: "Grand hand-carved Makrana marble temple with intricate shikhara dome, fluted columns, and ornamental deity arch. Perfect for palatial pooja rooms.",
    in_stock: true
  },
  {
    id: "seed-mandir-02",
    title: "Classic Marble Pooja Mandir with Jali Lattice",
    category: "TEMPLE",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/mandir/WhatsApp Image 2026-09-14 at 4.00.17 PM.jpeg",
    images: ["/mandir/WhatsApp Image 2026-09-14 at 4.00.17 PM.jpeg", "/mandir/WhatsApp Image 2026-09-14 at 4.00.17 PM (1).jpeg"],
    description: "Elegant marble mandir featuring delicate jali lattice side panels, carved floral borders, and polished arch framing for home deity worship.",
    in_stock: true
  },
  {
    id: "seed-mandir-03",
    title: "Hand-Carved Fluted Pillar Marble Temple",
    category: "TEMPLE",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/mandir/WhatsApp Image 2026-09-14 at 4.00.18 PM.jpeg",
    images: ["/mandir/WhatsApp Image 2026-09-14 at 4.00.18 PM.jpeg", "/mandir/WhatsApp Image 2026-09-14 at 4.00.18 PM (1).jpeg", "/mandir/WhatsApp Image 2026-09-14 at 4.00.18 PM (2).jpeg"],
    description: "Pure white marble temple structure with hand-carved fluted pillars, kalash finial, and stepped base platform for sacred idol placement.",
    in_stock: true
  },
  {
    id: "seed-mandir-04",
    title: "Ornate Marble Sanctum with Carved Arches",
    category: "TEMPLE",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/mandir/WhatsApp Image 2026-09-14 at 4.00.19 PM.jpeg",
    images: ["/mandir/WhatsApp Image 2026-09-14 at 4.00.19 PM.jpeg", "/mandir/WhatsApp Image 2026-09-14 at 4.00.19 PM (1).jpeg"],
    description: "Ornamental marble sanctum featuring multi-tier carved arches, divine motifs, and raised pedestal for traditional pooja ceremonies.",
    in_stock: true
  },
  {
    id: "seed-mandir-05",
    title: "Compact Marble Home Mandir with Dome",
    category: "TEMPLE",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/mandir/WhatsApp Image 2026-09-14 at 4.00.20 PM.jpeg",
    images: ["/mandir/WhatsApp Image 2026-09-14 at 4.00.20 PM.jpeg", "/mandir/WhatsApp Image 2026-09-14 at 4.00.20 PM (1).jpeg"],
    description: "Space-efficient marble mandir with elegant dome top, carved borders, and pristine white finish. Ideal for apartments and modern homes.",
    in_stock: true
  },
  {
    id: "seed-mandir-06",
    title: "Heritage Marble Temple with Double Pillars",
    category: "TEMPLE",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/mandir/WhatsApp Image 2026-09-14 at 4.00.21 PM.jpeg",
    images: ["/mandir/WhatsApp Image 2026-09-14 at 4.00.21 PM.jpeg", "/mandir/WhatsApp Image 2026-09-14 at 4.00.21 PM (1).jpeg"],
    description: "Heritage-inspired marble temple featuring symmetrical double pillars, scalloped arches, and elaborate floral relief carvings.",
    in_stock: true
  },
  {
    id: "seed-mandir-07",
    title: "Traditional Marble Pooja Room Shrine",
    category: "TEMPLE",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/mandir/WhatsApp Image 2026-09-14 at 4.00.22 PM.jpeg",
    images: ["/mandir/WhatsApp Image 2026-09-14 at 4.00.22 PM.jpeg", "/mandir/WhatsApp Image 2026-09-14 at 4.00.22 PM (1).jpeg", "/mandir/WhatsApp Image 2026-09-14 at 4.00.22 PM (2).jpeg"],
    description: "Traditional carved marble shrine for dedicated pooja rooms with ornamental borders, finials, and multi-tier stepped base.",
    in_stock: true
  },
  {
    id: "seed-mandir-08",
    title: "Marble Mandir with Peacock Motif Carvings",
    category: "TEMPLE",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/mandir/WhatsApp Image 2026-09-14 at 4.00.23 PM.jpeg",
    images: ["/mandir/WhatsApp Image 2026-09-14 at 4.00.23 PM.jpeg", "/mandir/WhatsApp Image 2026-09-14 at 4.00.23 PM (1).jpeg"],
    description: "Exquisite marble mandir adorned with peacock motif carvings, lotus panels, and delicate filigree jali work on side panels.",
    in_stock: true
  },

  // ── MARBLE CONSOLE TABLE (from public/marble-console-table/) ──
  {
    id: "seed-console-01",
    title: "Fluted Marble Console Table - Classic White",
    category: "MARBLE CONSOLE TABLE",
    stone_type: "Italian Statuario",
    dimensions: "Custom Sizing Available",
    image: "/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.35 PM.jpeg",
    images: ["/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.35 PM.jpeg"],
    description: "Elegant fluted marble console table with clean white Italian stone top and hand-turned pedestal legs.",
    in_stock: true
  },
  {
    id: "seed-console-02",
    title: "Curved Marble Side Table with Gold Veining",
    category: "MARBLE CONSOLE TABLE",
    stone_type: "Italian Calacatta",
    dimensions: "Custom Sizing Available",
    image: "/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.36 PM (1).jpeg",
    images: ["/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.36 PM (1).jpeg", "/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.36 PM.jpeg"],
    description: "Sculptural curved marble side table featuring natural gold veining patterns and polished mirror finish.",
    in_stock: true
  },
  {
    id: "seed-console-03",
    title: "Art Deco Marble Entryway Console",
    category: "MARBLE CONSOLE TABLE",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.37 PM (1).jpeg",
    images: ["/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.37 PM (1).jpeg", "/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.37 PM (2).jpeg", "/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.37 PM.jpeg"],
    description: "Art Deco-inspired marble entryway console with geometric pedestal base and premium hand-polished top surface.",
    in_stock: true
  },
  {
    id: "seed-console-04",
    title: "Monolithic Marble Center Table",
    category: "MARBLE CONSOLE TABLE",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.38 PM (1).jpeg",
    images: ["/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.38 PM (1).jpeg", "/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.38 PM.jpeg"],
    description: "Solid monolithic marble center table carved from a single stone block with beveled edges and satin honed finish.",
    in_stock: true
  },
  {
    id: "seed-console-05",
    title: "Carved Pedestal Marble Table",
    category: "MARBLE CONSOLE TABLE",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.39 PM (1).jpeg",
    images: ["/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.39 PM (1).jpeg", "/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.39 PM (2).jpeg", "/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.39 PM.jpeg"],
    description: "Ornate carved pedestal marble table with floral relief base and round polished top. A timeless luxury centrepiece.",
    in_stock: true
  },
  {
    id: "seed-console-06",
    title: "Round Marble Dining Table with Fluted Base",
    category: "MARBLE CONSOLE TABLE",
    stone_type: "Italian Statuario",
    dimensions: "Custom Sizing Available",
    image: "/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.40 PM (1).jpeg",
    images: ["/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.40 PM (1).jpeg", "/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.40 PM.jpeg"],
    description: "Premium round marble dining table with a classical fluted cylindrical pedestal base and diamond-polished top.",
    in_stock: true
  },
  {
    id: "seed-console-07",
    title: "Luxury Marble Accent Table - Nero Marquina",
    category: "MARBLE CONSOLE TABLE",
    stone_type: "Black Banswara",
    dimensions: "Custom Sizing Available",
    image: "/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.41 PM (1).jpeg",
    images: ["/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.41 PM (1).jpeg", "/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.41 PM.jpeg"],
    description: "Sophisticated dark marble accent table in Nero Marquina finish with white veining and polished brass-effect edge.",
    in_stock: true
  },

  // ── MARBLE FLOORING (from public/marble-flooring/) ──
  {
    id: "seed-floor-01",
    title: "Italian Statuario Marble Floor Tile",
    category: "MARBLE FLOORING",
    stone_type: "Italian Statuario",
    dimensions: "Custom Cut-to-Size",
    image: "/marble-flooring/WhatsApp Image 2026-09-14 at 4.00.31 PM.jpeg",
    images: ["/marble-flooring/WhatsApp Image 2026-09-14 at 4.00.31 PM.jpeg"],
    description: "Premium Italian Statuario marble floor tiles with dramatic grey veining on pristine white surface. Bookmatched available.",
    in_stock: true
  },
  {
    id: "seed-floor-02",
    title: "Makrana White Marble Flooring Slab",
    category: "MARBLE FLOORING",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Cut-to-Size",
    image: "/marble-flooring/WhatsApp Image 2026-09-14 at 4.00.32 PM (1).jpeg",
    images: ["/marble-flooring/WhatsApp Image 2026-09-14 at 4.00.32 PM (1).jpeg", "/marble-flooring/WhatsApp Image 2026-09-14 at 4.00.32 PM.jpeg"],
    description: "Authentic Makrana white marble slab for luxury residential flooring with generational luster and 98% calcite purity.",
    in_stock: true
  },
  {
    id: "seed-floor-03",
    title: "Pietra Dura Inlay Marble Floor Medallion",
    category: "MARBLE FLOORING",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Cut-to-Size",
    image: "/marble-flooring/WhatsApp Image 2026-09-14 at 4.00.33 PM (1).jpeg",
    images: ["/marble-flooring/WhatsApp Image 2026-09-14 at 4.00.33 PM (1).jpeg", "/marble-flooring/WhatsApp Image 2026-09-14 at 4.00.33 PM.jpeg"],
    description: "Intricate Mughal-inspired Pietra Dura inlay floor medallion with semi-precious stone floral patterns in pure white marble.",
    in_stock: true
  },
  {
    id: "seed-floor-04",
    title: "Diamond Pattern Marble Floor Border",
    category: "MARBLE FLOORING",
    stone_type: "Italian Statuario",
    dimensions: "Custom Cut-to-Size",
    image: "/marble-flooring/WhatsApp Image 2026-09-14 at 4.00.34 PM (1).jpeg",
    images: ["/marble-flooring/WhatsApp Image 2026-09-14 at 4.00.34 PM (1).jpeg", "/marble-flooring/WhatsApp Image 2026-09-14 at 4.00.34 PM (2).jpeg", "/marble-flooring/WhatsApp Image 2026-09-14 at 4.00.34 PM.jpeg"],
    description: "Geometric diamond-cut marble floor border tiles with alternating stone tones for grand hallway and foyer installations.",
    in_stock: true
  },
  {
    id: "seed-floor-05",
    title: "Polished Marble Living Room Flooring",
    category: "MARBLE FLOORING",
    stone_type: "Vietnam Crystal White",
    dimensions: "Custom Cut-to-Size",
    image: "/marble-flooring/WhatsApp Image 2026-09-14 at 4.00.35 PM (1).jpeg",
    images: ["/marble-flooring/WhatsApp Image 2026-09-14 at 4.00.35 PM (1).jpeg", "/marble-flooring/WhatsApp Image 2026-09-14 at 4.00.35 PM.jpeg"],
    description: "High-gloss polished marble flooring for living rooms. Crystal white with uniform snow-white brilliance and micro-crystal texture.",
    in_stock: true
  },

  // ── MARBLE BASIN (from public/marble-basin/) ──
  {
    id: "seed-basin-01",
    title: "Countertop Carved Marble Wash Basin",
    category: "MARBLE BASIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/marble-basin/countertopmarblebasin.png",
    images: ["/marble-basin/countertopmarblebasin.png", "/marble-basin/image.png"],
    description: "Luxurious countertop marble wash basin hand-carved from a single Makrana stone block with smooth polished interior.",
    in_stock: true
  },
  {
    id: "seed-basin-02",
    title: "Onyx Marble Designer Basin",
    category: "MARBLE BASIN",
    stone_type: "Jade Onyx",
    dimensions: "Custom Sizing Available",
    image: "/marble-basin/onyxmarblebasin.png",
    images: ["/marble-basin/onyxmarblebasin.png"],
    description: "Exotic translucent onyx marble basin with backlit natural veining patterns. A statement piece for luxury bathrooms.",
    in_stock: true
  },
  {
    id: "seed-basin-03",
    title: "Granite & Marble Pedestal Basin",
    category: "MARBLE BASIN",
    stone_type: "Black Banswara",
    dimensions: "Custom Sizing Available",
    image: "/marble-basin/granitebasin.png",
    images: ["/marble-basin/granitebasin.png"],
    description: "Elegant dark granite and marble combination pedestal basin with contrasting white bowl and black granite pedestal.",
    in_stock: true
  },
  {
    id: "seed-basin-04",
    title: "Classic Round Marble Washbowl",
    category: "MARBLE BASIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/marble-basin/image copy.png",
    images: ["/marble-basin/image copy.png", "/marble-basin/image.png"],
    description: "Classic round marble washbowl with smooth curved edges, polished white finish, and sturdy monolithic construction.",
    in_stock: true
  },
  {
    id: "seed-basin-05",
    title: "Hand-Carved Floral Rim Marble Basin",
    category: "MARBLE BASIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/marble-basin/WhatsApp Image 2026-09-13 at 6.13.37 PM.jpeg",
    images: ["/marble-basin/WhatsApp Image 2026-09-13 at 6.13.37 PM.jpeg", "/marble-basin/WhatsApp Image 2026-09-13 at 6.13.40 PM.jpeg"],
    description: "Artisan hand-carved marble basin with decorative floral rim detailing and deep bowl for practical luxury bathrooms.",
    in_stock: true
  },
  {
    id: "seed-basin-06",
    title: "Oval Makrana Marble Vessel Sink",
    category: "MARBLE BASIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/marble-basin/WhatsApp Image 2026-09-13 at 6.13.41 PM.jpeg",
    images: ["/marble-basin/WhatsApp Image 2026-09-13 at 6.13.41 PM.jpeg", "/marble-basin/WhatsApp Image 2026-09-13 at 6.13.43 PM.jpeg"],
    description: "Elegant oval vessel sink in pure Makrana marble with smooth contoured walls and premium mirror polished finish.",
    in_stock: true
  },
  {
    id: "seed-basin-07",
    title: "Sculpted Marble Basin with Carved Stand",
    category: "MARBLE BASIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/marble-basin/WhatsApp Image 2026-09-13 at 6.13.48 PM.jpeg",
    images: ["/marble-basin/WhatsApp Image 2026-09-13 at 6.13.48 PM.jpeg", "/marble-basin/WhatsApp Image 2026-09-13 at 6.13.50 PM.jpeg"],
    description: "Sculpted marble basin mounted on a carved decorative pedestal stand with ornamental relief patterns.",
    in_stock: true
  },
  {
    id: "seed-basin-08",
    title: "Premium Marble Washbasin with Fluted Base",
    category: "MARBLE BASIN",
    stone_type: "Italian Statuario",
    dimensions: "Custom Sizing Available",
    image: "/marble-basin/WhatsApp Image 2026-09-13 at 6.13.51 PM.jpeg",
    images: ["/marble-basin/WhatsApp Image 2026-09-13 at 6.13.51 PM.jpeg", "/marble-basin/WhatsApp Image 2026-09-13 at 6.13.52 PM.jpeg"],
    description: "Premium marble washbasin with architectural fluted column base and wide polished bowl top in Italian Statuario marble.",
    in_stock: true
  },
  {
    id: "seed-basin-09",
    title: "Modern Minimalist Marble Basin",
    category: "MARBLE BASIN",
    stone_type: "Vietnam Crystal White",
    dimensions: "Custom Sizing Available",
    image: "/marble-basin/WhatsApp Image 2026-09-14 at 4.00.28 PM.jpeg",
    images: ["/marble-basin/WhatsApp Image 2026-09-14 at 4.00.28 PM.jpeg", "/marble-basin/WhatsApp Image 2026-09-14 at 4.00.29 PM (1).jpeg"],
    description: "Sleek modern minimalist marble basin with clean edges and crystal white finish for contemporary bathroom designs.",
    in_stock: true
  },
  {
    id: "seed-basin-10",
    title: "Rectangular Marble Vanity Basin",
    category: "MARBLE BASIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/marble-basin/WhatsApp Image 2026-09-14 at 4.00.29 PM.jpeg",
    images: ["/marble-basin/WhatsApp Image 2026-09-14 at 4.00.29 PM.jpeg", "/marble-basin/WhatsApp Image 2026-09-14 at 4.00.30 PM (1).jpeg", "/marble-basin/WhatsApp Image 2026-09-14 at 4.00.30 PM.jpeg"],
    description: "Wide rectangular marble vanity basin for double-sink bathroom installations with polished white Makrana surface.",
    in_stock: true
  },
  {
    id: "seed-basin-11",
    title: "Carved Marble Pedestal Washbasin",
    category: "MARBLE BASIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/marble-basin/WhatsApp Image 2026-09-14 at 4.00.31 PM (1).jpeg",
    images: ["/marble-basin/WhatsApp Image 2026-09-14 at 4.00.31 PM (1).jpeg", "/marble-basin/WhatsApp Image 2026-09-14 at 4.00.31 PM.jpeg"],
    description: "Freestanding carved marble pedestal washbasin with ornamental column base and deep curved bowl.",
    in_stock: true
  },
  {
    id: "seed-basin-12",
    title: "Artisanal Carved Rim Marble Washbasin",
    category: "MARBLE BASIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/mandir/WhatsApp Image 2026-09-14 at 4.00.24 PM.jpeg",
    images: ["/mandir/WhatsApp Image 2026-09-14 at 4.00.24 PM.jpeg", "/mandir/WhatsApp Image 2026-09-14 at 4.00.24 PM (1).jpeg"],
    description: "Artisanal hand-sculpted white marble counter-top washbasin with ornate carved rim detail and high luster polish.",
    in_stock: true
  },
  {
    id: "seed-basin-13",
    title: "Contemporary Monolithic Marble Vessel Basin",
    category: "MARBLE BASIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/mandir/WhatsApp Image 2026-09-14 at 4.00.25 PM.jpeg",
    images: ["/mandir/WhatsApp Image 2026-09-14 at 4.00.25 PM.jpeg", "/mandir/WhatsApp Image 2026-09-14 at 4.00.25 PM (1).jpeg", "/mandir/WhatsApp Image 2026-09-14 at 4.00.25 PM (2).jpeg"],
    description: "Modern monolithic pure white marble vessel basin featuring clean contemporary lines and deep bowl basin.",
    in_stock: true
  },
  {
    id: "seed-basin-14",
    title: "Deluxe Oval Fluted Marble Vanity Basin",
    category: "MARBLE BASIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/mandir/WhatsApp Image 2026-09-14 at 4.00.26 PM.jpeg",
    images: ["/mandir/WhatsApp Image 2026-09-14 at 4.00.26 PM.jpeg", "/mandir/WhatsApp Image 2026-09-14 at 4.00.26 PM (1).jpeg"],
    description: "Deluxe oval fluted vanity basin hand-carved from solid Makrana white marble stone block.",
    in_stock: true
  },
  {
    id: "seed-basin-15",
    title: "Rajasthani Royal Carved Marble Washbowl",
    category: "MARBLE BASIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/mandir/WhatsApp Image 2026-09-14 at 4.00.27 PM.jpeg",
    images: ["/mandir/WhatsApp Image 2026-09-14 at 4.00.27 PM.jpeg", "/mandir/WhatsApp Image 2026-09-14 at 4.00.27 PM (1).jpeg", "/mandir/WhatsApp Image 2026-09-14 at 4.00.27 PM (2).jpeg"],
    description: "Authentic Rajasthani royal handcrafted marble washbowl with heritage carved borders and satin polished surface.",
    in_stock: true
  },

  // ── MARBLE TULSI POT (from public/tulsi-pot/) ──
  {
    id: "seed-tulsi-01",
    title: "Royal Carved Marble Tulsi Kyara",
    category: "TULSI POT",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/tulsi-pot/WhatsApp Image 2026-09-13 at 6.13.25 PM.jpeg",
    images: ["/tulsi-pot/WhatsApp Image 2026-09-13 at 6.13.25 PM.jpeg"],
    description: "Traditional royal carved Makrana marble Tulsi Kyara with ornamental pedestal base for courtyard and temple gardens.",
    in_stock: true
  },
  {
    id: "seed-tulsi-02",
    title: "Fluted Marble Tulsi Pot with Arch Panels",
    category: "TULSI POT",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/tulsi-pot/WhatsApp Image 2026-09-13 at 6.13.27 PM (1).jpeg",
    images: ["/tulsi-pot/WhatsApp Image 2026-09-13 at 6.13.27 PM (1).jpeg", "/tulsi-pot/WhatsApp Image 2026-09-13 at 6.13.27 PM.jpeg"],
    description: "Marble Tulsi pot with fluted column-style body and carved arch panels on all four sides. Sacred and decorative.",
    in_stock: true
  },
  {
    id: "seed-tulsi-03",
    title: "Heritage Makrana Marble Tulsi Planter",
    category: "TULSI POT",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/tulsi-pot/WhatsApp Image 2026-09-13 at 6.13.30 PM.jpeg",
    images: ["/tulsi-pot/WhatsApp Image 2026-09-13 at 6.13.30 PM.jpeg"],
    description: "Heritage-style Makrana marble Tulsi planter with carved gada motifs and wide rim for sacred Tulsi plant display.",
    in_stock: true
  },
  {
    id: "seed-tulsi-04",
    title: "Decorative Marble Tulsi Pot with Dome Top",
    category: "TULSI POT",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/tulsi-pot/WhatsApp Image 2026-09-13 at 6.13.31 PM (1).jpeg",
    images: ["/tulsi-pot/WhatsApp Image 2026-09-13 at 6.13.31 PM (1).jpeg", "/tulsi-pot/WhatsApp Image 2026-09-13 at 6.13.31 PM.jpeg"],
    description: "Decorative marble Tulsi pot with miniature dome-topped corners and hand-carved sacred symbols. Temple courtyard masterpiece.",
    in_stock: true
  },
  {
    id: "seed-tulsi-05",
    title: "Grand Marble Tulsi Kyara with Steps",
    category: "TULSI POT",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/tulsi-pot/WhatsApp Image 2026-09-13 at 6.13.32 PM.jpeg",
    images: ["/tulsi-pot/WhatsApp Image 2026-09-13 at 6.13.32 PM.jpeg"],
    description: "Grand multi-tier marble Tulsi Kyara with stepped pyramid base and carved lattice balcony detail.",
    in_stock: true
  },

  // ── WATER FOUNTAIN (from public/fountain/) ──
  {
    id: "seed-fountain-01",
    title: "Classical Tiered Marble Garden Fountain",
    category: "FOUNTAIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/fountain/WhatsApp Image 2026-09-13 at 6.14.38 PM.jpeg",
    images: ["/fountain/WhatsApp Image 2026-09-13 at 6.14.38 PM.jpeg", "/fountain/WhatsApp Image 2026-09-13 at 6.14.38 PM (1).jpeg"],
    description: "Grand classical multi-tier marble garden fountain with cascading water bowls and ornamental carved base for estate courtyards.",
    in_stock: true
  },
  {
    id: "seed-fountain-02",
    title: "Carved Lion Spout Marble Fountain",
    category: "FOUNTAIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/fountain/WhatsApp Image 2026-09-13 at 6.14.39 PM.jpeg",
    images: ["/fountain/WhatsApp Image 2026-09-13 at 6.14.39 PM.jpeg", "/fountain/WhatsApp Image 2026-09-13 at 6.14.39 PM (1).jpeg", "/fountain/WhatsApp Image 2026-09-13 at 6.14.39 PM (2).jpeg"],
    description: "Regal marble fountain with hand-carved lion head spouts, scalloped water catch basin, and turned pedestal column.",
    in_stock: true
  },
  {
    id: "seed-fountain-03",
    title: "Marble Bird Bath Fountain with Pedestal",
    category: "FOUNTAIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/fountain/WhatsApp Image 2026-09-13 at 6.14.40 PM.jpeg",
    images: ["/fountain/WhatsApp Image 2026-09-13 at 6.14.40 PM.jpeg", "/fountain/WhatsApp Image 2026-09-13 at 6.14.40 PM (1).jpeg", "/fountain/WhatsApp Image 2026-09-13 at 6.14.40 PM (2).jpeg"],
    description: "Elegant marble bird bath fountain on a turned pedestal column. Perfect for gardens, courtyards, and outdoor sitting areas.",
    in_stock: true
  },
  {
    id: "seed-fountain-04",
    title: "Small Indoor Marble Table Fountain",
    category: "FOUNTAIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/fountain/WhatsApp Image 2026-09-13 at 6.14.41 PM.jpeg",
    images: ["/fountain/WhatsApp Image 2026-09-13 at 6.14.41 PM.jpeg", "/fountain/WhatsApp Image 2026-09-13 at 6.14.41 PM (1).jpeg", "/fountain/WhatsApp Image 2026-09-13 at 6.14.41 PM (2).jpeg"],
    description: "Compact indoor marble table fountain with gentle water cascade effect. Adds tranquility to living rooms and office spaces.",
    in_stock: true
  },
  {
    id: "seed-fountain-05",
    title: "Heritage Palace Marble Courtyard Fountain",
    category: "FOUNTAIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/fountain/WhatsApp Image 2026-09-13 at 6.14.42 PM.jpeg",
    images: ["/fountain/WhatsApp Image 2026-09-13 at 6.14.42 PM.jpeg", "/fountain/WhatsApp Image 2026-09-13 at 6.14.42 PM (1).jpeg", "/fountain/WhatsApp Image 2026-09-13 at 6.14.42 PM (2).jpeg"],
    description: "Grand heritage palace-scale marble courtyard fountain with ornamental carved dolphins, floral reliefs, and wide reflecting pool basin.",
    in_stock: true
  },
  {
    id: "seed-fountain-06",
    title: "Lotus Bowl Marble Water Feature",
    category: "FOUNTAIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/fountain/WhatsApp Image 2026-09-13 at 6.14.43 PM.jpeg",
    images: ["/fountain/WhatsApp Image 2026-09-13 at 6.14.43 PM.jpeg", "/fountain/WhatsApp Image 2026-09-13 at 6.14.43 PM (1).jpeg", "/fountain/WhatsApp Image 2026-09-13 at 6.14.43 PM (2).jpeg"],
    description: "Sculptural lotus bowl marble water feature with carved petal detailing and peaceful cascading flow for Zen gardens.",
    in_stock: true
  },
  {
    id: "seed-fountain-07",
    title: "Three-Tier Classical Marble Fountain",
    category: "FOUNTAIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/fountain/WhatsApp Image 2026-09-13 at 6.14.44 PM.jpeg",
    images: ["/fountain/WhatsApp Image 2026-09-13 at 6.14.44 PM.jpeg"],
    description: "Stately three-tier classical marble fountain with graduated bowls, sculpted centre finial, and wide octagonal catch basin.",
    in_stock: true
  },
  {
    id: "seed-fountain-08",
    title: "Wall-Mounted Marble Water Cascade",
    category: "FOUNTAIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/fountain/WhatsApp Image 2026-09-13 at 6.14.23 PM.jpeg",
    images: ["/fountain/WhatsApp Image 2026-09-13 at 6.14.23 PM.jpeg", "/fountain/WhatsApp Image 2026-09-13 at 6.14.23 PM (1).jpeg"],
    description: "Space-saving wall-mounted marble water cascade with carved relief spout and semi-circular catch basin. Ideal for patios.",
    in_stock: true
  },
  {
    id: "seed-fountain-09",
    title: "Carved Elephant Marble Garden Fountain",
    category: "FOUNTAIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/fountain/WhatsApp Image 2026-09-13 at 6.14.24 PM.jpeg",
    images: ["/fountain/WhatsApp Image 2026-09-13 at 6.14.24 PM.jpeg", "/fountain/WhatsApp Image 2026-09-13 at 6.14.24 PM (1).jpeg", "/fountain/WhatsApp Image 2026-09-13 at 6.14.24 PM (2).jpeg"],
    description: "Exquisite marble garden fountain with carved elephant trunk spouts, cascading tiers, and decorative pool rim.",
    in_stock: true
  },
  {
    id: "seed-fountain-10",
    title: "Modern Geometric Marble Fountain",
    category: "FOUNTAIN",
    stone_type: "Vietnam Crystal White",
    dimensions: "Custom Sizing Available",
    image: "/fountain/WhatsApp Image 2026-09-13 at 6.14.25 PM.jpeg",
    images: ["/fountain/WhatsApp Image 2026-09-13 at 6.14.25 PM.jpeg", "/fountain/WhatsApp Image 2026-09-13 at 6.14.25 PM (1).jpeg", "/fountain/WhatsApp Image 2026-09-13 at 6.14.25 PM (2).jpeg"],
    description: "Contemporary geometric marble fountain with clean angular forms and smooth water sheets for modern landscape design.",
    in_stock: true
  },
  {
    id: "seed-fountain-11",
    title: "Decorative Marble Patio Fountain",
    category: "FOUNTAIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/fountain/WhatsApp Image 2026-09-13 at 6.14.26 PM.jpeg",
    images: ["/fountain/WhatsApp Image 2026-09-13 at 6.14.26 PM.jpeg", "/fountain/WhatsApp Image 2026-09-13 at 6.14.26 PM (1).jpeg", "/fountain/WhatsApp Image 2026-09-13 at 6.14.26 PM (2).jpeg"],
    description: "Decorative marble patio fountain with floral carved bowl, ribbed pedestal, and wide catchment base. Perfect for terrace gardens.",
    in_stock: true
  },
  {
    id: "seed-fountain-12",
    title: "Round Marble Bubbler Fountain",
    category: "FOUNTAIN",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/fountain/WhatsApp Image 2026-09-13 at 6.14.27 PM.jpeg",
    images: ["/fountain/WhatsApp Image 2026-09-13 at 6.14.27 PM.jpeg", "/fountain/WhatsApp Image 2026-09-13 at 6.14.27 PM (1).jpeg"],
    description: "Simple yet elegant round marble bubbler fountain with centre jet and polished smooth basin for indoor atriums.",
    in_stock: true
  },

  // ── KIBLA WORK (from public/kibla-work/) ──
  {
    id: "seed-kibla-01",
    title: "Royal Makrana Marble Kibla Arch & Mihrab",
    category: "KIBLA WORK",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/kibla-work/image.png",
    images: ["/kibla-work/image.png", "/kibla-work/image copy.png"],
    description: "Grand hand-carved Makrana white marble Qibla Mihrab featuring multi-foil arch framing, intricate geometric arabesque relief, and polished stone finish.",
    in_stock: true
  },
  {
    id: "seed-kibla-02",
    title: "Geometric Arabesque Carved Qibla Wall Panel",
    category: "KIBLA WORK",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/kibla-work/image copy.png",
    images: ["/kibla-work/image copy.png", "/kibla-work/image copy 2.png"],
    description: "Exquisite geometric arabesque carved marble Qibla wall panel with symmetrical Islamic lattice motifs and fine stone chiseling.",
    in_stock: true
  },
  {
    id: "seed-kibla-03",
    title: "Intricate Jali Islamic Stone Mihrab Sanctum",
    category: "KIBLA WORK",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/kibla-work/image copy 2.png",
    images: ["/kibla-work/image copy 2.png", "/kibla-work/image copy 3.png"],
    description: "Pristine white marble prayer alcove with delicate pierced jali lattice screens, calligraphy border trims, and ornamental dome pediment.",
    in_stock: true
  },
  {
    id: "seed-kibla-04",
    title: "Classical White Marble Mosque Prayer Niche",
    category: "KIBLA WORK",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/kibla-work/image copy 3.png",
    images: ["/kibla-work/image copy 3.png", "/kibla-work/image copy 4.png"],
    description: "Classical mosque prayer niche sculpted from solid Makrana marble with traditional fluted column piers and scalloped apex.",
    in_stock: true
  },
  {
    id: "seed-kibla-05",
    title: "Ornamental Calligraphic Marble Qibla Panel",
    category: "KIBLA WORK",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/kibla-work/image copy 4.png",
    images: ["/kibla-work/image copy 4.png", "/kibla-work/image.png"],
    description: "Masterwork marble Qibla architectural installation featuring relief calligraphy, palmette cresting, and mirror-polished surface finish.",
    in_stock: true
  },

  // ── PEDESTAL BASIN (from public/padestial-basin/) ──
  {
    id: "seed-pedestal-01",
    title: "Monolithic Fluted Marble Pedestal Basin",
    category: "PEDESTAL BASIN",
    stone_type: "Italian Statuario",
    dimensions: "18\" Dia x 34\" H",
    image: "/padestial-basin/image.png",
    images: ["/padestial-basin/image.png", "/padestial-basin/image copy.png"],
    description: "Freestanding monolithic marble pedestal washbasin with hand-chiseled fluted column body and polished bowl basin for luxury powder rooms.",
    in_stock: true
  },
  {
    id: "seed-pedestal-02",
    title: "Cylindrical Carved Marble Column Sink",
    category: "PEDESTAL BASIN",
    stone_type: "Pure Makrana White",
    dimensions: "16\" Dia x 33\" H",
    image: "/padestial-basin/image copy.png",
    images: ["/padestial-basin/image copy.png", "/padestial-basin/image copy 2.png"],
    description: "Seamless cylindrical pure Makrana white marble column sink with integrated drainage slope and subtle vertical reed texturing.",
    in_stock: true
  },
  {
    id: "seed-pedestal-03",
    title: "Classical Ribbed Freestanding Marble Basin",
    category: "PEDESTAL BASIN",
    stone_type: "Pure Makrana White",
    dimensions: "18\" Dia x 35\" H",
    image: "/padestial-basin/image copy 2.png",
    images: ["/padestial-basin/image copy 2.png", "/padestial-basin/image copy 3.png"],
    description: "Classical ribbed freestanding pedestal basin carved from a single block of natural stone with flared lip rim and stable wide footing.",
    in_stock: true
  },
  {
    id: "seed-pedestal-04",
    title: "Luxury White Marble Pillar Washbasin",
    category: "PEDESTAL BASIN",
    stone_type: "Italian Statuario",
    dimensions: "17\" Dia x 34\" H",
    image: "/padestial-basin/image copy 3.png",
    images: ["/padestial-basin/image copy 3.png", "/padestial-basin/image copy 4.png"],
    description: "Architectural pillar washbasin featuring dramatic natural grey veining, smooth tactile finish, and bespoke floor-mount plumbing access.",
    in_stock: true
  },
  {
    id: "seed-pedestal-05",
    title: "Sculpted Octagonal Marble Pedestal Vanity",
    category: "PEDESTAL BASIN",
    stone_type: "Pure Makrana White",
    dimensions: "19\" x 19\" x 34\" H",
    image: "/padestial-basin/image copy 4.png",
    images: ["/padestial-basin/image copy 4.png", "/padestial-basin/image.png"],
    description: "Sculpted multi-faceted octagonal pedestal vanity handcrafted in solid white marble with bevelled edge profiles.",
    in_stock: true
  },

  // ── MASJID MIMBAR (from public/masjid-mimbar/) ──
  {
    id: "seed-mimbar-01",
    title: "Grand Makrana Marble Masjid Mimbar Pulpit",
    category: "MASJID MIMBAR",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/masjid-mimbar/image.png",
    images: ["/masjid-mimbar/image.png", "/masjid-mimbar/image copy.png"],
    description: "Grand mosque pulpit crafted in pristine Makrana marble with stepped ascending platform, scalloped canopy dome, and ornamental balustrade.",
    in_stock: true
  },
  {
    id: "seed-mimbar-02",
    title: "Multi-Step Carved Marble Mosque Minbar",
    category: "MASJID MIMBAR",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/masjid-mimbar/image copy.png",
    images: ["/masjid-mimbar/image copy.png", "/masjid-mimbar/image copy 2.png"],
    description: "Traditional multi-step marble minbar with carved risers, lattice side balusters, and crown finial for Jama Masjid installations.",
    in_stock: true
  },
  {
    id: "seed-mimbar-03",
    title: "Islamic Arch Royal Marble Khutbah Pulpit",
    category: "MASJID MIMBAR",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/masjid-mimbar/image copy 2.png",
    images: ["/masjid-mimbar/image copy 2.png", "/masjid-mimbar/image copy 3.png"],
    description: "Royal marble Khutbah pulpit with carved Islamic pointed arches, floral friezes, and hand-rubbed high luster polish.",
    in_stock: true
  },
  {
    id: "seed-mimbar-04",
    title: "Intricate Jali Marble Masjid Mimbar",
    category: "MASJID MIMBAR",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/masjid-mimbar/image copy 3.png",
    images: ["/masjid-mimbar/image copy 3.png", "/masjid-mimbar/image copy 4.png"],
    description: "Bespoke marble minbar featuring perforated geometric jali sidewalls, turned banister rails, and carved platform steps.",
    in_stock: true
  },
  {
    id: "seed-mimbar-05",
    title: "Classical Polished White Stone Mosque Minbar",
    category: "MASJID MIMBAR",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/masjid-mimbar/image copy 4.png",
    images: ["/masjid-mimbar/image copy 4.png", "/masjid-mimbar/image copy 5.png"],
    description: "Pristine white marble minbar with classical proportions, elegant arch entryway, and reinforced structural interlocking stonework.",
    in_stock: true
  },
  {
    id: "seed-mimbar-06",
    title: "Ornamental Hand-Sculpted Masjid Pulpit",
    category: "MASJID MIMBAR",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/masjid-mimbar/image copy 5.png",
    images: ["/masjid-mimbar/image copy 5.png", "/masjid-mimbar/image copy 6.png"],
    description: "Monumental hand-sculpted marble pulpit with dome pavilion topper, carved leaf capitals, and dignified sermon station.",
    in_stock: true
  },
  {
    id: "seed-mimbar-07",
    title: "Traditional Makrana Islamic Marble Mimbar",
    category: "MASJID MIMBAR",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/masjid-mimbar/image copy 6.png",
    images: ["/masjid-mimbar/image copy 6.png", "/masjid-mimbar/image.png"],
    description: "Authentic Makrana Islamic marble mimbar crafted with timeless geometric symmetry, fine molding details, and enduring stone quality.",
    in_stock: true
  },

  // ── CNC STONE WALL ART (from public/wall-art/) ──
  {
    id: "seed-wallart-01",
    title: "Sculpted 3D Wave Marble Wall Panel",
    category: "CNC STONE WALL ART",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/wall-art/image.png",
    images: ["/wall-art/image.png", "/wall-art/image copy.png"],
    description: "Architectural 3D ripple wave sculpted marble wall art with dramatic surface relief and fluid stone texture for feature accent walls.",
    in_stock: true
  },
  {
    id: "seed-wallart-02",
    title: "Parametric Geometric Fluted Stone Mural",
    category: "CNC STONE WALL ART",
    stone_type: "Italian Statuario",
    dimensions: "Custom Sizing Available",
    image: "/wall-art/image copy.png",
    images: ["/wall-art/image copy.png", "/wall-art/image copy 2.png"],
    description: "Precision CNC milled geometric fluted marble wall art panel featuring clean architectural lines and modern luxury aesthetics.",
    in_stock: true
  },
  {
    id: "seed-wallart-03",
    title: "Heritage Floral Lotus Carved Stone Mural",
    category: "CNC STONE WALL ART",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/wall-art/image copy 2.png",
    images: ["/wall-art/image copy 2.png", "/wall-art/image copy 3.png"],
    description: "Intricate hand-finished CNC floral lotus relief mural in pure white Makrana marble. Ideal for drawing rooms and temple entrances.",
    in_stock: true
  },
  {
    id: "seed-wallart-04",
    title: "Curved Linear Ribbon Marble Relief Panel",
    category: "CNC STONE WALL ART",
    stone_type: "Italian Statuario",
    dimensions: "Custom Sizing Available",
    image: "/wall-art/image copy 3.png",
    images: ["/wall-art/image copy 3.png", "/wall-art/image copy 4.png"],
    description: "Dynamic fluid ribbon sculpted wall panel carved from solid natural marble, casting beautiful shadows under architectural lighting.",
    in_stock: true
  },
  {
    id: "seed-wallart-05",
    title: "Hexagonal Honeycomb 3D Stone Cladding",
    category: "CNC STONE WALL ART",
    stone_type: "Vietnam Crystal White",
    dimensions: "Custom Sizing Available",
    image: "/wall-art/image copy 4.png",
    images: ["/wall-art/image copy 4.png", "/wall-art/image copy 5.png"],
    description: "Contemporary 3D faceted honeycomb stone wall cladding with precision chamfered borders for palatial foyer and lobby walls.",
    in_stock: true
  },
  {
    id: "seed-wallart-06",
    title: "Abstract Kinetic Dune Marble Wall Art",
    category: "CNC STONE WALL ART",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/wall-art/image copy 5.png",
    images: ["/wall-art/image copy 5.png", "/wall-art/image copy 6.png"],
    description: "Sweeping sand dune-inspired curvilinear stone paneling, precision-milled with sub-millimeter tolerances on state-of-the-art 5-axis CNC machines.",
    in_stock: true
  },
  {
    id: "seed-wallart-07",
    title: "Traditional Jali Arabesque Wall Mural",
    category: "CNC STONE WALL ART",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/wall-art/image copy 6.png",
    images: ["/wall-art/image copy 6.png", "/wall-art/image copy 7.png"],
    description: "Perforated and engraved arabesque stone mural blending classical Mughal jaali craftsmanship with modern CNC technology.",
    in_stock: true
  },
  {
    id: "seed-wallart-08",
    title: "Chevron Herringbone Sculpted Marble Panel",
    category: "CNC STONE WALL ART",
    stone_type: "Italian Statuario",
    dimensions: "Custom Sizing Available",
    image: "/wall-art/image copy 7.png",
    images: ["/wall-art/image copy 7.png", "/wall-art/image copy 8.png"],
    description: "Architectural chevron textured marble wall paneling with alternating matte and polished directional facets.",
    in_stock: true
  },
  {
    id: "seed-wallart-09",
    title: "Classical Baroque Acanthus Marble Relief",
    category: "CNC STONE WALL ART",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/wall-art/image copy 8.png",
    images: ["/wall-art/image copy 8.png", "/wall-art/image copy 9.png"],
    description: "High-relief acanthus leaf carved panel, celebrating neoclassical European and Indian royal court architecture.",
    in_stock: true
  },
  {
    id: "seed-wallart-10",
    title: "Modern Ribbed Columnar Marble Wall Panel",
    category: "CNC STONE WALL ART",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/wall-art/image copy 9.png",
    images: ["/wall-art/image copy 9.png", "/wall-art/image copy 10.png"],
    description: "Continuous vertical fluting with rounded reeds for minimalist luxury living spaces, elevator lobbies, and fireplace breasts.",
    in_stock: true
  },
  {
    id: "seed-wallart-11",
    title: "Radial Sunburst 3D Carved Stone Feature",
    category: "CNC STONE WALL ART",
    stone_type: "Italian Statuario",
    dimensions: "Custom Sizing Available",
    image: "/wall-art/image copy 10.png",
    images: ["/wall-art/image copy 10.png", "/wall-art/image copy 11.png"],
    description: "Captivating radial sunburst carved medallion mural, serving as an opulent centerpiece for master bed backdrops and double-height halls.",
    in_stock: true
  },
  {
    id: "seed-wallart-12",
    title: "Layered Topographic Contour Marble Panel",
    category: "CNC STONE WALL ART",
    stone_type: "Vietnam Crystal White",
    dimensions: "Custom Sizing Available",
    image: "/wall-art/image copy 11.png",
    images: ["/wall-art/image copy 11.png", "/wall-art/image copy 12.png"],
    description: "Stepped topographic contour wall art in monolithic white stone, creating breathtaking tactile depth and light play.",
    in_stock: true
  },
  {
    id: "seed-wallart-13",
    title: "Sculpted Botanical Leaf Marble Wall Art",
    category: "CNC STONE WALL ART",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/wall-art/image copy 12.png",
    images: ["/wall-art/image copy 12.png", "/wall-art/image copy 13.png"],
    description: "Organic tropical palm and monstera leaf relief motifs chiseled into natural Makrana marble with delicate veining.",
    in_stock: true
  },
  {
    id: "seed-wallart-14",
    title: "Diamond Faceted Prism Marble Wall Cladding",
    category: "CNC STONE WALL ART",
    stone_type: "Italian Statuario",
    dimensions: "Custom Sizing Available",
    image: "/wall-art/image copy 13.png",
    images: ["/wall-art/image copy 13.png", "/wall-art/image copy 14.png"],
    description: "Multidimensional diamond pyramid faceted wall tiles creating a dramatic crystalline jewel effect across the entire surface.",
    in_stock: true
  },
  {
    id: "seed-wallart-15",
    title: "Organic Ripple Water Sheet Marble Relief",
    category: "CNC STONE WALL ART",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/wall-art/image copy 14.png",
    images: ["/wall-art/image copy 14.png", "/wall-art/image copy 15.png"],
    description: "Calming horizontal water ripple relief design, widely chosen for luxury spa walls, master ensuites, and courtyard screens.",
    in_stock: true
  },
  {
    id: "seed-wallart-16",
    title: "Mandala Sacred Geometry Marble Wall Art",
    category: "CNC STONE WALL ART",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/wall-art/image copy 15.png",
    images: ["/wall-art/image copy 15.png", "/wall-art/image copy 16.png"],
    description: "Concentric circular mandala carved in pure white marble with sacred mathematical proportions and meditative visual harmony.",
    in_stock: true
  },
  {
    id: "seed-wallart-17",
    title: "Contemporary Asymmetric Stone Mural Panel",
    category: "CNC STONE WALL ART",
    stone_type: "Italian Statuario",
    dimensions: "Custom Sizing Available",
    image: "/wall-art/image copy 16.png",
    images: ["/wall-art/image copy 16.png", "/wall-art/image copy 17.png"],
    description: "Modernist asymmetric fractured relief panel combining razor-sharp planar cuts with polished marble textures.",
    in_stock: true
  },
  {
    id: "seed-wallart-18",
    title: "Grand Architectural Monolithic Wall Cladding",
    category: "CNC STONE WALL ART",
    stone_type: "Pure Makrana White",
    dimensions: "Custom Sizing Available",
    image: "/wall-art/image copy 17.png",
    images: ["/wall-art/image copy 17.png", "/wall-art/image.png"],
    description: "Full-height continuous CNC architectural stone cladding system engineered for luxury villa exteriors and palace atriums.",
    in_stock: true
  }
];

export const CATALOG_PRODUCTS = [];
export const DUMMY_PRODUCTS = [];
export const DUMMY_PRODUCT = null;

// WhatsApp Enquiry Number and Configuration
export const WHATSAPP_CONFIG = {
  PHONE_NUMBER: "919057206605", // Admin WhatsApp number with country code
  DISPLAY_PHONE: "+91 90572 06605",
  EMAIL: "contact@galaxymarble.com",
  ADMIN_EMAIL: "admin@galaxymarble.com",
  SITE_URL: "https://galaxy-marble.netlify.app"
};



// Curated Architectural Collections - 10 Core Disciplines with Real Folder Photos
export const COLLECTIONS = [
  {
    id: 1,
    title: "TEMPLE",
    subtitle: "Hand-Carved Makrana Sacred Temples & Shikhara Mandirs",
    tag: "Divine Sanctum",
    image: "/mandir/WhatsApp Image 2026-09-14 at 4.00.16 PM.jpeg",
    link: "/products?category=TEMPLE"
  },
  {
    id: 2,
    title: "FOUNTAIN",
    subtitle: "Multi-Tiered Courtyard & Palace Garden Water Features",
    tag: "Estate Landscape",
    image: "/fountain/WhatsApp Image 2026-09-13 at 6.14.38 PM.jpeg",
    link: "/products?category=FOUNTAIN"
  },
  {
    id: 3,
    title: "KIBLA WORK",
    subtitle: "Sacred Islamic Mihrabs, Geometric Arches & Qibla Art",
    tag: "Sacred Architecture",
    image: "/kibla-work/image.png",
    link: "/products?category=KIBLA%20WORK"
  },
  {
    id: 4,
    title: "MARBLE BASIN",
    subtitle: "Counter-Top Hand-Carved Monolithic Sinks & Washbowls",
    tag: "Bespoke Wash",
    image: "/marble-basin/countertopmarblebasin.png",
    link: "/products?category=MARBLE%20BASIN"
  },
  {
    id: 5,
    title: "MARBLE CONSOLE TABLE",
    subtitle: "Luxury Fluted Pedestal Console, Side & Center Tables",
    tag: "Luxury Living",
    image: "/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.38 PM (1).jpeg",
    link: "/products?category=MARBLE%20CONSOLE%20TABLE"
  },
  {
    id: 6,
    title: "MARBLE FLOORING",
    subtitle: "Premium Marble Tiles, Medallions & Bookmatched Slabs",
    tag: "Grand Surfaces",
    image: "/marble-flooring/WhatsApp Image 2026-09-14 at 4.00.33 PM (1).jpeg",
    link: "/products?category=MARBLE%20FLOORING"
  },
  {
    id: 7,
    title: "MASJID MIMBAR",
    subtitle: "Hand-Carved Marble Sacred Pulpits & Islamic Stone Craft",
    tag: "Divine Art",
    image: "/masjid-mimbar/image.png",
    link: "/products?category=MASJID%20MIMBAR"
  },
  {
    id: 8,
    title: "PEDESTAL BASIN",
    subtitle: "Monolithic Freestanding Fluted Marble Column Sinks",
    tag: "Monolithic Art",
    image: "/padestial-basin/image.png",
    link: "/products?category=PEDESTAL%20BASIN"
  },
  {
    id: 9,
    title: "TULSI POT",
    subtitle: "Sacred Carved Makrana Marble Tulsi Kyaras & Planters",
    tag: "Sacred Flora",
    image: "/tulsi-pot/WhatsApp Image 2026-09-13 at 6.13.25 PM.jpeg",
    link: "/products?category=TULSI%20POT"
  },
  {
    id: 10,
    title: "CNC STONE WALL ART",
    subtitle: "Precision 3D Geometric Murals & Architectural Stone Panels",
    tag: "Parametric Stone",
    image: "/wall-art/image.png",
    link: "/products?category=CNC%20STONE%20WALL%20ART"
  }
];

// Authentic Product Gallery (Curated from 10 Authentic Architectural Collections)
export const OUR_PRODUCT_GALLERY = [
  {
    id: "op-temple",
    title: "Royal Makrana Marble Shikhara Mandir",
    tag: "TEMPLE",
    category: "TEMPLE",
    stoneType: "Pure Makrana White",
    description: "Grand hand-carved Makrana marble temple with intricate shikhara dome, fluted columns, and ornamental deity arch.",
    image: "/mandir/WhatsApp Image 2026-09-14 at 4.00.16 PM.jpeg",
    link: "/products?category=TEMPLE"
  },
  {
    id: "op-fountain",
    title: "Classical Multi-Tier Courtyard Fountain",
    tag: "FOUNTAIN",
    category: "FOUNTAIN",
    stoneType: "Pure White & Pink Banswara",
    description: "Multi-tiered classical courtyard fountains with sculpted lion spouts and cascading reflecting pools.",
    image: "/fountain/WhatsApp Image 2026-09-13 at 6.14.38 PM.jpeg",
    link: "/products?category=FOUNTAIN"
  },
  {
    id: "op-kibla",
    title: "Architectural Marble Qibla Mihrab Arch",
    tag: "KIBLA WORK",
    category: "KIBLA WORK",
    stoneType: "Makrana White & Gold Accents",
    description: "Sacred Islamic Mihrabs, geometric arabesque arches, and Qibla wall stone carvings.",
    image: "/kibla-work/image.png",
    link: "/products?category=KIBLA%20WORK"
  },
  {
    id: "op-basin",
    title: "Monolithic Countertop Marble Washbasin",
    tag: "MARBLE BASIN",
    category: "MARBLE BASIN",
    stoneType: "Italian Statuario & Makrana",
    description: "Counter-top hand-carved monolithic marble basins and luxury powder room washbowls.",
    image: "/marble-basin/countertopmarblebasin.png",
    link: "/products?category=MARBLE%20BASIN"
  },
  {
    id: "op-console",
    title: "Sculptural Fluted Marble Console Table",
    tag: "MARBLE CONSOLE TABLE",
    category: "MARBLE CONSOLE TABLE",
    stoneType: "Italian Banswara & Makrana",
    description: "Luxury fluted marble console tables, side tables, and center table pedestals.",
    image: "/marble-console-table/WhatsApp Image 2026-09-14 at 4.00.38 PM (1).jpeg",
    link: "/products?category=MARBLE%20CONSOLE%20TABLE"
  },
  {
    id: "op-flooring",
    title: "Royal Pietra Dura Marble Flooring Medallion",
    tag: "MARBLE FLOORING",
    category: "MARBLE FLOORING",
    stoneType: "Makrana White & Semi-Precious Inlay",
    description: "Premium Italian & Makrana marble floor tiles, medallions, and bookmatched slab flooring.",
    image: "/marble-flooring/WhatsApp Image 2026-09-14 at 4.00.33 PM (1).jpeg",
    link: "/products?category=MARBLE%20FLOORING"
  },
  {
    id: "op-mimbar",
    title: "Grand Hand-Carved Masjid Mimbar Pulpit",
    tag: "MASJID MIMBAR",
    category: "MASJID MIMBAR",
    stoneType: "Pure Makrana White Marble",
    description: "Hand-carved marble Masjid Mimbars, sacred pulpits, and Islamic architectural stone art.",
    image: "/masjid-mimbar/image.png",
    link: "/products?category=MASJID%20MIMBAR"
  },
  {
    id: "op-pedestal",
    title: "Freestanding Fluted Pedestal Column Basin",
    tag: "PEDESTAL BASIN",
    category: "PEDESTAL BASIN",
    stoneType: "Natural Monolithic Stone",
    description: "Monolithic freestanding fluted marble pedestal columns and powder room basins.",
    image: "/padestial-basin/image.png",
    link: "/products?category=PEDESTAL%20BASIN"
  },
  {
    id: "op-tulsi",
    title: "Sacred Royal Makrana Marble Tulsi Kyara",
    tag: "TULSI POT",
    category: "TULSI POT",
    stoneType: "Pure Makrana White",
    description: "Sacred royal Makrana marble Tulsi Kyaras and carved botanical planters.",
    image: "/tulsi-pot/WhatsApp Image 2026-09-13 at 6.13.25 PM.jpeg",
    link: "/products?category=TULSI%20POT"
  },
  {
    id: "op-wallart",
    title: "Precision 3D CNC Stone Wall Panel & Mural",
    tag: "CNC STONE WALL ART",
    category: "CNC STONE WALL ART",
    stoneType: "Vietnam Crystal & Natural Sandstone",
    description: "Precision CNC 3D stone wall panels, wave reliefs, geometric murals, and bespoke architectural wall cladding.",
    image: "/wall-art/image.png",
    link: "/products?category=CNC%20STONE%20WALL%20ART"
  }
];

// Architectural Guides & Insights
export const GUIDES = [
  {
    id: 1,
    tag: "Stone Sourcing",
    date: "Architectural Dossier",
    title: "Identifying Authentic Makrana Crystalline Marble",
    desc: "Understand the calcium carbonate purity, light transmission, and why Makrana white marble never yellows over generations.",
    image: "/marble-hero-bg.jpg"
  },
  {
    id: 2,
    tag: "Mandir Engineering",
    date: "Vedic Spatial Design",
    title: "Architectural Guidelines for Home Pooja Sanctums",
    desc: "Optimal north-east orientation, shikhara height ratios, lighting integration, and modular marble assembly specifications.",
    image: "/marble-pooja-room-banner.jpg"
  },
  {
    id: 3,
    tag: "Stone Preservation",
    date: "Care & Polish",
    title: "Maintaining Bookmatched Italian & Onyx Slabs",
    desc: "Best practices for daily maintenance, nano-sealing against citrus acids, and preserving crystalline luster.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  }
];

// Architectural FAQs
export const FAQS = [
  {
    question: "How does the Price on Request / Enquiry process work?",
    answer: "Because natural marble slabs vary in block size, veining clarity, and cut-to-size specifications, all prices are custom-quoted. Simply click 'Enquire on WhatsApp' on any product or submit your Enquiry Bag to receive real-time quarry pricing, freight estimates, and 3D mockups within 2 hours.",
    q: "How does the Price on Request / Enquiry process work?",
    a: "Because natural marble slabs vary in block size, veining clarity, and cut-to-size specifications, all prices are custom-quoted. Simply click 'Enquire on WhatsApp' on any product or submit your Enquiry Bag to receive real-time quarry pricing, freight estimates, and 3D mockups within 2 hours."
  },
  {
    question: "Can you fabricate custom Mandirs and Furniture to our CAD blueprint?",
    answer: "Yes. Over 70% of our architectural stone projects are bespoke. Our in-house CAD drafting team collaborates directly with your interior designer or architect to produce precise 3D renders before our master sculptors begin hand chiseling.",
    q: "Can you fabricate custom Mandirs and Furniture to our CAD blueprint?",
    a: "Yes. Over 70% of our architectural stone projects are bespoke. Our in-house CAD drafting team collaborates directly with your interior designer or architect to produce precise 3D renders before our master sculptors begin hand chiseling."
  },
  {
    question: "How are marble slabs and temples packed for transit?",
    answer: "We construct international export-grade, heat-treated & fumigated pine wood crates lined with high-density EPE shock absorption and moisture barrier wrapping. Every shipment is covered by 100% all-risk transit insurance from our factory to your site doorstep.",
    q: "How are marble slabs and temples packed for transit?",
    a: "We construct international export-grade, heat-treated & fumigated pine wood crates lined with high-density EPE shock absorption and moisture barrier wrapping. Every shipment is covered by 100% all-risk transit insurance from our factory to your site doorstep."
  },
  {
    question: "What is the difference between Makrana Marble and Vietnam White Marble?",
    answer: "Pure Makrana marble (Rajasthan) is historically renowned for 98%+ calcite purity—the exact stone used in the Taj Mahal—offering generational durability without synthetic resin coatings. Vietnam White marble offers uniform snow-white brilliance with fine micro-crystals, ideal for clean modern luxury aesthetics.",
    q: "What is the difference between Makrana Marble and Vietnam White Marble?",
    a: "Pure Makrana marble (Rajasthan) is historically renowned for 98%+ calcite purity—the exact stone used in the Taj Mahal—offering generational durability without synthetic resin coatings. Vietnam White marble offers uniform snow-white brilliance with fine micro-crystals, ideal for clean modern luxury aesthetics."
  },
  {
    question: "Do you provide on-site installation and assembly for large temple shrines?",
    answer: "Yes. For turnkey Mandirs, large water fountains, and bookmatched wall claddings, our senior Rajasthani artisans travel on-site to oversee dry-fitting, precision alignment, seamless joint grouting, and final diamond buffing.",
    q: "Do you provide on-site installation and assembly for large temple shrines?",
    a: "Yes. For turnkey Mandirs, large water fountains, and bookmatched wall claddings, our senior Rajasthani artisans travel on-site to oversee dry-fitting, precision alignment, seamless joint grouting, and final diamond buffing."
  },
  {
    question: "How do I maintain and protect pure white marble from oil, kumkum, and turmeric stains?",
    answer: "All our sculptures and temple sanctums receive penetrating breathable nano-sealers (Lithofin / Fila) prior to dispatch. For daily maintenance, clean with a damp micro-fiber cloth and pH-neutral stone cleaner. Avoid abrasive powders or harsh acidic detergents.",
    q: "How do I maintain and protect pure white marble from oil, kumkum, and turmeric stains?",
    a: "All our sculptures and temple sanctums receive penetrating breathable nano-sealers (Lithofin / Fila) prior to dispatch. For daily maintenance, clean with a damp micro-fiber cloth and pH-neutral stone cleaner. Avoid abrasive powders or harsh acidic detergents."
  }
];

// Verified Client Reviews & Community
export const COMMUNITY = [
  {
    name: "Vikramaditya Singhania",
    role: "Estate Owner, South Mumbai",
    location: "South Mumbai Estate",
    image: "/marble-pooja-room-banner.jpg",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    quote: "The Makrana marble mandir commissioned for our duplex penthouse exceeded every expectation. The jali backlit detail and fluted pillars are true museum-grade craftsmanship.",
    rating: 5,
    tag: "Bespoke Temple Sanctum"
  },
  {
    name: "Architect Sunita Mehra",
    role: "Principal, Studio Mehra Associates",
    location: "Studio Mehra Associates, Delhi",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    quote: "Galaxy Marble supplied flawless bookmatched Statuario slabs for our Lutyens bungalow project. Precision edge profiling, zero breakage during crating, and punctual site delivery.",
    rating: 5,
    tag: "Italian Statuario Flooring"
  },
  {
    name: "Rajesh & Priya Goel",
    role: "Villa Patrons, Whitefield",
    location: "Bengaluru Villa",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    quote: "We ordered the French classical marble fireplace mantel and custom fluted dining table. The stone veining and silky honed finish create an astonishing luxury atmosphere.",
    rating: 5,
    tag: "Luxury Stone Furniture"
  },
  {
    name: "Devendra Rathore",
    role: "Heritage Hotel Architect, Jaipur",
    location: "Jaipur Heritage Suites",
    image: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    quote: "The tiered courtyard water fountain and carved Travertine planters have transformed the central palace courtyard. Generational stone art executed with mathematical perfection.",
    rating: 5,
    tag: "Fountains & Courtyard Art"
  }
];

// Lookbook Architectural Gallery
export const GALLERY = [
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    title: "Penthouse Marble Living Room",
    category: "FLOORING & WALL CLADDING"
  },
  {
    image: "/marble-pooja-room-banner.jpg",
    title: "Hand-Carved Makrana Sanctum",
    category: "TEMPLES & MANDIRS"
  },
  {
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    title: "Fluted Roman Monolith Table",
    category: "LUXURY FURNITURE"
  },
  {
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    title: "French Classical Hearth Mantel",
    category: "FIREPLACES & INLAYS"
  }
];

// Featured In Brands / Publications
export const FEATURED_BRANDS = [
  { 
    id: "ad",
    name: "Architectural Digest", 
    tagline: "The International Design Authority",
    quote: "Setting the gold standard in bespoke Makrana marble architecture and sacred stone sanctums."
  },
  { 
    id: "elle-decor",
    name: "Elle Décor", 
    tagline: "Luxury Living & Design",
    quote: "Sculpted natural stone that seamlessly unites ancient Vedic geometry with contemporary penthouse living."
  },
  { 
    id: "vogue-living",
    name: "Vogue Living", 
    tagline: "Exclusive Architecture",
    quote: "Generational stone heirlooms chiseled from single blocks of historic Makrana and Carrara stone."
  },
  { 
    id: "world-of-interiors",
    name: "The World of Interiors", 
    tagline: "Condé Nast Heritage",
    quote: "Museum-grade lapidary work and bookmatched Statuario installations crafted with generational mastery."
  },
  { 
    id: "robb-report",
    name: "Robb Report", 
    tagline: "Luxury Without Compromise",
    quote: "Uncompromising grandeur and bespoke stone commissions for private estates and luxury villas."
  }
];

// Video Showcase Data with AI-Generated Cinematic Poster and Documentary Video
export const VIDEO_DATA = {
  title: "The Art of Master Stone Sculpting",
  subtitle: "Witness how blocks of pure Makrana and Carrara stone are transformed by master artisans into timeless architectural masterpieces.",
  poster: "/marble-video-poster.jpg",
  youtubeId: "du9_Kn2y2VA",
  duration: "04:18 min • 4K Documentary",
  clips: [
    { id: "du9_Kn2y2VA", title: "Master Stone Sculpting & Chisel Art", duration: "04:18" },
    { id: "XJGFh-qQ9ok", title: "Quarry Extraction & Diamond Cut", duration: "06:24" },
    { id: "zH2s1l10y_I", title: "Classical Relief & Shadow Technique", duration: "03:52" }
  ]
};

// Virtual Architectural Consultation
export const CONSULTATION_DATA = {
  badge: "Bespoke Design Engineering",
  title: "Schedule a Virtual Stone Consultation",
  subtitle: "Speak 1-on-1 with our master architectural stone consultants via video call to discuss floor plans, custom temple elevations, and Italian slab selection.",
  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
};

