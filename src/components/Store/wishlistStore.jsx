import { create } from 'zustand';

const useWishlistStore = create((set) => ({
  wishlist: [],
  
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
  
  clearWishlist: () => set({ wishlist: [] }),
}));

export default useWishlistStore;