import React, { useState, useEffect } from 'react';
import { Github, Globe, Users } from 'lucide-react';
import axios from 'axios';
import { Hackathon } from './types';

const HackathonBoard: React.FC = () => {
  const [teams, setTeams] = useState<Hackathon[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('https://vcode-m6ni.onrender.com/api/hackathon/forBoard');
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    fetchTeams();
  }, []);

  useEffect(() => {
    if (teams.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % teams.length);
    }, 8000); // Change every 8 seconds

    return () => clearInterval(timer);
  }, [teams.length]);

  if (teams.length === 0 || !teams[currentIndex]) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-3xl">Loading...</div>
      </div>
    );
  }

  const currentTeam = teams[currentIndex];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 transition-all duration-700 transform hover:scale-[1.01]">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Team {currentTeam.teamNo}: {currentTeam.teamName}
              </h1>
              <p className="text-gray-300 text-xl leading-relaxed">
                {currentTeam.problemStatement}
              </p>
            </div>
            <div className="flex gap-3">
              {currentTeam.gitHubLink && (
                <a
                  href={currentTeam.gitHubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github size={32} />
                </a>
              )}
              {currentTeam.deploedLink && (
                <a
                  href={currentTeam.deploedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Globe size={32} />
                </a>
              )}
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <Users size={28} />
              Team Members
            </h2>
            <div className="grid grid-cols-3 gap-5">
              {currentTeam.participants.map((member) => (
                <div
                  key={member.registrationNo}
                  className="bg-gray-800 rounded-xl p-3 flex flex-col items-center text-center transition-all duration-300 hover:bg-gray-800/80"
                >
                  <div className="mb-4 relative">
                    {member.img ? (
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-54 h-54 rounded-xl object-cover shadow-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            member.name
                          )}&size=192&background=random`;
                        }}
                      />
                    ) : (
                      <div className="w-48 h-48 rounded-xl bg-gray-600 flex items-center justify-center">
                        <Users size={64} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                  <div className="text-gray-300 mb-1">
                    Section {member.section} • Year {member.year}
                  </div>
                  <div className="text-gray-400 text-sm">{member.registrationNo}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-700"
              style={{
                width: `${((currentIndex + 1) / teams.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonBoard;