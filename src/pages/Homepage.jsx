import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Mail,
  MoveRight,
  ArrowRight,
} from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import Cards2 from "../components/Layouts/Cards2";
import { db } from "../components/Firebase";
// Assets
import abstractImage from "../assets/Images/Abstract.jpeg";
import fineArtImage from "../assets/Images/Fine.jpeg";
import artist from "../assets/Images/Goodybliss3.jpg";
import toast from "react-hot-toast";

const SLIDES = [
  {
    image: abstractImage,
    title: "Ephemeral Dreams",
    subtitle: "Mixed Media on Canvas • 2023",
    quote: "Art washes away from the soul the dust of everyday life",
  },
  {
    image:
      "https://res.cloudinary.com/dlyearrnf/image/upload/v1753792136/Face1_pqpqrd.jpg",
    title: "Chromatic Harmony",
    subtitle: "Oil Painting • 2022",
    quote: "Color is my day-long obsession, joy and torment",
  },
  {
    image:
      "https://res.cloudinary.com/dlyearrnf/image/upload/v1753792029/Painting_qrunau.jpg",
    title: "Whispers of the Past",
    subtitle: "Acrylic & Mixed Media • 2024",
    quote: "In art, truth and reality begin when one no longer understands",
  },
  {
    image:
      "https://res.cloudinary.com/dlyearrnf/image/upload/v1753792044/Face2_nqgxcg.jpg",
    title: "The Doors are Open",
    subtitle: "Acrylic & Resin • 2023",
    quote: "The artist is a receptacle for emotions that come from everywhere",
  },
];

const PRODUCT_CARDS = [
  {
    image:
      "https://res.cloudinary.com/dlyearrnf/image/upload/v1753792044/Face2_nqgxcg.jpg",
    title: "Most Popular",
    description: "Explore collector favourite works and best sellers",
    cta: "Explore",
  },
  {
    image:
      "https://res.cloudinary.com/dlyearrnf/image/upload/v1753792036/Admirer_bb4hnn.jpg",
    title: "Featured Artwork",
    description: '"The Beauty Of Imperfect Things" fine art print',
    cta: "Discover",
  },
  {
    image:
      "https://res.cloudinary.com/dlyearrnf/image/upload/v1753792028/Fine_jgueyn.jpg",
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
    rating: 3,
  },
];

const SliderNavigation = ({ swiperRef, className = "" }) => {
  return (
    <div
      className={`flex justify-between w-full pointer-events-none ${className}`}
    >
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="w-12 h-12 rounded-full bg-white/80 text-[#74541e] flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg border border-[#d4c9b5] pointer-events-auto"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="stroke-[1.5]" />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="w-12 h-12 rounded-full bg-white/80 text-[#74541e] flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg border border-[#d4c9b5] pointer-events-auto"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="stroke-[1.5]" />
      </button>
    </div>
  );
};

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const heroSwiperRef = useRef(null);
  const testimonialSwiperRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          regularPrice: Number(doc.data().regularPrice) || 0,
          discountPrice: doc.data().discountPrice
            ? Number(doc.data().discountPrice)
            : null,
          inStock: doc.data().inStock !== false,
        }));
        setProducts(productsData);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        <div className="flex items-center mt-2 text-[#74541e] font-medium hover:underline lg:uppercase">
          {cta} <MoveRight className="ml-1 w-4 h-4" />
        </div>
      </div>
    </div>
  );

  const renderStarRating = (rating) => {
    return (
      <div className="flex justify-center mt-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
              }`}
            strokeWidth={1.5}
          />
        ))}
      </div>
    );
  };
  // Fromspree intergration
  const [formState, setFormState] = useState(false);
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Subscription Recieved", { email });
    toast.success("Email Sent")
    setFormState(true);


    try {
      const response = await fetch("nttps://formspree.io/f/xblynllq",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        })
      if (response.ok) {
        setTimeout(() => {
          setEmail();
          setFormState(false);
        }, 50000)
      }
    } catch (error) {
      console.log("Not sent", error)
    }
  };
  return (
    <div className="overflow-hidden relative">
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
          onSwiper={(swiper) => (heroSwiperRef.current = swiper)}
        >
          {SLIDES.map((slide, index) => (
            <React.Fragment key={index}>
              {renderHeroSlide(slide)}
            </React.Fragment>
          ))}
        </Swiper>

        <SliderNavigation
          swiperRef={heroSwiperRef}
          className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 z-20 pointer-events-none"
        />

        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center">
          <button
            onClick={() => navigate("/gallery")}
            className="text-white text-sm tracking-widest hover:underline flex items-center"
          >
            VIEW COLLECTION <ArrowRight className="ml-1 w-4 h-4" />
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
          <button
            onClick={() => navigate("/gallery")}
            className="px-6 py-3 border text-[13px] md:text-xl border-[#74541e] text-[#74541e] rounded hover:bg-[#74541e] hover:text-white transition-colors flex items-center mx-auto"
          >
            Welcome your favourite Painting Home
            <MoveRight className="ml-2 w-4 h-4" />
          </button>
        </div>
        <div className="bg-[#f5f0ea] mt-16 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {PRODUCT_CARDS.map((card, index) => (
              <div
                key={index}
                className="transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
              >
                {renderProductCard({
                  ...card,
                  className: "rounded-lg overflow-hidden shadow-sm bg-white",
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:h-[90vh] w-full">
          <div className="hidden lg:flex w-full lg:w-1/2 h-1/2 lg:h-full relative">
            <img
              className="object-cover w-full h-full"
              src={fineArtImage}
              alt="Art gallery video"
            />
          </div>

          <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative">
            <img
              src={abstractImage}
              alt="Art gallery interior"
              className="object-cover w-full h-full"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-8">
              <div className="text-white text-center max-w-md">
                <h1 className="text-3xl md:text-5xl font-serif mb-4 lg:uppercase tracking-wider">
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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <div className="aspect-[4/3] bg-gray-300" />
                  <div className="p-4">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="flex space-x-2">
                      <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.slice(0, 3).map((product) => (
                  <Cards2
                    key={product.id}
                    id={product.id}
                    imageUrl={product.imageUrl}
                    title={product.title}
                    regularPrice={product.regularPrice}
                    inStock={product.inStock}
                    year={product.year}
                    className="border border-gray-200"
                    size={product.size}
                    medium={product.medium}
                    discountPrice={product.discountPrice}
                  />
                ))}
              </div>
              <div className="text-center mt-10">
                <button
                  onClick={() => navigate("/gallery")}
                  className="px-6 py-3 border border-[#74541e] text-[#74541e] rounded hover:bg-[#74541e] hover:text-white transition-colors flex items-center mx-auto"
                >
                  View All Artworks <MoveRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-center text-[#74541e] mb-12">
            Collector Stories
          </h2>

          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: ".testimonial-pagination",
              renderBullet: (index, className) => {
                return `<span class="${className} !w-2 !h-2 !bg-[#C47E20] !opacity-30 !mx-1"></span>`;
              },
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
              },
              768: {
                slidesPerView: 1.5,
              },
              1024: {
                slidesPerView: 2.5,
              },
            }}
            className="pb-12"
            onSwiper={(swiper) => (testimonialSwiperRef.current = swiper)}
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <SwiperSlide key={index}>
                {({ isActive }) => (
                  <div
                    className={`bg-[#f9f7f3] p-6 rounded-lg shadow-sm transition-all duration-300 ${isActive ? "scale-110" : "scale-90 opacity-80"
                      }`}
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
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <SliderNavigation
            swiperRef={testimonialSwiperRef}
            className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 z-10 pointer-events-none"
          />

          <div className="testimonial-pagination flex justify-center gap-1 mt-4" />
        </div>
      </section>

      {/* Artist Story Section */}
      <section className="py-16 bg-[#f5f0ea]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
                <img
                  src={artist}
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
              <button
                onClick={() => navigate("/about")}
                className="px-6 py-3 bg-[#74541e] text-white rounded hover:bg-[#5a4218] transition-colors flex items-center w-fit"
              >
                See Full Artist Bio <MoveRight className="ml-2 w-4 h-4" />
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
          {
            formState ? (
              <div className="bg-[#74541e] p-4 rounded-lg">
                <p className="text-white font-medium">
                  Thank you for subscribing!
                </p>
                <p className="text-sm text-white mt-1">
                  You'll receive Update on our next Artworks Launch.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              >
                <div className="relative flex-grow">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#74541e]"
                    size={20}
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Your email address"
                    className="w-full pl-10 pr-4 py-3 border border-[#d4c9b5] rounded focus:outline-none focus:ring-2 focus:ring-[#C47E20]"
                  />
                </div>
                <button className="px-6 py-3 bg-[#74541e] text-white rounded hover:bg-[#5a4218] transition-colors whitespace-nowrap flex items-center justify-center">
                  Subscribe <MoveRight className="ml-2 w-4 h-4" />
                </button>
              </form>
            )
          }

          <p className="text-xs text-gray-400 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
