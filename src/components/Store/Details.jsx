// store.js
import { create } from 'zustand';
import { product } from '../../data/product';

const Details = create((set) => ({
  // All products from your products.js
  products: product,
  
  // Currently selected product (null by default)
  selectedProduct: null,
  
  // Action: Set the selected product by ID
  setSelectedProduct: (productId) => {
    const selected = product.find(p => p.id === productId);
    set({ selectedProduct: selected });
  },
  
  // Action: Clear selection
  clearSelectedProduct: () => set({ selectedProduct: null }),
}));

export default Details;