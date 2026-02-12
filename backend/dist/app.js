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
const express_1 = __importDefault(require("express"));
const register_1 = __importDefault(require("./routes/register"));
const hackathon_1 = __importDefault(require("./routes/hackathon"));
const cultural_1 = __importDefault(require("./routes/cultural"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://vcode-m6ni.onrender.com",
    "http://localhost:8000",
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
const MONGO_URI = process.env.MONGO_URL || "mongodb://localhost:27017/hackathon";
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGO_URI);
        console.log("MongoDB Connected Successfully");
    }
    catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
});
connectDB();
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/hackathon", hackathon_1.default);
app.use("/api/cultural", cultural_1.default);
app.use('/api/register', register_1.default);
app.use('/*', (req, res) => {
    res.status(404).send('404 Not Found1');
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
