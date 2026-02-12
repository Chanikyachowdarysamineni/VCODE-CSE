"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const EventRegistration_1 = __importDefault(require("./models/EventRegistration"));
const CodeHunt_1 = __importDefault(require("./models/CodeHunt"));
const CodingChallenge_1 = __importDefault(require("./models/CodingChallenge"));
const PosterPresentation_1 = __importDefault(require("./models/PosterPresentation"));
const TechnicalQuiz_1 = __importDefault(require("./models/TechnicalQuiz"));
const Sports_1 = __importDefault(require("./models/Sports"));
const hackathon_1 = __importDefault(require("./models/hackathon"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URL || "mongodb://localhost:27017/hackathon";
const testDatabaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🔍 Testing MongoDB Connection...");
        console.log("📍 Connecting to:", MONGO_URI);
        yield mongoose_1.default.connect(MONGO_URI);
        console.log("✅ MongoDB Connected Successfully");
        // Get database info
        const db = mongoose_1.default.connection;
        console.log("\n📊 Database Information:");
        console.log("- Database Name:", db.name);
        console.log("- Host:", db.host);
        console.log("- Port:", db.port);
        // List all collections
        if (db.db) {
            const collections = yield db.db.listCollections().toArray();
            console.log("\n📦 Existing Collections:", collections.length);
            collections.forEach((col) => {
                console.log(`  - ${col.name}`);
            });
        }
        // Test each model's connection
        console.log("\n🧪 Testing Model Connections:");
        try {
            const codingCount = yield CodingChallenge_1.default.countDocuments();
            console.log(`  ✅ CodingChallenge: ${codingCount} documents`);
        }
        catch (e) {
            console.log(`  ❌ CodingChallenge: Error`);
        }
        try {
            const codeHuntCount = yield CodeHunt_1.default.countDocuments();
            console.log(`  ✅ CodeHunt: ${codeHuntCount} documents`);
        }
        catch (e) {
            console.log(`  ❌ CodeHunt: Error`);
        }
        try {
            const posterCount = yield PosterPresentation_1.default.countDocuments();
            console.log(`  ✅ PosterPresentation: ${posterCount} documents`);
        }
        catch (e) {
            console.log(`  ❌ PosterPresentation: Error`);
        }
        try {
            const quizCount = yield TechnicalQuiz_1.default.countDocuments();
            console.log(`  ✅ TechnicalQuiz: ${quizCount} documents`);
        }
        catch (e) {
            console.log(`  ❌ TechnicalQuiz: Error`);
        }
        try {
            const sportsCount = yield Sports_1.default.countDocuments();
            console.log(`  ✅ Sports: ${sportsCount} documents`);
        }
        catch (e) {
            console.log(`  ❌ Sports: Error`);
        }
        try {
            const hackathonCount = yield hackathon_1.default.countDocuments();
            console.log(`  ✅ Hackathon: ${hackathonCount} documents`);
        }
        catch (e) {
            console.log(`  ❌ Hackathon: Error`);
        }
        try {
            const eventCount = yield EventRegistration_1.default.countDocuments();
            console.log(`  ✅ EventRegistration: ${eventCount} documents`);
        }
        catch (e) {
            console.log(`  ❌ EventRegistration: Error`);
        }
        console.log("\n✨ Database verification complete!");
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
});
testDatabaseConnection();
