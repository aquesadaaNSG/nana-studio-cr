import Link from "next/link";
import { Box, Container, Typography, Divider, IconButton } from "@mui/material";
import { Favorite, Instagram, Facebook, WhatsApp } from "@mui/icons-material";
import { BRAND, getWhatsAppUrl, NAV_LINKS } from "@/shared/constants/contact";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#FFF0F3",
        borderTop: "1px solid #F0DDD5",
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
                  backgroundColor: "rgba(167, 139, 202, 0.12)",
                  color: "secondary.main",
                  "&:hover": { backgroundColor: "secondary.main", color: "white" },
                }}
              >
                <Instagram fontSize="small" />
              </IconButton>
              <IconButton
                component="a"
                href={BRAND.FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                aria-label="Facebook"
                sx={{
                  backgroundColor: "rgba(167, 139, 202, 0.12)",
                  color: "secondary.main",
                  "&:hover": { backgroundColor: "secondary.main", color: "white" },
                }}
              >
                <Facebook fontSize="small" />
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
              {["bolsos", "amigurumis", "accesorios", "hogar"].map((cat) => (
                <Link
                  key={cat}
                  href={`/tienda?categoria=${cat}`}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      textTransform: "capitalize",
                      "&:hover": { color: "primary.main" },
                      transition: "color 0.2s",
                    }}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
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
