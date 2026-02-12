import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full h-auto px-4 md:px-8 py-4 md:py-5 bg-gradient-to-b from-black/50 via-black/30 to-transparent text-white flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl border-b border-white/10">
      {/* Logo */}
      <div className="w-auto">
        <Link to={"/"} className="flex items-center justify-center gap-1">
          <div className="flex gap-1">
            {['V', 'C', 'O', 'D', 'E'].map((letter, index) => (
              <div
                key={letter}
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border-2 rounded-lg transition-all duration-300"
                style={{
                  borderColor: index % 2 === 0 ? '#00d4ff' : '#a855f7',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  boxShadow: index % 2 === 0 
                    ? '0 0 10px rgba(0, 212, 255, 0.5), inset 0 0 10px rgba(0, 212, 255, 0.1)'
                    : '0 0 10px rgba(168, 85, 247, 0.5), inset 0 0 10px rgba(168, 85, 247, 0.1)',
                }}
              >
                <span
                  className="font-bold text-lg md:text-xl"
                  style={{
                    color: index % 2 === 0 ? '#00d4ff' : '#a855f7',
                  }}
                >
                  {letter}
                </span>
              </div>
            ))}
          </div>
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-2 text-white text-base font-semibold">
        <Link 
          to="/" 
          className="px-4 py-2 rounded-lg transition duration-300 bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 border border-white/10 hover:border-white/30"
        >
          Home
        </Link>
        <Link 
          to="/events" 
          className="px-4 py-2 rounded-lg transition duration-300 bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 border border-white/10 hover:border-white/30"
        >
          Events
        </Link>
        <Link 
          to="/team" 
          className="px-4 py-2 rounded-lg transition duration-300 bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 border border-white/10 hover:border-white/30"
        >
          Teams
        </Link>
        <Link 
          to="/hackathon" 
          className="px-4 py-2 rounded-lg transition duration-300 bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 border border-white/10 hover:border-white/30"
        >
          Hackathon
        </Link>
        <Link 
          to="/contact" 
          className="px-4 py-2 rounded-lg transition duration-300 bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 border border-white/10 hover:border-white/30"
        >
          Contact Us
        </Link>
        <Link 
          to="/gallery" 
          className="px-4 py-2 rounded-lg transition duration-300 bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 border border-white/10 hover:border-white/30"
        >
          Gallery
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-4">
        <Link 
          to="/events"
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition duration-300 text-sm"
        >
          Register
        </Link>
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white hover:text-cyan-400 transition duration-300"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/80 backdrop-blur-xl text-white p-4 flex flex-col gap-3 md:hidden border-b border-white/10">
          <Link 
            to="/" 
            className="text-white px-4 py-2 rounded-lg transition duration-300 bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 border border-white/10 hover:border-white/30" 
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/events" 
            className="text-white px-4 py-2 rounded-lg transition duration-300 bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 border border-white/10 hover:border-white/30" 
            onClick={() => setMenuOpen(false)}
          >
            Events
          </Link>
          <Link 
            to="/team" 
            className="text-white px-4 py-2 rounded-lg transition duration-300 bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 border border-white/10 hover:border-white/30" 
            onClick={() => setMenuOpen(false)}
          >
            Teams
          </Link>
          <Link 
            to="/hackathon" 
            className="text-white px-4 py-2 rounded-lg transition duration-300 bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 border border-white/10 hover:border-white/30" 
            onClick={() => setMenuOpen(false)}
          >
            Hackathon
          </Link>
          <Link 
            to="/contact" 
            className="text-white px-4 py-2 rounded-lg transition duration-300 bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 border border-white/10 hover:border-white/30" 
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>
          <Link 
            to="/gallery" 
            className="text-white px-4 py-2 rounded-lg transition duration-300 bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 border border-white/10 hover:border-white/30" 
            onClick={() => setMenuOpen(false)}
          >
            Gallery
          </Link>
        </div>
      )}

      {/* Call-to-Action Buttons - Desktop */}
      <div className="hidden md:flex items-center gap-4">
        <Link 
          to="/events"
          className="px-8 py-2.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-purple-500/50 transition duration-300 text-sm uppercase tracking-wider"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Header;
