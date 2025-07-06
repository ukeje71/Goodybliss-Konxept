import React from "react";

const Cards = ({ product }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  p-4">
      {/* {product.map((product) => ( */}
        <div
          key={product.id}
          className="border rounded-lg overflow-hidden shadow-sm w-90 h-90"
        >
          {/* Product Image */}
          <div className="h-48 bg-gray-100 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">
              {product.title}
            </h3>

            {/* Pricing */}
            <div className="mt-2">
              {product.discountPrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#74541e]">
                    ${product.discountPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ${product.regularPrice.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-bold text-[#74541e]">
                  ${product.regularPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      {/* ))} */}
    </div>
  );
};

export default Cards;