import { z } from "zod";
import { COSTA_RICA_PROVINCES } from "./shipping";

export const CheckoutFormSchema = z.object({
  fullName: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(80, "El nombre es muy largo"),
  phone: z
    .string()
    .min(8, "El teléfono debe tener al menos 8 dígitos")
    .regex(/^[\d\s\-\+\(\)]+$/, "Teléfono inválido"),
  email: z
    .string()
    .email("Correo electrónico inválido")
    .optional()
    .or(z.literal("")),
  province: z.enum(COSTA_RICA_PROVINCES, {
    error: "Selecciona una provincia",
  }),
  canton: z
    .string()
    .min(2, "El cantón es requerido"),
  address: z
    .string()
    .min(10, "La dirección debe ser más detallada")
    .max(300, "La dirección es muy larga"),
  notes: z
    .string()
    .max(500, "Las notas son muy largas")
    .optional()
    .or(z.literal("")),
});

export type CheckoutFormData = z.infer<typeof CheckoutFormSchema>;
