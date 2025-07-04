import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Replace these with your actual images
import img1 from "../assets/images/Abstract.jpeg";
import img2 from "../assets/images/Fine.jpeg";
import img3 from "../assets/images/Abstract.jpeg";
import img4 from "../assets/images/Fine.jpeg";

const Homepage = () => {
  // Cart state
  const [isCartOpen, setIsCartOpen] = useState(false);

  const slides = [
    {
      image: img1,
      title: "Ephemeral Dreams",
      subtitle: "Mixed Media on Canvas • 2023",
      quote: "Art washes away from the soul the dust of everyday life",
    },
    {
      image: img2,
      title: "Chromatic Harmony",
      subtitle: "Oil Painting • 2022",
      quote: "Color is my day-long obsession, joy and torment",
    },
    {
      image: img3,
      title: "Silent Echoes",
      subtitle: "Charcoal & Gold Leaf • 2024",
      quote: "In art, truth and reality begin when one no longer understands",
    },
    {
      image: img4,
      title: "The Doors are Open",
      subtitle: "Acrylic & Resin • 2023",
      quote:
        "The artist is a receptacle for emotions that come from everywhere",
    },
  ];

  const imgarr = [img1, img2, img3];

  return (
    <div className="overflow-hidden relative">
      {/* Overlay */}
      {isCartOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          className="ShoppingBaged inset-0 bg-black/30 z-30"
        />
      )}

      {/* ===== HERO SLIDER ===== */}
      <section className="relative h-[80vh] w-screen">
        <Swiper
          modules={[Autoplay, Pagination]}
          effect="fade"
          speed={1000}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} !w-3 !h-3 !bg-white !opacity-50 !mx-1.5"></span>`;
            },
          }}
          loop={true}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="relative">
              <div className="absolute inset-0 bg-black/30 z-10"></div>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-8">
                <div className="max-w-4xl text-white">
                  <h2 className="text-4xl md:text-6xl font-serif mb-4 font-light tracking-wider">
                    {slide.title}
                  </h2>
                  <p className="text-xl md:text-2xl mb-6 opacity-90">
                    {slide.subtitle}
                  </p>
                  <div className="w-20 h-px bg-white mx-auto my-6"></div>
                  <p className="italic text-lg md:text-xl max-w-2xl mx-auto opacity-80">
                    "{slide.quote}"
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-4">
          <button className="text-white text-sm tracking-widest">
            VIEW COLLECTION →
          </button>
        </div>
      </section>

      {/* ===== CARDS SECTION ===== */}
      <section className="py-12">
        <div className="text-[#74541e] text-center flex flex-col items-center justify-center gap-5 mt-10 max-w-[80vw] mx-auto">
          <h2>Onto the next adventure...</h2>
          <h1 className="text-2xl font-serif">The Original Moving Sale</h1>
          <h3>
            After two years in the warehouse studio, my creative practice is
            moving to <b>Melbourne!</b> For the first time, original pieces are
            available at a generous discount.
          </h3>
          <button className="lg:uppercase text-gray-400 text-sm md:text-xl border border-[#74541e] hover:border-[#74551e52] hover:bg-[#74551e52] w-fit p-2.5 lg:p-5 rounded-sm hover:text-white transition-colors">
            Welcome your favourite Painting Home
          </button>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 mt-12 max-w-6xl mx-auto">
          {imgarr.map((img, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-md shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={img}
                alt={`Artwork ${index + 1}`}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 bg-white">
                <h3 className="font-serif text-lg">Artwork Title</h3>
                <p className="text-sm text-gray-600">Medium • Year</p>
                <p className="mt-2 text-[#74541e] font-medium">$1,200</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
