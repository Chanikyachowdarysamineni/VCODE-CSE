import mongoose from "mongoose";
import CodeHunt from "./models/CodeHunt";
import CodingChallenge from "./models/CodingChallenge";
import PosterPresentation from "./models/PosterPresentation";
import TechnicalQuiz from "./models/TechnicalQuiz";
import Sports from "./models/Sports";
import Hackathon from "./models/hackathon";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URL || "mongodb://localhost:27017/hackathon";

const testEndpoints = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");

    const results: any = {};

    // Test each event endpoint
    const events = [
      { name: "Coding Challenge", model: CodingChallenge },
      { name: "Code Hunt", model: CodeHunt },
      { name: "Poster Presentation", model: PosterPresentation },
      { name: "Technical Quiz", model: TechnicalQuiz },
      { name: "Sports", model: Sports },
      { name: "Hackathon", model: Hackathon },
    ];

    for (const event of events) {
      try {
        const count = await event.model.countDocuments();
        const sample = await event.model.findOne();
        results[event.name] = {
          count,
          hasSampleData: !!sample,
          sampleKeys: sample ? Object.keys(sample.toObject ? sample.toObject() : sample) : [],
        };
        console.log(`\n📊 ${event.name}:`);
        console.log(`   Count: ${count}`);
        console.log(`   Sample Data Keys:`, results[event.name].sampleKeys);
        if (sample) {
          console.log(`   Sample Data:`, JSON.stringify(sample.toObject ? sample.toObject() : sample, null, 2));
        }
      } catch (err: any) {
        results[event.name] = { error: err.message };
        console.log(`\n❌ ${event.name}: ${err.message}`);
      }
    }

    console.log("\n\n📋 SUMMARY:");
    console.log(JSON.stringify(results, null, 2));

    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

testEndpoints();
