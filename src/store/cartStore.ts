import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  expiryTime: number | null; // New: Timestamp when cart expires
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, size: string) => void;
  increaseQuantity: (id: string, size: string) => void;
  decreaseQuantity: (id: string, size: string) => void;
  clearCart: () => void;
  checkExpiry: () => boolean; // New: Function to check if time is up
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      expiryTime: null,

      addItem: (newItem) => {
        const { items, expiryTime } = get();
        
        // 1. START TIMER: If cart was empty, set timer for 10 minutes from now
        let newExpiry = expiryTime;
        if (items.length === 0) {
          newExpiry = Date.now() + 10 * 60 * 1000; // 10 Minutes in milliseconds
        }

        const existingItem = items.find(
          (i) => i.id === newItem.id && i.size === newItem.size
        );

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === newItem.id && i.size === newItem.size
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
            expiryTime: newExpiry,
          });
        } else {
          set({ 
            items: [...items, { ...newItem, quantity: 1 }],
            expiryTime: newExpiry
          });
        }
      },

      removeItem: (id, size) => {
        const newItems = get().items.filter((i) => !(i.id === id && i.size === size));
        // If cart becomes empty, reset timer
        set({ 
          items: newItems,
          expiryTime: newItems.length === 0 ? null : get().expiryTime
        });
      },

      increaseQuantity: (id, size) => {
        set({
          items: get().items.map((i) =>
            i.id === id && i.size === size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        });
      },

      decreaseQuantity: (id, size) => {
        const currentItems = get().items;
        const targetItem = currentItems.find((i) => i.id === id && i.size === size);

        if (targetItem?.quantity === 1) {
          get().removeItem(id, size);
        } else {
          set({
            items: currentItems.map((i) =>
              i.id === id && i.size === size
                ? { ...i, quantity: i.quantity - 1 }
                : i
            ),
          });
        }
      },

      clearCart: () => set({ items: [], expiryTime: null }),

      // NEW: Check if expired
      checkExpiry: () => {
        const { expiryTime, items } = get();
        if (items.length > 0 && expiryTime && Date.now() > expiryTime) {
          set({ items: [], expiryTime: null }); // Kill the cart
          return true; // Yes, it expired
        }
        return false; // No, still valid
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      }
    }),
    {
      name: 'arabica-cart-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);