"use client";

import { Box, Container, Typography, Button, Chip } from "@mui/material";
import { ArrowForward, LocalShipping, Star, Handyman } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import { Product, Category } from "@/shared/interfaces/product";
import ProductCard from "@/modules/products/components/ProductCard";
import { formatUSD } from "@/shared/utils/formatPrice";
import { FREE_SHIPPING_THRESHOLD, FREE_SHIPPING_LABEL } from "@/shared/utils/shipping";
import { BRAND } from "@/shared/constants/contact";

interface HomePageContentProps {
  featured: Product[];
  categories: Category[];
}

export default function HomePageContent({ featured, categories }: HomePageContentProps) {
  return (
    <>
      {/* HERO */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #E8F4F8 0%, #EDF7FA 50%, #E8F4F8 100%)",
          pt: { xs: 6, md: 10 },
          pb: { xs: 8, md: 12 },
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute", top: -80, right: -80, width: 400, height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(174,217,224,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute", bottom: -60, left: -60, width: 300, height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168,197,218,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <Container maxWidth="lg">
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 4, md: 8 }, alignItems: "center" }}>
            <Box>
              <Chip
                label="🧶 Tejidos artesanales desde Costa Rica"
                sx={{ backgroundColor: "rgba(174, 217, 224, 0.2)", color: "primary.dark", fontWeight: 600, mb: 3, borderRadius: "999px" }}
              />
              <Typography variant="h1" sx={{ fontSize: { xs: "2.25rem", sm: "2.75rem", md: "3.5rem" }, fontWeight: 800, lineHeight: 1.15, mb: 2 }}>
                Tejidos con{" "}
                <Box component="span" sx={{ color: "primary.main" }}>amor</Box>{" "}
                para ti
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, maxWidth: 480, fontSize: "1.1rem" }}>
                Cada pieza es única, creada a mano con los mejores materiales.
                Bolsos, amigurumis, accesorios y decoración que cuentan una historia.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button variant="contained" color="primary" size="large" component={Link} href="/tienda" endIcon={<ArrowForward />} sx={{ px: 4 }}>
                  Ver tienda
                </Button>
                <Button variant="outlined" color="primary" size="large" component={Link} href="/nosotros" sx={{ px: 4 }}>
                  Nuestra historia
                </Button>
              </Box>
              <Box sx={{ display: "flex", gap: 3, mt: 4, flexWrap: "wrap" }}>
                {[
                  { icon: <Star sx={{ fontSize: 16, color: "#FFB300" }} />, text: "4.9/5 estrellas" },
                  { icon: <LocalShipping sx={{ fontSize: 16, color: "success.main" }} />, text: `Envío gratis +${FREE_SHIPPING_LABEL}` },
                  { icon: <Handyman sx={{ fontSize: 16, color: "secondary.main" }} />, text: "100% hecho a mano" },
                ].map((b) => (
                  <Box key={b.text} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {b.icon}
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>{b.text}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: { xs: "none", md: "grid" }, gridTemplateColumns: "1fr 1fr", gridTemplateRows: "200px 200px", gap: 2 }}>
              {featured.slice(0, 3).map((p, i) => (
                <Box key={p.id} sx={{ borderRadius: "16px", overflow: "hidden", position: "relative", gridRow: i === 0 ? "1 / 3" : "auto", gridColumn: i === 0 ? "1" : "2" }}>
                  <Image src={p.images[0]} alt={p.name} fill style={{ objectFit: "cover" }} sizes="25vw" priority={i === 0} />
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CATEGORIES */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: "background.default" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "0.15em" }}>Explora</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mt: 0.5 }}>Nuestras categorías</Typography>
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(6, 1fr)" }, gap: 2 }}>
            {categories.map((cat) => (
              <Link key={cat.id} href={`/tienda?categoria=${cat.id}`} style={{ textDecoration: "none" }}>
                <Box sx={{ borderRadius: "16px", overflow: "hidden", position: "relative", aspectRatio: "4/5", cursor: "pointer", "&:hover img": { transform: "scale(1.08)" } }}>
                  <Image src={cat.image} alt={cat.name} fill sizes="(max-width: 600px) 45vw, 18vw" style={{ objectFit: "cover", transition: "transform 0.4s ease" }} />
                  <Box sx={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${cat.color}EE 0%, transparent 55%)` }} />
                  <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, p: 1.5 }}>
                    <Typography variant="caption" sx={{ color: "white", fontWeight: 700, fontSize: "0.75rem", lineHeight: 1.3, display: "block", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
                      {cat.name}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            ))}
          </Box>
        </Container>
      </Box>

      {/* FEATURED PRODUCTS */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: "#EDF7FA" }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
            <Box>
              <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "0.15em" }}>Favoritos</Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mt: 0.5 }}>Más vendidos</Typography>
            </Box>
            <Button variant="outlined" color="primary" component={Link} href="/tienda" endIcon={<ArrowForward />}>Ver todos</Button>
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: { xs: 2, md: 3 } }}>
            {featured.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        </Container>
      </Box>

      {/* WHY US */}
      <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: "background.default" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "0.15em" }}>Por qué elegirnos</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mt: 0.5 }}>Artesanía con propósito</Typography>
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 3 }}>
            {[
              { icon: "🧶", title: "100% Hecho a mano", desc: "Cada producto es tejido con dedicación y amor. No hay dos piezas exactamente iguales.", bg: "#E8F4F8" },
              { icon: "🌿", title: "Materiales naturales", desc: "Usamos algodón, lana merino y fibras naturales de la más alta calidad.", bg: "#EBF6F0" },
              { icon: "🎨", title: "Colores personalizados", desc: "¿Quieres un color especial? Podemos crear tu pieza soñada a pedido.", bg: "#EDF7FA" },
              { icon: "🚚", title: "Envío a toda Costa Rica", desc: `Enviamos por Correos de Costa Rica. Gratis en pedidos mayores a ${FREE_SHIPPING_LABEL}.`, bg: "#FFFBF0" },
              { icon: "💬", title: "Atención personalizada", desc: "Respuesta rápida por WhatsApp. Te acompañamos en cada paso de tu compra.", bg: "#E8F4F8" },
              { icon: "🌟", title: "Garantía de calidad", desc: "Si algo no te satisface, trabajamos para encontrar la mejor solución.", bg: "#EBF6F0" },
            ].map((item) => (
              <Box key={item.title} sx={{ p: 3, borderRadius: "20px", backgroundColor: item.bg, border: "1px solid rgba(174, 217, 224, 0.5)" }}>
                <Box sx={{ fontSize: "2.5rem", mb: 2 }}>{item.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{item.desc}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA BANNER */}
      <Box sx={{ py: { xs: 6, md: 8 }, background: "linear-gradient(135deg, #AED9E0 0%, #A8C5DA 100%)", textAlign: "center" }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ color: "#2C4A5A", fontWeight: 800, mb: 2 }}>¿Listo para llevar un tejido a tu vida?</Typography>
          <Typography variant="body1" sx={{ color: "rgba(44,74,90,0.75)", mb: 4, fontSize: "1.1rem" }}>
            Explora nuestra tienda o escríbenos para un pedido personalizado.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button variant="contained" size="large" component={Link} href="/tienda" endIcon={<ArrowForward />}
              sx={{ backgroundColor: "#2C4A5A", color: "white", "&:hover": { backgroundColor: "#3A5F72" }, px: 4 }}>
              Ver tienda
            </Button>
            <Button variant="outlined" size="large"
              href={`https://wa.me/${BRAND.WHATSAPP}?text=${encodeURIComponent("¡Hola! Me gustaría un pedido personalizado 🧶")}`}
              target="_blank" rel="noopener noreferrer"
              sx={{ borderColor: "#2C4A5A", color: "#2C4A5A", "&:hover": { borderColor: "#2C4A5A", backgroundColor: "rgba(44,74,90,0.08)" }, px: 4 }}>
              Pedido personalizado
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
