import Link from "next/link";
import { Box, Container, Typography, Divider, IconButton, SvgIcon } from "@mui/material";
import { Favorite, Instagram, WhatsApp } from "@mui/icons-material";
import { BRAND, getWhatsAppUrl, NAV_LINKS } from "@/shared/constants/contact";

function TikTokIcon() {
  return (
    <SvgIcon viewBox="0 0 24 24" fontSize="small">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </SvgIcon>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#EBF5F9",
        borderTop: "1px solid #CBE3EA",
        mt: "auto",
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr" },
            gap: 4,
            mb: 4,
          }}
        >
          {/* Brand Column */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Favorite sx={{ color: "primary.main", fontSize: 24 }} />
              <Typography variant="h6" sx={{ color: "primary.main", fontWeight: 800 }}>
                {BRAND.NAME}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", lineHeight: 1.8, mb: 3, maxWidth: 280 }}
            >
              {BRAND.DESCRIPTION}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                component="a"
                href={BRAND.INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                aria-label="Instagram"
                sx={{
                  backgroundColor: "rgba(168, 197, 218, 0.18)",
                  color: "secondary.main",
                  "&:hover": { backgroundColor: "secondary.main", color: "white" },
                }}
              >
                <Instagram fontSize="small" />
              </IconButton>
              <IconButton
                component="a"
                href={BRAND.TIKTOK}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                aria-label="TikTok"
                sx={{
                  backgroundColor: "rgba(168, 197, 218, 0.18)",
                  color: "secondary.main",
                  "&:hover": { backgroundColor: "secondary.main", color: "white" },
                }}
              >
                <TikTokIcon />
              </IconButton>
              <IconButton
                component="a"
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                aria-label="WhatsApp"
                sx={{
                  backgroundColor: "rgba(168, 230, 207, 0.2)",
                  color: "#25D366",
                  "&:hover": { backgroundColor: "#25D366", color: "white" },
                }}
              >
                <WhatsApp fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Navigation */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "text.primary" }}>
              Navegación
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      "&:hover": { color: "primary.main" },
                      transition: "color 0.2s",
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Box>

          {/* Categories */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "text.primary" }}>
              Categorías
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[
                { id: "anime-videojuegos", label: "Anime y Videojuegos" },
                { id: "peliculas", label: "Películas y Series" },
                { id: "animales", label: "Animalitos" },
                { id: "personajes", label: "Personajes" },
                { id: "florales", label: "Arreglos Florales" },
                { id: "accesorios", label: "Llaveros y Temporada" },
              ].map((cat) => (
                <Link
                  key={cat.id}
                  href={`/tienda?categoria=${cat.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      "&:hover": { color: "primary.main" },
                      transition: "color 0.2s",
                    }}
                  >
                    {cat.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Box>

          {/* Contact */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "text.primary" }}>
              Contacto
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box>
                <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                  WhatsApp
                </Typography>
                <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 500 }}>
                  {BRAND.PHONE}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                  Correo
                </Typography>
                <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 500 }}>
                  {BRAND.EMAIL}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                  Ubicación
                </Typography>
                <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 500 }}>
                  {BRAND.ADDRESS.CITY}, {BRAND.ADDRESS.COUNTRY}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            © {year} {BRAND.NAME}. Todos los derechos reservados.
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary", display: "flex", alignItems: "center", gap: 0.5 }}>
            Hecho con <Favorite sx={{ fontSize: 12, color: "primary.main" }} /> en Costa Rica
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
