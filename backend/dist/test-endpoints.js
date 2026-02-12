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
const CodeHunt_1 = __importDefault(require("./models/CodeHunt"));
const CodingChallenge_1 = __importDefault(require("./models/CodingChallenge"));
const PosterPresentation_1 = __importDefault(require("./models/PosterPresentation"));
const TechnicalQuiz_1 = __importDefault(require("./models/TechnicalQuiz"));
const Sports_1 = __importDefault(require("./models/Sports"));
const hackathon_1 = __importDefault(require("./models/hackathon"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URL || "mongodb://localhost:27017/hackathon";
const testEndpoints = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGO_URI);
        console.log("✅ MongoDB Connected");
        const results = {};
        // Test each event endpoint
        const events = [
            { name: "Coding Challenge", model: CodingChallenge_1.default },
            { name: "Code Hunt", model: CodeHunt_1.default },
            { name: "Poster Presentation", model: PosterPresentation_1.default },
            { name: "Technical Quiz", model: TechnicalQuiz_1.default },
            { name: "Sports", model: Sports_1.default },
            { name: "Hackathon", model: hackathon_1.default },
        ];
        for (const event of events) {
            try {
                const count = yield event.model.countDocuments();
                const sample = yield event.model.findOne();
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
            }
            catch (err) {
                results[event.name] = { error: err.message };
                console.log(`\n❌ ${event.name}: ${err.message}`);
            }
        }
        console.log("\n\n📋 SUMMARY:");
        console.log(JSON.stringify(results, null, 2));
        yield mongoose_1.default.disconnect();
        console.log("\n✅ Disconnected from MongoDB");
    }
    catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
});
testEndpoints();
