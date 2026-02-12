import { BookOpen, Code, Cpu, PenTool, Search, Trophy } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import HeaderButton from "./HeaderButton";
import { HoverBorder } from "./HoverBorderGradient";
import { useState } from "react";
import InfoModal from "./InfoModal";
import PosterZoomModal from "./PosterZoomModal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const eventDetails: Record<string, any> = {
  "Poster Presentation": {
    "Team Size": "Mandatory",
    "Levels": "To be announced shortly",
    "Venue": "To be announced shortly",
    "Theme": "To be announced shortly",
    "Submission Format": "Hard Copy",
    "Payment": "Mandatory",
  },
  "CodeHunt": {
    "Team Size": 3,
    "Levels": 5,
    "Venue": "To be announced shortly",
    "Payment": "Mandatory",
  },
  "Hackathon": {
    "Team Size": "3rd Years - 3, 2nd Years - 2 (Mandatory)",
    "Levels": "To be announced shortly",
    "Venue": "To be announced shortly",
    "Duration": "24hrs Day and Night",
    "Domain": "Web",
    "Theme": "To be announced shortly",
    "Payment": "Mandatory",
  },
  "Coding": {
    "Team Size": 1,
    "Levels": 3,
    "Venue": "To be announced shortly",
    "Allowed Languages": "C, C++, Java, Python",
    "Payment": "Mandatory",
  },
  "Technical Quiz": {
    "Team Size": 4,
    "Levels": 1,
    "Venue": "To be announced shortly",
    "Topics": "OS, DBMS, Data Structures, Code Snippets",
    "Payment": "Mandatory",
  },
  "Sports": {
    "Team Size": "Varies by sport",
    "Venue": "To be announced shortly",
    "Sports": "To be announced shortly",
    "Payment": "Mandatory",
  },
};

export function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-6">
      <GridItem
        icon={<PenTool className="h-6 w-6 text-purple-500" />}
        title="Poster Presentation"
        description="Innovative Ideas. Creative Design. Impactful Solutions."
        img="https://slidemodel.com/wp-content/uploads/01-poster-presentation-cover.png"
        url="/register/poster"
      />

      <GridItem
        icon={<Search className="h-6 w-6 text-purple-500" />}
        title="CodeHunt"
        description="CodeHunt: Solve, Discover, Code, Conquer!"
        url="/register/codehunt"
      />

      <GridItem
        icon={<Cpu className="h-6 w-6 text-purple-500" />}
        title="Hackathon"
        description="Innovate, collaborate, create groundbreaking solutions!"
        url="/register/hackathon"
      />

      <GridItem
        icon={<Code className="h-6 w-6 text-purple-500" />}
        title="Coding"
        description="Crafting logic, solving problems, creating possibilities!"
        img="https://static.vecteezy.com/system/resources/previews/019/153/003/original/3d-minimal-programming-icon-coding-screen-web-development-concept-laptop-with-a-coding-screen-and-a-coding-icon-3d-illustration-png.png"
        url="/register/coding"
      />

      <GridItem
        icon={<BookOpen className="h-6 w-6 text-purple-500" />}
        title="Technical Quiz"
        description="Test knowledge, challenge intellect, excel!"
        url="/register/quiz"
      />

      <GridItem
        icon={<Trophy className="h-6 w-6 text-purple-500" />}
        title="Sports"
        description="Compete, celebrate, and showcase your athletic talent!"
        url="/register/sports"
      />
    </ul>
  );
}

interface GridItemProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  img?: string;
  url: string;
}

const GridItem = ({ icon, title, description, img, url }: GridItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPosterZoomOpen, setIsPosterZoomOpen] = useState(false);

  return (
    <>
      <li className="h-full list-none">
        <div className="relative h-full rounded-xl sm:rounded-2xl border border-gray-700 p-0.5 hover:border-purple-500/50 transition-colors">
          <GlowingEffect spread={100} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
          <div className="relative flex h-full flex-col justify-between gap-3 sm:gap-4 rounded-lg sm:rounded-xl bg-black/40 p-4 sm:p-5 md:p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-2 sm:p-2.5">
                {icon}
              </div>
              <div 
                onClick={() => setIsPosterZoomOpen(true)}
                className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-2 sm:p-2.5 cursor-pointer hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110"
              >
                <img src={img} alt={`${title} Logo`} className="h-8 sm:h-10 w-8 sm:w-10 object-contain" />
              </div>
            </div>

            <div className="flex-1 space-y-1 sm:space-y-2">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white">{title}</h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{description}</p>
            </div>

            <div className="flex gap-2 sm:gap-3 pt-1 sm:pt-2">
              <HeaderButton url={url} />
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-300 hover:bg-purple-500/20 hover:text-white transition-colors"
              >
                Know more
              </button>
            </div>
          </div>
        </div>
      </li>

      {/* Dynamic Modal */}
      <InfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={
          <>
            <p>{description}</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              {Object.entries(eventDetails[title] || {}).map(([key, value]) => (
                <li key={key} className="flex justify-between py-1 border-b border-gray-700">
                  <strong className="text-gray-200">{key}:</strong> 
                  <span className="text-gray-400">{String(value)}</span>
                </li>
              ))}
            </ul>
          </>
        }
      />

      {/* Poster Zoom Modal */}
      {img && (
        <PosterZoomModal
          isOpen={isPosterZoomOpen}
          onClose={() => setIsPosterZoomOpen(false)}
          posterImage={img}
          title={title}
        />
      )}
    </>
  );
};
