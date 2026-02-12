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
const express_1 = __importDefault(require("express"));
const hackathon_1 = __importDefault(require("../models/hackathon"));
const upload_1 = require("../middleware/upload");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    try {
        const hackathons = yield hackathon_1.default.find().sort({ teamNo: 1 }).skip(skip).limit(limit);
        res.status(200).json(hackathons);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching hackathons' });
        console.log(err);
    }
}));
router.post('/', upload_1.upload.array('images', 6), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamName, teamNo, problemStatement, gitHubLink, deploedLink, status, participants, // should be a JSON stringified array
        uiux, backend, frontend, deployed } = req.body;
        if (!teamName || !teamNo || !problemStatement || !participants) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }
        const parsedParticipants = JSON.parse(participants);
        const images = req.files.map((file) => file.path);
        // Assign image paths to participants
        parsedParticipants.forEach((participant, index) => {
            participant.img = images[index] || '';
        });
        const newTeam = new hackathon_1.default({
            teamName,
            teamNo,
            problemStatement,
            participants: parsedParticipants,
            gitHubLink,
            deploedLink,
            status,
            uiux,
            backend,
            frontend,
            deployed,
        });
        yield newTeam.save();
        res.status(201).json({ message: 'Team registered successfully', team: newTeam });
    }
    catch (err) {
        console.error('Error saving team:', err);
        res.status(500).json({ error: 'Failed to register team' });
    }
}));
router.get('/forBoard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hackathons = yield hackathon_1.default.find().sort({ teamNo: 1 });
        res.status(200).json(hackathons);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching hackathons' });
        console.log(err);
    }
}));
router.get('/reg/:regno', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const regno = req.params.regno;
    try {
        const hackathon = yield hackathon_1.default.findOne({ 'participants.registrationNo': regno });
        if (!hackathon) {
            return res.status(404).json({ message: 'participant team not found' });
        }
        res.status(200).json(hackathon);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching hackathon' });
        console.log(err);
    }
}));
exports.default = router;
