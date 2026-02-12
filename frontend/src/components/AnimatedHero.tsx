import React, { useEffect, useState } from "react";
import { Sparkles, Code, Zap, Users } from "lucide-react";
import { Link } from "react-router-dom";

const AnimatedHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const characters = "VCODE".split("");

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-cyan-900/40" />
        
        {/* Animated orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-bl from-pink-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse delay-4000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Mouse trailing effect */}
      <div
        className="fixed pointer-events-none w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur-sm"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          boxShadow: "0 0 20px rgba(34, 211, 238, 0.8)",
          transition: "all 0.1s ease-out",
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-3 sm:px-4 md:px-8 py-8 pt-12 sm:pt-16 md:pt-20">
        {/* Animated tagline */}
        <div className="mb-4 sm:mb-6 md:mb-8 text-center">
          <p className="text-xs sm:text-sm md:text-base font-mono font-bold tracking-widest mb-2 sm:mb-3 md:mb-4">
            <span className="inline-block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              CSE DEPARTMENT TECHNICAL FEST
            </span>
          </p>
        </div>

        {/* Main title with animated characters */}
        <div className="mb-4 sm:mb-6 md:mb-8 flex justify-center items-center gap-1 sm:gap-2 md:gap-4">
          {characters.map((char, index) => (
            <div
              key={index}
              className="relative"
              style={{
                animation: `float 3s ease-in-out infinite`,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-lg blur-lg opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-br from-slate-900 to-black px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-6 rounded-lg border-2 border-transparent bg-clip-padding"
                style={{
                  borderImage: `linear-gradient(135deg, #06b6d4, #a855f7, #ec4899) 1`,
                }}>
                <span className="text-3xl sm:text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                  {char}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Animated subtitle */}
        <div className="max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-12 text-center px-2 sm:px-4">
          <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-300 font-light mb-2 sm:mb-3 md:mb-4">
            Where <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-bold">Innovation</span> Meets <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">Excellence</span>
          </p>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed">
            Participate in electrifying competitions, unlearn, relearn, and innovate with the brightest minds in technology
          </p>
        </div>



        {/* Feature badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full max-w-5xl px-2 sm:px-4 md:px-0">
          {[
            { icon: Code, label: "5+ Competitions", color: "from-cyan-500 via-cyan-400 to-purple-500", action: "/events" },
            { icon: Users, label: "1000+ Participants", color: "from-purple-500 via-purple-400 to-pink-500", action: "/participants" },
            { icon: Sparkles, label: "₹50K Prize Pool", color: "from-pink-500 via-pink-400 to-purple-500" },
            { icon: Zap, label: "Networking Opp.", color: "from-cyan-500 via-purple-500 to-pink-500" },
          ].map((feat, i) => (
            <div
              key={i}
              className="relative group cursor-pointer h-full"
              style={{
                animation: `slideUp 0.8s ease-out forwards`,
                animationDelay: `${i * 0.1}s`,
                opacity: 0,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-lg blur-xl transition-all duration-300" style={{
                backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
              }} />
              <div className={`relative bg-gradient-to-br from-gray-900 to-black p-4 sm:p-5 md:p-6 rounded-lg border border-gray-700 group-hover:border-transparent transition-all duration-300 text-center h-full flex flex-col items-center justify-center`}>
                <feat.icon className={`w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 mx-auto mb-2 sm:mb-3 bg-gradient-to-r ${feat.color} bg-clip-text text-transparent`} />
                <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-300 group-hover:text-white transition-colors mb-3 sm:mb-4 leading-tight px-1">
                  {feat.label}
                </p>
                {feat.action && (
                  <Link
                    to={feat.action}
                    className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs sm:text-sm font-bold rounded-md hover:shadow-lg hover:shadow-purple-500/50 transition duration-300 whitespace-nowrap"
                  >
                    View
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .delay-2000 { animation-delay: 2s; }
        .delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default AnimatedHero;
