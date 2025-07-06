// components/UI/Navbtn.js
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Navbtn = ({ swiperRef, className = '', iconSize = 24 }) => {
  return (
    <div className={`flex justify-between w-full pointer-events-none ${className}`}>
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="w-12 h-12 rounded-full bg-white/80 text-[#74541e] flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg border border-[#d4c9b5] pointer-events-auto"
        aria-label="Previous slide"
      >
        <ChevronLeft size={iconSize} className="stroke-[1.5]" />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="w-12 h-12 rounded-full bg-white/80 text-[#74541e] flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg border border-[#d4c9b5] pointer-events-auto"
        aria-label="Next slide"
      >
        <ChevronRight size={iconSize} className="stroke-[1.5]" />
      </button>
    </div>
  );
};

export default Navbtn;