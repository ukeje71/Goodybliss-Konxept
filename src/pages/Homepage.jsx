import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Navigate, useNavigate } from "react-router";

// Assets
import abstractImage from "../assets/Images/Abstract.jpeg";
import fineArtImage from "../assets/Images/Fine.jpeg";
import Watercolor1 from "../assets/Images/Face2.jpeg";
import Impressionist1 from "../assets/Images/Face1.jpeg";
import Photos from "../components/UI/Photos";
import { Phone } from "lucide-react";
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

const TESTIMONIALS = [
  {
    name: "Sarah J.",
    location: "New York",
    text: "The artwork arrived beautifully packaged and exceeded my expectations. It's the centerpiece of my living room now!",
    rating: 5,
  },
  {
    name: "Michael T.",
    location: "London",
    text: "Exceptional quality and the artist's attention to detail is remarkable. Will definitely purchase again.",
    rating: 5,
  },
  {
    name: "Emma L.",
    location: "Sydney",
    text: "I've purchased three pieces now and each one brings me so much joy. The colors are even more vibrant in person.",
    rating: 4,
  },
];

const FEATURED_PRODUCTS = [
  {
    id: 1,
    image: Watercolor1,
    title: "Golden Horizon",
    medium: "Oil on Canvas",
    price: 1200,
    discountPrice: 950,
    size: "24 × 36 inches",
    year: 2023,
  },
  {
    id: 2,
    image: Watercolor1,
    title: "Azure Reflections",
    medium: "Acrylic on Wood Panel",
    price: 850,
    size: "18 × 24 inches",
    year: 2022,
  },
  {
    id: 3,
    image: Watercolor1,
    title: "Whispering Pines",
    medium: "Watercolor on Paper",
    price: 650,
    discountPrice: 550,
    size: "16 × 20 inches",
    year: 2024,
  },
];

const Homepage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
const navigate =useNavigate();
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

  const renderStarRating = (rating) => {
    return (
      <div className="flex justify-center mt-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-amber-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

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

      {/* Featured Products Section */}
      <section className="py-16 bg-[#f5f0ea]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-center text-[#74541e] mb-12">
            Featured Artworks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_PRODUCTS.map((product) => {
              const discountPercent = product.discountPrice
                ? Math.round(
                    ((product.regularPrice - product.discountPrice) /
                      product.regularPrice) *
                      100
                  )
                : 0;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {product.discountPrice && (
                      <div className="absolute top-3 right-3 bg-[#C47E20] text-white text-xs font-medium px-2 py-1 rounded-full">
                        {discountPercent}% OFF
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-medium text-gray-800">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {product.medium} • {product.year}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{product.size}</p>
                    <div className="mt-3">
                      {product.discountPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-[#74541e]">
                            ${product.discountPrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-[#74541e]">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button className="mt-4 w-full py-2 bg-[#C47E20] text-white rounded hover:bg-[#a86d1a] transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <button 
            onClick={()=>navigate('/gallery')}
            className="px-6 py-3 border border-[#74541e] text-[#74541e] rounded hover:bg-[#74541e] hover:text-white transition-colors">
              View All Artworks
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-center text-[#74541e] mb-12">
            Collector Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#f9f7f3] p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#e8ddd0] flex items-center justify-center text-[#74541e] font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                {renderStarRating(testimonial.rating)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artist Story Section */}
      <section className="py-16 bg-[#f5f0ea]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
                <img
                  src={Watercolor1}
                  alt="Artist Goodybliss"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-serif text-[#74541e] mb-6">
                Meet the Artist
              </h2>
              <p className="text-gray-700 mb-4">
                Goodybliss is a contemporary artist known for her vibrant use of
                color and expressive brushwork. With over 15 years of
                experience, her work has been exhibited in galleries across
                Australia and internationally.
              </p>
              <p className="text-gray-700 mb-4">
                Her current collection explores the intersection of memory and
                landscape, drawing inspiration from the rugged Tasmanian
                coastline where she spent her formative years.
              </p>
              <p className="text-gray-700 mb-6">
                "Each piece is a conversation between the materials and my
                emotions at that moment in time. I hope they bring as much joy
                to collectors as they brought me in creating them."
              </p>
              <button className="px-6 py-3 bg-[#74541e] text-white rounded hover:bg-[#5a4218] transition-colors">
                Read Full Biography
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl font-serif text-[#74541e] mb-4">
            Join Our Collector's Circle
          </h2>
          <p className="text-gray-600 mb-8">
            Subscribe to receive exclusive previews of new works, studio
            updates, and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 border border-[#d4c9b5] rounded focus:outline-none focus:ring-2 focus:ring-[#C47E20]"
            />
            <button className="px-6 py-3 bg-[#74541e] text-white rounded hover:bg-[#5a4218] transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
