"use client";

import { WhatsApp } from "@mui/icons-material";
import { BRAND, getWhatsAppUrl } from "@/shared/constants/contact";

export default function FloatingWhatsAppButton() {
  const handleClick = () => {
    const message = `¡Hola ${BRAND.NAME}! Me gustaría obtener más información sobre sus productos tejidos. 🧶`;
    const url = getWhatsAppUrl(message);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Contactar por WhatsApp"
      title="Chatea con nosotros en WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300"
    >
      <WhatsApp sx={{ fontSize: 28 }} />
    </button>
  );
}
