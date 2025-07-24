// wishlistStore.js
// import toast from 'react-hot-toast';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],

      // Getters
      getTotalWishes: () => {
        return get().wishlist.length;
      },

      // Actions
      addToWishlist: (product) => set((state) => {
        const exists = state.wishlist.some(item => item.id === product.id);
        if (!exists) {
          return { wishlist: [...state.wishlist, product] };
        }
        return state;
      }),
      
      removeFromWishlist: (productId) => set((state) => ({
        wishlist: state.wishlist.filter(item => item.id !== productId)
      })),
      
      removeItemsInCart: (cartItems) => set((state) => ({
        wishlist: state.wishlist.filter(
          wishlistItem => !cartItems.some(cartItem => cartItem.id === wishlistItem.id)
        )
      })),
      
      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useWishlistStore;