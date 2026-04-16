export interface ShippingZone {
  id: string;
  name: string;
  price: number;
  provinces: string[];
  cantons: string[];
}

export interface ShippingData {
  currency: string;
  provider: string;
  estimatedDays: Record<string, string>;
  freeShippingThreshold: number;
  zones: ShippingZone[];
  provinceZoneMap: Record<string, string>;
}

export const COSTA_RICA_PROVINCES = [
  "San José",
  "Alajuela",
  "Cartago",
  "Heredia",
  "Guanacaste",
  "Puntarenas",
  "Limón",
] as const;

export type CostaRicaProvince = (typeof COSTA_RICA_PROVINCES)[number];
