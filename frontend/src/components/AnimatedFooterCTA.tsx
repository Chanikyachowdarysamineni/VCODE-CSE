import React, { useEffect, useState } from "react";
import { Mail, Smartphone, MapPin, Share2, Github, Linkedin, Twitter } from "lucide-react";

const AnimatedFooterCTA = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const container = document.getElementById("cta-section");
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const socialLinks = [
    { icon: Github, label: "GitHub", color: "hover:text-gray-300", link: "#" },
    { icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-400", link: "#" },
    { icon: Twitter, label: "Twitter", color: "hover:text-cyan-400", link: "#" },
    { icon: Mail, label: "Email", color: "hover:text-purple-400", link: "#" },
  ];

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "vcode@vignan.ac.in",
      gradient: "from-cyan-500 via-cyan-400 to-purple-500",
    },
    {
      icon: Smartphone,
      label: "Phone",
      value: "+91 888 222 333",
      gradient: "from-purple-500 via-purple-400 to-pink-500",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Vignan University, Vizag",
      gradient: "from-cyan-500 via-purple-500 to-pink-500",
    },
  ];

  return (
    <>
      {/* CTA Section */}
      <section
        id="cta-section"
        className="relative min-h-screen w-full overflow-hidden bg-black py-20 px-4 md:px-8"
      >
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient mesh background */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-cyan-600/30 to-transparent rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/3 right-10 w-96 h-96 bg-gradient-to-bl from-purple-600/30 to-transparent rounded-full blur-3xl animate-pulse delay-2000" />
            <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-gradient-to-tr from-pink-600/30 to-transparent rounded-full blur-3xl animate-pulse delay-4000" />
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(90deg, transparent 24%, rgba(124, 58, 237, .05) 25%, rgba(124, 58, 237, .05) 26%, transparent 27%, transparent 74%, rgba(124, 58, 237, .05) 75%, rgba(124, 58, 237, .05) 76%, transparent 77%, transparent), linear-gradient(0deg, transparent 24%, rgba(124, 58, 237, .05) 25%, rgba(124, 58, 237, .05) 26%, transparent 27%, transparent 74%, rgba(124, 58, 237, .05) 75%, rgba(124, 58, 237, .05) 76%, transparent 77%, transparent)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Main CTA */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-2xl opacity-50">
                  Your Journey Starts Here
                </span>
                <span className="relative bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Your Journey Starts Here
                </span>
              </span>
            </h2>
            <p className="text-gray-400 text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
              Be part of the largest CSE department technical festival. Push your boundaries, discover your potential, and connect with the brightest minds in technology.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div
                  key={index}
                  className="group relative"
                  style={{
                    animation: `slideUpFade 0.8s ease-out forwards`,
                    animationDelay: `${index * 0.15}s`,
                    opacity: 0,
                  }}
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />

                  {/* Card - Glassmorphism */}
                  <div className="relative h-full bg-white/8 backdrop-blur-2xl rounded-2xl p-8 border border-white/20 group-hover:border-white/40 transition-all duration-500 text-center hover:scale-105 shadow-xl">
                    {/* Glassmorphic overlay */}
                    <div className={`absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-r ${method.gradient}`} />

                    <div className="relative z-10">
                      <div className={`inline-block p-4 rounded-lg bg-gradient-to-br ${method.gradient} mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${method.gradient} bg-clip-text text-transparent`}>
                        {method.label}
                      </h3>
                      <p className="text-gray-400 hover:text-white transition-colors duration-300">
                        {method.value}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Social Links */}
          <div className="flex justify-center items-center gap-4 mb-12">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.link}
                  className={`group relative p-4 rounded-full border-2 border-gray-700 hover:border-transparent transition-all duration-300 hover:scale-110 ${social.color}`}
                >
                  {/* Background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <Icon className="w-6 h-6 relative z-10 transition-colors duration-300" />
                </a>
              );
            })}
          </div>
        </div>

        <style>{`
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

      {/* Footer */}
      <footer className="relative bg-gradient-to-b from-black to-slate-950 border-t border-gray-800 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3">
                VCODE
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                CSE Department Technical Fest 2026. Where innovation meets excellence.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Events */}
            <div>
              <h4 className="text-white font-bold mb-4">Events</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Code Hunt</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Hackathon</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Tech Quiz</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Treasure Hunt</a></li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="text-white font-bold mb-4">About</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About CSE Dept</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Sponsorship</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-8" />

          {/* Bottom text */}
          <div className="text-center text-gray-500 text-sm">
            <p>
              © 2026 VCODE. Organized by <span className="text-cyan-400 font-semibold">CSE Department, Vignan University</span>
            </p>
            <p className="mt-2">
              Made with <span className="text-pink-400">❤️</span> for tech enthusiasts
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AnimatedFooterCTA;
