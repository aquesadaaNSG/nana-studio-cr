export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  category: string;
  images: string[];
  colors: string[];
  materials: string[];
  dimensions: string;
  weight: string;
  inStock: boolean;
  stockQuantity: number;
  featured: boolean;
  tags: string[];
  rating: number;
  reviewCount: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  image: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  inStock?: boolean;
  sortBy?: ProductSortOption;
  search?: string;
}

export type ProductSortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest";
