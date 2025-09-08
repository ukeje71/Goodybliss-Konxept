import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import useWishlistStore from "./wishlistStore";

// Utility function to ensure price is always a number
const ensureNumericPrice = (price) => {
  if (typeof price === 'number') return price;
  const num = Number(price);
  return isNaN(num) ? 0 : num;
};

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      selectedProduct: null,

      // Actions
      addToCart: (product) => {
        // Ensure price is a number before adding to cart
        const productWithNumericPrice = {
          ...product,
          price: ensureNumericPrice(product.price)
        };
        
        const existingItem = get().cartItems.find(
          (item) => item.id === productWithNumericPrice.id
        );
        useWishlistStore.getState().removeFromWishlist(productWithNumericPrice.id);

        if (existingItem) {
          set({
            cartItems: get().cartItems.map((item) =>
              item.id === productWithNumericPrice.id
                ? { 
                    ...item, 
                    quantity: item.quantity + 1,
                    price: ensureNumericPrice(item.price) // Ensure price is number
                  }
                : item
            ),
          });
        } else {
          set({
            cartItems: [...get().cartItems, { ...productWithNumericPrice, quantity: 1 }],
          });
        }
      },

      removeFromCart: (productId) => {
        alert("You are about to remove a product from cart ")
        set({
          cartItems: get().cartItems.filter((item) => item.id !== productId),
        });
      },

      increaseQuantity: (productId) => {
        set({
          cartItems: get().cartItems.map((item) =>
            item.id === productId
              ? { 
                  ...item, 
                  quantity: item.quantity + 1,
                  price: ensureNumericPrice(item.price) // Ensure price is number
                }
              : item
          ),
        });
      },

      decreaseQuantity: (productId) => {
        set({
          cartItems: get()
            .cartItems.map((item) =>
              item.id === productId
                ? { 
                    ...item, 
                    quantity: item.quantity - 1,
                    price: ensureNumericPrice(item.price) // Ensure price is number
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
        });
      },

      setSelectedProduct: (product) => set({ 
        selectedProduct: {
          ...product,
          price: ensureNumericPrice(product.price) // Ensure price is number
        } 
      }),
      
      clearSelectedProduct: () => set({ selectedProduct: null }),

      // Getters
      isInCart: (productId) => {
        return get().cartItems.some((item) => item.id === productId);
      },

      getTotalItems: () => {
        return get().cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
      },

      getTotalPrice: () => {
        return get().cartItems.reduce(
          (total, item) => total + (ensureNumericPrice(item.price) * item.quantity),
          0
        );
      },

      clearCart: () => set({ cartItems: [] }),

      syncWithWishlist: () => {
        const wishlist = useWishlistStore.getState().wishlist;
        set({
          cartItems: get().cartItems.filter(
            (item) => !wishlist.some((wishItem) => wishItem.id === item.id)
          ),
        });
      },

      // NEW: Migration function to fix existing items with string prices
      migrateCartPrices: () => {
        const currentItems = get().cartItems;
        const migratedItems = currentItems.map(item => ({
          ...item,
          price: ensureNumericPrice(item.price)
        }));
        
        set({ cartItems: migratedItems });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cartItems: state.cartItems }),
      version: 2, // Increment version since we changed the data structure
      migrate: (persistedState, version) => {
        // Migration from version 1 to 2: Convert string prices to numbers
        if (version === 1) {
          if (persistedState && persistedState.cartItems) {
            return {
              ...persistedState,
              cartItems: persistedState.cartItems.map(item => ({
                ...item,
                price: ensureNumericPrice(item.price)
              }))
            };
          }
        }
        return persistedState;
      },
    }
  )
);

// Run migration on store initialization
useCartStore.getState().migrateCartPrices();

export default useCartStore;