import React from "react";
import Details from "../components/Store/Details";
import { useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import useCartStore from "../components/Store/cartStore";

const ProductDetails = () => {
  const { decreaseQuantity, increaseQuantity } = useCartStore();

  const { products } = Details(); // Get products from Zustand
  // const [quantity, setQuantity] = React.useState(1);
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();

  // Find the product by ID
  const product = products.find((p) => p.id === parseInt(id));

  // Guard clause if product not found
  if (!product) {
    return (
      <div className="bg-[#f5f0ea] min-h-screen flex items-center justify-center">
        <p>Product not found.</p>
      </div>
    );
  }
  return (
    <div className={`min-h-screen bg-[#f5f0ea] py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-6xl mx-auto">
        <ArrowLeft
          onClick={() => navigate(-1)}
          size={40}
          className="cursor-pointer bg-[#74541e] p-3  mb-14 text-white rounded-full hover:bg-[#5a4218] transition-colors"
        />
        {/* Product & Description (Flex Layout) */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Product Image */}
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>
            <p className="text-lg text-gray-700">
              {product.medium} • {product.year} • {product.size}
            </p>

            {/* Price */}
            <div className="flex items-center gap-4">
              <p className="text-2xl font-semibold text-[#74541e]">
                ${product.discountPrice || product.regularPrice}
              </p>
              {product.discountPrice && (
                <p className="text-lg text-gray-500 line-through">
                  ${product.regularPrice}
                </p>
              )}
            </div>

            {/* Stock Status */}
            <p
              className={`text-sm ${
                product.inStock ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.inStock ? "In Stock" : "Sold Out"}
            </p>

            {/* Description */}
            <div className="text-gray-600 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Description
              </h2>
              <p>{product.description}</p>
            </div>

            {/* Quantity Controls (only show if in stock) */}
            {product.inStock && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => decreaseQuantity()}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-1"></span>
                  <button
                    onClick={() => increaseQuantity()}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              className={`bg-[#74541e] text-white py-3 px-6 rounded hover:bg-[#5a4218] transition-colors ${
                !product.inStock ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!product.inStock}
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
