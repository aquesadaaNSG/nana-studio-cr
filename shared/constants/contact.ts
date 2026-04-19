export const BRAND = {
  NAME: "Nana Studio",
  TAGLINE: "Un universo en cada puntada",
  DESCRIPTION:
    "Somos un emprendimiento costarricense especializado en productos tejidos a crochet, hechos completamente a mano con materiales de la más alta calidad.",
  WHATSAPP: "50684410997",
  PHONE: "+506 8441-0997",
  EMAIL: "nana.stud1o68@gmail.com",
  INSTAGRAM: "https://www.instagram.com/nana.stud1o/",
  TIKTOK: "https://www.tiktok.com/@nana.stud1o",
  ADDRESS: {
    CITY: "Cartago",
    COUNTRY: "Costa Rica",
  },
} as const;

export const getWhatsAppUrl = (message?: string): string => {
  const encoded = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${BRAND.WHATSAPP}${encoded ? `?text=${encoded}` : ""}`;
};

export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Tienda" },
  { href: "/nosotros", label: "Nosotros" },
] as const;
