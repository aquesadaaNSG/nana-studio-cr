"use client";

import { Box, Container, Typography, Button, Divider } from "@mui/material";
import { ArrowForward, Favorite, WhatsApp } from "@mui/icons-material";
import Link from "next/link";
import { BRAND, getWhatsAppUrl } from "@/shared/constants/contact";

export default function AboutPageContent() {
  return (
    <>
      {/* Hero */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #E8F4F8 0%, #EDF7FA 100%)",
          py: { xs: 8, md: 12 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ fontSize: "3.5rem", mb: 2 }}>🧶</Box>
          <Typography
            variant="overline"
            sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "0.15em" }}
          >
            Nuestra historia
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 800, mt: 0.5, mb: 2 }}>
            Tejidos con alma costarricense
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 580, mx: "auto", lineHeight: 1.9, fontSize: "1.1rem" }}
          >
            Somos un emprendimiento familiar que nació del amor por el crochet y el deseo
            de crear piezas únicas llenas de calidez y tradición artesanal.
          </Typography>
        </Container>
      </Box>

      {/* Story */}
      <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: "background.default" }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: { xs: 4, md: 8 },
              alignItems: "center",
              mb: 8,
            }}
          >
            <Box>
              <Typography
                variant="overline"
                sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: "0.15em" }}
              >
                Cómo empezamos
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mt: 0.5, mb: 2 }}>
                Un gancho, un hilo y mucha pasión
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9, mb: 2 }}>
                Todo comenzó con una mamá que nos enseñó los primeros puntos en una tarde
                lluviosa. Aquellas primeras puntadas torpes se convirtieron con el tiempo en
                piezas que hacen sonreír a las personas.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9 }}>
                Hoy, años después, seguimos tejiendo con la misma dedicación pero con muchas
                más técnicas, materiales y colores. Cada producto lleva horas de trabajo,
                amor y el orgullo de la artesanía costarricense.
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "#E8F4F8",
                borderRadius: "24px",
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {[
                { number: "+100", label: "Piezas creadas" },
                { number: "200+", label: "Clientes felices" },
                { number: "3", label: "Años de experiencia" },
                { number: "100%", label: "Hecho a mano" },
              ].map((stat) => (
                <Box
                  key={stat.label}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    backgroundColor: "white",
                    borderRadius: "12px",
                  }}
                >
                  <Typography variant="h4" color="primary.main" sx={{ fontWeight: 800, minWidth: 80 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Values */}
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography
              variant="overline"
              sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "0.15em" }}
            >
              Lo que nos mueve
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mt: 0.5 }}>
              Nuestros valores
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
              gap: 3,
              mb: 8,
            }}
          >
            {[
              { emoji: "💜", title: "Amor artesanal", desc: "Cada punto es una expresión de cuidado y dedicación. Jamás producimos en serie.", bg: "#E8F4F8" },
              { emoji: "🌿", title: "Sostenibilidad", desc: "Elegimos materiales naturales y proveedores responsables con el ambiente.", bg: "#EBF6F0" },
              { emoji: "🤝", title: "Comunidad", desc: "Apoyamos a otros artesanos y compartimos conocimiento con la comunidad.", bg: "#EDF7FA" },
              { emoji: "✨", title: "Excelencia", desc: "No entregamos nada que no nos haya hecho sentir orgullosas primero.", bg: "#FFFBF0" },
            ].map((v) => (
              <Box
                key={v.title}
                sx={{
                  p: 3,
                  backgroundColor: v.bg,
                  borderRadius: "20px",
                  textAlign: "center",
                  border: "1px solid rgba(174, 217, 224, 0.4)",
                }}
              >
                <Box sx={{ fontSize: "2.5rem", mb: 2 }}>{v.emoji}</Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  {v.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {v.desc}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Process */}
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography
              variant="overline"
              sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "0.15em" }}
            >
              Cómo trabajamos
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mt: 0.5 }}>
              Nuestro proceso
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(5, 1fr)" },
              gap: 2,
              mb: 8,
            }}
          >
            {[
              { step: "01", title: "Diseño", desc: "Creamos o adaptamos el patrón según el producto." },
              { step: "02", title: "Materiales", desc: "Seleccionamos los mejores hilos y fibras." },
              { step: "03", title: "Tejido", desc: "Tejemos cada pieza con cuidado y precisión." },
              { step: "04", title: "Control", desc: "Revisamos cada detalle antes del empaque." },
              { step: "05", title: "Entrega", desc: "Empacamos con amor y enviamos a tu puerta." },
            ].map((proc, idx) => (
              <Box
                key={proc.step}
                sx={{
                  p: 2.5,
                  borderRadius: "16px",
                  border: "2px solid",
                  borderColor: idx % 2 === 0 ? "rgba(174, 217, 224, 0.5)" : "rgba(168, 197, 218, 0.5)",
                  backgroundColor: "white",
                  position: "relative",
                }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: idx % 2 === 0 ? "primary.main" : "secondary.main",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    fontSize: "0.85rem",
                  }}
                >
                  {proc.step}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 0.5, mb: 0.5 }}>
                  {proc.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                  {proc.desc}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ mb: 8 }} />

          {/* Team message */}
          <Box
            sx={{
              textAlign: "center",
              p: { xs: 4, md: 6 },
              backgroundColor: "#EDF7FA",
              borderRadius: "24px",
              border: "1px solid rgba(174, 217, 224, 0.4)",
            }}
          >
            <Favorite sx={{ fontSize: 40, color: "primary.main", mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Gracias por apoyar el arte local
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto", lineHeight: 1.9, mb: 4 }}
            >
              Cuando compras en {BRAND.NAME}, no solo llevas a casa una pieza hermosa —
              estás apoyando a una familia costarricense que pone su corazón en cada punto.
              Eso nos llena de orgullo y nos motiva a seguir creando.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                href="/tienda"
                endIcon={<ArrowForward />}
                size="large"
                sx={{ px: 4 }}
              >
                Ver tienda
              </Button>
              <Button
                variant="outlined"
                startIcon={<WhatsApp />}
                href={getWhatsAppUrl("¡Hola! Me gustaría contactarlos 🧶")}
                target="_blank"
                rel="noopener noreferrer"
                size="large"
                sx={{
                  borderColor: "#25D366",
                  color: "#25D366",
                  px: 4,
                  "&:hover": {
                    borderColor: "#1EBE57",
                    backgroundColor: "rgba(37, 211, 102, 0.06)",
                  },
                }}
              >
                Escríbenos
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
