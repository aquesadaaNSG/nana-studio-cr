import type { Metadata } from "next";
import { Box } from "@mui/material";
import CheckoutPageClient from "@/modules/checkout/components/CheckoutPageClient";

export const metadata: Metadata = {
  title: "Carrito y Checkout",
  description: "Completa tu pedido de tejidos artesanales.",
};

export default function CartPage() {
  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh", py: 2 }}>
      <CheckoutPageClient />
    </Box>
  );
}
