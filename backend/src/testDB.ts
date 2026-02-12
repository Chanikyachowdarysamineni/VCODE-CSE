import mongoose from "mongoose";
import dotenv from "dotenv";
import EventRegistration from "./models/EventRegistration";
import CodeHunt from "./models/CodeHunt";
import CodingChallenge from "./models/CodingChallenge";
import PosterPresentation from "./models/PosterPresentation";
import TechnicalQuiz from "./models/TechnicalQuiz";
import Sports from "./models/Sports";
import Hackathon from "./models/hackathon";

dotenv.config();

const MONGO_URI = process.env.MONGO_URL || "mongodb://localhost:27017/hackathon";

const testDatabaseConnection = async () => {
  try {
    console.log("🔍 Testing MongoDB Connection...");
    console.log("📍 Connecting to:", MONGO_URI);

    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");

    // Get database info
    const db = mongoose.connection;
    console.log("\n📊 Database Information:");
    console.log("- Database Name:", db.name);
    console.log("- Host:", db.host);
    console.log("- Port:", db.port);

    // List all collections
    if (db.db) {
      const collections = await db.db.listCollections().toArray();
      console.log("\n📦 Existing Collections:", collections.length);
      collections.forEach((col) => {
        console.log(`  - ${col.name}`);
      });
    }

    // Test each model's connection
    console.log("\n🧪 Testing Model Connections:");

    try {
      const codingCount = await CodingChallenge.countDocuments();
      console.log(`  ✅ CodingChallenge: ${codingCount} documents`);
    } catch (e) {
      console.log(`  ❌ CodingChallenge: Error`);
    }

    try {
      const codeHuntCount = await CodeHunt.countDocuments();
      console.log(`  ✅ CodeHunt: ${codeHuntCount} documents`);
    } catch (e) {
      console.log(`  ❌ CodeHunt: Error`);
    }

    try {
      const posterCount = await PosterPresentation.countDocuments();
      console.log(`  ✅ PosterPresentation: ${posterCount} documents`);
    } catch (e) {
      console.log(`  ❌ PosterPresentation: Error`);
    }

    try {
      const quizCount = await TechnicalQuiz.countDocuments();
      console.log(`  ✅ TechnicalQuiz: ${quizCount} documents`);
    } catch (e) {
      console.log(`  ❌ TechnicalQuiz: Error`);
    }

    try {
      const sportsCount = await Sports.countDocuments();
      console.log(`  ✅ Sports: ${sportsCount} documents`);
    } catch (e) {
      console.log(`  ❌ Sports: Error`);
    }

    try {
      const hackathonCount = await Hackathon.countDocuments();
      console.log(`  ✅ Hackathon: ${hackathonCount} documents`);
    } catch (e) {
      console.log(`  ❌ Hackathon: Error`);
    }

    try {
      const eventCount = await EventRegistration.countDocuments();
      console.log(`  ✅ EventRegistration: ${eventCount} documents`);
    } catch (e) {
      console.log(`  ❌ EventRegistration: Error`);
    }

    console.log("\n✨ Database verification complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

testDatabaseConnection();
