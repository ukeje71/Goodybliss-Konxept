import { Link } from "react-router";
import { ArrowLeft, Home, Image, Mail } from "lucide-react";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F5F0] text-[#846C3B]">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold text-[#C47E20] mb-4">
              404
            </h1>
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              Oops! Art Not Found
            </h2>
            <p className="text-lg text-[#846C3B]/90 mb-8">
              The page you're looking for seems to have vanished like ephemeral
              art in the wind. Let's get you back to beautiful creations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <Link
              to="/"
              className="bg-white/80 border border-[#846C3B]/20 rounded-lg p-6 hover:bg-white transition-all hover:shadow-md flex flex-col items-center"
            >
              <Home className="w-8 h-8 text-[#C47E20] mb-3" />
              <span className="font-medium">Return Home</span>
            </Link>

            <Link
              to="/collections"
              className="bg-white/80 border border-[#846C3B]/20 rounded-lg p-6 hover:bg-white transition-all hover:shadow-md flex flex-col items-center"
            >
              <Image className="w-8 h-8 text-[#C47E20] mb-3" />
              <span className="font-medium">Browse Gallery</span>
            </Link>

            <Link
              to="/contact"
              className="bg-white/80 border border-[#846C3B]/20 rounded-lg p-6 hover:bg-white transition-all hover:shadow-md flex flex-col items-center"
            >
              <Mail className="w-8 h-8 text-[#C47E20] mb-3" />
              <span className="font-medium">Get Help</span>
            </Link>
          </div>

          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-[#C47E20] text-white rounded-md hover:bg-[#a56d1a] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Safety
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#846C3B]/10 py-6 text-center text-[#846C3B]/80">
        <div className="container mx-auto px-4">
          <p>
            © {new Date().getFullYear()} Goodybliss Konxept. All artworks
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Error;
