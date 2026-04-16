export const BRAND = {
  NAME: "La Madeja CR",
  TAGLINE: "Tejidos hechos con amor, hechos para durar",
  DESCRIPTION:
    "Somos un emprendimiento costarricense especializado en productos tejidos a crochet, hechos completamente a mano con materiales de la más alta calidad.",
  WHATSAPP: "50688888888", // Actualizar con número real
  PHONE: "+506 8888-8888",
  EMAIL: "hola@lamadejacr.com",
  INSTAGRAM: "https://www.instagram.com/lamadejacr",
  FACEBOOK: "https://www.facebook.com/lamadejacrr",
  ADDRESS: {
    CITY: "San José",
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
