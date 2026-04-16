import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/shared/interfaces/cart";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, color: string) => void;
  updateQuantity: (productId: string, color: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed
  getItemCount: () => number;
  getSubtotal: () => number;
  hasItem: (productId: string, color: string) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === newItem.productId && i.color === newItem.color
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === newItem.productId && i.color === newItem.color
                  ? { ...i, quantity: i.quantity + newItem.quantity }
                  : i
              ),
            };
          }

          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (productId, color) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.color === color)
          ),
        }));
      },

      updateQuantity: (productId, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, color);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.color === color
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getItemCount: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      },

      hasItem: (productId, color) => {
        return get().items.some(
          (i) => i.productId === productId && i.color === color
        );
      },
    }),
    {
      name: "nana-studio-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
