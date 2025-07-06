import React from "react";
import Artist from "../assets/Images/Face1.jpeg";

const Gallerypage = () => {
  return (
    <div className="w-full min-h-screen bg-[#f5f0ea]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 xl:gap-20">
          {/* Image Column - Responsive sizing */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-square md:aspect-[4/5] max-w-[630px] mx-auto overflow-hidden rounded-lg shadow-lg">
              <img 
                src={Artist} 
                alt="Artist Tahlia" 
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Text Column - Responsive text sizing */}
          <div className="w-full lg:w-1/2 goudy text-center lg:text-left max-w-[500px] mx-auto lg:mx-0">
            <h1 className="text-[#C47E20] text-3xl sm:text-4xl md:text-5xl Cormorant mb-4 md:mb-6">
              The Original Moving Sale
            </h1>
            
            <div className="text-[#beac98] space-y-4 md:space-y-6">
              <h3 className="text-lg md:text-xl">
                Pack up the oils, wrap up the brushes and onto the next adventure…
              </h3>
              
              <div className="space-y-4">
                <p className="leading-relaxed md:leading-8 text-base md:text-lg">
                  After two years in our warehouse studio, my creative practice is
                  moving to Melbourne! <b>For the first time,</b> collector
                  favourites and newly released works are available at a very
                  special price.
                </p>
                
                <p className="text-[#C47E20] italic text-lg md:text-xl">
                  xoxo - Tahlia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Gallery Sections can be added here */}
    </div>
  );
};

export default Gallerypage;