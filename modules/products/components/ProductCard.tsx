"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ShoppingCart, Visibility } from "@mui/icons-material";
import { Product } from "@/shared/interfaces/product";
import { formatUSD, getDiscountPercent } from "@/shared/utils/formatPrice";
import StarRating from "@/shared/components/ui/StarRating";
import { useCartStore } from "@/modules/cart/stores/cartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: product.colors[0],
      quantity: 1,
    });
    openCart();
    toast.success(`${product.name} agregado al carrito`);
  };

  const discount =
    product.compareAtPrice
      ? getDiscountPercent(product.price, product.compareAtPrice)
      : null;

  return (
    <Card
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          "& .product-actions": { opacity: 1 },
          "& .product-img-secondary": { opacity: 1 },
          "& .product-img-primary": { opacity: 0 },
        },
      }}
    >
      {/* Badges */}
      <Box sx={{ position: "absolute", top: 12, left: 12, zIndex: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
        {discount && (
          <Chip
            label={`-${discount}%`}
            size="small"
            sx={{
              backgroundColor: "#E8829A",
              color: "white",
              fontWeight: 700,
              fontSize: "0.7rem",
              height: 22,
            }}
          />
        )}
        {!product.inStock && (
          <Chip
            label="Agotado"
            size="small"
            sx={{
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "white",
              fontSize: "0.7rem",
              height: 22,
            }}
          />
        )}
      </Box>

      {/* Quick actions */}
      <Box
        className="product-actions"
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          opacity: 0,
          transition: "opacity 0.2s ease",
        }}
      >
        <Tooltip title="Ver detalles" placement="left">
          <IconButton
            component={Link}
            href={`/tienda/${product.slug}`}
            size="small"
            sx={{
              backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              "&:hover": { backgroundColor: "primary.light", color: "white" },
            }}
          >
            <Visibility sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        {product.inStock && (
          <Tooltip title="Agregar al carrito" placement="left">
            <IconButton
              onClick={handleAddToCart}
              size="small"
              sx={{
                backgroundColor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                "&:hover": { backgroundColor: "primary.main", color: "white" },
              }}
            >
              <ShoppingCart sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Image */}
      <CardActionArea component={Link} href={`/tienda/${product.slug}`}>
        <Box
          sx={{
            position: "relative",
            aspectRatio: "1/1",
            backgroundColor: "#FFF5F7",
            overflow: "hidden",
          }}
          onMouseEnter={() => product.images[1] && setImgIndex(1)}
          onMouseLeave={() => setImgIndex(0)}
        >
          {/* Primary image */}
          <Image
            className="product-img-primary"
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
            style={{
              objectFit: "cover",
              transition: "opacity 0.4s ease",
              opacity: imgIndex === 0 ? 1 : 0,
            }}
          />
          {/* Secondary image (hover) */}
          {product.images[1] && (
            <Image
              className="product-img-secondary"
              src={product.images[1]}
              alt={`${product.name} - vista 2`}
              fill
              sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
              style={{
                objectFit: "cover",
                transition: "opacity 0.4s ease",
                opacity: imgIndex === 1 ? 1 : 0,
              }}
            />
          )}

          {/* Out of stock overlay */}
          {!product.inStock && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(255,255,255,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          )}
        </Box>

        {/* Content */}
        <CardContent sx={{ pt: 1.5, pb: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: "secondary.main",
              fontWeight: 600,
              textTransform: "capitalize",
              letterSpacing: "0.05em",
              fontSize: "0.7rem",
            }}
          >
            {product.category}
          </Typography>

          <Typography
            variant="body2"
            className="line-clamp-2"
            sx={{ fontWeight: 600, mt: 0.25, mb: 0.75, lineHeight: 1.4 }}
          >
            {product.name}
          </Typography>

          <StarRating rating={product.rating} reviewCount={product.reviewCount} />

          {/* Color dots */}
          <Box sx={{ display: "flex", gap: 0.5, mt: 1, flexWrap: "wrap" }}>
            {product.colors.slice(0, 5).map((color) => (
              <Chip
                key={color}
                label={color}
                size="small"
                sx={{
                  fontSize: "0.6rem",
                  height: 18,
                  backgroundColor: "rgba(232, 130, 154, 0.08)",
                  color: "text.secondary",
                  border: "1px solid rgba(232, 130, 154, 0.2)",
                }}
              />
            ))}
          </Box>

          {/* Price */}
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mt: 1.5 }}>
            <Typography variant="body1" color="primary.main" sx={{ fontWeight: 700 }}>
              {formatUSD(product.price)}
            </Typography>
            {product.compareAtPrice && (
              <Typography
                variant="caption"
                sx={{ textDecoration: "line-through", color: "text.disabled" }}
              >
                {formatUSD(product.compareAtPrice)}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
