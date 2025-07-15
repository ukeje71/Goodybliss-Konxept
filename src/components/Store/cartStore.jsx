import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import useWishlistStore from './wishlistStore';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      selectedProduct: null,

      // Actions
      addToCart: (product) => {
        const existingItem = get().cartItems.find(item => item.id === product.id);
        useWishlistStore.getState().removeFromWishlist(product.id);
        
        if (existingItem) {
          set({
            cartItems: get().cartItems.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({
            cartItems: [...get().cartItems, { ...product, quantity: 1 }]
          });
        }
      },

      removeFromCart: (productId) => {
        set({
          cartItems: get().cartItems.filter(item => item.id !== productId)
        });
      },

      increaseQuantity: (productId) => {
        set({
          cartItems: get().cartItems.map(item =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        });
      },

      decreaseQuantity: (productId) => {
        set({
          cartItems: get().cartItems
            .map(item =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter(item => item.quantity > 0)
        });
      },

      setSelectedProduct: (product) => set({ selectedProduct: product }),
      clearSelectedProduct: () => set({ selectedProduct: null }),

      // Getters
      isInCart: (productId) => {
        return get().cartItems.some(item => item.id === productId);
      },

      getTotalItems: () => {
        return get().cartItems.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().cartItems.reduce(
          (total, item) => total + (item.price * item.quantity), 
          0
        );
      },

      clearCart: () => set({ cartItems: [] }),

      syncWithWishlist: () => {
        const wishlist = useWishlistStore.getState().wishlist;
        set({
          cartItems: get().cartItems.filter(
            item => !wishlist.some(wishItem => wishItem.id === item.id)
          )
        });
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cartItems: state.cartItems }),
      version: 1,
      migrate: (persistedState, version) => {
        if (version === 0) {
          // Migration logic if needed
        }
        return persistedState;
      },
    }
  )
);

export default useCartStore;