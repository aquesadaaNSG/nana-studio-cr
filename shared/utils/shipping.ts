import shippingData from "@/data/shipping.json";
import { ShippingData } from "@/shared/interfaces/shipping";

const data = shippingData as ShippingData;

export function getShippingCost(province: string): number {
  const zoneId = data.provinceZoneMap[province];
  if (!zoneId) return data.zones[data.zones.length - 1].price;
  const zone = data.zones.find((z) => z.id === zoneId);
  return zone?.price ?? 12.0;
}

export function getShippingZoneName(province: string): string {
  const zoneId = data.provinceZoneMap[province];
  if (!zoneId) return "Zona Remota";
  const zone = data.zones.find((z) => z.id === zoneId);
  return zone?.name ?? "Zona Remota";
}

export function getEstimatedDays(province: string): string {
  const zoneId = data.provinceZoneMap[province];
  if (!zoneId) return "5-7 días hábiles";
  return data.estimatedDays[zoneId] ?? "5-7 días hábiles";
}

export function isFreeShipping(subtotal: number): boolean {
  return subtotal >= data.freeShippingThreshold;
}

export const FREE_SHIPPING_THRESHOLD = data.freeShippingThreshold;
export const FREE_SHIPPING_LABEL = "₡22.000";
export const SHIPPING_PROVIDER = data.provider;
