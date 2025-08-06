import React from "react";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

const ArtClassPage = () => {
  // Sample class data
  const upcomingClasses = [
    {
      id: 1,
      title: "Abstract Expressionism",
      date: "2023-11-15",
      time: "10:00 AM - 12:30 PM",
      location: "Konxept Studio, Lagos",
      price: 15000,
      description:
        "Explore the world of abstract art and learn to express emotions through bold strokes and colors.",
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 2,
      title: "Portrait Drawing Fundamentals",
      date: "2023-11-22",
      time: "2:00 PM - 4:30 PM",
      location: "Konxept Studio, Lagos",
      price: 12000,
      description:
        "Master the basics of portrait drawing including proportions, shading, and facial features.",
      image:
        "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 3,
      title: "Mixed Media Workshop",
      date: "2023-11-29",
      time: "10:00 AM - 3:00 PM",
      location: "Konxept Studio, Lagos",
      price: 20000,
      description:
        "Combine various materials and techniques to create unique mixed media artworks.",
      image:
        "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-[#f8f5f0] py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#74541e] mb-4">
            GoodyBliss-Konxept Art Classes
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Discover your creative potential with professional art instruction
            from renowned artist GoodyBliss-Konxept
          </p>
          <button className="mt-8 bg-[#74541e] text-white hover:bg-[#5a4218] px-8 py-3 rounded-full text-lg font-medium transition duration-300">
            View All Classes
          </button>
        </div>
      </div>

      {/* Featured Classes */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-[#74541e] mb-12 text-center">
          Upcoming Classes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingClasses.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={classItem.image}
                  alt={classItem.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {classItem.title}
                </h3>
                <p className="text-gray-600 mb-4">{classItem.description}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="mr-2 h-5 w-5" />
                    <span>
                      {new Date(classItem.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="mr-2 h-5 w-5" />
                    <span>{classItem.time}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="mr-2 h-5 w-5" />
                    <span>{classItem.location}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-[#74541e]">
                    ₦{classItem.price.toLocaleString()}
                  </span>
                  <button className="bg-[#74541e] text-white hover:bg-[#5a4218] px-6 py-2 rounded-full flex items-center transition duration-300">
                    Book Now <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About the Artist */}
      <div className="bg-[#f8f5f0] py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <div className="h-64 w-64 mx-auto rounded-full overflow-hidden border-4 border-[#74541e]">
                <img
                  src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="GoodyBliss-Konxept"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3 md:pl-12">
              <h2 className="text-3xl font-bold text-[#74541e] mb-4">
                About GoodyBliss-Konxept
              </h2>
              <p className="text-gray-700 mb-4">
                GoodyBliss-Konxept is a contemporary artist known for vibrant,
                thought-provoking works that blend traditional African motifs
                with modern abstract techniques. With over 15 years of
                professional experience, GoodyBliss has exhibited
                internationally and is passionate about nurturing new artistic
                talent.
              </p>
              <p className="text-gray-700 mb-6">
                "My teaching philosophy centers on helping each student discover
                their unique artistic voice while building strong technical
                foundations. Art is not just about skill—it's about vision,
                expression, and connection."
              </p>
              <button className="bg-[#74541e] text-white hover:bg-[#5a4218] px-8 py-3 rounded-full font-medium transition duration-300">
                View Artist Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-[#74541e] mb-12 text-center">
          What Students Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-yellow-400 mb-4">★★★★★</div>
            <p className="text-gray-700 italic mb-4">
              "GoodyBliss has an incredible ability to break down complex
              concepts into understandable steps. My portrait skills improved
              dramatically after just one class!"
            </p>
            <p className="font-medium text-[#74541e]">— Amina O.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-yellow-400 mb-4">★★★★★</div>
            <p className="text-gray-700 italic mb-4">
              "The studio atmosphere is so welcoming and creative. I've taken
              multiple classes and each one has expanded my artistic horizons in
              new ways."
            </p>
            <p className="font-medium text-[#74541e]">— Tunde M.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-yellow-400 mb-4">★★★★☆</div>
            <p className="text-gray-700 italic mb-4">
              "As a beginner, I was nervous, but GoodyBliss made me feel
              comfortable and gave me the confidence to explore my creativity.
              Highly recommend!"
            </p>
            <p className="font-medium text-[#74541e]">— Chioma K.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#74541e] py-16">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Begin Your Artistic Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of artists and unlock your creative potential
            with GoodyBliss-Konxept's expert guidance.
          </p>
          <div className="space-x-4">
            <button className="bg-white text-[#74541e] hover:bg-gray-100 px-8 py-3 rounded-full font-medium transition duration-300">
              Browse All Classes
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-[#74541e] px-8 py-3 rounded-full font-medium transition duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtClassPage;
