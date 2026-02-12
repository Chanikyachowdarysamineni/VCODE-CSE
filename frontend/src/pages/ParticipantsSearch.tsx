import { useState, useEffect } from 'react';
import { Search, X, Mail, Phone, MapPin } from 'lucide-react';

interface Participant {
  _id?: string;
  name: string;
  registrationNo: string;
  year: number;
  section: string;
  eventName?: string;
  img?: string;
  email?: string;
  phoneNo?: string;
  teamName?: string;
  teamId?: string;
}

const ParticipantsSearch = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  // API Configuration - Use environment variable
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
  const baseUrl = API_URL.endsWith('/api') ? API_URL : `${API_URL}/api`;

  // Search filters
  const [searchName, setSearchName] = useState('');
  const [searchRegNo, setSearchRegNo] = useState('');
  const [searchEvent, setSearchEvent] = useState('');
  const [searchSection, setSearchSection] = useState('');
  const [searchYear, setSearchYear] = useState('');

  // Get unique values for dropdowns
  const [eventNames, setEventNames] = useState<string[]>([]);
  const [sections, setSections] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    fetchAllParticipants();
  }, []);

  const fetchAllParticipants = async () => {
    try {
      setLoading(true);
      setError('');
      
      let allParticipants: Participant[] = [];

      // Helper function to add delay between requests
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

      // Fetch from register endpoints
      const registerEndpoints = [
        'Coding Challenge',
        'Code Hunt',
        'Poster Presentation',
        'Technical Quiz',
        'Sports',
      ];

      // Fetch from register/all/* endpoints with delays
      for (const eventName of registerEndpoints) {
        try {
          const url = `${baseUrl}/register/all/${encodeURIComponent(eventName)}`;
          console.log(`📡 Fetching from: ${url}`);
          
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          console.log(`Response status for ${eventName}: ${response.status}`);
          
          if (!response.ok) {
            console.error(`❌ Failed to fetch ${eventName}: ${response.status} ${response.statusText}`);
            setError(`Unable to fetch ${eventName}: Server returned ${response.status}`);
            await delay(500);
            continue;
          }

          const data = await response.json();
          console.log(`✅ Response for ${eventName}:`, data);
          
          // Handle different response formats
          let registrations = [];
          if (data.registrations && Array.isArray(data.registrations)) {
            registrations = data.registrations;
          } else if (Array.isArray(data)) {
            registrations = data;
          } else if (data.data && Array.isArray(data.data)) {
            registrations = data.data;
          }
            
          if (!Array.isArray(registrations)) {
            console.warn(`⚠️ Invalid registrations format for ${eventName}`);
            await delay(500);
            continue;
          }

          console.log(`📊 Found ${registrations.length} records for ${eventName}`);

          const eventParticipants = registrations.flatMap((item: any) => {
            // Check if this is a Sports event (has sportName field)
            if (item.sportName) {
              console.log(`⚽ Processing Sports participant:`, item);
              return [{
                name: item.name || '',
                registrationNo: item.registrationNo || '',
                year: parseInt(item.year) || 0,
                section: item.section || '',
                eventName: 'Sports',
                img: '',
                email: item.email || '',
                phoneNo: item.phoneNo || '',
                teamName: item.teamName || '',
                _id: item._id || Math.random().toString(),
              }];
            }

            // For team-based events with participants array
            if (item.participants && Array.isArray(item.participants)) {
              console.log(`👥 Processing ${eventName} team:`, item.teamName, `with ${item.participants.length} participants`);
              return item.participants.map((p: any) => ({
                name: p.name || '',
                registrationNo: p.registrationNo || '',
                year: p.year || 0,
                section: p.section || '',
                eventName: eventName,
                img: '',
                email: p.email || '',
                phoneNo: p.phoneNo || '',
                teamName: item.teamName || '',
                teamId: item._id || '',
                _id: p._id || Math.random().toString(),
              }));
            }

            return [];
          });

          allParticipants = [...allParticipants, ...eventParticipants];
        } catch (err) {
          console.error(`🔴 Error fetching ${eventName}:`, err);
          setError(`Network error while fetching ${eventName}`);
        }
      }

      // Fetch Hackathon data
      try {
        const hackathonUrl = `${baseUrl}/hackathon/forBoard`;
        console.log(`📡 Fetching from: ${hackathonUrl}`);
        
        const response = await fetch(hackathonUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(`Response status for Hackathon: ${response.status}`);
        
        if (!response.ok) {
          console.error(`❌ Failed to fetch Hackathon: ${response.status} ${response.statusText}`);
          setError(`Unable to fetch Hackathon: Server returned ${response.status}`);
          await delay(500);
        } else {
          const hackathonTeams = await response.json();
          console.log('✅ Hackathon response:', hackathonTeams);
          
          let teams = [];
          if (Array.isArray(hackathonTeams)) {
            teams = hackathonTeams;
          } else if (hackathonTeams.hackathonTeams && Array.isArray(hackathonTeams.hackathonTeams)) {
            teams = hackathonTeams.hackathonTeams;
          } else if (hackathonTeams.data && Array.isArray(hackathonTeams.data)) {
            teams = hackathonTeams.data;
          }

          if (Array.isArray(teams)) {
            console.log(`📊 Found ${teams.length} hackathon teams`);
            
            const hackathonParticipants = teams.flatMap((team: any) => {
              if (team.participants && Array.isArray(team.participants)) {
                console.log(`👥 Processing Hackathon team:`, team.teamName, `with ${team.participants.length} participants`);
                return team.participants.map((p: any) => ({
                  name: p.name || '',
                  registrationNo: p.registrationNo || '',
                  year: p.year || 0,
                  section: p.section || '',
                  eventName: 'Hackathon',
                  img: p.img || '',
                  email: p.email || '',
                  phoneNo: p.phoneNo || '',
                  teamName: team.teamName || '',
                  teamId: team._id || '',
                  _id: p._id || Math.random().toString(),
                }));
              }
              return [];
            });
            
            console.log(`✅ Extracted ${hackathonParticipants.length} hackathon participants`);
            allParticipants = [...allParticipants, ...hackathonParticipants];
          }
        }
      } catch (err) {
        console.error('🔴 Error fetching Hackathon:', err);
        setError(`Network error while fetching Hackathon`);
      }

      console.log('Total participants fetched:', allParticipants.length);
      console.log('Participants:', allParticipants);

      if (allParticipants.length === 0) {
        setError('Unable to fetch participants. Backend server may be temporarily unavailable. Please refresh and try again.');
      }

      setParticipants(allParticipants);

      // Extract unique values for filters - with detailed logging
      const eventSet = new Set();
      const sectionSet = new Set();
      const yearSet = new Set();

      allParticipants.forEach(p => {
        if (p.eventName) eventSet.add(p.eventName);
        if (p.section) sectionSet.add(p.section);
        if (p.year) yearSet.add(p.year);
      });

      const uniqueEvents = Array.from(eventSet).sort() as string[];
      const uniqueSections = Array.from(sectionSet).sort() as string[];
      const uniqueYears = Array.from(yearSet).sort((a: number, b: number) => b - a) as number[];

      console.log('Unique Events:', uniqueEvents);
      console.log('Unique Sections:', uniqueSections);
      console.log('Unique Years:', uniqueYears);

      setEventNames(uniqueEvents);
      setSections(uniqueSections);
      setYears(uniqueYears);
      setFilteredParticipants(allParticipants);
    } catch (err) {
      setError('Failed to load participants from database. The backend server may be temporarily unavailable.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    let filtered = participants;

    if (searchName) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchRegNo) {
      filtered = filtered.filter(p =>
        p.registrationNo.toLowerCase().includes(searchRegNo.toLowerCase())
      );
    }

    if (searchEvent) {
      filtered = filtered.filter(p => p.eventName === searchEvent);
    }

    if (searchSection) {
      filtered = filtered.filter(p => p.section === searchSection);
    }

    if (searchYear) {
      filtered = filtered.filter(p => p.year === parseInt(searchYear));
    }

    setFilteredParticipants(filtered);
  };

  const handleClear = () => {
    setSearchName('');
    setSearchRegNo('');
    setSearchEvent('');
    setSearchSection('');
    setSearchYear('');
    setSelectedParticipant(null);
    setFilteredParticipants(participants);
  };

  useEffect(() => {
    handleSearch();
  }, [searchName, searchRegNo, searchEvent, searchSection, searchYear, participants]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Search All Participants
          </h1>
          <p className="text-lg text-gray-400">
            Find participants across all events by name, registration number, event, section, or year
          </p>
        </div>

        {/* Search Filters */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* Name Search */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Search by name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-cyan-500 focus:outline-none transition"
              />
            </div>

            {/* Reg No Search */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Reg. No.
              </label>
              <input
                type="text"
                placeholder="Search by reg no"
                value={searchRegNo}
                onChange={(e) => setSearchRegNo(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-cyan-500 focus:outline-none transition"
              />
            </div>

            {/* Event Filter */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Event
              </label>
              {eventNames.length === 0 ? (
                <div className="w-full px-4 py-2 bg-gray-700 text-gray-400 border border-gray-600 rounded-lg">
                  No events available
                </div>
              ) : (
                <select
                  value={searchEvent}
                  onChange={(e) => setSearchEvent(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-cyan-500 focus:outline-none transition"
                >
                  <option value="">All Events</option>
                  {eventNames.map(event => (
                    <option key={event} value={event}>
                      {event}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Section Filter */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Section
              </label>
              {sections.length === 0 ? (
                <div className="w-full px-4 py-2 bg-gray-700 text-gray-400 border border-gray-600 rounded-lg">
                  No sections available
                </div>
              ) : (
                <select
                  value={searchSection}
                  onChange={(e) => setSearchSection(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-cyan-500 focus:outline-none transition"
                >
                  <option value="">All Sections</option>
                  {sections.map(section => (
                    <option key={section} value={section}>
                      Section {section}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Year
              </label>
              {years.length === 0 ? (
                <div className="w-full px-4 py-2 bg-gray-700 text-gray-400 border border-gray-600 rounded-lg">
                  No years available
                </div>
              ) : (
                <select
                  value={searchYear}
                  onChange={(e) => setSearchYear(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-cyan-500 focus:outline-none transition"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>
                      Year {year}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Clear Button */}
          {(searchName || searchRegNo || searchEvent || searchSection || searchYear) && (
            <button
              onClick={handleClear}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
            >
              <X size={18} />
              Clear Filters
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            <p className="text-gray-400 mt-4">Loading participants from all events...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
            <p className="text-red-300 mb-4">{error}</p>
            <button
              onClick={() => {
                setError('');
                fetchAllParticipants();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results Count */}
        {!loading && (
          <div className="mb-6 text-gray-400">
            Found <span className="text-cyan-400 font-semibold">{filteredParticipants.length}</span> participant{filteredParticipants.length !== 1 ? 's' : ''}
          </div>
        )}

        {/* Detail Modal */}
        {selectedParticipant && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white">Participant Details</h2>
                <button
                  onClick={() => setSelectedParticipant(null)}
                  className="text-gray-400 hover:text-white transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                {selectedParticipant.img ? (
                  <img
                    src={selectedParticipant.img}
                    alt={selectedParticipant.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center text-white text-2xl font-bold border-2 border-cyan-500">
                    {selectedParticipant.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedParticipant.name}</h3>
                  <p className="text-gray-400">{selectedParticipant.registrationNo}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div>
                  <label className="text-gray-400 text-sm">Year & Section</label>
                  <p className="text-white font-semibold">Year {selectedParticipant.year}, Section {selectedParticipant.section}</p>
                </div>

                <div>
                  <label className="text-gray-400 text-sm">Event</label>
                  <p className="text-white font-semibold">{selectedParticipant.eventName}</p>
                </div>

                {selectedParticipant.teamName && (
                  <div>
                    <label className="text-gray-400 text-sm">Team</label>
                    <p className="text-white font-semibold">{selectedParticipant.teamName}</p>
                  </div>
                )}

                {selectedParticipant.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-cyan-400" />
                    <div>
                      <label className="text-gray-400 text-sm block">Email</label>
                      <p className="text-white text-sm">{selectedParticipant.email}</p>
                    </div>
                  </div>
                )}

                {selectedParticipant.phoneNo && (
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-cyan-400" />
                    <div>
                      <label className="text-gray-400 text-sm block">Phone</label>
                      <p className="text-white text-sm">{selectedParticipant.phoneNo}</p>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedParticipant(null)}
                className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Participants Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredParticipants.length > 0 ? (
              filteredParticipants.map((participant, idx) => (
                <button
                  key={`${participant._id}-${idx}`}
                  onClick={() => setSelectedParticipant(participant)}
                  className="text-left bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    {participant.img ? (
                      <img
                        src={participant.img}
                        alt={participant.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500/30 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center text-white font-bold flex-shrink-0 border-2 border-cyan-500/30">
                        {participant.name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold truncate">
                        {participant.name}
                      </h3>
                      <p className="text-gray-400 text-sm truncate">
                        {participant.registrationNo}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Year {participant.year} | Sec {participant.section}
                      </p>
                      {participant.eventName && (
                        <div className="mt-2 inline-block bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 text-xs px-2 py-1 rounded border border-cyan-500/30">
                          {participant.eventName}
                        </div>
                      )}
                      {participant.teamName && (
                        <div className="mt-1 text-xs text-purple-300">
                          Team: {participant.teamName}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-4">
                  {participants.length === 0 ? 'Unable to load participants' : 'No participants found'}
                </p>
                {participants.length === 0 && !error && (
                  <p className="text-gray-500 text-sm mb-4">
                    The backend server appears to be unavailable. Please try refreshing the page or try again later.
                  </p>
                )}
                {participants.length === 0 && (
                  <button
                    onClick={fetchAllParticipants}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition"
                  >
                    Retry Loading
                  </button>
                )}
              </div>
            )}
          </div>
        )}


      </div>
    </div>
  );
};

export default ParticipantsSearch;
