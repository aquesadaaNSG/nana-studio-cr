"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  IconButton,
  Alert,
  Breadcrumbs,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Add,
  Remove,
  ShoppingCart,
  LocalShipping,
  CheckCircleOutlined,
  ChevronRight,
  WhatsApp,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";
import { Product } from "@/shared/interfaces/product";
import { formatUSD, getDiscountPercent } from "@/shared/utils/formatPrice";
import StarRating from "@/shared/components/ui/StarRating";
import { useCartStore } from "@/modules/cart/stores/cartStore";
import { toast } from "sonner";
import { BRAND, getWhatsAppUrl } from "@/shared/constants/contact";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const { addItem, openCart } = useCartStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor,
      quantity,
    });
    openCart();
    toast.success(`${product.name} agregado al carrito`);
  };

  const handleBuyNowWhatsApp = () => {
    const message =
      `¡Hola ${BRAND.NAME}! Quiero comprar:\n\n` +
      `🧶 *${product.name}*\n` +
      `🎨 Color: ${selectedColor}\n` +
      `📦 Cantidad: ${quantity}\n` +
      `💵 Precio: ${formatUSD(product.price * quantity)}\n\n` +
      `_Por favor confirmar disponibilidad y forma de pago._`;
    window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  const discount = product.compareAtPrice
    ? getDiscountPercent(product.price, product.compareAtPrice)
    : null;

  const prevImage = () => setActiveImage((i) => (i - 1 + product.images.length) % product.images.length);
  const nextImage = () => setActiveImage((i) => (i + 1) % product.images.length);

  return (
    <Box sx={{ pb: { xs: "80px", md: 0 } }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<ChevronRight fontSize="small" />}
        sx={{ mb: 3, "& .MuiBreadcrumbs-separator": { mx: 0.5 } }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <Typography variant="body2" sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}>
            Inicio
          </Typography>
        </Link>
        <Link href="/tienda" style={{ textDecoration: "none" }}>
          <Typography variant="body2" sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}>
            Tienda
          </Typography>
        </Link>
        <Link href={`/tienda?categoria=${product.category}`} style={{ textDecoration: "none" }}>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              textTransform: "capitalize",
              "&:hover": { color: "primary.main" },
            }}
          >
            {product.category}
          </Typography>
        </Link>
        <Typography variant="body2" color="text.primary" className="line-clamp-1" sx={{ fontWeight: 500 }}>
          {product.name}
        </Typography>
      </Breadcrumbs>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: 3, md: 6 },
        }}
      >
        {/* IMAGE GALLERY */}
        <Box>
          {/* Main image */}
          <Box
            sx={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              aspectRatio: "1/1",
              backgroundColor: "#FFF5F7",
              mb: 2,
            }}
          >
            {product.images.map((img, idx) => (
              <Box
                key={idx}
                sx={{
                  position: "absolute",
                  inset: 0,
                  opacity: idx === activeImage ? 1 : 0,
                  transition: "opacity 0.4s ease",
                }}
              >
                <Image
                  src={img}
                  alt={`${product.name} - imagen ${idx + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 900px) 100vw, 50vw"
                  priority={idx === 0}
                />
              </Box>
            ))}

            {/* Navigation arrows */}
            {product.images.length > 1 && (
              <>
                <IconButton
                  onClick={prevImage}
                  sx={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(255,255,255,0.9)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    "&:hover": { backgroundColor: "white" },
                    zIndex: 1,
                  }}
                  size="small"
                >
                  <ArrowBack fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={nextImage}
                  sx={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(255,255,255,0.9)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    "&:hover": { backgroundColor: "white" },
                    zIndex: 1,
                  }}
                  size="small"
                >
                  <ArrowForward fontSize="small" />
                </IconButton>
              </>
            )}

            {/* Image counter */}
            {product.images.length > 1 && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 12,
                  right: 12,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "white",
                  borderRadius: "999px",
                  px: 1.5,
                  py: 0.25,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                {activeImage + 1}/{product.images.length}
              </Box>
            )}

            {/* Badges */}
            <Box sx={{ position: "absolute", top: 12, left: 12, display: "flex", flexDirection: "column", gap: 0.5 }}>
              {discount && (
                <Chip
                  label={`-${discount}%`}
                  sx={{ backgroundColor: "primary.main", color: "white", fontWeight: 700, height: 24 }}
                  size="small"
                />
              )}
              {!product.inStock && (
                <Chip
                  label="Agotado"
                  sx={{ backgroundColor: "rgba(0,0,0,0.6)", color: "white", height: 24 }}
                  size="small"
                />
              )}
            </Box>
          </Box>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              {product.images.map((img, idx) => (
                <Box
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: "10px",
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                    border: "2px solid",
                    borderColor: idx === activeImage ? "primary.main" : "transparent",
                    transition: "border-color 0.2s ease",
                    opacity: idx === activeImage ? 1 : 0.65,
                    "&:hover": { opacity: 1 },
                  }}
                >
                  <Image
                    src={img}
                    alt={`Miniatura ${idx + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="72px"
                  />
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* PRODUCT INFO */}
        <Box>
          {/* Category */}
          <Typography
            variant="caption"
            sx={{
              color: "secondary.main",
              fontWeight: 700,
              textTransform: "capitalize",
              letterSpacing: "0.08em",
            }}
          >
            {product.category}
          </Typography>

          {/* Name */}
          <Typography variant="h3" sx={{ fontWeight: 800, mt: 0.5, mb: 1.5, lineHeight: 1.2 }}>
            {product.name}
          </Typography>

          {/* Rating */}
          <Box sx={{ mb: 2 }}>
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="medium" />
          </Box>

          {/* Price */}
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 2, mb: 3 }}>
            <Typography variant="h4" color="primary.main" sx={{ fontWeight: 800 }}>
              {formatUSD(product.price)}
            </Typography>
            {product.compareAtPrice && (
              <>
                <Typography
                  variant="h6"
                  sx={{ textDecoration: "line-through", color: "text.disabled", fontWeight: 400 }}
                >
                  {formatUSD(product.compareAtPrice)}
                </Typography>
                <Chip
                  label={`Ahorrás ${formatUSD(product.compareAtPrice - product.price)}`}
                  size="small"
                  sx={{ backgroundColor: "rgba(168, 230, 207, 0.3)", color: "success.dark", fontWeight: 600 }}
                />
              </>
            )}
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
            {product.shortDescription}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* Color selector */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
              Color:{" "}
              <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
                {selectedColor}
              </Box>
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {product.colors.map((color) => (
                <Chip
                  key={color}
                  label={color}
                  onClick={() => setSelectedColor(color)}
                  sx={{
                    cursor: "pointer",
                    borderRadius: "8px",
                    height: 32,
                    backgroundColor:
                      selectedColor === color
                        ? "rgba(232, 130, 154, 0.15)"
                        : "transparent",
                    border: "2px solid",
                    borderColor: selectedColor === color ? "primary.main" : "divider",
                    color: selectedColor === color ? "primary.main" : "text.secondary",
                    fontWeight: selectedColor === color ? 700 : 400,
                    transition: "all 0.15s ease",
                    "&:hover": { borderColor: "primary.light" },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Quantity */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
              Cantidad
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "2px solid",
                  borderColor: "divider",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <IconButton
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  sx={{ borderRadius: 0, p: 1 }}
                >
                  <Remove />
                </IconButton>
                <Typography
                  sx={{ fontWeight: 700, px: 2.5, minWidth: 40, textAlign: "center", fontSize: "1.1rem" }}
                >
                  {quantity}
                </Typography>
                <IconButton
                  onClick={() => setQuantity((q) => q + 1)}
                  disabled={!product.inStock}
                  sx={{ borderRadius: 0, p: 1 }}
                >
                  <Add />
                </IconButton>
              </Box>
              {product.inStock ? (
                <Typography variant="caption" sx={{ color: "success.main", fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>
                  <CheckCircleOutlined sx={{ fontSize: 14 }} />
                  En stock ({product.stockQuantity} disponibles)
                </Typography>
              ) : (
                <Typography variant="caption" color="error.main" sx={{ fontWeight: 600 }}>
                  Agotado
                </Typography>
              )}
            </Box>
          </Box>

          {/* Actions */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              disabled={!product.inStock}
              fullWidth
              sx={{ py: 1.5 }}
            >
              {product.inStock ? "Agregar al carrito" : "No disponible"}
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<WhatsApp />}
              onClick={handleBuyNowWhatsApp}
              disabled={!product.inStock}
              fullWidth
              sx={{
                py: 1.5,
                borderColor: "#25D366",
                color: "#25D366",
                "&:hover": {
                  borderColor: "#1EBE57",
                  backgroundColor: "rgba(37, 211, 102, 0.06)",
                },
              }}
            >
              Comprar por WhatsApp
            </Button>
          </Box>

          {/* Shipping info */}
          <Alert
            icon={<LocalShipping fontSize="small" />}
            severity="info"
            sx={{
              backgroundColor: "rgba(168, 230, 207, 0.15)",
              border: "1px solid rgba(168, 230, 207, 0.4)",
              borderRadius: "12px",
              "& .MuiAlert-icon": { color: "success.main" },
            }}
          >
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              Envío a toda Costa Rica por{" "}
              <strong>Correos de Costa Rica</strong>. Gratis en pedidos mayores a $75.
            </Typography>
          </Alert>

          {/* Quick specs */}
          <Box
            sx={{
              mt: 3,
              p: 2,
              backgroundColor: "rgba(240, 221, 213, 0.15)",
              borderRadius: "12px",
            }}
          >
            {[
              { label: "Materiales", value: product.materials.join(", ") },
              { label: "Dimensiones", value: product.dimensions },
              { label: "Peso", value: product.weight },
            ].map((spec) => (
              <Box
                key={spec.label}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: 0.75,
                  borderBottom: "1px solid rgba(240, 221, 213, 0.4)",
                  "&:last-child": { borderBottom: "none" },
                }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {spec.label}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, textAlign: "right", maxWidth: "60%" }}>
                  {spec.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Sticky mobile CTA bar */}
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            p: 2,
            backgroundColor: "white",
            borderTop: "1px solid",
            borderColor: "divider",
            display: "flex",
            gap: 1.5,
            boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            sx={{ flex: 1, py: 1.25 }}
          >
            {product.inStock ? "Agregar" : "Agotado"}
          </Button>
          <Button
            variant="outlined"
            startIcon={<WhatsApp />}
            onClick={handleBuyNowWhatsApp}
            disabled={!product.inStock}
            sx={{
              flex: 1,
              py: 1.25,
              borderColor: "#25D366",
              color: "#25D366",
              "&:hover": { borderColor: "#1EBE57", backgroundColor: "rgba(37,211,102,0.06)" },
            }}
          >
            WhatsApp
          </Button>
        </Box>
      )}

      {/* Tabs: Description */}
      <Box sx={{ mt: 6 }}>
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            mb: 3,
            "& .MuiTab-root": { textTransform: "none", fontWeight: 600 },
            "& .Mui-selected": { color: "primary.main" },
            "& .MuiTabs-indicator": { backgroundColor: "primary.main" },
          }}
        >
          <Tab label="Descripción" />
          <Tab label="Materiales y cuidados" />
        </Tabs>

        {activeTab === 0 && (
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9, maxWidth: 720 }}>
            {product.description}
          </Typography>
        )}

        {activeTab === 1 && (
          <Box sx={{ maxWidth: 720 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Materiales
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
              {product.materials.map((mat) => (
                <Chip key={mat} label={mat} variant="outlined" size="small" color="secondary" />
              ))}
            </Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Cuidados recomendados
            </Typography>
            <Box component="ul" sx={{ pl: 2, color: "text.secondary" }}>
              {[
                "Lavado a mano con agua fría",
                "No usar secadora",
                "Planchar a baja temperatura si es necesario",
                "Guardar en lugar seco y ventilado",
                "Evitar exposición prolongada al sol directo",
              ].map((care) => (
                <Box component="li" key={care} sx={{ mb: 0.5 }}>
                  <Typography variant="body2">{care}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
