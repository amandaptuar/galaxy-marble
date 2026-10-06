/**
 * Galaxy Marble — Premium PDF Product Catalogue Generator
 * 
 * Generates an ultra-luxurious, professional multi-section product catalogue PDF
 * with bespoke cover, category divider pages, white-background 4-item product grids,
 * product item codes, luxury gold framing, and back cover.
 * 
 * Run:  node generate-catalogue.cjs
 */

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// ─── Configuration ───────────────────────────────────────────────────
const PUBLIC = path.join(__dirname, 'public');
const OUTPUT = path.join(__dirname, 'public', 'Galaxy_Marble_Catalogue.pdf');
const LOGO   = path.join(PUBLIC, 'logo.png');

const BRAND = {
  // Deep Luxury Tones
  black:       '#0b0d11',
  darkBg:      '#11141a',
  cardDark:    '#181c24',
  
  // Gold Accents
  gold:        '#c5a059',
  goldLight:   '#dfbe7a',
  goldDark:    '#9a7836',
  goldMuted:   '#d4af37',
  
  // Light / Clean Tones
  white:       '#ffffff',
  pageBgLight: '#fcfcfc',
  cardBgLight: '#ffffff',
  borderLight: '#e4e7eb',
  borderGold:  '#e2ce9c',
  
  // Text & Greys
  textDark:    '#1e232b',
  textMuted:   '#5a6578',
  textLight:   '#8c9ba5',
  lightGrey:   '#d1d5db',
  grey:        '#9ca3af',
  slateDark:   '#1e293b',
  badgeBg:     '#f5f0e6',
  badgeText:   '#8b6b23',
};

const PAGE_W = 595.28; // A4 width in points
const PAGE_H = 841.89; // A4 height in points

// ─── Sections with folder mapping & display names ────────────────────
const SECTIONS = [
  {
    code: 'TMP',
    folder: 'mandir',
    title: 'MARBLE TEMPLE',
    tagline: 'SACRED SANCTUMS & HOME MANDIRS',
    subtitle: 'Hand-Carved Makrana Pure White Marble Temples with Intricate Shikhara & Jali Work',
    desc: 'Each mandir is carved by master artisans following Vedic Vastu proportions using the finest grade Makrana marble with lifetime natural white luster.'
  },
  {
    code: 'FTN',
    folder: 'fountain',
    title: 'MARBLE FOUNTAIN',
    tagline: 'COURTYARD & GARDEN WATER FEATURES',
    subtitle: 'Multi-Tiered Cascading Fountains, Lion Spouts & Palatial Reflecting Pool Centerpieces',
    desc: 'Bespoke hand-carved classical fountains engineered for smooth water flow, adding regal majesty to luxury residences, courtyards, and hotel landscapes.'
  },
  {
    code: 'KBW',
    folder: 'kibla-work',
    title: 'KIBLA WORK',
    tagline: 'ISLAMIC ARABESQUE & MIHRAB ARCHITECTURE',
    subtitle: 'Sacred Islamic Mihrabs, Calligraphic Marble Panels & Geometric Arch Niches',
    desc: 'Sacred Islamic stonework with geometric arabesque relief, Quranic calligraphy engravings, and traditional prayer niche mihrabs.'
  },
  {
    code: 'BSN',
    folder: 'marble-basin',
    title: 'MARBLE BASIN',
    tagline: 'MONOLITHIC COUNTERTOP ART',
    subtitle: 'Luxury Hand-Carved Counter-Top Marble Sinks, Washbowls & Fluted Basins',
    desc: 'Carved from monolithic blocks of Makrana white marble, Italian Statuario, and Jade Onyx, polished to satin smoothness for luxury powder rooms.'
  },
  {
    code: 'TBL',
    folder: 'marble-console-table',
    title: 'MARBLE CONSOLE TABLE',
    tagline: 'FLUTED PEDESTAL & ACCENT FURNITURE',
    subtitle: 'Luxury Fluted Marble Console Tables, Side Tables & Solid Stone Pedestals',
    desc: 'Sculptural accent tables designed with neoclassical fluting, bookmatched solid marble tops, and contemporary architectural proportions.'
  },
  {
    code: 'FLR',
    folder: 'marble-flooring',
    title: 'MARBLE FLOORING',
    tagline: 'BOOKMATCHED SLABS & MEDALLIONS',
    subtitle: 'Premium Makrana & Italian Marble Tiles, Inlay Borders & Waterjet Floor Medallions',
    desc: 'Hand-selected mirror-polished marble slabs with continuous bookmatched veining and precision-cut geometric inlay medallions.'
  },
  {
    code: 'MBR',
    folder: 'masjid-mimbar',
    title: 'MASJID MIMBAR',
    tagline: 'SACRED PULPITS & MOSQUE STONEWORK',
    subtitle: 'Hand-Carved Marble Sacred Pulpits, Islamic Steps & Minaret Inlay Panels',
    desc: 'Heritage marble mimbar pulpits crafted with stepped platforms, ornamental lattice work, and detailed Islamic floral relief carvings.'
  },
  {
    code: 'PDB',
    folder: 'padestial-basin',
    title: 'PEDESTAL BASIN',
    tagline: 'FREESTANDING MONOLITHIC COLUMNS',
    subtitle: 'Monolithic Freestanding Fluted Marble Column Sinks & Floor-Mounted Basins',
    desc: 'Seamless single-piece marble pedestal basins combining ancient Roman fluted columns with clean minimalist bathroom luxury.'
  },
  {
    code: 'TLS',
    folder: 'tulsi-pot',
    title: 'TULSI POT',
    tagline: 'ROYAL MAKRANA TULSI KYARAS',
    subtitle: 'Sacred Carved Makrana Marble Tulsi Planters, Kyaras & Courtyard Shrines',
    desc: 'Sacred marble Tulsi planters embellished with auspicious peacock, kalash, and floral motifs, weatherproof and built for generations.'
  },
  {
    code: 'ART',
    folder: 'wall-art',
    title: 'CNC STONE WALL ART',
    tagline: '3D ARCHITECTURAL RELIEF PANELS',
    subtitle: 'Precision 3D Sculpted Stone Wall Murals, Wave Reliefs & Geometric Panels',
    desc: 'High-precision CNC sculpted and artisan-hand-finished 3D stone wall panels that transform feature walls into timeless sculptural installations.'
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────

function getImages(folder) {
  const dir = path.join(PUBLIC, folder);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => /\.(jpe?g|png|webp)$/i.test(f))
    .sort()
    .map(f => path.join(dir, f));
}

function drawDarkBg(doc, color = BRAND.black) {
  doc.save();
  doc.rect(0, 0, PAGE_W, PAGE_H).fill(color);
  doc.restore();
}

function drawWhiteBg(doc, color = BRAND.pageBgLight) {
  doc.save();
  doc.rect(0, 0, PAGE_W, PAGE_H).fill(color);
  doc.restore();
}

function drawGoldRule(doc, y, width = 80) {
  const x = (PAGE_W - width) / 2;
  doc.save();
  doc.moveTo(x, y).lineTo(x + width, y).lineWidth(1.2).strokeColor(BRAND.gold).stroke();
  doc.restore();
}

function drawCornerBrackets(doc, margin = 24, len = 36, thickness = 1.2, color = BRAND.gold) {
  doc.save().strokeColor(color).lineWidth(thickness);
  // top-left
  doc.moveTo(margin, margin + len).lineTo(margin, margin).lineTo(margin + len, margin).stroke();
  // top-right
  doc.moveTo(PAGE_W - margin - len, margin).lineTo(PAGE_W - margin, margin).lineTo(PAGE_W - margin, margin + len).stroke();
  // bottom-left
  doc.moveTo(margin, PAGE_H - margin - len).lineTo(margin, PAGE_H - margin).lineTo(margin + len, PAGE_H - margin).stroke();
  // bottom-right
  doc.moveTo(PAGE_W - margin - len, PAGE_H - margin).lineTo(PAGE_W - margin, PAGE_H - margin).lineTo(PAGE_W - margin, PAGE_H - margin - len).stroke();
  doc.restore();
}

function drawOrnamentalFrame(doc, margin = 20, color = BRAND.gold, innerColor = BRAND.goldDark) {
  doc.save();
  // Outer rectangle
  doc.rect(margin, margin, PAGE_W - 2 * margin, PAGE_H - 2 * margin).lineWidth(1.2).strokeColor(color).stroke();
  // Inner rectangle
  doc.rect(margin + 4, margin + 4, PAGE_W - 2 * (margin + 4), PAGE_H - 2 * (margin + 4)).lineWidth(0.5).strokeColor(innerColor).stroke();
  // Corner diamonds
  const offsets = [
    [margin + 2, margin + 2],
    [PAGE_W - margin - 2, margin + 2],
    [margin + 2, PAGE_H - margin - 2],
    [PAGE_W - margin - 2, PAGE_H - margin - 2]
  ];
  for (const [cx, cy] of offsets) {
    doc.save();
    doc.rect(cx - 2, cy - 2, 4, 4).fill(color);
    doc.restore();
  }
  doc.restore();
}

function fitImage(doc, imgPath, x, y, maxW, maxH) {
  try {
    const img = doc.openImage(imgPath);
    const ratio = Math.min(maxW / img.width, maxH / img.height);
    const w = img.width * ratio;
    const h = img.height * ratio;
    const cx = x + (maxW - w) / 2;
    const cy = y + (maxH - h) / 2;
    doc.image(img, cx, cy, { width: w, height: h });
  } catch (e) {
    doc.save();
    doc.roundedRect(x, y, maxW, maxH, 4).fill('#f1f5f9');
    doc.fontSize(9).fillColor(BRAND.textMuted).text('Image unavailable', x, y + maxH / 2 - 5, { width: maxW, align: 'center' });
    doc.restore();
  }
}

// ─── Build PDF ───────────────────────────────────────────────────────

const doc = new PDFDocument({ size: 'A4', margin: 0, bufferPages: true });
doc.pipe(fs.createWriteStream(OUTPUT));

const FONT_NORMAL  = 'Helvetica';
const FONT_BOLD    = 'Helvetica-Bold';
const FONT_OBLIQUE = 'Helvetica-Oblique';
const FONT_BOLDOBL = 'Helvetica-BoldOblique';

// ═══════════════════════════════════════════════════════════════════════
//  PAGE 1 — COVER PAGE (Grand Luxury Dark & Gold)
// ═══════════════════════════════════════════════════════════════════════
drawDarkBg(doc, BRAND.black);
drawOrnamentalFrame(doc, 22, BRAND.gold, BRAND.goldDark);
drawCornerBrackets(doc, 32, 45, 1.5, BRAND.goldLight);

// Top Crest
doc.save();
doc.font(FONT_BOLD).fontSize(8.5).fillColor(BRAND.goldLight);
doc.text('MAKRANA  •  RAJASTHAN  •  ESTABLISHED ATELIER', 0, 85, { width: PAGE_W, align: 'center', characterSpacing: 2 });
doc.restore();

drawGoldRule(doc, 105, 140);

// Logo (Centered with luxury gold backdrop badge)
if (fs.existsSync(LOGO)) {
  try {
    const logoW = 110;
    const logoH = 110;
    const logoX = (PAGE_W - logoW) / 2;
    const logoY = 160;

    doc.save();
    doc.circle(PAGE_W / 2, logoY + logoH / 2, 65).fill('#161a22');
    doc.circle(PAGE_W / 2, logoY + logoH / 2, 65).lineWidth(1).strokeColor(BRAND.gold).stroke();
    doc.circle(PAGE_W / 2, logoY + logoH / 2, 61).lineWidth(0.5).strokeColor(BRAND.goldDark).stroke();
    doc.restore();

    doc.image(LOGO, logoX, logoY, { width: logoW });
  } catch (e) {}
}

// Brand Title
doc.font(FONT_BOLD).fontSize(34).fillColor(BRAND.white);
doc.text('GALAXY MARBLE', 0, 310, { width: PAGE_W, align: 'center', characterSpacing: 3 });

// Tagline
doc.font(FONT_BOLD).fontSize(10).fillColor(BRAND.gold);
doc.text('ARCHITECTURAL STONE & TEMPLE ATELIER', 0, 355, { width: PAGE_W, align: 'center', characterSpacing: 2 });

drawGoldRule(doc, 385, 90);

// Catalogue Subtitle Badge
doc.save();
const badgeW = 280;
const badgeH = 26;
const badgeX = (PAGE_W - badgeW) / 2;
const badgeY = 415;
doc.roundedRect(badgeX, badgeY, badgeW, badgeH, 4).fill('#181d26');
doc.roundedRect(badgeX, badgeY, badgeW, badgeH, 4).lineWidth(0.8).strokeColor(BRAND.gold).stroke();
doc.font(FONT_BOLD).fontSize(10).fillColor(BRAND.goldLight);
doc.text('MASTER PRODUCT CATALOGUE 2026', badgeX, badgeY + 7.5, { width: badgeW, align: 'center', characterSpacing: 1.5 });
doc.restore();

// Description Paragraph
doc.font(FONT_OBLIQUE).fontSize(9.5).fillColor(BRAND.lightGrey);
doc.text(
  'Exquisite hand-carved pure Makrana white marble mandirs, classical garden water fountains, monolithic bathroom basins, luxury fluted consoles, and bespoke Islamic architectural stonework.',
  60,
  465,
  { width: PAGE_W - 120, align: 'center', lineGap: 4 }
);

// 3 Pillars Bar
const pillarY = 540;
const colW = (PAGE_W - 100) / 3;
const pillars = [
  { title: '100% MAKRANA', sub: 'Original Pure White Stone' },
  { title: 'MASTER ARTISANS', sub: 'Generational Craftsmanship' },
  { title: 'DOORSTEP DELIVERY', sub: 'All-India Wooden Crate Safe' },
];

for (let p = 0; p < pillars.length; p++) {
  const px = 50 + p * colW;
  doc.save();
  doc.roundedRect(px + 4, pillarY, colW - 8, 55, 3).fill('#131720');
  doc.roundedRect(px + 4, pillarY, colW - 8, 55, 3).lineWidth(0.5).strokeColor(BRAND.goldDark).stroke();
  doc.font(FONT_BOLD).fontSize(8.5).fillColor(BRAND.goldLight);
  doc.text(pillars[p].title, px + 4, pillarY + 12, { width: colW - 8, align: 'center', characterSpacing: 0.5 });
  doc.font(FONT_NORMAL).fontSize(7.5).fillColor(BRAND.grey);
  doc.text(pillars[p].sub, px + 8, pillarY + 28, { width: colW - 16, align: 'center' });
  doc.restore();
}

// Bottom Contact Box
const contactBoxY = PAGE_H - 145;
drawGoldRule(doc, contactBoxY, 260);

doc.font(FONT_NORMAL).fontSize(8.5).fillColor(BRAND.lightGrey);
doc.text('Factory & Works: Gali no. 2, Palara Road, Makrana, District Didwana-Kuchaman, Rajasthan, India', 0, contactBoxY + 14, { width: PAGE_W, align: 'center' });

doc.font(FONT_BOLD).fontSize(10.5).fillColor(BRAND.goldLight);
doc.text('Direct Helpline / WhatsApp: +91 90572 06605', 0, contactBoxY + 32, { width: PAGE_W, align: 'center', characterSpacing: 0.5 });

doc.font(FONT_NORMAL).fontSize(8).fillColor(BRAND.grey);
doc.text('concierge@galaxymarble.com  •  www.galaxymarble.com', 0, contactBoxY + 50, { width: PAGE_W, align: 'center' });

doc.font(FONT_OBLIQUE).fontSize(7.5).fillColor('#666666');
doc.text('Direct Quarry Prices  •  Custom Vedic Architecture & Modern Stone Works', 0, contactBoxY + 70, { width: PAGE_W, align: 'center' });


// ═══════════════════════════════════════════════════════════════════════
//  PAGE 2 — TABLE OF CONTENTS / INDEX (Luxury White / Ivory)
// ═══════════════════════════════════════════════════════════════════════
doc.addPage({ size: 'A4', margin: 0 });
drawWhiteBg(doc, '#ffffff');

// Outer Frame
doc.save();
doc.rect(20, 20, PAGE_W - 40, PAGE_H - 40).lineWidth(0.8).strokeColor(BRAND.borderGold).stroke();
doc.rect(24, 24, PAGE_W - 48, PAGE_H - 48).lineWidth(0.4).strokeColor(BRAND.borderLight).stroke();
doc.restore();

// Header
doc.font(FONT_BOLD).fontSize(8).fillColor(BRAND.goldDark);
doc.text('GALAXY MARBLE  •  COLLECTIONS INDEX', 0, 42, { width: PAGE_W, align: 'center', characterSpacing: 2 });

doc.font(FONT_BOLD).fontSize(22).fillColor(BRAND.textDark);
doc.text('Catalogue Portfolio', 0, 58, { width: PAGE_W, align: 'center' });

drawGoldRule(doc, 88, 60);

doc.font(FONT_OBLIQUE).fontSize(8.5).fillColor(BRAND.textMuted);
doc.text('Explore our 10 curated stone disciplines handcrafted in Makrana, Rajasthan.', 0, 96, { width: PAGE_W, align: 'center' });

// 10 Section Index Rows
const indexStartY = 125;
const rowH = 60;

for (let idx = 0; idx < SECTIONS.length; idx++) {
  const sec = SECTIONS[idx];
  const images = getImages(sec.folder);
  const rowY = indexStartY + idx * rowH;

  doc.save();
  // Card background
  doc.roundedRect(40, rowY, PAGE_W - 80, 50, 4).fill(idx % 2 === 0 ? '#fbfaf8' : '#ffffff');
  doc.roundedRect(40, rowY, PAGE_W - 80, 50, 4).lineWidth(0.5).strokeColor(BRAND.borderLight).stroke();

  // Index number bubble
  doc.roundedRect(52, rowY + 10, 30, 30, 3).fill('#161a22');
  doc.font(FONT_BOLD).fontSize(10).fillColor(BRAND.goldLight);
  doc.text(String(idx + 1).padStart(2, '0'), 52, rowY + 19, { width: 30, align: 'center' });

  // Title & Tagline
  doc.font(FONT_BOLD).fontSize(11).fillColor(BRAND.textDark);
  doc.text(sec.title, 95, rowY + 12);

  doc.font(FONT_NORMAL).fontSize(8).fillColor(BRAND.textMuted);
  doc.text(sec.subtitle, 95, rowY + 28, { width: PAGE_W - 240, ellipsis: true });

  // Design Count Pill
  const pillW = 75;
  const pillX = PAGE_W - 40 - 15 - pillW;
  doc.roundedRect(pillX, rowY + 14, pillW, 22, 11).fill(BRAND.badgeBg);
  doc.roundedRect(pillX, rowY + 14, pillW, 22, 11).lineWidth(0.5).strokeColor(BRAND.borderGold).stroke();
  doc.font(FONT_BOLD).fontSize(8).fillColor(BRAND.badgeText);
  doc.text(`${images.length} Designs`, pillX, rowY + 20, { width: pillW, align: 'center' });

  doc.restore();
}

// Index Footer
doc.save();
doc.moveTo(40, PAGE_H - 55).lineTo(PAGE_W - 40, PAGE_H - 55).lineWidth(0.5).strokeColor(BRAND.borderLight).stroke();
doc.font(FONT_NORMAL).fontSize(7.5).fillColor(BRAND.textMuted);
doc.text('Galaxy Marble Artisanal Portfolio  •  All Designs Customizable on Request  •  +91 90572 06605', 0, PAGE_H - 42, { width: PAGE_W, align: 'center' });
doc.restore();


// ═══════════════════════════════════════════════════════════════════════
//  SECTIONS: Divider Cover + 4-Image White Grid Pages
// ═══════════════════════════════════════════════════════════════════════

let totalSectionIndex = 0;

for (const section of SECTIONS) {
  totalSectionIndex++;
  const images = getImages(section.folder);
  if (images.length === 0) continue;

  // ─────────────────────────────────────────────────────────────────────
  // 1. SECTION DIVIDER COVER PAGE (Dramatic Luxury Dark)
  // ─────────────────────────────────────────────────────────────────────
  doc.addPage({ size: 'A4', margin: 0 });
  drawDarkBg(doc, BRAND.darkBg);
  drawOrnamentalFrame(doc, 22, BRAND.gold, BRAND.goldDark);
  drawCornerBrackets(doc, 32, 40, 1.2, BRAND.gold);

  // Top Category Tag
  doc.save();
  doc.font(FONT_BOLD).fontSize(8.5).fillColor(BRAND.goldLight);
  doc.text(`COLLECTION ${String(totalSectionIndex).padStart(2, '0')} / 10`, 0, 180, { width: PAGE_W, align: 'center', characterSpacing: 3 });
  doc.restore();

  drawGoldRule(doc, 205, 50);

  // Category Tagline
  doc.font(FONT_BOLD).fontSize(9.5).fillColor(BRAND.gold);
  doc.text(section.tagline, 0, 235, { width: PAGE_W, align: 'center', characterSpacing: 2 });

  // Main Category Title
  doc.font(FONT_BOLD).fontSize(32).fillColor(BRAND.white);
  doc.text(section.title, 0, 260, { width: PAGE_W, align: 'center', characterSpacing: 2 });

  drawGoldRule(doc, 310, 100);

  // Subtitle
  doc.font(FONT_BOLDOBL).fontSize(11).fillColor(BRAND.goldLight);
  doc.text(section.subtitle, 50, 335, { width: PAGE_W - 100, align: 'center', lineGap: 3 });

  // Detailed Description Box
  doc.save();
  const descBoxW = 440;
  const descBoxH = 80;
  const descBoxX = (PAGE_W - descBoxW) / 2;
  const descBoxY = 400;
  doc.roundedRect(descBoxX, descBoxY, descBoxW, descBoxH, 4).fill('#171b24');
  doc.roundedRect(descBoxX, descBoxY, descBoxW, descBoxH, 4).lineWidth(0.6).strokeColor(BRAND.goldDark).stroke();

  doc.font(FONT_NORMAL).fontSize(9.5).fillColor(BRAND.lightGrey);
  doc.text(section.desc, descBoxX + 20, descBoxY + 18, { width: descBoxW - 40, align: 'center', lineGap: 4 });
  doc.restore();

  // Design Count Ribbon
  doc.save();
  const countW = 180;
  const countH = 30;
  const countX = (PAGE_W - countW) / 2;
  const countY = 515;
  doc.roundedRect(countX, countY, countW, countH, 15).fill('#212733');
  doc.roundedRect(countX, countY, countW, countH, 15).lineWidth(0.8).strokeColor(BRAND.gold).stroke();
  doc.font(FONT_BOLD).fontSize(9.5).fillColor(BRAND.goldLight);
  doc.text(`${images.length} CURATED DESIGNS`, countX, countY + 10, { width: countW, align: 'center', characterSpacing: 1 });
  doc.restore();

  // Divider Footer
  doc.save();
  const divFootY = PAGE_H - 90;
  drawGoldRule(doc, divFootY, 180);
  doc.font(FONT_NORMAL).fontSize(8).fillColor(BRAND.grey);
  doc.text('GALAXY MARBLE  •  MAKRANA ARTISANAL ATELIER  •  +91 90572 06605', 0, divFootY + 14, { width: PAGE_W, align: 'center', characterSpacing: 1 });
  doc.restore();


  // ─────────────────────────────────────────────────────────────────────
  // 2. PRODUCT PHOTO GRID PAGES (4 IMAGES PER PAGE, WHITE BACKGROUND)
  // ─────────────────────────────────────────────────────────────────────
  const MARGIN      = 30;
  const GAP         = 16;
  const HEADER_TOP  = 20;
  const GRID_TOP    = 66;
  const FOOTER_BOT  = 30;

  // Grid Dimensions: 2 cols x 2 rows
  const CELL_W = (PAGE_W - 2 * MARGIN - GAP) / 2; // ~259.64 pt
  const CELL_H = (PAGE_H - GRID_TOP - FOOTER_BOT - GAP - 20) / 2; // ~350 pt

  let imageCounter = 0;
  const totalGridPages = Math.ceil(images.length / 4);

  for (let i = 0; i < images.length; i += 4) {
    const sectionPageNum = Math.floor(i / 4) + 1;

    // ADD NEW PAGE WITH PURE WHITE BACKGROUND
    doc.addPage({ size: 'A4', margin: 0 });
    drawWhiteBg(doc, BRAND.pageBgLight);

    // Subtle luxury outer frame on white page
    doc.save();
    doc.rect(16, 16, PAGE_W - 32, PAGE_H - 32).lineWidth(0.5).strokeColor(BRAND.borderLight).stroke();
    doc.restore();

    // ── PAGE HEADER ──
    doc.save();
    // Left: Category Title & Code
    doc.font(FONT_BOLD).fontSize(10).fillColor(BRAND.textDark);
    doc.text(section.title, MARGIN, HEADER_TOP + 4);

    doc.font(FONT_BOLD).fontSize(8).fillColor(BRAND.goldDark);
    doc.text(`  •  ${section.tagline}`, MARGIN + doc.widthOfString(section.title), HEADER_TOP + 5);

    // Right: Brand & Section Page Number
    doc.font(FONT_BOLD).fontSize(8.5).fillColor(BRAND.textDark);
    doc.text('GALAXY MARBLE', MARGIN, HEADER_TOP + 4, { width: PAGE_W - 2 * MARGIN, align: 'right' });
    
    // Hairline divider under header
    doc.moveTo(MARGIN, HEADER_TOP + 24).lineTo(PAGE_W - MARGIN, HEADER_TOP + 24).lineWidth(0.8).strokeColor(BRAND.borderGold).stroke();
    doc.restore();

    // ── 2x2 GRID POSITIONS ──
    const positions = [
      [0, 0], [1, 0],
      [0, 1], [1, 1]
    ];

    const pageImages = images.slice(i, i + 4);

    for (let j = 0; j < pageImages.length; j++) {
      imageCounter++;
      const [col, row] = positions[j];
      const cellX = MARGIN + col * (CELL_W + GAP);
      const cellY = GRID_TOP + row * (CELL_H + GAP);

      const itemCode = `GM-${section.code}-${String(imageCounter).padStart(2, '0')}`;

      // ── Card Container ──
      doc.save();
      // Outer shadow simulation
      doc.roundedRect(cellX + 1, cellY + 1, CELL_W, CELL_H, 5).fill('#eef1f5');
      // Card Main Background (Pure Crisp White)
      doc.roundedRect(cellX, cellY, CELL_W, CELL_H, 5).fill(BRAND.cardBgLight);
      // Card Border (Crisp elegant outline)
      doc.roundedRect(cellX, cellY, CELL_W, CELL_H, 5).lineWidth(0.8).strokeColor(BRAND.borderLight).stroke();
      doc.restore();

      // ── Item Code Tag (Top Header inside Card) ──
      const tagH = 22;
      doc.save();
      // Tag background
      doc.roundedRect(cellX + 8, cellY + 8, 82, tagH, 3).fill(BRAND.badgeBg);
      doc.roundedRect(cellX + 8, cellY + 8, 82, tagH, 3).lineWidth(0.5).strokeColor(BRAND.borderGold).stroke();
      doc.font(FONT_BOLD).fontSize(8).fillColor(BRAND.badgeText);
      doc.text(itemCode, cellX + 8, cellY + 14.5, { width: 82, align: 'center' });

      // Right mini badge: Makrana Pure White / Hand-Carved
      doc.font(FONT_NORMAL).fontSize(7.5).fillColor(BRAND.textMuted);
      doc.text('Hand-Carved Makrana', cellX + 96, cellY + 15, { width: CELL_W - 104, align: 'right' });
      doc.restore();

      // ── Image Frame Area ──
      const imgPadX = 10;
      const imgTopY = cellY + 36;
      const imgBoxW = CELL_W - 2 * imgPadX;
      const imgBoxH = CELL_H - 84; // Leave room for footer info

      // Image inner backing frame
      doc.save();
      doc.roundedRect(cellX + imgPadX, imgTopY, imgBoxW, imgBoxH, 4).fill('#f8fafc');
      doc.roundedRect(cellX + imgPadX, imgTopY, imgBoxW, imgBoxH, 4).lineWidth(0.5).strokeColor('#e2e8f0').stroke();
      doc.restore();

      // Render Image centered
      fitImage(doc, pageImages[j], cellX + imgPadX + 4, imgTopY + 4, imgBoxW - 8, imgBoxH - 8);

      // ── Card Bottom Information ──
      const infoY = imgTopY + imgBoxH + 6;
      doc.save();
      // Title / Stone Type
      doc.font(FONT_BOLD).fontSize(8.5).fillColor(BRAND.textDark);
      doc.text(`${section.title} • DESIGN ${String(imageCounter).padStart(2, '0')}`, cellX + 10, infoY, { width: CELL_W - 20, ellipsis: true });

      // Inquiry Note
      doc.font(FONT_NORMAL).fontSize(7.5).fillColor(BRAND.textMuted);
      doc.text('Custom Sizing Available  •  Price on Request', cellX + 10, infoY + 13, { width: CELL_W - 20 });

      // Gold check / Enquiry pill
      doc.font(FONT_BOLD).fontSize(7).fillColor(BRAND.goldDark);
      doc.text('Direct Factory Order', cellX + 10, infoY + 24, { width: CELL_W - 20 });
      doc.restore();
    }

    // ── PAGE FOOTER ──
    const footY = PAGE_H - 34;
    doc.save();
    // Top footer line
    doc.moveTo(MARGIN, footY - 8).lineTo(PAGE_W - MARGIN, footY - 8).lineWidth(0.5).strokeColor(BRAND.borderLight).stroke();

    // Footer Left: Factory Address
    doc.font(FONT_NORMAL).fontSize(7).fillColor(BRAND.textMuted);
    doc.text('Gali no. 2, Palara Road, Makrana, Rajasthan', MARGIN, footY);

    // Footer Center: Global Page Number Badge
    const currPage = doc.bufferedPageRange().count;
    doc.font(FONT_BOLD).fontSize(7.5).fillColor(BRAND.goldDark);
    doc.text(`—  Page ${currPage}  —`, 0, footY, { width: PAGE_W, align: 'center' });

    // Footer Right: Phone / Section page
    doc.font(FONT_NORMAL).fontSize(7).fillColor(BRAND.textMuted);
    doc.text(`WhatsApp: +91 90572 06605  (${sectionPageNum}/${totalGridPages})`, MARGIN, footY, { width: PAGE_W - 2 * MARGIN, align: 'right' });
    doc.restore();
  }
}


// ═══════════════════════════════════════════════════════════════════════
//  FINAL PAGE — BACK COVER / BESPOKE COMMISSIONS & CONTACT
// ═══════════════════════════════════════════════════════════════════════
doc.addPage({ size: 'A4', margin: 0 });
drawDarkBg(doc, BRAND.black);
drawOrnamentalFrame(doc, 22, BRAND.gold, BRAND.goldDark);
drawCornerBrackets(doc, 32, 45, 1.5, BRAND.goldLight);

// Top Logo
if (fs.existsSync(LOGO)) {
  try {
    const bLogoW = 90;
    const bLogoH = 90;
    const bLogoX = (PAGE_W - bLogoW) / 2;
    const bLogoY = 120;

    doc.save();
    doc.circle(PAGE_W / 2, bLogoY + bLogoH / 2, 52).fill('#161a22');
    doc.circle(PAGE_W / 2, bLogoY + bLogoH / 2, 52).lineWidth(1).strokeColor(BRAND.gold).stroke();
    doc.restore();

    doc.image(LOGO, bLogoX, bLogoY, { width: bLogoW });
  } catch (e) {}
}

// Brand Title
doc.font(FONT_BOLD).fontSize(28).fillColor(BRAND.white);
doc.text('GALAXY MARBLE', 0, 240, { width: PAGE_W, align: 'center', characterSpacing: 2 });

doc.font(FONT_BOLD).fontSize(9.5).fillColor(BRAND.gold);
doc.text('ARCHITECTURAL STONE & TEMPLE ATELIER', 0, 275, { width: PAGE_W, align: 'center', characterSpacing: 2 });

drawGoldRule(doc, 305, 100);

// Heading
doc.font(FONT_BOLD).fontSize(14).fillColor(BRAND.white);
doc.text('Custom Orders & Architectural Commissions', 0, 330, { width: PAGE_W, align: 'center' });

doc.font(FONT_OBLIQUE).fontSize(9.5).fillColor(BRAND.lightGrey);
doc.text(
  'We specialize in bespoke marble temples, custom floor medallion waterjet layouts, large-scale courtyard fountains, and complete temple & mosque stonework tailored to your architectural blueprints.',
  60,
  355,
  { width: PAGE_W - 120, align: 'center', lineGap: 4 }
);

// Contact Information Box
const infoBoxW = 420;
const infoBoxH = 175;
const infoBoxX = (PAGE_W - infoBoxW) / 2;
const infoBoxY = 430;

doc.save();
doc.roundedRect(infoBoxX, infoBoxY, infoBoxW, infoBoxH, 6).fill('#131720');
doc.roundedRect(infoBoxX, infoBoxY, infoBoxW, infoBoxH, 6).lineWidth(0.8).strokeColor(BRAND.gold).stroke();

// Contact Details inside Box
doc.font(FONT_BOLD).fontSize(8.5).fillColor(BRAND.goldLight);
doc.text('STUDIO & QUARRY WORKS', infoBoxX, infoBoxY + 16, { width: infoBoxW, align: 'center', characterSpacing: 1.5 });

doc.font(FONT_NORMAL).fontSize(9.5).fillColor(BRAND.white);
doc.text('Gali no. 2, Palara Road, Makrana', infoBoxX, infoBoxY + 36, { width: infoBoxW, align: 'center' });
doc.text('District Didwana-Kuchaman, Rajasthan, India', infoBoxX, infoBoxY + 52, { width: infoBoxW, align: 'center' });

doc.moveTo(infoBoxX + 40, infoBoxY + 75).lineTo(infoBoxX + infoBoxW - 40, infoBoxY + 75).lineWidth(0.5).strokeColor(BRAND.goldDark).stroke();

doc.font(FONT_BOLD).fontSize(12).fillColor(BRAND.goldLight);
doc.text('+91 90572 06605', infoBoxX, infoBoxY + 90, { width: infoBoxW, align: 'center', characterSpacing: 1 });

doc.font(FONT_NORMAL).fontSize(9).fillColor(BRAND.lightGrey);
doc.text('concierge@galaxymarble.com  •  www.galaxymarble.com', infoBoxX, infoBoxY + 112, { width: infoBoxW, align: 'center' });

doc.font(FONT_OBLIQUE).fontSize(8).fillColor(BRAND.grey);
doc.text('Instant Quotes & 3D Stone Consultation available via WhatsApp', infoBoxX, infoBoxY + 138, { width: infoBoxW, align: 'center' });
doc.restore();

// 4 Quality Badges at Bottom
const badgeBoxY = 635;
const badgeCols = [
  '100% Makrana Certified',
  'Vedic Vastu Standards',
  'Wooden Crate Packing',
  'All-India Safe Transit'
];
const bColW = (PAGE_W - 80) / 4;
for (let b = 0; b < badgeCols.length; b++) {
  const bx = 40 + b * bColW;
  doc.save();
  doc.roundedRect(bx + 3, badgeBoxY, bColW - 6, 32, 3).fill('#171c26');
  doc.roundedRect(bx + 3, badgeBoxY, bColW - 6, 32, 3).lineWidth(0.5).strokeColor(BRAND.goldDark).stroke();
  doc.font(FONT_BOLD).fontSize(7).fillColor(BRAND.goldLight);
  doc.text(badgeCols[b], bx + 3, badgeBoxY + 11, { width: bColW - 6, align: 'center' });
  doc.restore();
}

// Copyright Notice
const copyrightY = PAGE_H - 95;
drawGoldRule(doc, copyrightY, 200);

doc.font(FONT_OBLIQUE).fontSize(7.5).fillColor(BRAND.grey);
doc.text(
  'All stone products are individually handcrafted from natural stone. Veining, crystal patterns & natural marble tones are unique to each creation.',
  60,
  copyrightY + 12,
  { width: PAGE_W - 120, align: 'center', lineGap: 2 }
);

doc.font(FONT_NORMAL).fontSize(7.5).fillColor('#666666');
doc.text('© 2026 Galaxy Marble. All Rights Reserved. Makrana, Rajasthan.', 0, copyrightY + 42, { width: PAGE_W, align: 'center' });


// ─── Finalize ────────────────────────────────────────────────────────
doc.end();

doc.on('finish', () => {
  const stats = fs.statSync(OUTPUT);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`\n========================================`);
  console.log(`✨  GALAXY MARBLE CATALOGUE GENERATED!`);
  console.log(`📄  File: ${OUTPUT}`);
  console.log(`📦  Size: ${sizeMB} MB`);
  console.log(`📑  Total Pages: ${doc.bufferedPageRange().count}`);
  console.log(`========================================\n`);
});
