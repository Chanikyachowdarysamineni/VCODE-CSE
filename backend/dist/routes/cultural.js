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
const Cultural_1 = __importDefault(require("../models/Cultural"));
const router = express_1.default.Router();
// Get all cultural event registrations
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registrations = yield Cultural_1.default.find();
        return res.status(200).json({
            message: "All cultural event registrations",
            count: registrations.length,
            registrations,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}));
// Get registrations by event name
router.get("/:eventName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventName } = req.params;
        const registrations = yield Cultural_1.default.find({ eventName });
        return res.status(200).json({
            message: `All ${eventName} registrations`,
            count: registrations.length,
            registrations,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}));
// Register for cultural event
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, registrationNo, phoneNo, section, year, eventName } = req.body;
        // Validate required fields
        if (!name || !email || !registrationNo || !phoneNo || !section || !year || !eventName) {
            return res.status(400).json({
                error: "All fields (name, email, registrationNo, phoneNo, section, year, eventName) are required",
            });
        }
        // Check for duplicate registration
        const existingRegistration = yield Cultural_1.default.findOne({
            registrationNo,
            eventName,
        });
        if (existingRegistration) {
            return res.status(409).json({
                error: "You have already registered for this event.",
            });
        }
        // Create new registration
        const culturalRegistration = new Cultural_1.default({
            name,
            email,
            registrationNo,
            phoneNo,
            section,
            year,
            eventName,
        });
        yield culturalRegistration.save();
        return res.status(201).json({
            message: "Successfully registered for cultural event",
            registration: culturalRegistration,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
