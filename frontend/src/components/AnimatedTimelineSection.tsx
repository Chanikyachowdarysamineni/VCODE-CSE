import React, { useState } from "react";
import { Clock } from "lucide-react";

const AnimatedTimelineSection = () => {
  const [activeDay, setActiveDay] = useState(0);

  const scheduleData = [
    {
      day: "Day 1",
      date: "March 20",
      events: [
        { time: "09:00 AM", event: "Registration & Welcome", duration: "2h" },
        { time: "11:30 AM", event: "Opening Ceremony", duration: "1h" },
        { time: "01:00 PM", event: "Lunch Break", duration: "1h" },
        { time: "02:00 PM", event: "Code Hunt Begins", duration: "3h" },
      ],
      color: "from-cyan-500 via-cyan-400 to-purple-500",
    },
    {
      day: "Day 2",
      date: "March 21",
      events: [
        { time: "08:00 AM", event: "Hackathon Kickoff", duration: "12h" },
        { time: "06:00 PM", event: "Mid-point Review", duration: "30m" },
      ],
      color: "from-purple-500 via-purple-400 to-pink-500",
    },
    {
      day: "Day 3",
      date: "March 22",
      events: [
        { time: "08:00 AM", event: "Technical Quiz Finals", duration: "2h" },
        { time: "02:00 PM", event: "Treasure Hunt", duration: "2h" },
        { time: "05:00 PM", event: "Awards & Closing", duration: "2h" },
      ],
      color: "from-cyan-500 via-purple-500 to-pink-500",
    },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black py-20 px-4 md:px-8">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-bl from-pink-600/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-600/20 to-transparent rounded-full blur-3xl animate-pulse delay-3000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-2xl opacity-50">
                Event Schedule
              </span>
              <span className="relative bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Event Schedule
              </span>
            </span>
          </h2>
          <p className="text-gray-400 text-lg mt-4">
            Three days of non-stop innovation, competition, and fun
          </p>
        </div>

        {/* Schedule Container */}
        <div className="space-y-8">
          {/* Day Selector Tabs */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
            {scheduleData.map((schedule, index) => (
              <button
                key={index}
                onClick={() => setActiveDay(index)}
                className={`relative group px-8 py-4 rounded-xl font-bold text-lg transition-all duration-500 ${
                  activeDay === index
                    ? "scale-110"
                    : "scale-100 hover:scale-105"
                }`}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 rounded-xl transition-all duration-500 ${
                    activeDay === index
                      ? `bg-gradient-to-r ${schedule.color}`
                      : "bg-gradient-to-r from-gray-700 to-gray-800"
                  }`}
                />

                {/* Content */}
                <div className="relative z-10 text-center">
                  <p className={`transition-colors duration-500 ${
                    activeDay === index ? "text-white" : "text-gray-300"
                  }`}>
                    {schedule.day}
                  </p>
                  <p className={`text-sm transition-colors duration-500 ${
                    activeDay === index ? "text-white/80" : "text-gray-400"
                  }`}>
                    {schedule.date}
                  </p>
                </div>

                {/* Animated border */}
                <div className={`absolute inset-0 rounded-xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  style={{
                    borderImage: `linear-gradient(135deg, currentColor 0%, transparent 100%) 1`,
                  }}
                />
              </button>
            ))}
          </div>

          {/* Timeline Content */}
          <div className="relative">
            {/* Animated timeline background */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 transform -translate-x-1/2 opacity-20 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Events Grid */}
            <div className="space-y-6">
              {scheduleData[activeDay].events.map((item, eventIndex) => (
                <div
                  key={eventIndex}
                  className="group relative"
                  style={{
                    animation: `slideInLeft 0.6s ease-out forwards`,
                    animationDelay: `${eventIndex * 0.1}s`,
                    opacity: 0,
                  }}
                >
                  <div className={`relative bg-white/8 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 group-hover:border-white/40 transition-all duration-500 hover:scale-105 shadow-xl`}>
                    {/* Glassmorphic overlay */}
                    <div className={`absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-r ${scheduleData[activeDay].color}`} />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                      {/* Timeline dot */}
                      <div className="relative flex-shrink-0">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${scheduleData[activeDay].color} flex items-center justify-center shadow-lg shadow-current/50`}>
                          <Clock className="w-8 h-8 text-white" />
                        </div>
                        {/* Animated glow */}
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${scheduleData[activeDay].color} blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 animate-pulse`} />
                      </div>

                      {/* Event Details */}
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                          <div>
                            <p className={`text-2xl font-black bg-gradient-to-r ${scheduleData[activeDay].color} bg-clip-text text-transparent`}>
                              {item.time}
                            </p>
                            <p className="text-gray-300 text-lg font-semibold mt-2">
                              {item.event}
                            </p>
                          </div>
                        <div className="flex items-center gap-2 bg-white/8 backdrop-blur-md px-4 py-2 rounded-lg w-fit border border-white/20">
                          <Clock className="w-4 h-4 text-gray-300" />
                          <span className="text-gray-300 font-semibold text-sm">
                              {item.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right arrow indicator */}
                      <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-600 group-hover:border-current transition-colors duration-300">
                        <span className={`bg-gradient-to-r ${scheduleData[activeDay].color} bg-clip-text text-transparent font-bold`}>
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .delay-1000 { animation-delay: 1s; }
        .delay-3000 { animation-delay: 3s; }
      `}</style>
    </section>
  );
};

export default AnimatedTimelineSection;
