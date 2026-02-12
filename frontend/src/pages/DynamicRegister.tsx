import CodeHuntForm from "@/components/CodeHuntForm";
import CodingForm from "@/components/CodingForm";
import PosterForm from "@/components/PosterForm";
import QuizForm from "@/components/QuizForm";
import SportsForm from "@/components/SportsForm";
import { TabsDemo } from "@/components/TabsDemo";
import { useParams } from "react-router-dom";


const DynamicRegister = () => {
  const { event } = useParams();
    
  const renderForm = () => {
    switch (event?.toLowerCase() || "") {
      case "poster":
        return <PosterForm />;
      case "coding":
        return <CodingForm />;
      case "quiz":
        return <QuizForm />;
      case "codehunt":
        return <CodeHuntForm />;
      case "hackathon":
        return <TabsDemo />;
      case "sports":
        return <SportsForm />;
      default:
        return <h2 className="text-white">Invalid Event! Please check the URL.</h2>;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Register for {event}</h2>
      {renderForm()}
    </div>
  );
};

export default DynamicRegister;
