import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
// Imgs
import img1 from "../assets/Images/Abstract.jpeg";
import img2 from "../assets/Images/Abstract.jpeg";
import img3 from "../assets/Images/Abstract.jpeg";
import img4 from "../assets/Images/Abstract.jpeg";
import img5 from "../assets/Images/Abstract.jpeg";

const artworks = [
  { id: 1, image: img1, title: "Artwork 1" },
  { id: 2, image: img2, title: "Artwork 2" },
  { id: 3, image: img3, title: "Artwork 3" },
  { id: 4, image: img4, title: "Artwork 4" },
  { id: 5, image: img5, title: "Artwork 5" },
];
const Scrollslide = () => {
  return (
    <div className="relative px-4 md:px-8 py-8">
      {/* Carousel */}
      <Swiper
        modules={[FreeMode, Mousewheel]}
        spaceBetween={24}
        slidesPerView="auto"
        freeMode={{
          enabled: true,
          momentumRatio: 0.6,
          sticky: true,
        }}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1.2,
        }}
        resistanceRatio={0}
        className="!overflow-visible" // Allows items to overflow container
      >
        {artworks.map((art) => (
          <SwiperSlide
            key={art.id}
            className="!w-[65vw] md:!w-[40vw] lg:!w-[30vw] flex-shrink-0"
          >
            <div className="group relative">
              {/* Image with hover zoom effect */}
              <div className="overflow-hidden rounded-lg aspect-[4/5]">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Caption (appears on hover like Goodybliss's) */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-medium">{art.title}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom scrollbar (optional) */}
      <div className="mt-6 px-4">
        <div className="h-px bg-gray-200 relative">
          <div className="absolute top-0 left-0 h-full w-1/3 bg-[#C47E20]"></div>
        </div>
      </div>
    </div>
  );
};

export default Scrollslide;
