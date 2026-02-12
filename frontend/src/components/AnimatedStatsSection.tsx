import React, { useEffect, useState } from "react";

const AnimatedStatsSection = () => {
  const [counts, setCounts] = useState({
    participants: 0,
    events: 0,
    prizes: 0,
    experience: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const targets = {
      participants: 1000,
      events: 8,
      prizes: 50,
      experience: 24,
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min(currentStep / steps, 1);

      setCounts({
        participants: Math.floor(targets.participants * progress),
        events: Math.floor(targets.events * progress),
        prizes: Math.floor(targets.prizes * progress),
        experience: Math.floor(targets.experience * progress),
      });

      if (progress === 1) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isVisible]);

  const stats = [
    {
      value: counts.participants,
      suffix: "+",
      label: "Total Participants",
      icon: "👥",
      gradient: "from-cyan-500 via-cyan-400 to-purple-500",
      glow: "cyan",
    },
    {
      value: counts.events,
      suffix: "",
      label: "Exciting Events",
      icon: "🎯",
      gradient: "from-purple-500 via-purple-400 to-pink-500",
      glow: "purple",
    },
    {
      value: counts.prizes,
      suffix: "K",
      label: "Prize Pool (₹)",
      icon: "🏆",
      gradient: "from-pink-500 via-pink-400 to-purple-500",
      glow: "pink",
    },
    {
      value: counts.experience,
      suffix: "h",
      label: "Hackathon Duration",
      icon: "⚡",
      gradient: "from-cyan-500 via-purple-500 to-pink-500",
      glow: "cyan",
    },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-purple-950 to-black py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-8">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-bl from-cyan-600/20 to-transparent rounded-full blur-3xl animate-pulse delay-2000" />
        
        {/* Grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(124, 58, 237, .05) 25%, rgba(124, 58, 237, .05) 26%, transparent 27%, transparent 74%, rgba(124, 58, 237, .05) 75%, rgba(124, 58, 237, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(124, 58, 237, .05) 25%, rgba(124, 58, 237, .05) 26%, transparent 27%, transparent 74%, rgba(124, 58, 237, .05) 75%, rgba(124, 58, 237, .05) 76%, transparent 77%, transparent)`,
            backgroundSize: '50px 50px',
          }} />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black mb-4 sm:mb-6">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-2xl opacity-50">
                By The Numbers
              </span>
              <span className="relative bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                By The Numbers
              </span>
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg mt-3 sm:mt-4 md:mt-4">
            Join thousands of developers for an unforgettable technical experience
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative h-auto sm:h-auto md:h-80"
              style={{
                animation: `slideInUp 0.8s ease-out forwards`,
                animationDelay: `${index * 0.15}s`,
                opacity: 0,
              }}
            >
              {/* Animated background glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl sm:rounded-3xl blur-2xl opacity-0 group-hover:opacity-70 transition-all duration-500`} />

              {/* Main card - Glassmorphism */}
              <div className={`relative min-h-64 sm:min-h-72 md:h-80 bg-white/8 backdrop-blur-2xl p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-white/20 group-hover:border-white/40 transition-all duration-500 flex flex-col items-center justify-center group-hover:scale-105 md:group-hover:scale-110 shadow-2xl`}>
                {/* Glassmorphic overlay */}
                <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-br ${stat.gradient}`} />

                <div className="relative z-10 text-center w-full">
                  {/* Icon */}
                  <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 md:mb-6 animate-bounce" style={{
                    animationDelay: `${index * 0.1}s`,
                  }}>
                    {stat.icon}
                  </div>

                  {/* Counter */}
                  <div className="mb-2 sm:mb-3 md:mb-4">
                    <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent transition-all duration-300`}>
                      {stat.value}
                      <span className="text-lg sm:text-xl md:text-3xl">{stat.suffix}</span>
                    </div>
                  </div>

                  {/* Label */}
                  <p className="text-gray-400 text-xs sm:text-sm md:text-base font-semibold group-hover:text-gray-300 transition-colors duration-300">
                    {stat.label}
                  </p>

                  {/* Animated divider */}
                  <div className="mt-6 h-1 w-0 mx-auto bg-gradient-to-r from-transparent via-current to-transparent group-hover:w-full transition-all duration-500 opacity-50" />
                </div>

                {/* Floating particles */}
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-100`}
                    style={{
                      background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `float 4s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>


      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-30px) translateX(30px);
            opacity: 0;
          }
        }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </section>
  );
};

export default AnimatedStatsSection;
