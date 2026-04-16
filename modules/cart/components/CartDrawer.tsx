"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Chip,
  Alert,
} from "@mui/material";
import {
  Close,
  Add,
  Remove,
  DeleteOutlined,
  ShoppingBagOutlined,
  LocalShipping,
} from "@mui/icons-material";
import { useCartStore } from "@/modules/cart/stores/cartStore";
import { formatUSD } from "@/shared/utils/formatPrice";
import { FREE_SHIPPING_THRESHOLD } from "@/shared/utils/shipping";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, clearCart } =
    useCartStore();

  const subtotal = getSubtotal();
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={closeCart}
      slotProps={{
        paper: {
          sx: {
            width: { xs: "100vw", sm: 420 },
            display: "flex",
            flexDirection: "column",
            backgroundColor: "background.default",
          },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ShoppingBagOutlined sx={{ color: "primary.main" }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Mi Carrito
          </Typography>
          {items.length > 0 && (
            <Chip
              label={items.reduce((s, i) => s + i.quantity, 0)}
              size="small"
              color="primary"
              sx={{ height: 22, fontSize: "0.75rem" }}
            />
          )}
        </Box>
        <IconButton onClick={closeCart} size="small">
          <Close />
        </IconButton>
      </Box>

      {/* Free shipping progress */}
      {!hasFreeShipping && subtotal > 0 && (
        <Box
          sx={{
            px: 2.5,
            py: 1.5,
            backgroundColor: "rgba(168, 230, 207, 0.15)",
            borderBottom: "1px solid rgba(168, 230, 207, 0.4)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <LocalShipping sx={{ fontSize: 16, color: "success.main" }} />
            <Typography variant="caption" sx={{ color: "success.dark", fontWeight: 500 }}>
              ¡Agrega {formatUSD(remaining)} más para envío gratis!
            </Typography>
          </Box>
          <Box
            sx={{
              height: 4,
              backgroundColor: "rgba(168, 230, 207, 0.3)",
              borderRadius: "999px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%`,
                backgroundColor: "#A8E6CF",
                borderRadius: "999px",
                transition: "width 0.5s ease",
              }}
            />
          </Box>
        </Box>
      )}

      {hasFreeShipping && (
        <Alert
          icon={<LocalShipping fontSize="small" />}
          severity="success"
          sx={{ borderRadius: 0, py: 0.5 }}
        >
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            ¡Tienes envío gratis!
          </Typography>
        </Alert>
      )}

      {/* Items */}
      <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
        {items.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 2,
              py: 8,
            }}
          >
            <ShoppingBagOutlined sx={{ fontSize: 64, color: "text.disabled" }} />
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>
              Tu carrito está vacío
            </Typography>
            <Typography variant="body2" color="text.disabled" sx={{ textAlign: "center" }}>
              Descubre nuestros tejidos artesanales
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/tienda"
              onClick={closeCart}
              sx={{ mt: 1 }}
            >
              Ver tienda
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {items.map((item) => (
              <Box
                key={`${item.productId}-${item.color}`}
                sx={{
                  display: "flex",
                  gap: 2,
                  p: 1.5,
                  backgroundColor: "white",
                  borderRadius: "12px",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                {/* Image */}
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "8px",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                </Box>

                {/* Info */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    className="line-clamp-2"
                    sx={{ fontWeight: 600, mb: 0.5 }}
                  >
                    {item.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
                    Color: {item.color}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {/* Quantity controls */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: "999px",
                        overflow: "hidden",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.productId, item.color, item.quantity - 1)}
                        sx={{ p: 0.5, borderRadius: 0 }}
                      >
                        <Remove sx={{ fontSize: 14 }} />
                      </IconButton>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, px: 1.5, minWidth: 28, textAlign: "center" }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.productId, item.color, item.quantity + 1)}
                        sx={{ p: 0.5, borderRadius: 0 }}
                      >
                        <Add sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body2" color="primary.main" sx={{ fontWeight: 700 }}>
                        {formatUSD(item.price * item.quantity)}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => removeItem(item.productId, item.color)}
                        sx={{ color: "error.light" }}
                      >
                        <DeleteOutlined sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Footer */}
      {items.length > 0 && (
        <Box
          sx={{
            p: 2.5,
            borderTop: "1px solid",
            borderColor: "divider",
            backgroundColor: "white",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Subtotal
            </Typography>
            <Typography variant="body1" color="primary.main" sx={{ fontWeight: 700 }}>
              {formatUSD(subtotal)}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
            Envío calculado al finalizar compra
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            component={Link}
            href="/carrito"
            onClick={closeCart}
            sx={{ mb: 1 }}
          >
            Finalizar compra
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={closeCart}
            component={Link}
            href="/tienda"
            sx={{ color: "text.secondary" }}
          >
            Seguir comprando
          </Button>
        </Box>
      )}
    </Drawer>
  );
}
