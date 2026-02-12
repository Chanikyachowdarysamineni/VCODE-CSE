import  { useState } from "react";
import { Table as Tabs } from "lucide-react";
import SecondYear from "./SecondYear";
import ThirdYear from "./ThirdYear";
import SecondThird from "./SecondThird";
import { MovingBorder } from "./MovingBorder";

function TabsDemo() {
  const [activeTab, setActiveTab] = useState("second");

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Tabs className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Student Registration</h1>
        </div>

        <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-4 p-1 rounded-lg">
            <MovingBorder
              onClick={() => setActiveTab("second")}
              name="Second Year"
              isActive={activeTab === "second"}
            />
            <MovingBorder
              onClick={() => setActiveTab("third")}
              name="Third Year"
              isActive={activeTab === "third"}
            />
            <MovingBorder
              onClick={() => setActiveTab("both")}
              name="Second & Third Year"
              isActive={activeTab === "both"}
            />
          </div>
        </div>

        <div className="mt-6">
          {activeTab === "second" && (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Second Year Registration
              </h2>
              <SecondYear />
            </div>
          )}
          {activeTab === "third" && (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Third Year Registration
              </h2>
              <ThirdYear />
            </div>
          )}
          {activeTab === "both" && (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Second & Third Year Registration
              </h2>
              <SecondThird />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { TabsDemo };

