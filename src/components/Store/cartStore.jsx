import { create } from "zustand";
import useWishlistStore from "./wishlistStore";

const useCartStore = create((set, get) => ({
  // Initial state
  cartItems: [],
  selectedProduct: null, // New state for product details

  // Existing cart actions (unchanged)
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

  // New product details actions
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  clearSelectedProduct: () => set({ selectedProduct: null }),

  // Existing utility methods (unchanged)
  isInCart: (productId) => {
    return get().cartItems.some((item) => item.id === productId);
  },

  getTotalItems: () => {
    return get().cartItems.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  clearCart: () => set({ cartItems: [] }),

  syncWithWishlist: () => {
    const wishlist = useWishlistStore.getState().wishlist;
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) => !wishlist.some((wishItem) => wishItem.id === item.id)
      ),
    }));
  },
}));

export default useCartStore;
