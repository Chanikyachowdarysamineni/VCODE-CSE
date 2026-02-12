import React, { useState } from "react";
import { Star, MessageCircle } from "lucide-react";

const AnimatedSpotlightSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const testimonials = [
    {
      name: "Rahul Kumar",
      role: "Smart India Hackathon Winner",
      image: "👨‍💼",
      quote: "VCODE was the best technical fest I've attended. The competitions were challenging and the experience was invaluable!",
      rating: 5,
      highlight: "Hackathon Winner",
      gradient: "from-cyan-500 via-cyan-400 to-purple-500",
    },
    {
      name: "Priya Singh",
      role: "Code Hunt Champion 2025",
      image: "👩‍💼",
      quote: "The problem statements were incredibly creative. I learned debugging techniques that I still use in my projects.",
      rating: 5,
      highlight: "Code Hunt Champ",
      gradient: "from-purple-500 via-purple-400 to-pink-500",
    },
    {
      name: "Arjun Patel",
      role: "Full Stack Developer",
      image: "👨‍💻",
      quote: "Met some amazing people at VCODE. The networking opportunities led to my current job at a tech startup!",
      rating: 5,
      highlight: "Networking Star",
      gradient: "from-pink-500 via-pink-400 to-purple-500",
    },
  ];

  const features = [
    {
      title: "Live Mentoring",
      description: "Get guidance from industry experts during competitions",
      icon: "🎓",
      color: "from-cyan-500 via-cyan-400 to-purple-500",
    },
    {
      title: "Certificates",
      description: "Earn verified certificates for all achievements",
      icon: "🏅",
      color: "from-purple-500 via-purple-400 to-pink-500",
    },
    {
      title: "Networking",
      description: "Connect with 1000+ developers and tech enthusiasts",
      icon: "🤝",
      color: "from-pink-500 via-pink-400 to-purple-500",
    },
    {
      title: "Prizes & Goodies",
      description: "Win exciting prizes, merchandise, and internship offers",
      icon: "🎁",
      color: "from-cyan-500 via-purple-500 to-pink-500",
    },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-blue-950 to-black py-20 px-4 md:px-8">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-600/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-bl from-purple-600/20 to-transparent rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-gradient-to-bl from-pink-600/20 to-transparent rounded-full blur-3xl animate-pulse delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-2xl opacity-50">
                Why Choose VCODE?
              </span>
              <span className="relative bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Why Choose VCODE?
              </span>
            </span>
          </h2>
          <p className="text-gray-400 text-lg mt-4">
            Join thousands who've transformed their tech journey with VCODE
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                animation: `scaleIn 0.6s ease-out forwards`,
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
              }}
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />

              {/* Card - Glassmorphism */}
              <div className="relative h-full bg-white/8 backdrop-blur-2xl p-6 rounded-2xl border border-white/20 group-hover:border-white/40 transition-all duration-500 group-hover:scale-105 shadow-xl">
                {/* Glassmorphic overlay */}
                <div className={`absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-r ${feature.color}`} />

                <div className="relative z-10">
                  <div className={`text-5xl mb-4 inline-block p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white/20 group-hover:border-white/40 transition-all duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent group-hover:text-opacity-100 transition-all`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Student Spotlights
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  animation: `slideUpFade 0.8s ease-out forwards`,
                  animationDelay: `${index * 0.15}s`,
                  opacity: 0,
                }}
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} rounded-3xl blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-500`} />

                {/* Card - Glassmorphism */}
                <div className="relative h-full bg-white/8 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 group-hover:border-white/40 transition-all duration-500 group-hover:scale-105 flex flex-col justify-between shadow-2xl">
                  {/* Glassmorphic overlay */}
                  <div className={`absolute inset-0 rounded-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-r ${testimonial.gradient}`} />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">
                          {testimonial.image}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white">
                            {testimonial.name}
                          </h4>
                          <p className={`text-sm bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent font-semibold`}>
                            {testimonial.highlight}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 fill-current transition-all duration-300 ${
                            hoveredCard === index
                              ? `text-yellow-400`
                              : `text-gray-600`
                          }`}
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-gray-300 leading-relaxed mb-4 italic">
                      "{testimonial.quote}"
                    </p>

                    {/* Role */}
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      {testimonial.role}
                    </p>
                  </div>

                  {/* Decorative element */}
                  <div className="absolute bottom-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <svg viewBox="0 0 40 40" fill="currentColor">
                      <path d="M10,20 Q10,10 20,10 Q30,10 30,20 L30,30 Q30,35 25,35 L15,35 Q10,35 10,30 Z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .delay-2000 { animation-delay: 2s; }
        .delay-4000 { animation-delay: 4s; }
      `}</style>
    </section>
  );
};

export default AnimatedSpotlightSection;
