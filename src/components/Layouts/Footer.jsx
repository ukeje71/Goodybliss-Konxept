import React from "react";
import { Facebook, Instagram, Phone, Twitter } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-[#2a2118] text-white py-12 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-serif mb-4">Goodybliss Art</h3>
              <p className="text-[#beac98]">
                Original paintings and limited edition prints for collectors who
                appreciate bold, expressive artwork.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Shop</h4>
              <ul className="space-y-2 text-[#beac98]">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    All Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Original Paintings
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Limited Edition Prints
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Current Sale
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Information</h4>
              <ul className="space-y-2 text-[#beac98]">
                <li>
                  <Link to={"/about"} href="#" className="hover:text-white transition-colors">
                    About the Artist
                  </Link >
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Framing Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <a
                  target="_blank"
                  href="https://www.facebook.com/p/Goodybliss-Konxept-100064522069196/"
                  className="text-[#beac98] hover:text-white"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  target="_blank"
                  href="https://www.instagram.com/goodybliss_konxept/"
                  className="text-[#beac98] hover:text-white"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  target="_blank"
                  href="https://twitter.com/goodybliss_konxept"
                  className="text-[#beac98] hover:text-white"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://wa.me/2348138562085"
                  className="text-[#beac98] hover:text-white"
                >
                  <Phone className="w-6 h-6" />
                </a>
              </div>
              <p className="text-[#beac98]">
                Studio visits by appointment only
              </p>
              <p className="text-[#beac98] mt-1">No.16 Jubilee,Aba ,Abia state</p>
            </div>
          </div>
          <div className="border-t border-[#3e3327] mt-8 pt-8 text-center text-[#beac98] text-sm">
            <p>
              © {new Date().getFullYear()} Goodybliss Art. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
