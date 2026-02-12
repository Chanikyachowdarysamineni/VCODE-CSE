import { lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";


const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));
const Events = lazy(() => import("./pages/Events"));
const Gallery = lazy(() => import("./pages/Gallery"));
const ParticipantsSearch = lazy(() => import("./pages/ParticipantsSearch"));
const DynamicRegister = lazy(() => import("./pages/DynamicRegister"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
// const RegistrationClosedBanner = lazy(() => import("./components/RegistrationClosedBanner"));
const TeamDashboard = lazy(() => import("./pages/TeamDashboard "));
const TeamCard = lazy(() => import("./pages/TeamCard"));
const HackathonForm = lazy(() => import("./components/HackathonForm"));
const HackathonBoard = lazy(() => import("./components/HackathonBoard"));


interface Team {
  _id: string;
  teamNo: number;
  teamName: string;
  problemStatement: string;
  gitHubLink: string;
  deploedLink: string;
  participants: {
    name: string;
    registrationNo: string;
    year: number;
    section: string;
    img?: string;
  }[];
  status:string;

}
function App() {
  const [user, setUser] = useState<Team | null>(null);
  return (
    <Router>
      <ScrollToTop />
      <Toaster />
      <Header />
      {/* <RegistrationClosedBanner /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/participants" element={<ParticipantsSearch />} />
         <Route path="/register/:event" element={<DynamicRegister />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/hackathon" element={<HackathonForm />} />
        <Route path="/team" element={<TeamDashboard setUser={setUser}/>} />
        <Route path="/hackathonboard" element={<HackathonBoard />} />
        {/* <Route path="/update/:id" element={user ? <TeamCard user={user} /> : <NotFound />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
