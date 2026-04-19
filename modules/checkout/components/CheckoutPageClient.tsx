"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Divider,
  Paper,
  Alert,
  Chip,
  IconButton,
} from "@mui/material";
import {
  WhatsApp,
  ShoppingBag,
  LocalShipping,
  ArrowBack,
  Info,
  Delete,
} from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutFormSchema, CheckoutFormData } from "@/shared/interfaces/checkout";
import { COSTA_RICA_PROVINCES } from "@/shared/interfaces/shipping";
import { useCartStore } from "@/modules/cart/stores/cartStore";
import { formatUSD } from "@/shared/utils/formatPrice";
import {
  getShippingCost,
  getShippingZoneName,
  getEstimatedDays,
  isFreeShipping,
  FREE_SHIPPING_THRESHOLD,
  FREE_SHIPPING_LABEL,
  SHIPPING_PROVIDER,
} from "@/shared/utils/shipping";
import { generateWhatsAppOrderMessage } from "@/shared/utils/whatsappOrderMessage";
import { getWhatsAppUrl } from "@/shared/constants/contact";

export default function CheckoutPageClient() {
  const { items, getSubtotal, removeItem, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingZoneName, setShippingZoneName] = useState("");
  const [estimatedDays, setEstimatedDays] = useState("");

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(CheckoutFormSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      province: undefined,
      canton: "",
      address: "",
      notes: "",
    },
  });

  const watchedProvince = watch("province");

  useEffect(() => {
    if (watchedProvince) {
      const cost = isFreeShipping(subtotal) ? 0 : getShippingCost(watchedProvince);
      setShippingCost(cost);
      setShippingZoneName(getShippingZoneName(watchedProvince));
      setEstimatedDays(getEstimatedDays(watchedProvince));
    }
  }, [watchedProvince, subtotal]);

  const total = subtotal + shippingCost;

  const onSubmit = (data: CheckoutFormData) => {
    const message = generateWhatsAppOrderMessage({
      items,
      formData: data,
      subtotal,
      shippingCost,
      total,
      shippingZoneName,
      estimatedDays,
    });
    const url = getWhatsAppUrl(message);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h2" sx={{ fontSize: "4rem", mb: 2 }}>🧶</Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Tu carrito está vacío
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Agrega productos a tu carrito para continuar con la compra
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/tienda"
          startIcon={<ShoppingBag />}
          size="large"
        >
          Ir a la tienda
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back link */}
      <Button
        component={Link}
        href="/tienda"
        startIcon={<ArrowBack />}
        sx={{ mb: 3, color: "text.secondary" }}
        variant="text"
      >
        Seguir comprando
      </Button>

      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
        Finalizar compra
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 420px" },
          gap: 4,
          alignItems: "start",
        }}
      >
        {/* LEFT: Customer form */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Personal info */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "20px",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>
              👤 Datos de contacto
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nombre completo *"
                    fullWidth
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                )}
              />
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Teléfono / WhatsApp *"
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      placeholder="8888-8888"
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Correo electrónico"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      type="email"
                    />
                  )}
                />
              </Box>
            </Box>
          </Paper>

          {/* Shipping address */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "20px",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              📍 Dirección de entrega
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
              Necesitamos tu dirección para calcular el costo de envío
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
                <Controller
                  name="province"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Provincia *"
                      fullWidth
                      error={!!errors.province}
                      helperText={errors.province?.message}
                    >
                      {COSTA_RICA_PROVINCES.map((p) => (
                        <MenuItem key={p} value={p}>
                          {p}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <Controller
                  name="canton"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Cantón *"
                      fullWidth
                      error={!!errors.canton}
                      helperText={errors.canton?.message}
                    />
                  )}
                />
              </Box>

              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Dirección exacta *"
                    fullWidth
                    multiline
                    rows={2}
                    error={!!errors.address}
                    helperText={
                      errors.address?.message ??
                      "Incluye señas, número de casa, urbanización, etc."
                    }
                    placeholder="Ej: 100m norte de la iglesia, casa verde con portón negro"
                  />
                )}
              />
            </Box>

            {/* Shipping cost display */}
            {watchedProvince && (
              <Alert
                icon={<LocalShipping fontSize="small" />}
                severity={shippingCost === 0 ? "success" : "info"}
                sx={{ mt: 2, borderRadius: "10px" }}
              >
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {shippingCost === 0
                      ? "¡Envío gratuito! 🎉"
                      : `Costo de envío: ${formatUSD(shippingCost)}`}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Zona: {shippingZoneName} • {SHIPPING_PROVIDER} • {estimatedDays}
                  </Typography>
                </Box>
              </Alert>
            )}
          </Paper>

          {/* Notes */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "20px",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              📝 Notas adicionales
            </Typography>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Notas o instrucciones especiales"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.notes}
                  helperText={errors.notes?.message}
                  placeholder="Color específico, personalización, fecha de entrega requerida, etc."
                />
              )}
            />
          </Paper>

          {/* Info about WhatsApp flow */}
          <Alert
            icon={<Info fontSize="small" />}
            severity="warning"
            sx={{ borderRadius: "12px" }}
          >
            <Typography variant="body2">
              Al hacer clic en <strong>&quot;Completar pedido&quot;</strong>, serás
              redirigido a WhatsApp con un resumen de tu pedido. Allí podremos confirmar
              disponibilidad y coordinar el método de pago.
            </Typography>
          </Alert>
        </Box>

        {/* RIGHT: Order summary — appears first on mobile */}
        <Box sx={{ position: "sticky", top: 88, order: { xs: -1, lg: 0 } }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "20px",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>
              🛒 Resumen del pedido
            </Typography>

            {/* Cart items */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
              {items.map((item) => (
                <Box
                  key={`${item.productId}-${item.color}`}
                  sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "10px",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" className="line-clamp-2" sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.color} × {item.quantity}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <Typography variant="body2" color="primary.main" sx={{ fontWeight: 700 }}>
                      {formatUSD(item.price * item.quantity)}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => removeItem(item.productId, item.color)}
                      sx={{ color: "error.light", mt: 0.5 }}
                    >
                      <Delete sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Totals */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Subtotal
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {formatUSD(subtotal)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Envío
                  </Typography>
                  {!watchedProvince && (
                    <Typography variant="caption" color="text.disabled">
                      Selecciona provincia
                    </Typography>
                  )}
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {!watchedProvince
                    ? "—"
                    : shippingCost === 0
                    ? "Gratis"
                    : formatUSD(shippingCost)}
                </Typography>
              </Box>

              {subtotal < FREE_SHIPPING_THRESHOLD && (
                <Box
                  sx={{
                    p: 1.5,
                    backgroundColor: "rgba(168, 230, 207, 0.1)",
                    borderRadius: "8px",
                    border: "1px solid rgba(168, 230, 207, 0.3)",
                  }}
                >
                  <Typography variant="caption" sx={{ color: "success.dark" }}>
                    🚚 Agrega {FREE_SHIPPING_LABEL} o más para envío gratis
                  </Typography>
                </Box>
              )}

              <Divider />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Total
                </Typography>
                <Typography variant="h5" color="primary.main" sx={{ fontWeight: 800 }}>
                  {formatUSD(total)}
                </Typography>
              </Box>

              <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
                Precio en dólares estadounidenses (USD)
              </Typography>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              startIcon={<WhatsApp />}
              disabled={!isValid || items.length === 0}
              sx={{
                mt: 3,
                py: 1.75,
                fontSize: "1rem",
                background: isValid
                  ? "linear-gradient(135deg, #25D366 0%, #1EBE57 100%)"
                  : undefined,
                "&:hover": {
                  background: isValid
                    ? "linear-gradient(135deg, #1EBE57 0%, #17A349 100%)"
                    : undefined,
                },
              }}
            >
              Completar pedido por WhatsApp
            </Button>

            <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
              {["💳 USD", "🔒 Seguro", "🧶 Hecho a mano"].map((badge) => (
                <Typography
                  key={badge}
                  variant="caption"
                  sx={{ color: "text.secondary", display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  {badge}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
