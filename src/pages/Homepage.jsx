import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Assets
import abstractImage from "../assets/Images/Abstract.jpeg";
import fineArtImage from "../assets/Images/Fine.jpeg";

import Watercolor1 from "../assets/Images/Face2.jpeg";
import Impressionist1 from "../assets/Images/Face1.jpeg";
import Photos from "../components/UI/Photos";

const SLIDES = [
  {
    image: abstractImage,
    title: "Ephemeral Dreams",
    subtitle: "Mixed Media on Canvas • 2023",
    quote: "Art washes away from the soul the dust of everyday life",
  },
  {
    image: fineArtImage,
    title: "Chromatic Harmony",
    subtitle: "Oil Painting • 2022",
    quote: "Color is my day-long obsession, joy and torment",
  },
  {
    image: Watercolor1,
    title: "Silent Echoes",
    subtitle: "Charcoal & Gold Leaf • 2024",
    quote: "In art, truth and reality begin when one no longer understands",
  },
  {
    image: Impressionist1,
    title: "The Doors are Open",
    subtitle: "Acrylic & Resin • 2023",
    quote: "The artist is a receptacle for emotions that come from everywhere",
  },
];

const PRODUCT_CARDS = [
  {
    image: abstractImage,
    title: "Most Popular",
    description: "Explore collector favourite works and best sellers",
    cta: "Explore",
  },
  {
    image: fineArtImage,
    title: "Featured Artwork",
    description: '"The Beauty Of Imperfect Things" fine art print',
    cta: "Discover",
  },
  {
    image: abstractImage,
    title: "Available Originals",
    description: "Take your time to find the perfect heirloom",
    cta: "View Originals",
  },
];

const Homepage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const renderHeroSlide = ({ image, title, subtitle, quote }) => (
    <SwiperSlide className="relative">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-8">
        <div className="max-w-4xl text-white">
          <h2 className="text-4xl md:text-6xl font-serif mb-4 font-light tracking-wider">
            {title}
          </h2>
          <p className="text-xl md:text-2xl mb-6 opacity-90">{subtitle}</p>
          <div className="w-20 h-px bg-white mx-auto my-6" />
          <p className="italic text-lg md:text-xl max-w-2xl mx-auto opacity-80">
            "{quote}"
          </p>
        </div>
      </div>
    </SwiperSlide>
  );

  const renderProductCard = ({ image, title, description, cta }) => (
    <div className="group overflow-hidden rounded-md transition-shadow hover:shadow-lg">
      <img
        src={image}
        alt={title}
        className="w-full h-80 object-cover group-hover:scale-105 rounded-2xl transition-transform duration-300"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="font-serif text-2xl font-medium">{title}</h3>
        <p className="text-sm text-[#918172]">{description}</p>
        <p className="mt-2 text-[#74541e] font-medium hover:underline lg:uppercase">
          {cta}
        </p>
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden relative">
      {isCartOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/30 z-30"
        />
      )}

      {/* Hero Slider Section */}
      <section className="relative h-[80vh] w-screen">
        <Swiper
          modules={[Autoplay, Pagination]}
          effect="fade"
          speed={1000}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className} !w-3 !h-3 !bg-white !opacity-50 !mx-1.5"></span>`,
          }}
          loop
          className="h-full w-full"
        >
          {SLIDES.map((slide, index) => (
            <React.Fragment key={index}>
              {renderHeroSlide(slide)}
            </React.Fragment>
          ))}
        </Swiper>

        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center">
          <button className="text-white text-sm tracking-widest">
            VIEW COLLECTION →
          </button>
        </div>
      </section>

      {/* Products Category */}
      <section className="py-12">
        <div className="text-[#74541e] text-center max-w-[80vw] mx-auto space-y-5">
          <h2>Onto the next adventure...</h2>
          <h1 className="text-2xl font-serif">The Original Moving Sale</h1>
          <p>
            After two years in the warehouse studio, my creative practice is
            moving to <strong>Melbourne!</strong> For the first time, original
            pieces are available at a generous discount.
          </p>
          <button className="text-gray-400 text-sm md:text-xl border border-[#74541e] hover:bg-[#74551e52] hover:text-white w-fit px-5 py-2.5 lg:py-3 rounded-sm transition-colors uppercase">
            Welcome your favourite Painting Home
          </button>
        </div>

        <div className="bg-[#f5f0ea] mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
            {PRODUCT_CARDS.map((card, index) => (
              <React.Fragment key={index}>
                {renderProductCard(card)}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row h-[90vh] w-full">
          {/* Video*/}
          <div className="hidden  md:flex w-full lg:w-1/2 h-1/2 lg:h-full relative">
            <img
              className="object-cover w-full h-full"
              src={fineArtImage}
              type="video/mp4"
              alt="Art gallery video"
            />
          </div>

          {/*Overlay */}
          <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative">
            <img
              src={abstractImage}
              alt="Art gallery interior"
              className="object-cover w-full h-full"
              loading="lazy"
            />

            {/* Enhanced Text Overlay */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-8">
              <div className="text-white text-center max-w-md">
                <h1 className="text-3xl md:text-5xl font-serif mb-4 uppercase tracking-wider">
                  Curate Your Home Gallery
                </h1>
                <div className="w-20 h-0.5 bg-white mx-auto my-6"></div>
                <p className="text-lg md:text-xl mb-4 font-medium">
                  Museum-grade Canvas Prints
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  Add a personal touch with a bespoke Tasmanian oak frame.
                  Gallery wrapped with an enchanting satin finish, each print is
                  made to order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product display */}
      <section>{/* <Photos/> */}</section>
    </div>
  );
};

export default Homepage;
