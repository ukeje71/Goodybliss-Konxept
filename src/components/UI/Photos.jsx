import React from "react";
import Cards from "./Cards";
import { product } from "../../data/product";


const Photos = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {product.map((product) => (
      <Cards key={product.id} product={product} />
    ))}
  </div>
);

export default Photos;
