"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Drawer,
  IconButton,
  Button,
  Chip,
  useMediaQuery,
  useTheme,
  Paper,
  TextField,
  InputAdornment,
  Badge,
} from "@mui/material";
import { Tune, Close, Search, Clear } from "@mui/icons-material";
import { Product, Category, ProductFilters } from "@/shared/interfaces/product";
import { filterProducts, getAllColors, getMaxPrice } from "@/shared/utils/products";
import ProductCard from "./ProductCard";
import ProductFiltersPanel from "./ProductFiltersPanel";

interface ShopClientProps {
  initialProducts: Product[];
  categories: Category[];
  initialCategory?: string;
}

export default function ShopClient({
  initialProducts,
  categories,
  initialCategory,
}: ShopClientProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [filters, setFilters] = useState<ProductFilters>({
    category: initialCategory,
    sortBy: "featured",
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);

  // Debounce search input 300ms
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchInput), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    setFilteredProducts(
      filterProducts({ ...filters, search: debouncedSearch || undefined })
    );
  }, [filters, debouncedSearch]);

  const allColors = getAllColors();
  const maxPrice = getMaxPrice();

  const handleFiltersChange = useCallback((newFilters: ProductFilters) => {
    setFilters(newFilters);
  }, []);

  const clearSearch = () => {
    setSearchInput("");
    setDebouncedSearch("");
  };

  const activeFilterCount =
    (filters.category ? 1 : 0) +
    (filters.minPrice || filters.maxPrice ? 1 : 0) +
    (filters.colors?.length ?? 0) +
    (filters.inStock ? 1 : 0);

  const FiltersContent = (
    <ProductFiltersPanel
      filters={filters}
      onFiltersChange={handleFiltersChange}
      categories={categories}
      allColors={allColors}
      maxPrice={maxPrice}
      totalResults={filteredProducts.length}
    />
  );

  const categoryName = filters.category
    ? categories.find((c) => c.id === filters.category)?.name ?? "Tienda"
    : "Toda la tienda";

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Top bar */}
      <Box sx={{ mb: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Title + mobile filter toggle */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {categoryName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}
              {debouncedSearch ? ` para "${debouncedSearch}"` : ""}
            </Typography>
          </Box>

          {isMobile && (
            <Badge badgeContent={activeFilterCount || null} color="primary" overlap="circular">
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Tune />}
                onClick={() => setMobileFiltersOpen(true)}
                size="small"
              >
                Filtros
              </Button>
            </Badge>
          )}
        </Box>

        {/* Search bar */}
        <TextField
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Buscar productos..."
          size="small"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "text.disabled", fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: searchInput ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={clearSearch} edge="end">
                    <Clear sx={{ fontSize: 18 }} />
                  </IconButton>
                </InputAdornment>
              ) : undefined,
            },
          }}
          sx={{
            maxWidth: { md: 480 },
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "white",
            },
          }}
        />

        {/* Active filter chips — desktop */}
        {!isMobile && activeFilterCount > 0 && (
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {filters.category && (
              <Chip
                label={categories.find((c) => c.id === filters.category)?.name}
                onDelete={() => handleFiltersChange({ ...filters, category: undefined })}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <Chip
                label={`$${filters.minPrice ?? 0} – $${filters.maxPrice ?? maxPrice}`}
                onDelete={() =>
                  handleFiltersChange({ ...filters, minPrice: undefined, maxPrice: undefined })
                }
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            {filters.colors?.map((c) => (
              <Chip
                key={c}
                label={c}
                onDelete={() =>
                  handleFiltersChange({
                    ...filters,
                    colors: filters.colors?.filter((fc) => fc !== c),
                  })
                }
                size="small"
                color="secondary"
                variant="outlined"
              />
            ))}
            {filters.inStock && (
              <Chip
                label="En stock"
                onDelete={() => handleFiltersChange({ ...filters, inStock: undefined })}
                size="small"
                color="success"
                variant="outlined"
              />
            )}
          </Box>
        )}

        {/* Active filter chips — mobile (compact) */}
        {isMobile && activeFilterCount > 0 && (
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {filters.category && (
              <Chip
                label={categories.find((c) => c.id === filters.category)?.name}
                onDelete={() => handleFiltersChange({ ...filters, category: undefined })}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            {filters.inStock && (
              <Chip
                label="En stock"
                onDelete={() => handleFiltersChange({ ...filters, inStock: undefined })}
                size="small"
                color="success"
                variant="outlined"
              />
            )}
            {activeFilterCount - (filters.category ? 1 : 0) - (filters.inStock ? 1 : 0) > 0 && (
              <Chip
                label={`+${activeFilterCount - (filters.category ? 1 : 0) - (filters.inStock ? 1 : 0)} más`}
                onClick={() => setMobileFiltersOpen(true)}
                size="small"
                color="primary"
                variant="filled"
                sx={{ cursor: "pointer" }}
              />
            )}
          </Box>
        )}
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "260px 1fr" }, gap: 3 }}>
        {/* Desktop sidebar */}
        {!isMobile && (
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: "16px",
              border: "1px solid",
              borderColor: "divider",
              height: "fit-content",
              position: "sticky",
              top: 88,
            }}
          >
            {FiltersContent}
          </Paper>
        )}

        {/* Products grid */}
        <Box>
          {filteredProducts.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 12,
                backgroundColor: "white",
                borderRadius: "16px",
                border: "1px dashed",
                borderColor: "divider",
              }}
            >
              <Typography sx={{ fontSize: "3rem", mb: 2 }}>🧶</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                No encontramos productos
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {debouncedSearch
                  ? `No hay resultados para "${debouncedSearch}"`
                  : "Prueba con otros filtros o explora todas las categorías"}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                {debouncedSearch && (
                  <Button variant="outlined" color="primary" onClick={clearSearch}>
                    Limpiar búsqueda
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    clearSearch();
                    setFilters({ sortBy: "featured" });
                  }}
                >
                  Ver todos los productos
                </Button>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                },
                gap: { xs: 1.5, md: 2.5 },
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* Mobile filters drawer */}
      <Drawer
        anchor="bottom"
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "24px 24px 0 0",
              maxHeight: "85vh",
              px: 2.5,
              pt: 2,
              pb: 3,
            },
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Filtros
          </Typography>
          <IconButton onClick={() => setMobileFiltersOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        <Box sx={{ overflowY: "auto" }}>{FiltersContent}</Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => setMobileFiltersOpen(false)}
          sx={{ mt: 2 }}
        >
          Ver {filteredProducts.length} resultado{filteredProducts.length !== 1 ? "s" : ""}
        </Button>
      </Drawer>
    </Container>
  );
}
