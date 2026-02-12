import React from 'react';
import {  Calendar, MapPin, Code2, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="text-gray-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-8 sm:py-10 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {/* Event Info */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-cyan-400" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">VCode</h2>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed">Join us for the most exciting technical event of the year. Showcase your skills, learn from experts, and connect with fellow developers.</p>
            <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm md:text-base">
              <Calendar className="w-4 sm:w-5 md:w-5 h-4 sm:h-5 md:h-5 text-cyan-400" />
              <span>April 16, 2025</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm md:text-base">
              <MapPin className="w-4 sm:w-5 md:w-5 h-4 sm:h-5 md:h-5 text-cyan-400" />
              <span>Near H-block</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to={'/events' }className="text-xs sm:text-sm md:text-base hover:text-cyan-400 transition-colors">Register Now</Link>
              </li>
              <li>
              <Link to={'/events' }className="text-xs sm:text-sm md:text-base hover:text-cyan-400 transition-colors">Event Schedule</Link>
              </li>
              <li>
              <Link to={'/events' }className="text-xs sm:text-sm md:text-base hover:text-cyan-400 transition-colors">Speakers</Link>
              </li>
              <li>
              <Link to={'/events' }className="text-xs sm:text-sm md:text-base hover:text-cyan-400 transition-colors">Workshops</Link>
              </li>
              <li>
              <Link to={'/events' }className="text-xs sm:text-sm md:text-base hover:text-cyan-400 transition-colors">Sponsors</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white">Connect With Us</h3>
            <div className="flex gap-3 sm:gap-4">
              <a href="https://www.instagram.com/vcode.cse/" className="hover:text-cyan-400 transition-colors">
                <Instagram className="w-5 sm:w-6 md:w-6 h-5 sm:h-6 md:h-6" />
              </a>
             
            </div>
            <div className="pt-2 sm:pt-4">
              <Link to={"/contact"} className="inline-block px-4 sm:px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-xs sm:text-sm md:text-base rounded-lg transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 md:pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-400">
              © 2025 VCode. All rights reserved.
            </p>
            <div className="flex gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-400">
              <a href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
              <a href="/code-of-conduct" className="hover:text-cyan-400 transition-colors">Code of Conduct</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;