import React from "react";
import Cards from "./Cards";
import { product } from "../../data/product";


const Photos = () => (
  <div className="">
    {/* {product.map((product) => ( */}
      <Cards key={product.id} product={product} />
    {/* ))} */}
  </div>
);

export default Photos;
