import { Box, Container, Typography } from "@mui/material";
import type { Metadata } from "next";
import { getAllProducts, getAllCategories } from "@/shared/utils/products";
import ShopClient from "@/modules/products/components/ShopClient";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Explora todos nuestros tejidos artesanales a crochet. Bolsos, amigurumis, accesorios, hogar y más.",
};

interface ShopPageProps {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { categoria } = await searchParams;
  const products = getAllProducts();
  const categories = getAllCategories();

  return (
    <>
      {/* Page header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #FFF0F5 0%, #F5EEFF 100%)",
          py: { xs: 5, md: 7 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "0.15em" }}
          >
            Nuestra colección
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 800, mt: 0.5 }}>
            Tienda
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 1, maxWidth: 500, mx: "auto" }}
          >
            Cada pieza tejida a mano con amor. Encuentra el regalo perfecto o un
            mimo para ti.
          </Typography>
        </Container>
      </Box>

      <ShopClient
        initialProducts={products}
        categories={categories}
        initialCategory={categoria}
      />
    </>
  );
}
