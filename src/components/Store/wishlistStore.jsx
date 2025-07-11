import { create } from 'zustand';

const useWishlistStore = create((set,get) => ({
  wishlist: [],
  //Total wishesJ
getTotalWishes: () => {
  return get().wishlist.length; 
  },
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
  
  // New method to sync with cart
  removeItemsInCart: (cartItems) => set((state) => ({
    wishlist: state.wishlist.filter(
      wishlistItem => !cartItems.some(cartItem => cartItem.id === wishlistItem.id)
    )
  })),
  
  clearWishlist: () => set({ wishlist: [] }),
}));

export default useWishlistStore;