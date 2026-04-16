"use client";

import { Box, Container, Typography, Button } from "@mui/material";
import Link from "next/link";
import { ArrowForward } from "@mui/icons-material";

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "background.default",
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center", py: 8 }}>
        <Typography sx={{ fontSize: "5rem", mb: 2 }}>🧶</Typography>
        <Typography variant="h2" sx={{ fontWeight: 800, mb: 1 }}>
          404
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          ¡Ups! Esta página no existe
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
          Parece que el hilo se enredó. La página que buscas no fue encontrada.
          ¡Pero tenemos muchas cosas bonitas en nuestra tienda!
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href="/"
            endIcon={<ArrowForward />}
          >
            Ir al inicio
          </Button>
          <Button variant="outlined" color="primary" component={Link} href="/tienda">
            Ver tienda
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
