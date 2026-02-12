import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CodingForm from "@/components/CodingForm";
import CodeHuntForm from "@/components/CodeHuntForm";
import QuizForm from "@/components/QuizForm";
import HackathonForm from "@/components/HackathonForm";
import PosterForm from "@/components/PosterForm";
import CulturalForm from "@/components/CulturalForm";
import SportsForm from "@/components/SportsForm";
import { Code2, Music, Trophy } from "lucide-react";

type FormType =
  | "coding"
  | "codeHunt"
  | "quiz"
  | "hackathon"
  | "poster"
  | "cultural"
  | "sports";

export default function Events() {
  const [activeForm, setActiveForm] = useState<FormType | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const technicalEvents = [
    {
      title: "Coding Challenge",
      description: "Test your coding skills in various programming languages",
      formType: "coding" as FormType,
    },
    {
      title: "Code Hunt",
      description: "Find bugs and solve complex coding puzzles",
      formType: "codeHunt" as FormType,
    },
    {
      title: "Technical Quiz",
      description: "Compete in a technical knowledge quiz",
      formType: "quiz" as FormType,
    },
    {
      title: "Hackathon",
      description: "Build innovative projects with your team",
      formType: "hackathon" as FormType,
    },
    {
      title: "Poster Presentation",
      description: "Present and showcase your technical ideas",
      formType: "poster" as FormType,
    },
  ];

  const renderForm = (formType: FormType) => {
    switch (formType) {
      case "coding":
        return <CodingForm />;
      case "codeHunt":
        return <CodeHuntForm />;
      case "quiz":
        return <QuizForm />;
      case "hackathon":
        return <HackathonForm />;
      case "poster":
        return <PosterForm />;
      case "cultural":
        return <CulturalForm />;
      case "sports":
        return <SportsForm />;
      default:
        return null;
    }
  };

  const handleEventClick = (formType: FormType) => {
    setActiveForm(formType);
    setOpenDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Events Registration
          </h1>
          <p className="text-gray-400 text-lg">
            Choose your category and register for the events
          </p>
        </div>

        {/* Main Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Technical Card */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-8 border border-blue-700 hover:border-blue-500 transition">
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Technical</h2>
            </div>
            <p className="text-gray-300 mb-6">
              Showcase your technical skills in coding challenges, hackathons,
              and more
            </p>

            <div className="space-y-3 mb-6">
              {technicalEvents.map((event, idx) => (
                <Dialog key={idx} open={openDialog && activeForm === event.formType}>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => handleEventClick(event.formType)}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition flex items-center justify-between group"
                    >
                      <span className="text-sm">{event.title}</span>
                      <span className="text-xs opacity-0 group-hover:opacity-100 transition">
                        →
                      </span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] overflow-y-auto bg-slate-900 border-gray-700">
                    <DialogHeader>
                      <DialogTitle className="text-white text-2xl">
                        {event.title} Registration
                      </DialogTitle>
                    </DialogHeader>
                    {activeForm === event.formType && renderForm(event.formType)}
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>

          {/* Cultural Card */}
          <div className="bg-gradient-to-br from-pink-900 to-pink-800 rounded-lg p-8 border border-pink-700 hover:border-pink-500 transition">
            <div className="flex items-center gap-3 mb-4">
              <Music className="w-8 h-8 text-pink-400" />
              <h2 className="text-2xl font-bold text-white">Cultural</h2>
            </div>
            <p className="text-gray-300 mb-6">
              Celebrate diversity through dance, music, art, and creative
              expressions
            </p>

            <Dialog open={openDialog && activeForm === "cultural"}>
              <DialogTrigger asChild>
                <button
                  onClick={() => handleEventClick("cultural")}
                  className="w-full bg-pink-600 hover:bg-pink-500 text-white py-3 px-4 rounded-lg transition font-medium"
                >
                  Register for Cultural Events
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto bg-slate-900 border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-white text-2xl">
                    Cultural Events Registration
                  </DialogTitle>
                </DialogHeader>
                {activeForm === "cultural" && renderForm("cultural")}
              </DialogContent>
            </Dialog>

            <div className="mt-6 p-4 bg-pink-900/50 rounded-lg border border-pink-700/50">
              <p className="text-pink-200 text-sm">
                <strong>Available Events:</strong> Dance, Music, Drama, Art &
                Painting, Photography, Fashion Show, Debate, Poetry, Story
                Telling
              </p>
            </div>
          </div>

          {/* Sports Card */}
          <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-lg p-8 border border-orange-700 hover:border-orange-500 transition">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-orange-400" />
              <h2 className="text-2xl font-bold text-white">Sports</h2>
            </div>
            <p className="text-gray-300 mb-6">
              Join competitive sports leagues and tournaments
            </p>

            <Dialog open={openDialog && activeForm === "sports"}>
              <DialogTrigger asChild>
                <button
                  onClick={() => handleEventClick("sports")}
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white py-3 px-4 rounded-lg transition font-medium"
                >
                  Register for Sports
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto bg-slate-900 border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-white text-2xl">
                    Sports Registration
                  </DialogTitle>
                </DialogHeader>
                {activeForm === "sports" && renderForm("sports")}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
