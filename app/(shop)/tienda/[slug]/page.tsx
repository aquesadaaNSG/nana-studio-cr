import { notFound } from "next/navigation";
import { Box, Container } from "@mui/material";
import type { Metadata } from "next";
import { getProductBySlug, getRelatedProducts, getAllProducts } from "@/shared/utils/products";
import ProductDetailClient from "@/modules/products/components/ProductDetailClient";
import ProductCard from "@/modules/products/components/ProductCard";
import { Typography } from "@mui/material";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ProductDetailClient product={product} />

        {/* Related products */}
        {related.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
              También te puede gustar
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: { xs: 2, md: 3 },
              }}
            >
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
