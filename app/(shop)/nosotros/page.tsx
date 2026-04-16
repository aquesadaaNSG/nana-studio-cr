import type { Metadata } from "next";
import { BRAND } from "@/shared/constants/contact";
import AboutPageContent from "@/modules/about/components/AboutPageContent";

export const metadata: Metadata = {
  title: "Nosotros",
  description: `Conoce la historia de ${BRAND.NAME}, un emprendimiento costarricense de tejidos artesanales a crochet.`,
};

export default function AboutPage() {
  return <AboutPageContent />;
}
