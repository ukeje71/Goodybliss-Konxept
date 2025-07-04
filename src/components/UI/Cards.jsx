import React from "react";

const Cards = ({ images }) => {
  return (
    <div className="w-80 h-80">
      {images.map((images) => (
        <img src={images} alt="img1" className="h-full  w-full" />
      ))}
    </div>
  );
};

export default Cards;
