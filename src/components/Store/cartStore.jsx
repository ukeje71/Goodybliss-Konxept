import { create } from "zustand";

const useCartStore = create((set) => ({
  // Initial state
  cartItems: [],

  // Actions
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id
      );
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
        .filter((item) => item.quantity > 0), // Remove items with quantity <= 0
    })),
  // Derived state (total items)
  getTotalItems: () =>
    useCartStore
      .getState()
      .cartItems.reduce((total, item) => total + item.quantity, 0),

  // Derived state (total price)
  getTotalPrice: () =>
    useCartStore
      .getState()
      .cartItems.reduce((total, item) => total + item.price * item.quantity, 0),

  // Clear cart
  clearCart: () => set({ cartItems: [] }),
}));

export default useCartStore;
