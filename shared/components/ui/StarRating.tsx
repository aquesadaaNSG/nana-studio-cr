import { Star, StarHalf, StarBorder } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "small" | "medium";
}

export default function StarRating({ rating, reviewCount, size = "small" }: StarRatingProps) {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  const iconSize = size === "small" ? 14 : 18;

  for (let i = 0; i < full; i++) {
    stars.push(
      <Star key={`f${i}`} sx={{ fontSize: iconSize, color: "#FFB300" }} />
    );
  }
  if (half) {
    stars.push(
      <StarHalf key="h" sx={{ fontSize: iconSize, color: "#FFB300" }} />
    );
  }
  for (let i = 0; i < empty; i++) {
    stars.push(
      <StarBorder key={`e${i}`} sx={{ fontSize: iconSize, color: "#FFB300" }} />
    );
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <Box sx={{ display: "flex" }}>{stars}</Box>
      {reviewCount !== undefined && (
        <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1 }}>
          ({reviewCount})
        </Typography>
      )}
    </Box>
  );
}
