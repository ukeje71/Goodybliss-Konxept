import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// Replace these with your actual images
import img1 from "../assets/images/Abstract.jpeg";
import img2 from "../assets/images/Fine.jpeg";
import img3 from "../assets/images/Abstract.jpeg";
import img4 from "../assets/images/Fine.jpeg";

const Homepage = () => {
  const slides = [
    {
      image: img1,
      title: "Ephemeral Dreams",
      subtitle: "Mixed Media on Canvas • 2023",
      quote: "Art washes away from the soul the dust of everyday life"
    },
    {
      image: img2,
      title: "Chromatic Harmony",
      subtitle: "Oil Painting • 2022",
      quote: "Color is my day-long obsession, joy and torment"
    },
    {
      image: img3,
      title: "Silent Echoes",
      subtitle: "Charcoal & Gold Leaf • 2024",
      quote: "In art, truth and reality begin when one no longer understands"
    },
    {
      image: img4,
      title: "Celestial Bodies",
      subtitle: "Acrylic & Resin • 2023",
      quote: "The artist is a receptacle for emotions that come from everywhere"
    }
  ];

  return (
    <div className="relative h-[80vh] w-screen">
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
            {/* Fullscreen image with overlay */}
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            
            {/* Artistic text overlay */}
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

      {/* Custom navigation arrows */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-4">
        <button className="text-white text-sm tracking-widest">
          VIEW COLLECTION →
        </button>
      </div>
    </div>
  );
};

export default Homepage;