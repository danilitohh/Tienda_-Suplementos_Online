const formatCurrency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export const money = (value) => formatCurrency.format(value);

function initialsFrom(name) {
  return name
    .split(/[\s/-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function makePackArt({
  title,
  accent = "#63e6a6",
  accent2 = "#0e1b28",
  label = "PREMIUM",
}) {
  const initials = initialsFrom(title);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 720" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${accent2}" />
          <stop offset="100%" stop-color="#050b11" />
        </linearGradient>
        <linearGradient id="jar" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="#d6fff0" />
        </linearGradient>
      </defs>
      <rect width="560" height="720" rx="44" fill="url(#bg)" />
      <circle cx="420" cy="138" r="84" fill="${accent}" opacity=".18" />
      <circle cx="154" cy="590" r="110" fill="#ffffff" opacity=".05" />
      <rect x="144" y="118" width="272" height="424" rx="42" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.08)" />
      <rect x="174" y="72" width="212" height="72" rx="26" fill="${accent2}" />
      <rect x="182" y="95" width="196" height="18" rx="9" fill="${accent}" />
      <rect x="192" y="166" width="176" height="260" rx="32" fill="url(#jar)" opacity=".94" />
      <rect x="205" y="180" width="150" height="76" rx="20" fill="rgba(7,17,26,0.18)" />
      <text x="280" y="360" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="68" font-weight="700" fill="#07111a">${initials}</text>
      <text x="280" y="416" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="22" font-weight="700" fill="#07111a">${label}</text>
      <rect x="112" y="462" width="336" height="82" rx="28" fill="rgba(255,255,255,0.07)" />
      <text x="280" y="514" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="26" font-weight="700" fill="#eaf6f0">${title}</text>
      <text x="280" y="606" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="18" font-weight="600" fill="rgba(255,255,255,0.72)">FuelLab Colombia</text>
      <text x="280" y="640" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="18" font-weight="500" fill="rgba(255,255,255,0.58)">Compra online • Envío nacional</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const siteName = "Suplementos Colombia";
export const supportPhone = "+57 300 555 0198";
export const whatsappNumber = "573005550198";

export const navItems = [
  "Inicio",
  "Productos",
  "Marcas",
  "Combos",
  "Ofertas",
];

export const categories = [
  "Todos",
  "Proteínas",
  "Creatinas",
  "Pre-Entrenos",
  "Ganadores de Masa",
  "Aminoácidos",
  "Vitaminas",
  "Combos",
  "Glutaminas",
  "Quemadores",
  "Snacks",
  "Hidratación",
  "Oferta Semanal",
  "Obsequios",
];

export const brandNames = [
  "Optimum Nutrition",
  "Dymatize",
  "MuscleTech",
  "BSN",
  "Cellucor",
  "Natures Best",
  "Ronnie Coleman",
  "Combos",
];

export const heroSlides = [
  {
    eyebrow: "Envío gratis a toda Colombia",
    title: "Proteínas y creatinas listas para vender.",
    description:
      "Una vitrina limpia, rápida y editable para cambiar productos, precios y promos sin tocar la base del sitio.",
    cta: "Ver catálogo",
    secondary: "Hablar por WhatsApp",
    metric: "Top ventas",
    accent: "#e43131",
    accent2: "#181818",
    tag: "Proteínas",
  },
  {
    eyebrow: "Combos de la semana",
    title: "Stacks armados para volumen y definición.",
    description:
      "Combos, marcas y promos organizados con una estructura muy parecida a la tienda de referencia.",
    cta: "Explorar combos",
    secondary: "Ver marcas",
    metric: "Ahorra más",
    accent: "#181818",
    accent2: "#f7f7f7",
    tag: "Combos",
  },
  {
    eyebrow: "Marcas premium",
    title: "Una tienda pensada para convertir.",
    description:
      "Edita productos, precios y contenidos sin tocar la estructura base. El carrito y el checkout ya quedan listos.",
    cta: "Ir a ofertas",
    secondary: "Ver carrito",
    metric: "Editable",
    accent: "#e43131",
    accent2: "#f7f7f7",
    tag: "Ofertas",
  },
];

export const featureCards = [
  {
    title: "Envío gratis",
    text: "Promesa visible en la franja superior, como en la tienda de referencia.",
  },
  {
    title: "Compra segura",
    text: "Carrito persistente, totales claros y cierre rápido por WhatsApp.",
  },
  {
    title: "100% originales",
    text: "Bloques de confianza, marcas visibles y navegación limpia.",
  },
  {
    title: "Pensado para móvil",
    text: "Tarjetas apiladas y drawer lateral para una experiencia fluida.",
  },
];

const art = {
  wheyGold: makePackArt({ title: "Whey Gold", accent: "#e43131", accent2: "#181818", label: "PROTEIN" }),
  isolatePro: makePackArt({ title: "Isolate Pro", accent: "#181818", accent2: "#f7f7f7", label: "LEAN" }),
  creatine: makePackArt({ title: "Creatine", accent: "#e43131", accent2: "#f7f7f7", label: "STRENGTH" }),
  nitroRush: makePackArt({ title: "Nitro Rush", accent: "#181818", accent2: "#e9e9e9", label: "PRE" }),
  seriousMass: makePackArt({ title: "Serious Mass", accent: "#e43131", accent2: "#181818", label: "MASS" }),
  eaa: makePackArt({ title: "EAA Flux", accent: "#181818", accent2: "#f7f7f7", label: "RECOVERY" }),
  multivit: makePackArt({ title: "Multivit", accent: "#e43131", accent2: "#f7f7f7", label: "VITAMIN" }),
  glutamine: makePackArt({ title: "Glutamine", accent: "#181818", accent2: "#f7f7f7", label: "RECOVER" }),
  shred: makePackArt({ title: "Shred Max", accent: "#e43131", accent2: "#181818", label: "CUT" }),
  snackBar: makePackArt({ title: "Snack Box", accent: "#181818", accent2: "#f7f7f7", label: "SNACK" }),
  hydrate: makePackArt({ title: "Hydrate", accent: "#e43131", accent2: "#f7f7f7", label: "HYDRATE" }),
  giftPack: makePackArt({ title: "Gift Pack", accent: "#181818", accent2: "#f7f7f7", label: "BONUS" }),
  comboVol: makePackArt({ title: "Combo Vol", accent: "#e43131", accent2: "#181818", label: "VALUE" }),
  comboForce: makePackArt({ title: "Combo Force", accent: "#181818", accent2: "#f7f7f7", label: "VALUE" }),
  comboCut: makePackArt({ title: "Combo Cut", accent: "#e43131", accent2: "#f7f7f7", label: "VALUE" }),
  wheyBasic: makePackArt({ title: "Whey Basic", accent: "#181818", accent2: "#f7f7f7", label: "BASIC" }),
  creatine500: makePackArt({ title: "Creatine 500", accent: "#e43131", accent2: "#181818", label: "500G" }),
  aminoShot: makePackArt({ title: "Amino X", accent: "#181818", accent2: "#f7f7f7", label: "AMINO" }),
};

export const products = [
  {
    id: "whey-gold-standard",
    name: "Whey Gold Standard 5 lb",
    brand: "Optimum Nutrition",
    category: "Proteínas",
    tags: ["Proteínas", "Oferta Semanal", "Destacados"],
    collection: "Destacados",
    price: 279000,
    compareAt: 319000,
    rating: 4.9,
    reviews: 132,
    badge: "Top ventas",
    description:
      "Proteína de rápida disolución para recuperación diaria y soporte de masa muscular.",
    bullets: ["Rinde 74 porciones", "Alta solubilidad", "Sabor clásico"],
    variants: ["Chocolate", "Vainilla", "Cookies & Cream"],
    image: art.wheyGold,
    accent: "#ffd166",
  },
  {
    id: "isolate-pro",
    name: "Isolate Pro 2 lb",
    brand: "Dymatize",
    category: "Proteínas",
    tags: ["Proteínas", "Destacados"],
    collection: "Destacados",
    price: 239000,
    compareAt: 269000,
    rating: 4.8,
    reviews: 89,
    badge: "Lean protein",
    description:
      "Aislado de proteína pensado para una absorción limpia y una digestión más ligera.",
    bullets: ["Bajo en grasa", "Recuperación rápida", "Ideal post-entreno"],
    variants: ["Fudge Brownie", "Cookies", "Strawberry"],
    image: art.isolatePro,
    accent: "#66b3ff",
  },
  {
    id: "whey-basic",
    name: "Whey Basic 4 lb",
    brand: "Natures Best",
    category: "Proteínas",
    tags: ["Proteínas", "Oferta Semanal"],
    collection: "Destacados",
    price: 179000,
    compareAt: 209000,
    rating: 4.6,
    reviews: 74,
    badge: "Ahorro",
    description:
      "Una base económica para completar tu día de proteína sin sacrificar sabor.",
    bullets: ["Buen costo/servicio", "Rápida mezcla", "Uso diario"],
    variants: ["Chocolate", "Cookies", "Banana"],
    image: art.wheyBasic,
    accent: "#9ed4ff",
  },
  {
    id: "creatine-platinum",
    name: "Creatine Platinum 300 g",
    brand: "MuscleTech",
    category: "Creatinas",
    tags: ["Creatinas", "Destacados"],
    collection: "Destacados",
    price: 109000,
    compareAt: 129000,
    rating: 4.9,
    reviews: 151,
    badge: "Pura fuerza",
    description:
      "Creatina monohidratada micronizada para fuerza, bombeo y rendimiento diario.",
    bullets: ["Micronizada", "Sin sabor", "90 servicios"],
    variants: ["300 g", "500 g"],
    image: art.creatine,
    accent: "#63e6a6",
  },
  {
    id: "creatine-basic",
    name: "Creatina 500 g",
    brand: "Ronnie Coleman",
    category: "Creatinas",
    tags: ["Creatinas", "Oferta Semanal"],
    collection: "Destacados",
    price: 139000,
    compareAt: 159000,
    rating: 4.7,
    reviews: 68,
    badge: "Más volumen",
    description:
      "Presentación grande para mantener tu suplementación durante más tiempo.",
    bullets: ["500 g", "Sin aditivos", "Rendimiento estable"],
    variants: ["500 g", "1 kg"],
    image: art.creatine500,
    accent: "#63e6a6",
  },
  {
    id: "nitro-rush",
    name: "Nitro Rush X",
    brand: "Cellucor",
    category: "Pre-Entrenos",
    tags: ["Pre-Entrenos", "Destacados"],
    collection: "Destacados",
    price: 159000,
    compareAt: 189000,
    rating: 4.7,
    reviews: 94,
    badge: "Enfoque",
    description:
      "Pre-entreno para arrancar pesado, concentrado y con energía sostenida.",
    bullets: ["Energía rápida", "Enfoque mental", "Sabores intensos"],
    variants: ["Fruit Punch", "Blue Razz"],
    image: art.nitroRush,
    accent: "#ff8a80",
  },
  {
    id: "serious-mass",
    name: "Serious Mass XXL",
    brand: "Optimum Nutrition",
    category: "Ganadores de Masa",
    tags: ["Ganadores de Masa", "Destacados"],
    collection: "Destacados",
    price: 219000,
    compareAt: 259000,
    rating: 4.8,
    reviews: 108,
    badge: "Volumen",
    description:
      "Fórmula para días de alto gasto calórico con carbohidratos y proteína de apoyo.",
    bullets: ["Calorías densas", "Alta saciedad", "Ideal volumen"],
    variants: ["2.7 kg", "5.4 kg"],
    image: art.seriousMass,
    accent: "#c8a6ff",
  },
  {
    id: "eaa-flux",
    name: "EAA Flux",
    brand: "BSN",
    category: "Aminoácidos",
    tags: ["Aminoácidos", "Destacados"],
    collection: "Destacados",
    price: 139000,
    compareAt: 159000,
    rating: 4.7,
    reviews: 81,
    badge: "Recuperación",
    description:
      "Aminoácidos esenciales para acompañar entrenos exigentes o sesiones dobles.",
    bullets: ["EAA completos", "Bajo en calorías", "Muy soluble"],
    variants: ["Mango", "Berry"],
    image: art.eaa,
    accent: "#8fd2ff",
  },
  {
    id: "multivit-men",
    name: "Multivit Men",
    brand: "Natures Best",
    category: "Vitaminas",
    tags: ["Vitaminas", "Destacados"],
    collection: "Destacados",
    price: 99000,
    compareAt: 119000,
    rating: 4.6,
    reviews: 53,
    badge: "Salud diaria",
    description:
      "Multivitamínico pensado para completar rutinas de entrenamiento y trabajo.",
    bullets: ["Micronutrientes clave", "Fácil de tomar", "Uso diario"],
    variants: ["60 softgels", "120 softgels"],
    image: art.multivit,
    accent: "#f6d36b",
  },
  {
    id: "glutamine-recovery",
    name: "Glutamine Recovery",
    brand: "BSN",
    category: "Glutaminas",
    tags: ["Glutaminas", "Destacados"],
    collection: "Destacados",
    price: 119000,
    compareAt: 139000,
    rating: 4.7,
    reviews: 62,
    badge: "Soporte",
    description:
      "Glutamina para recuperación y apoyo en rutinas de alto volumen.",
    bullets: ["Alta pureza", "Mezcla sencilla", "Apoyo post-entreno"],
    variants: ["300 g", "500 g"],
    image: art.glutamine,
    accent: "#8dffbb",
  },
  {
    id: "shred-max",
    name: "Shred Max",
    brand: "MuscleTech",
    category: "Quemadores",
    tags: ["Quemadores", "Oferta Semanal"],
    collection: "Destacados",
    price: 149000,
    compareAt: 179000,
    rating: 4.5,
    reviews: 46,
    badge: "Definición",
    description:
      "Apoyo para fases de definición con enfoque en energía y control de apetito.",
    bullets: ["Con cafeína", "Enfoque limpio", "Fórmula fuerte"],
    variants: ["Capsulas", "Softgels"],
    image: art.shred,
    accent: "#ff8d8d",
  },
  {
    id: "protein-bar-box",
    name: "Protein Bar Box",
    brand: "Natures Best",
    category: "Snacks",
    tags: ["Snacks", "Obsequios"],
    collection: "Destacados",
    price: 84000,
    compareAt: 98000,
    rating: 4.4,
    reviews: 38,
    badge: "Snack box",
    description:
      "Caja de snacks con proteína para media mañana, viaje o antojos controlados.",
    bullets: ["Práctico", "Portátil", "Buen sabor"],
    variants: ["Caja x6", "Caja x12"],
    image: art.snackBar,
    accent: "#d6b8ff",
  },
  {
    id: "electro-hydrate",
    name: "Electro Hydrate",
    brand: "Ronnie Coleman",
    category: "Hidratación",
    tags: ["Hidratación", "Destacados"],
    collection: "Destacados",
    price: 65000,
    compareAt: 79000,
    rating: 4.6,
    reviews: 27,
    badge: "Hidratación",
    description:
      "Bebida para reposición de electrolitos en sesiones largas o días de calor.",
    bullets: ["Electrolitos clave", "Ligero", "Rápida absorción"],
    variants: ["Tropical", "Lima"],
    image: art.hydrate,
    accent: "#72e0d3",
  },
  {
    id: "gift-pack",
    name: "Gift Pack Shaker",
    brand: "Combos",
    category: "Obsequios",
    tags: ["Obsequios"],
    collection: "Destacados",
    price: 39000,
    compareAt: 49000,
    rating: 4.9,
    reviews: 19,
    badge: "Detalle",
    description:
      "Kit con shaker y extras para regalar o complementar tus compras.",
    bullets: ["Ideal regalo", "Accesorios útiles", "Edición limitada"],
    variants: ["Negro", "Blanco"],
    image: art.giftPack,
    accent: "#ffffff",
  },
  {
    id: "combo-volumen",
    name: "Combo Ahorro Volumen",
    brand: "Combos",
    category: "Combos",
    tags: ["Combos", "Proteínas", "Creatinas", "Oferta Semanal"],
    collection: "Combos",
    price: 429000,
    compareAt: 487000,
    rating: 5.0,
    reviews: 51,
    badge: "Combo ahorro",
    description:
      "Pack listo para volumen con proteína, creatina y recuperación a mejor precio.",
    bullets: ["Más ahorro", "Stack inicial", "Envío preferente"],
    variants: ["Volumen", "Volumen XL"],
    image: art.comboVol,
    accent: "#63e6a6",
  },
  {
    id: "combo-fuerza",
    name: "Combo Fuerza Total",
    brand: "Combos",
    category: "Combos",
    tags: ["Combos", "Creatinas", "Pre-Entrenos"],
    collection: "Combos",
    price: 369000,
    compareAt: 417000,
    rating: 4.9,
    reviews: 43,
    badge: "Fuerza",
    description:
      "Una combinación enfocada en levantamientos, rendimiento y energía sostenida.",
    bullets: ["Pre + creatina", "Rendimiento", "Alta demanda"],
    variants: ["Fuerza", "Fuerza Pro"],
    image: art.comboForce,
    accent: "#ffd166",
  },
  {
    id: "combo-corte",
    name: "Combo Corte Limpio",
    brand: "Combos",
    category: "Combos",
    tags: ["Combos", "Quemadores", "Proteínas", "Oferta Semanal"],
    collection: "Combos",
    price: 349000,
    compareAt: 399000,
    rating: 4.8,
    reviews: 37,
    badge: "Corte",
    description:
      "Pack de definición con proteína, soporte metabólico y recuperación.",
    bullets: ["Definición", "Sabor ligero", "Buen ahorro"],
    variants: ["Corte", "Corte XL"],
    image: art.comboCut,
    accent: "#66b3ff",
  },
  {
    id: "amino-shot",
    name: "Amino X Shot",
    brand: "BSN",
    category: "Aminoácidos",
    tags: ["Aminoácidos", "Oferta Semanal"],
    collection: "Destacados",
    price: 129000,
    compareAt: 149000,
    rating: 4.5,
    reviews: 31,
    badge: "EAA",
    description:
      "Aminoácidos listos para entrenos cortos o sesiones de alto desgaste.",
    bullets: ["Baja carga", "Muy práctico", "Buen sabor"],
    variants: ["Lima", "Frutos rojos"],
    image: art.aminoShot,
    accent: "#f78fb3",
  },
];

export const recommendationIds = [
  "whey-gold-standard",
  "creatine-platinum",
  "isolate-pro",
  "serious-mass",
  "whey-basic",
];

export const brandCards = [
  {
    name: "Optimum Nutrition",
    initials: "ON",
    text: "Proteínas y whey para una vitrina reconocible.",
    accent: "#e43131",
  },
  {
    name: "Dymatize",
    initials: "DY",
    text: "Aislados y proteínas con presencia premium.",
    accent: "#181818",
  },
  {
    name: "MuscleTech",
    initials: "MT",
    text: "Pre-entrenos y rendimiento con una estética fuerte.",
    accent: "#e43131",
  },
  {
    name: "BSN",
    initials: "BS",
    text: "Recuperación, aminoácidos y productos versátiles.",
    accent: "#181818",
  },
  {
    name: "Cellucor",
    initials: "CC",
    text: "Energía, enfoque y fórmulas de activación.",
    accent: "#e43131",
  },
  {
    name: "Natures Best",
    initials: "NB",
    text: "Proteína, vitaminas y suplementos diarios.",
    accent: "#181818",
  },
  {
    name: "Ronnie Coleman",
    initials: "RC",
    text: "Una línea robusta para alto rendimiento.",
    accent: "#e43131",
  },
  {
    name: "Combos",
    initials: "CO",
    text: "Combos, obsequios y packs para vender más rápido.",
    accent: "#181818",
  },
];

export const coupons = {
  SCO10: { type: "percent", value: 10, minSubtotal: 0, label: "10% de descuento" },
  RUTA15: { type: "percent", value: 15, minSubtotal: 150000, label: "15% en compras desde $150.000" },
  MUSCLE20: { type: "percent", value: 20, minSubtotal: 250000, label: "20% en compras grandes" },
};
