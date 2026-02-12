
import { useState, useEffect } from "react";
import { Zap } from "lucide-react";

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const Main = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 2,
    minutes: 5,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const cards = [
    {
      title: "Participate",
      icon: "👥",
      color: "from-pink-500/20 to-pink-600/20",
      borderColor: "border-pink-500",
    },
    {
      title: "Certify",
      icon: "✓",
      color: "from-cyan-500/20 to-blue-600/20",
      borderColor: "border-cyan-500",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-900 via-purple-900 to-black">
      {/* Animated background with stars and gradient */}
      <div className="absolute inset-0">
        {/* Background stars */}
        <div className="absolute inset-0 opacity-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                width: Math.random() * 3 + "px",
                height: Math.random() * 3 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                opacity: Math.random() * 0.7 + 0.3,
                animationDuration: Math.random() * 3 + 2 + "s",
              }}
            />
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-pink-900/40" />

        {/* Floating orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-4000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 pt-20">
        {/* Tagline */}
        <p className="text-cyan-400 text-sm md:text-base font-mono font-semibold tracking-widest mb-8 opacity-90">
          "IN CODE WE TRUST. CSE DEPT."
        </p>

        {/* Main Title with Icon */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {/* Neon Gear Icon */}
          <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full blur-lg opacity-50 animate-pulse" />
            <div className="relative bg-gradient-to-br from-slate-900 to-black rounded-full p-4 border-2 border-cyan-400 flex items-center justify-center">
              <Zap className="w-10 h-10 md:w-12 md:h-12 text-cyan-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-2 tracking-tight animate-pulse">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-extrabold neon-glow">
            VCODE
          </span>
        </h1>

        {/* Date and Time Info */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 my-8 w-full max-w-3xl justify-center">
          {/* Left Date */}
          <div className="flex flex-col items-center text-center">
            <p className="text-cyan-300 text-xs md:text-sm font-mono opacity-70">WEDNESDAY FEB 04, 2026</p>
            <p className="text-white text-2xl md:text-3xl font-bold font-mono">10:54:29 AM</p>
          </div>

          {/* Center - Gear countdown indicator */}
          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-purple-300 text-xs md:text-sm font-mono opacity-70">ALGORITHM 2892 /</p>
              <p className="text-cyan-300 text-xs md:text-sm font-mono opacity-70">7 SOLUTIONS 3 2023</p>
              <p className="text-pink-300 text-xs md:text-sm font-mono opacity-70">P400 EFFICIENCY</p>
              <p className="text-purple-300 text-xs md:text-sm font-mono opacity-70">SITTING 5/401 2541</p>
            </div>
          </div>

          {/* Right Date */}
          <div className="flex flex-col items-center text-center">
            <p className="text-cyan-300 text-xs md:text-sm font-mono opacity-70">WEDNESDAY JR:3795</p>
            <p className="text-white text-2xl md:text-3xl font-bold font-mono">10:54:29 AM</p>
          </div>
        </div>

        {/* Hackathon Timer Section */}
        <div className="w-full max-w-3xl my-8">
          <div className="flex flex-col items-center">
            <p className="text-cyan-400 text-lg md:text-xl font-mono font-bold tracking-widest mb-4">
              LIVE HACKATHON TIMER
            </p>

            {/* Timer Box */}
            <div className="relative w-full max-w-md">
              {/* Border glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50 rounded-2xl blur opacity-75 animate-pulse" />

              {/* Timer Content */}
              <div className="relative bg-gradient-to-b from-slate-900/80 to-blue-900/80 border-2 border-cyan-400/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 md:gap-4">
                  {/* Hours */}
                  <div className="flex flex-col items-center">
                    <div className="text-4xl md:text-6xl font-bold text-cyan-400 font-mono">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </div>
                    <span className="text-cyan-300 text-xs md:text-sm font-mono mt-2 uppercase tracking-wider">
                      HRS
                    </span>
                  </div>

                  <div className="text-3xl md:text-5xl text-cyan-400 font-bold">:</div>

                  {/* Minutes */}
                  <div className="flex flex-col items-center">
                    <div className="text-4xl md:text-6xl font-bold text-cyan-400 font-mono">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </div>
                    <span className="text-cyan-300 text-xs md:text-sm font-mono mt-2 uppercase tracking-wider">
                      MINUTES
                    </span>
                  </div>

                  <div className="text-3xl md:text-5xl text-cyan-400 font-bold">:</div>

                  {/* Seconds */}
                  <div className="flex flex-col items-center">
                    <div className="text-4xl md:text-6xl font-bold text-pink-400 font-mono">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </div>
                    <span className="text-pink-300 text-xs md:text-sm font-mono mt-2 uppercase tracking-wider">
                      SECS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="w-full max-w-4xl mt-12 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="relative group cursor-pointer"
              >
                {/* Border glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/40 to-purple-500/40 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300" />

                {/* Card Content */}
                <div
                  className={`relative bg-gradient-to-br ${card.color} ${card.borderColor} border-2 rounded-2xl p-8 md:p-10 text-center backdrop-blur-sm hover:bg-opacity-80 transition duration-300 flex flex-col items-center justify-center min-h-48`}
                >
                  <div className="text-5xl md:text-6xl mb-4">{card.icon}</div>
                  <h3 className="text-xl md:text-2xl font-bold text-white font-mono tracking-wider">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-xl hover:shadow-purple-500/50 transition duration-300 font-mono text-sm md:text-base">
            SIGN UP
          </button>
          <button className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-xl hover:shadow-cyan-500/50 transition duration-300 font-mono text-sm md:text-base">
            LOG IN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
