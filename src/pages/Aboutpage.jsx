import React from 'react';
import { Palette, Brush, Award, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router';

// Assets
import childhoodImage from "../assets/Images/Face1.jpeg";
import studioImage from "../assets/Images/Face1.jpeg";
import artworkProcess from "../assets/Images/Face1.jpeg";
// import exhibitionImage from '../assets/about/exhibition.jpg';

const AboutPage = () => {
  const milestones = [
    {
      year: "Age 7",
      title: "First Brushstrokes",
      description: "Received my first watercolor set from grandmother and painted daily in her garden",
      icon: <Palette className="text-[#C47E20] w-8 h-8" />
    },
    {
      year: "Age 12",
      title: "First Exhibition",
      description: "Featured in local children's art show with my 'Rainbow Garden' series",
      icon: <Award className="text-[#C47E20] w-8 h-8" />
    },
    {
      year: "2010",
      title: "Art School",
      description: "Graduated from Melbourne Art Institute with honors in Fine Arts",
      icon: <Brush className="text-[#C47E20] w-8 h-8" />
    },
    {
      year: "Present",
      title: "Full-time Artist",
      description: "Creating in my sunlit studio, sharing my passion through workshops",
      icon: <Heart className="text-[#C47E20] w-8 h-8" />
    }
  ];

  return (
    <div className="bg-[#f9f7f3]">
      {/* Hero Section */}
      <section className="relative h-screen max-h-[800px]">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={studioImage} 
          alt="Goodybliss in her studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
          <Sparkles className="text-[#C47E20] w-12 h-12 mb-6" strokeWidth={1.5} />
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
            A Lifelong Love Affair With Color
          </h1>
          <p className="text-xl text-white max-w-2xl">
            From childhood doodles to gallery walls, painting has always been my truest language
          </p>
        </div>
      </section>

      {/* Early Beginnings */}
      <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <img 
              src={childhoodImage}
              alt="Young Goodybliss painting"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-serif text-[#74541e] mb-6">
              The Seed Was Planted at Seven
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                I still remember the smell of my first paint set - that distinctive aroma of 
                watercolors that promised endless possibilities. My grandmother would set up 
                a little easel in her rose garden, and I'd spend hours trying to capture the 
                way sunlight danced through the petals.
              </p>
              <p>
                What began as a summer pastime quickly became an obsession. By age nine, 
                I was painting every day after school. My bedroom walls became my first 
                gallery, covered in increasingly ambitious attempts to recreate the beauty 
                I saw in the world.
              </p>
              <p>
                That childhood passion never faded - it only grew deeper and more complex, 
                like the layers of oil paint I now work with.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-[#74541e] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-center mb-16">
            Artistic Journey Timeline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    {milestone.icon}
                  </div>
                  <h3 className="text-xl font-medium">{milestone.year}</h3>
                </div>
                <h4 className="text-lg font-serif mb-2">{milestone.title}</h4>
                <p className="text-white/80">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Process */}
      <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="w-full lg:w-1/2">
            <img 
              src={artworkProcess}
              alt="Goodybliss creating artwork"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-serif text-[#74541e] mb-6">
              My Creative Philosophy
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Every painting begins with a feeling - sometimes it's the melancholy 
                of a rainy afternoon, other times the exuberance of a sun-drenched 
                meadow. I don't just want to depict scenes; I want to bottle emotions.
              </p>
              <p>
                My process is intuitive and physical. I work standing up, often dancing 
                to music as I paint. The brush becomes an extension of my body, the 
                pigments my vocabulary. Layer upon layer, the painting reveals itself 
                to me.
              </p>
              <p>
                What excites me most is that moment when the painting takes on a life 
                of its own and starts telling me where it wants to go next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#f5f0ea]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif text-[#74541e] mb-6">
            Experience the Journey Through My Work
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Each piece in my collection carries fragments of this lifelong artistic 
            journey. Explore how my style has evolved while staying true to that 
            seven-year-old's sense of wonder.
          </p>
          <Link 
            to="/gallery" 
            className="inline-block px-8 py-3 bg-[#74541e] text-white rounded hover:bg-[#5a4218] transition-colors"
          >
            View Gallery Collection
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;