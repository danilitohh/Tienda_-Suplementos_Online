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

export const siteName = "FuelLab Colombia";
export const supportPhone = "+57 300 555 0198";
export const whatsappNumber = "573005550198";

export const navItems = [
  "Inicio",
  "Productos",
  "Marcas",
  "Combos",
  "Ofertas",
  "Blog",
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
  "SASCHA",
  "Proscience",
  "Basic",
  "Nutramerican",
  "Ronnie Coleman",
];

export const heroSlides = [
  {
    eyebrow: "Envío gratis a toda Colombia",
    title: "Suplementos para rendir más, sin perder tiempo.",
    description:
      "Catálogo curado para fuerza, volumen y definición con filtros rápidos, carrito persistente y checkout listo para conectar a tu operación real.",
    cta: "Ver productos",
    secondary: "Hablar por WhatsApp",
    metric: "Más de 18 referencias",
    accent: "#63e6a6",
    accent2: "#10302a",
    tag: "Destacados",
  },
  {
    eyebrow: "Combos listos para volumen",
    title: "Arma tu stack con proteínas, creatina y recuperación.",
    description:
      "Tablero visual inspirado en tiendas reales: combos, marcas, recomendados y una experiencia móvil que se siente viva y comprensible.",
    cta: "Explorar combos",
    secondary: "Ver marcas",
    metric: "Ahorra en packs",
    accent: "#ffd166",
    accent2: "#2a1d0d",
    tag: "Combos",
  },
  {
    eyebrow: "Compra segura y soporte humano",
    title: "Una tienda completa para vender, escalar y probar campañas.",
    description:
      "Puedes cambiar productos, precios, textos, métodos de pago y flujo de checkout sin tocar la estructura base del sitio.",
    cta: "Ir al checkout",
    secondary: "Ver carrito",
    metric: "Listo para adaptar",
    accent: "#66b3ff",
    accent2: "#0c2238",
    tag: "Checkout",
  },
];

export const featureCards = [
  {
    title: "Proteínas premium",
    text: "Productos de recuperación y volumen con presentación clara, precios visibles y CTA directo.",
  },
  {
    title: "Cupón y promociones",
    text: "Aplica códigos en el carrito, calcula el descuento y muestra el total actualizado al instante.",
  },
  {
    title: "Checkout funcional",
    text: "Formulario interactivo con resumen de pedido, método de entrega y confirmación final.",
  },
  {
    title: "Pensado para móvil",
    text: "Layout responsive con drawer, navegación compacta y catálogo legible en pantallas pequeñas.",
  },
];

const art = {
  wheyGold: makePackArt({ title: "Whey Gold", accent: "#ffd166", accent2: "#2a1d0d", label: "PROTEIN" }),
  isolatePro: makePackArt({ title: "Isolate Pro", accent: "#66b3ff", accent2: "#0c2238", label: "LEAN" }),
  creatine: makePackArt({ title: "Creatine", accent: "#63e6a6", accent2: "#10302a", label: "STRENGTH" }),
  nitroRush: makePackArt({ title: "Nitro Rush", accent: "#ff8a80", accent2: "#301119", label: "PRE" }),
  seriousMass: makePackArt({ title: "Serious Mass", accent: "#c8a6ff", accent2: "#241436", label: "MASS" }),
  eaa: makePackArt({ title: "EAA Flux", accent: "#8fd2ff", accent2: "#0f2238", label: "RECOVERY" }),
  multivit: makePackArt({ title: "Multivit", accent: "#f6d36b", accent2: "#2b220a", label: "VITAMIN" }),
  glutamine: makePackArt({ title: "Glutamine", accent: "#8dffbb", accent2: "#10201a", label: "RECOVER" }),
  shred: makePackArt({ title: "Shred Max", accent: "#ff8d8d", accent2: "#321012", label: "CUT" }),
  snackBar: makePackArt({ title: "Snack Box", accent: "#d6b8ff", accent2: "#2a193d", label: "SNACK" }),
  hydrate: makePackArt({ title: "Hydrate", accent: "#72e0d3", accent2: "#09302d", label: "HYDRATE" }),
  giftPack: makePackArt({ title: "Gift Pack", accent: "#ffffff", accent2: "#223042", label: "BONUS" }),
  comboVol: makePackArt({ title: "Combo Vol", accent: "#63e6a6", accent2: "#10302a", label: "VALUE" }),
  comboForce: makePackArt({ title: "Combo Force", accent: "#ffd166", accent2: "#2a1d0d", label: "VALUE" }),
  comboCut: makePackArt({ title: "Combo Cut", accent: "#66b3ff", accent2: "#0c2238", label: "VALUE" }),
  wheyBasic: makePackArt({ title: "Whey Basic", accent: "#9ed4ff", accent2: "#0d2339", label: "BASIC" }),
  creatine500: makePackArt({ title: "Creatine 500", accent: "#63e6a6", accent2: "#10302a", label: "500G" }),
  aminoShot: makePackArt({ title: "Amino X", accent: "#f78fb3", accent2: "#32101e", label: "AMINO" }),
};

export const products = [
  {
    id: "whey-gold-standard",
    name: "Whey Gold 5 lb",
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
    brand: "Basic",
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
    brand: "Iron Lab",
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
    brand: "Nutramerican",
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
    brand: "Mutant",
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
    brand: "Proscience",
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
    brand: "NOW",
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
    brand: "Simply",
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
    brand: "SASCHA",
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
    brand: "FuelLab",
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
    brand: "FuelLab",
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
    brand: "FuelLab",
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
    brand: "FuelLab",
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

export const blogEntries = [
  {
    title: "Cómo elegir tu proteína según tu objetivo",
    text:
      "Busca una proteína alta en calidad, revisa la porción y ajusta el momento de uso a tu rutina diaria.",
  },
  {
    title: "Creatina: cuándo tomarla y cuánto usar",
    text:
      "La constancia importa más que el horario. Define una dosis clara y acompáñala con agua suficiente.",
  },
  {
    title: "Combos que funcionan para volumen limpio",
    text:
      "Combina proteína, creatina y un gainer solo cuando tus calorías totales realmente lo necesitan.",
  },
];

export const brandCards = [
  {
    name: "Optimum Nutrition",
    initials: "ON",
    text: "Proteínas y whey pensadas para compras recurrentes y una marca reconocida.",
    accent: "#ffd166",
  },
  {
    name: "Dymatize",
    initials: "DY",
    text: "Aislados y proteínas con identidad premium para catálogos que venden confianza.",
    accent: "#66b3ff",
  },
  {
    name: "MuscleTech",
    initials: "MT",
    text: "Pre-entrenos y apoyo de rendimiento con una estética fuerte y deportiva.",
    accent: "#ff8a80",
  },
  {
    name: "BSN",
    initials: "BS",
    text: "Recuperación, aminoácidos y productos versátiles para rutina diaria.",
    accent: "#8dffbb",
  },
  {
    name: "Cellucor",
    initials: "CC",
    text: "Energía, enfoque y fórmulas de activación con mucha presencia visual.",
    accent: "#c8a6ff",
  },
  {
    name: "FuelLab",
    initials: "FL",
    text: "Combos, obsequios y packs diseñados para el checkout de esta tienda demo.",
    accent: "#63e6a6",
  },
];

export const coupons = {
  SCO10: { type: "percent", value: 10, minSubtotal: 0, label: "10% de descuento" },
  RUTA15: { type: "percent", value: 15, minSubtotal: 150000, label: "15% en compras desde $150.000" },
  MUSCLE20: { type: "percent", value: 20, minSubtotal: 250000, label: "20% en compras grandes" },
};

export const faqs = [
  {
    question: "¿Este sitio ya vende en serio?",
    answer:
      "La base está lista para catálogo, carrito y checkout. Solo tienes que conectar pasarela de pago, inventario y backend real.",
  },
  {
    question: "¿Puedo cambiar productos y precios?",
    answer:
      "Sí. Todo el catálogo vive en un archivo de datos separado para que puedas editarlo sin tocar la lógica principal.",
  },
  {
    question: "¿Sirve en celular?",
    answer:
      "Sí. El diseño cambia a una navegación compacta, tarjetas apiladas y drawer de carrito para no perder fluidez.",
  },
];
