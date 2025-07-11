import { create } from "zustand";
import useWishlistStore from "./wishlistStore";

const useCartStore = create((set, get) => ({
  // Initial state
  cartItems: [],

  // Actions
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id
      );
      
      // Remove from wishlist when adding to cart
      useWishlistStore.getState().removeFromWishlist(product.id);
      
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    })),

  increaseQuantity: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

  decreaseQuantity: (productId) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),

  // New method to check if item is in cart
  isInCart: (productId) => {
    return get().cartItems.some(item => item.id === productId);
  },

  // Improved derived states (no need for getState)
  getTotalItems: () => {
    return get().cartItems.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().cartItems.reduce(
      (total, item) => total + (item.price * item.quantity), 0
    );
  },

  // Clear cart
  clearCart: () => set({ cartItems: [] }),

  // New method to sync with wishlist
  syncWithWishlist: () => {
    const wishlist = useWishlistStore.getState().wishlist;
    set((state) => ({
      cartItems: state.cartItems.filter(
        item => !wishlist.some(wishItem => wishItem.id === item.id)
      )
    }));
  }
}));

export default useCartStore;