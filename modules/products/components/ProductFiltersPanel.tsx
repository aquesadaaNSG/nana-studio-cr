"use client";

import {
  Box,
  Typography,
  Slider,
  FormControlLabel,
  Checkbox,
  Divider,
  Button,
  Chip,
  Collapse,
  IconButton,
} from "@mui/material";
import { ExpandMore, ExpandLess, FilterList, RestartAlt } from "@mui/icons-material";
import { useState } from "react";
import { ProductFilters, ProductSortOption } from "@/shared/interfaces/product";
import { Category } from "@/shared/interfaces/product";
import { formatUSD } from "@/shared/utils/formatPrice";

interface ProductFiltersPanelProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  categories: Category[];
  allColors: string[];
  maxPrice: number;
  totalResults: number;
}

const SORT_OPTIONS: { value: ProductSortOption; label: string }[] = [
  { value: "featured", label: "Destacados" },
  { value: "newest", label: "Más recientes" },
  { value: "price-asc", label: "Menor precio" },
  { value: "price-desc", label: "Mayor precio" },
  { value: "rating", label: "Mejor valorados" },
];

export default function ProductFiltersPanel({
  filters,
  onFiltersChange,
  categories,
  allColors,
  maxPrice,
  totalResults,
}: ProductFiltersPanelProps) {
  const [openSections, setOpenSections] = useState({
    sort: true,
    categories: true,
    price: true,
    colors: true,
    stock: true,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));
  };

  const hasActiveFilters =
    !!filters.category ||
    !!filters.minPrice ||
    !!filters.maxPrice ||
    (filters.colors && filters.colors.length > 0) ||
    !!filters.inStock;

  const clearFilters = () => {
    onFiltersChange({ sortBy: filters.sortBy });
  };

  const SectionHeader = ({
    label,
    section,
  }: {
    label: string;
    section: keyof typeof openSections;
  }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        py: 1,
      }}
      onClick={() => toggleSection(section)}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        {label}
      </Typography>
      <IconButton size="small">
        {openSections[section] ? (
          <ExpandLess fontSize="small" />
        ) : (
          <ExpandMore fontSize="small" />
        )}
      </IconButton>
    </Box>
  );

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FilterList sx={{ fontSize: 20, color: "primary.main" }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Filtros
          </Typography>
          <Chip
            label={totalResults}
            size="small"
            color="primary"
            sx={{ height: 20, fontSize: "0.7rem" }}
          />
        </Box>
        {hasActiveFilters && (
          <Button
            size="small"
            startIcon={<RestartAlt />}
            onClick={clearFilters}
            sx={{ color: "text.secondary", fontSize: "0.75rem" }}
          >
            Limpiar
          </Button>
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Sort */}
      <SectionHeader label="Ordenar por" section="sort" />
      <Collapse in={openSections.sort}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mb: 2 }}>
          {SORT_OPTIONS.map((opt) => (
            <Box
              key={opt.value}
              onClick={() =>
                onFiltersChange({ ...filters, sortBy: opt.value })
              }
              sx={{
                px: 2,
                py: 0.75,
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor:
                  filters.sortBy === opt.value
                    ? "rgba(174, 217, 224, 0.18)"
                    : "transparent",
                color:
                  filters.sortBy === opt.value ? "primary.main" : "text.secondary",
                fontWeight: filters.sortBy === opt.value ? 600 : 400,
                fontSize: "0.875rem",
                transition: "all 0.15s ease",
                "&:hover": {
                  backgroundColor: "rgba(174, 217, 224, 0.1)",
                  color: "primary.main",
                },
              }}
            >
              {opt.label}
            </Box>
          ))}
        </Box>
      </Collapse>

      <Divider sx={{ mb: 1 }} />

      {/* Categories */}
      <SectionHeader label="Categoría" section="categories" />
      <Collapse in={openSections.categories}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mb: 2 }}>
          <Box
            onClick={() => onFiltersChange({ ...filters, category: undefined })}
            sx={{
              px: 2,
              py: 0.75,
              borderRadius: "8px",
              cursor: "pointer",
              backgroundColor:
                !filters.category
                  ? "rgba(174, 217, 224, 0.18)"
                  : "transparent",
              color: !filters.category ? "primary.main" : "text.secondary",
              fontWeight: !filters.category ? 600 : 400,
              fontSize: "0.875rem",
              transition: "all 0.15s ease",
              "&:hover": {
                backgroundColor: "rgba(174, 217, 224, 0.1)",
              },
            }}
          >
            Todas las categorías
          </Box>
          {categories.map((cat) => (
            <Box
              key={cat.id}
              onClick={() =>
                onFiltersChange({ ...filters, category: cat.id })
              }
              sx={{
                px: 2,
                py: 0.75,
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor:
                  filters.category === cat.id
                    ? "rgba(174, 217, 224, 0.18)"
                    : "transparent",
                color:
                  filters.category === cat.id ? "primary.main" : "text.secondary",
                fontWeight: filters.category === cat.id ? 600 : 400,
                fontSize: "0.875rem",
                transition: "all 0.15s ease",
                "&:hover": { backgroundColor: "rgba(174, 217, 224, 0.1)" },
              }}
            >
              {cat.name}
            </Box>
          ))}
        </Box>
      </Collapse>

      <Divider sx={{ mb: 1 }} />

      {/* Price */}
      <SectionHeader label="Precio (USD)" section="price" />
      <Collapse in={openSections.price}>
        <Box sx={{ px: 1, mb: 3 }}>
          <Slider
            value={[filters.minPrice ?? 0, filters.maxPrice ?? maxPrice]}
            onChange={(_, val) => {
              const [min, max] = val as number[];
              onFiltersChange({
                ...filters,
                minPrice: min > 0 ? min : undefined,
                maxPrice: max < maxPrice ? max : undefined,
              });
            }}
            min={0}
            max={maxPrice}
            step={1}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => formatUSD(v)}
            sx={{
              color: "primary.main",
              "& .MuiSlider-thumb": { width: 16, height: 16 },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption" color="text.secondary">
              {formatUSD(filters.minPrice ?? 0)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatUSD(filters.maxPrice ?? maxPrice)}
            </Typography>
          </Box>
        </Box>
      </Collapse>

      <Divider sx={{ mb: 1 }} />

      {/* Colors */}
      <SectionHeader label="Colores" section="colors" />
      <Collapse in={openSections.colors}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 2 }}>
          {allColors.map((color) => {
            const selected = filters.colors?.includes(color);
            return (
              <Chip
                key={color}
                label={color}
                size="small"
                onClick={() => {
                  const current = filters.colors ?? [];
                  const newColors = selected
                    ? current.filter((c) => c !== color)
                    : [...current, color];
                  onFiltersChange({
                    ...filters,
                    colors: newColors.length > 0 ? newColors : undefined,
                  });
                }}
                sx={{
                  fontSize: "0.7rem",
                  height: 24,
                  cursor: "pointer",
                  backgroundColor: selected
                    ? "rgba(174, 217, 224, 0.22)"
                    : "transparent",
                  border: "1px solid",
                  borderColor: selected ? "primary.main" : "divider",
                  color: selected ? "primary.main" : "text.secondary",
                  fontWeight: selected ? 600 : 400,
                  "&:hover": {
                    backgroundColor: "rgba(174, 217, 224, 0.12)",
                  },
                }}
              />
            );
          })}
        </Box>
      </Collapse>

      <Divider sx={{ mb: 1 }} />

      {/* Stock */}
      <SectionHeader label="Disponibilidad" section="stock" />
      <Collapse in={openSections.stock}>
        <FormControlLabel
          control={
            <Checkbox
              checked={!!filters.inStock}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  inStock: e.target.checked || undefined,
                })
              }
              sx={{ color: "primary.main", "&.Mui-checked": { color: "primary.main" } }}
              size="small"
            />
          }
          label={
            <Typography variant="body2" color="text.secondary">
              Solo en stock
            </Typography>
          }
          sx={{ ml: 0, mb: 2 }}
        />
      </Collapse>
    </Box>
  );
}
