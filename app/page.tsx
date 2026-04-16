import type { Metadata } from "next";
import { getFeaturedProducts, getAllCategories } from "@/shared/utils/products";
import HomePageContent from "@/modules/home/components/HomePageContent";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Tejidos artesanales a crochet hechos con amor en Costa Rica. Bolsos, amigurumis, accesorios y decoración únicos.",
};

export default function HomePage() {
  const featured = getFeaturedProducts();
  const categories = getAllCategories();
  return <HomePageContent featured={featured} categories={categories} />;
}
