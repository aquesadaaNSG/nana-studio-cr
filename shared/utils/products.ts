import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import { Product, Category, ProductFilters } from "@/shared/interfaces/product";

const products = productsData as Product[];
const categories = categoriesData as Category[];

export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured && p.inStock);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category === categoryId);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getAllColors(): string[] {
  const colorSet = new Set<string>();
  products.forEach((p) => p.colors.forEach((c) => colorSet.add(c)));
  return Array.from(colorSet).sort();
}

export function getMaxPrice(): number {
  return Math.max(...products.map((p) => p.price));
}

export function filterProducts(filters: ProductFilters): Product[] {
  let result = [...products];

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters.colors && filters.colors.length > 0) {
    result = result.filter((p) =>
      filters.colors!.some((fc) => p.colors.includes(fc))
    );
  }

  if (filters.inStock) {
    result = result.filter((p) => p.inStock);
  }

  if (filters.search) {
    const q = filters.search.toLowerCase().trim();
    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
    }
  }

  switch (filters.sortBy) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      result.sort((a, b) => b.id.localeCompare(a.id));
      break;
    case "featured":
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
    default:
      break;
  }

  return result;
}
