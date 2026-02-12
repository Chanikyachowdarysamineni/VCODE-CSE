import React from "react";
import AnimatedHero from "@/components/AnimatedHero";
import AnimatedEventsSection from "@/components/AnimatedEventsSection";
import AnimatedStatsSection from "@/components/AnimatedStatsSection";
import AnimatedTimelineSection from "@/components/AnimatedTimelineSection";
import AnimatedFooterCTA from "@/components/AnimatedFooterCTA";

const Home = (): React.ReactElement => {
  return (
    <>
      <AnimatedHero />
      <AnimatedEventsSection />
      <AnimatedStatsSection />
      <AnimatedTimelineSection />
      <AnimatedFooterCTA />
    </>
  );
};

export default Home;
