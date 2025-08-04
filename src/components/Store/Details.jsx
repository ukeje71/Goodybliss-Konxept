import { create } from 'zustand';

const useDetailsStore = create((set, get) => ({
  // Initial products list — empty initially
  products: [],

  // Selected product
  selectedProduct: null,

  // Action: update products list (e.g., from Firestore)
  setProducts: (products) => set({ products }),

  // Action: set selected product by ID
  setSelectedProduct: (productId) => {
    const selected = get().products.find((p) => p.id === productId);
    set({ selectedProduct: selected });
  },

  // Action: clear selected product
  clearSelectedProduct: () => set({ selectedProduct: null }),
}));

export default useDetailsStore;
