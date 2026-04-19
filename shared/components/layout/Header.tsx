"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useScrollTrigger,
  Slide,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ShoppingCart,
  Menu as MenuIcon,
  Close as CloseIcon,
  Favorite,
} from "@mui/icons-material";
import { useCartStore } from "@/modules/cart/stores/cartStore";
import { NAV_LINKS, BRAND } from "@/shared/constants/contact";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { getItemCount, openCart } = useCartStore();
  const itemCount = getItemCount();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 20,
  });

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger || mobileOpen}>
        <AppBar
          position="fixed"
          elevation={trigger ? 2 : 0}
          sx={{
            backgroundColor: trigger ? "rgba(242, 249, 251, 0.95)" : "rgba(242, 249, 251, 0.8)",
            backdropFilter: "blur(12px)",
            borderBottom: trigger ? "none" : "1px solid rgba(174, 217, 224, 0.5)",
            transition: "all 0.3s ease",
          }}
        >
          <Toolbar
            sx={{
              maxWidth: "1280px",
              mx: "auto",
              width: "100%",
              px: { xs: 2, sm: 3, lg: 4 },
              minHeight: { xs: 64, md: 72 },
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none", flexGrow: isMobile ? 1 : 0 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Favorite sx={{ color: "primary.main", fontSize: 28 }} />
                <Box>
                  <Box
                    component="span"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "1.1rem", md: "1.25rem" },
                      color: "primary.main",
                      lineHeight: 1.1,
                      display: "block",
                    }}
                  >
                    {BRAND.NAME}
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      fontSize: "0.65rem",
                      color: "text.secondary",
                      letterSpacing: "0.08em",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    Tejidos artesanales
                  </Box>
                </Box>
              </Box>
            </Link>

            {/* Desktop Nav */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                ml: "auto",
                mr: 2,
                alignItems: "center",
              }}
            >
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
                  <Box
                    component="span"
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: "999px",
                      fontWeight: 500,
                      fontSize: "0.95rem",
                      color: pathname === link.href ? "primary.main" : "text.primary",
                      backgroundColor:
                        pathname === link.href
                          ? "rgba(174, 217, 224, 0.18)"
                          : "transparent",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "rgba(174, 217, 224, 0.12)",
                        color: "primary.main",
                      },
                      display: "inline-block",
                    }}
                  >
                    {link.label}
                  </Box>
                </Link>
              ))}
            </Box>

            {/* Cart Button */}
            <IconButton
              onClick={openCart}
              sx={{
                backgroundColor: "rgba(174, 217, 224, 0.15)",
                "&:hover": { backgroundColor: "rgba(174, 217, 224, 0.28)" },
                mr: { xs: 0, md: 0 },
              }}
              aria-label="Ver carrito"
            >
              <Badge badgeContent={itemCount} color="primary">
                <ShoppingCart sx={{ color: "primary.main" }} />
              </Badge>
            </IconButton>

            {/* Mobile Menu Button */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" }, ml: 1 }}
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              <MenuIcon sx={{ color: "text.primary" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Slide>

      {/* Spacer */}
      <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }} />

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 280,
              backgroundColor: "background.default",
              borderRadius: "24px 0 0 24px",
            },
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Box sx={{ fontWeight: 700, fontSize: "1.1rem", color: "primary.main" }}>
              {BRAND.NAME}
            </Box>
            <IconButton onClick={() => setMobileOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {NAV_LINKS.map((link) => (
              <ListItem key={link.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  selected={pathname === link.href}
                  sx={{
                    borderRadius: "12px",
                    mb: 0.5,
                    "&.Mui-selected": {
                      backgroundColor: "rgba(174, 217, 224, 0.18)",
                      color: "primary.main",
                    },
                  }}
                >
                  <ListItemText
                    primary={link.label}
                    slotProps={{ primary: { sx: { fontWeight: 500 } } }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
