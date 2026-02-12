import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Code2, Trophy, Lightbulb, Radio } from "lucide-react";

const AnimatedEventsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const events = [
    {
      id: 1,
      name: "Code Hunt",
      icon: Code2,
      description: "Debug and fix code challenges to solve mysteries",
      gradient: "from-cyan-500/20 via-cyan-600/20 to-purple-600/20",
      borderGradient: "from-cyan-400 via-cyan-300 to-purple-400",
      color: "text-cyan-400",
      dotColor: "bg-cyan-500",
    },
    {
      id: 2,
      name: "Hackathon",
      icon: Lightbulb,
      description: "Build innovative solutions in 24 hours with your team",
      gradient: "from-purple-500/20 via-purple-600/20 to-pink-600/20",
      borderGradient: "from-purple-400 via-purple-300 to-pink-400",
      color: "text-purple-400",
      dotColor: "bg-purple-500",
    },
    {
      id: 3,
      name: "Tech Quiz",
      icon: Radio,
      description: "Test your knowledge about cutting-edge technologies",
      gradient: "from-pink-500/20 via-pink-600/20 to-purple-600/20",
      borderGradient: "from-pink-400 via-pink-300 to-purple-400",
      color: "text-pink-400",
      dotColor: "bg-pink-500",
    },
    {
      id: 4,
      name: "Treasure Hunt",
      icon: Trophy,
      description: "Solve cryptic clues and win amazing prizes",
      gradient: "from-cyan-500/20 via-purple-500/20 to-pink-600/20",
      borderGradient: "from-cyan-400 via-purple-400 to-pink-400",
      color: "text-cyan-400",
      dotColor: "bg-purple-500",
    },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-bl from-pink-500/20 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black mb-3 sm:mb-4 md:mb-4 relative inline-block w-full">
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-2xl opacity-50">
              Featured Events
            </span>
            <span className="relative bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Featured Events
            </span>
          </h2>
          <p className="text-gray-400 mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg">
            Participate in cutting-edge tech competitions and showcase your skills
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-12">
          {events.map((event, index) => {
            const Icon = event.icon;
            return (
              <div
                key={event.id}
                className="group relative"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  animation: `slideUp 0.8s ease-out forwards`,
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                }}
              >
                {/* Animated background glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 rounded-3xl blur-2xl transition-all duration-500 ${event.gradient}`}
                />

                {/* Glassmorphism Card */}
                <div className={`relative h-full bg-white/10 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-white/20 group-hover:border-white/40 transition-all duration-500 cursor-pointer group-hover:scale-105 shadow-xl`}>
                  {/* Gradient overlay for depth */}
                  <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 bg-gradient-to-br ${event.gradient}`} style={{ zIndex: -1 }} />

                  <div className="relative z-10">
                    {/* Icon with glow */}
                    <div className="mb-3 sm:mb-4 md:mb-6 inline-block p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                      <Icon className={`w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 ${event.color} transition-all duration-300 group-hover:scale-125 drop-shadow-lg`} />
                    </div>

                    {/* Content */}
                    <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 transition-all duration-300 bg-gradient-to-r ${event.borderGradient} bg-clip-text text-transparent`}>
                      {event.name}
                    </h3>
                    <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm md:text-base">
                      {event.description}
                    </p>

                    {/* Register button */}
                    <button className={`w-full py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 overflow-hidden relative group/btn bg-gradient-to-r ${event.borderGradient} text-white hover:shadow-lg hover:shadow-current/50`}>
                      <span className={`relative transition-colors duration-300`}>
                        Register →
                      </span>
                    </button>
                  </div>

                  {/* Floating dots */}
                  <div className="absolute top-0 right-0 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                    backgroundImage: `radial-gradient(circle, currentColor 0%, transparent 70%)`,
                    filter: `drop-shadow(0 0 10px var(--dot-color))`,
                  }}>
                    <div className={`w-full h-full rounded-full ${event.dotColor} animate-pulse`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-gray-300 mb-6 text-lg">
            Ready to showcase your talent?
          </p>
          <Link 
            to="/events"
            className="group relative inline-block px-10 py-4 font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative text-white flex items-center justify-center gap-2">
              View All Events
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .delay-4000 { animation-delay: 4s; }
      `}</style>
    </section>
  );
};

export default AnimatedEventsSection;
