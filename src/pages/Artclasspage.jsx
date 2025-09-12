import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
  Heart,
  Share2,
  Search,
  Menu,
  X,
  Instagram,
  Facebook,
  Twitter,
  Youtube
} from 'lucide-react';
import { useNavigate } from "react-router";

const ArtGalleryPage = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);

  // Sample artwork data
  const artworks = [
    {
      id: 1,
      title: "Golden Harmony",
      artist: "Alex Johnson",
      price: "₦45,000",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "African Sunset",
      artist: "Chioma Nwosu",
      price: "₦62,500",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Cultural Fusion",
      artist: "Tunde Owolabi",
      price: "₦78,000",
      image: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "Abstract Dreams",
      artist: "Zara Mohammed",
      price: "₦53,000",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const featuredArtists = [
    {
      id: 1,
      name: "Adeola Williams",
      specialty: "Mixed Media",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Chike Obi",
      specialty: "Sculpture",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "Ngozi Okonjo",
      specialty: "Digital Art",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === artworks.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? artworks.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);
// Routing
const navigate= useNavigate
  return (
    <div className="min-h-screen bg-[#f5f0ea] text-[#5a4218]">
      
      {/* Hero Section with Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://player.vimeo.com/external/370331493.sd.mp4?s=ada720d5e6c8d6adf4be5d3bd2e1c8fce4feeb44&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Where Art Meets <span className="text-[#C47E20]">Soul</span></h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover extraordinary African art that tells stories, evokes emotions, and transforms spaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#74541e] hover:bg-[#5a4218] text-white px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-colors">
              Explore Collection <ArrowRight size={20} />
            </button>
            <button  onClick={()=>navigate("/gallery")} className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm px-8 py-4 rounded-full font-medium transition-colors">
              View Exhibitions
            </button>
          </div>
        </div>
        
        {/* Video Controls */}
        <div className="absolute bottom-6 right-6 z-10 flex gap-3">
          <button 
            onClick={togglePlay}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full text-white transition-colors"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button 
            onClick={toggleMute}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full text-white transition-colors"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#74541e] mb-4">Featured Artworks</h2>
            <p className="text-[#846C3B] max-w-2xl mx-auto">Discover our curated selection of exceptional pieces from talented African artists</p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg border border-[#e8e2d6]">
              <div className="relative h-96 md:h-[500px]">
                <img 
                  src={artworks[currentSlide].image} 
                  alt={artworks[currentSlide].title}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <h3 className="text-2xl font-bold">{artworks[currentSlide].title}</h3>
                  <p className="text-[#e8e2d6]">by {artworks[currentSlide].artist}</p>
                  <p className="text-xl font-semibold mt-2">{artworks[currentSlide].price}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <div>
                <p className="text-[#846C3B]">{currentSlide + 1} of {artworks.length}</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={prevSlide}
                  className="bg-[#74541e] hover:bg-[#5a4218] text-white p-3 rounded-full transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="bg-[#74541e] hover:bg-[#5a4218] text-white p-3 rounded-full transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#74541e] mb-4">Featured Artists</h2>
            <p className="text-[#846C3B] max-w-2xl mx-auto">Meet the talented creators behind our extraordinary collection</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredArtists.map(artist => (
              <div key={artist.id} className="bg-[#f9f7f3] rounded-2xl overflow-hidden shadow-md border border-[#e8e2d6]">
                <div className="h-64 overflow-hidden">
                  <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#74541e]">{artist.name}</h3>
                  <p className="text-[#846C3B]">{artist.specialty}</p>
                  <button className="mt-4 text-[#C47E20] hover:text-[#74541e] font-medium flex items-center gap-2 transition-colors">
                    View Portfolio <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-[#74541e] text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Transform Your Space With Art</h2>
          <p className="text-xl mb-8 opacity-90">Join our community of art lovers and discover pieces that speak to you</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#C47E20] hover:bg-[#a8691a] text-white px-8 py-4 rounded-full font-medium transition-colors">
              Browse Collection
            </button>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-8 py-4 rounded-full font-medium transition-colors">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtGalleryPage;