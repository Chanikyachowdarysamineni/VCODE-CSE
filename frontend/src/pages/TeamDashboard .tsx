import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Team {
  _id: string;
  teamNo?: number;
  teamName: string;
  problemStatement?: string;
  topic?: string;
  gitHubLink?: string;
  deploedLink?: string;
  eventName: string;
  participants: {
    name: string;
    registrationNo: string;
    year: number;
    section: string;
    img?: string;
  }[];
  status?: string;
}

const TeamListPage = ({ setUser }: { setUser: (team: Team) => void }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("Hackathon");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  
  const limit = 10;
  const totalPages = 6;
  const navigate = useNavigate();

  const events = [
    "Coding Challenge",
    "Code Hunt",
    "Poster Presentation",
    "Technical Quiz",
    "Hackathon",
    "Sports",
  ];

  const sections = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    "K", "L", "M", "N", "O", "P", "Q", "R", "S", "Men", "Women", "Faculty"
  ];

  const years = ["1", "2", "3", "4"];

  const fetchTeams = async (event: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const endpoint = `${apiUrl}/api/register/all/${encodeURIComponent(event)}`;
      const response = await axios.get(endpoint);
      const teamsData = response.data.registrations || [];
      setTeams(teamsData);
      applyFilters(teamsData);
    } catch (error) {
      console.error("Failed to fetch teams:", error);
      setTeams([]);
      setFilteredTeams([]);
    }
  };

  const applyFilters = (teamsData: Team[]) => {
    let filtered = teamsData;

    // Filter by year
    if (selectedYear) {
      filtered = filtered.filter((team) =>
        team.participants.some((p) => p.year.toString() === selectedYear)
      );
    }

    // Filter by section
    if (selectedSection) {
      filtered = filtered.filter((team) =>
        team.participants.some((p) => p.section === selectedSection)
      );
    }

    setFilteredTeams(filtered);
  };

  useEffect(() => {
    fetchTeams(selectedEvent);
  }, [selectedEvent]);

  useEffect(() => {
    applyFilters(teams);
  }, [selectedYear, selectedSection]);

  const handleEventChange = (event: string) => {
    setSelectedEvent(event);
    setPage(1);
    setSearchValue("");
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setPage(1);
  };

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSelectedYear("");
    setSelectedSection("");
    setSearchValue("");
    setPage(1);
    fetchTeams(selectedEvent);
  };

  const displayTeams = searchValue ? teams : filteredTeams;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
        All Teams
      </h1>

      {/* Event Selection */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">Select Event</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {events.map((event) => (
            <button
              key={event}
              onClick={() => handleEventChange(event)}
              className={`px-3 py-2 rounded transition-all font-semibold ${
                selectedEvent === event
                  ? "bg-gradient-to-r from-cyan-600 to-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {event}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Options */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg space-y-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Year Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  Year {year}
                </option>
              ))}
            </select>
          </div>

          {/* Section Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Section</label>
            <select
              value={selectedSection}
              onChange={(e) => handleSectionChange(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">All Sections</option>
              {sections.map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="flex items-end">
            <button
              onClick={handleClearFilters}
              className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-semibold transition-all"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayTeams.length > 0 ? (
          displayTeams.map((team: Team) => (
            <div key={team._id} className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 hover:border-cyan-500 transition-all">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-white text-xl font-semibold">
                    {team.teamName || "Unnamed Team"}
                  </h2>
                  <p className="text-cyan-400 text-sm">{team.eventName}</p>
                </div>
                {team.teamNo && (
                  <span className="text-yellow-400 font-semibold">Team #{team.teamNo}</span>
                )}
              </div>
              
              {team.problemStatement && (
                <p className="text-gray-300 mt-2 text-sm">
                  Problem: {team.problemStatement}
                </p>
              )}

              {team.topic && (
                <p className="text-gray-300 mt-2 text-sm">
                  Topic: {team.topic}
                </p>
              )}

              <p className="text-white font-medium mt-4 mb-2">Members ({team.participants.length})</p>
              <div className="grid grid-cols-2 gap-2">
                {team.participants?.map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-700 text-white p-2 rounded flex gap-2 items-start text-sm"
                  >
                    {member.img ? (
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover border border-gray-500 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs flex-shrink-0">
                        N/A
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{member.name}</p>
                      <p className="text-gray-300 text-xs">{member.registrationNo}</p>
                      <p className="text-gray-300 text-xs">
                        Yr {member.year}, {member.section}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-2 text-center py-8">
            No teams found for the selected filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamListPage;
