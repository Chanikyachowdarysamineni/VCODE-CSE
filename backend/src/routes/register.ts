import express, { Router, Request, Response } from "express";
import EventRegistration from "../models/EventRegistration";
import CodeHunt from "../models/CodeHunt";
import CodingChallenge from "../models/CodingChallenge";
import PosterPresentation from "../models/PosterPresentation";
import TechnicalQuiz from "../models/TechnicalQuiz";
import Sports from "../models/Sports";
import Hackathon from "../models/hackathon";

const router: Router = express.Router();

const eventParticipants: { [key: string]: number } = {
  "Coding Challenge": 1,
  "Hackathon": 5,
  "Poster Presentation": 1,
  "Technical Quiz": 4,
  "Code Hunt": 3,
  "Sports": 1,
};

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.get("/all/:eventName", async (req: any, res: any) => {
  try {
    const { eventName } = req.params;

    let registrations;

    switch (eventName) {
      case "Coding Challenge":
        registrations = await CodingChallenge.find();
        break;
      case "Code Hunt":
        registrations = await CodeHunt.find();
        break;
      case "Poster Presentation":
        registrations = await PosterPresentation.find();
        break;
      case "Technical Quiz":
        registrations = await TechnicalQuiz.find();
        break;
      case "Sports":
        registrations = await Sports.find();
        break;
      case "Hackathon":
        registrations = await Hackathon.find();
        break;
      default:
        registrations = await EventRegistration.find({ eventName });
    }

    return res.status(200).json({
      message: `All ${eventName} registrations`,
      count: registrations.length,
      registrations,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req: any, res: any) => {
  try {
    const { eventName, participants, teamName, topic, teamNo, problemStatement, gitHubLink, deploedLink } = req.body;

    if (!eventParticipants[eventName]) {
      return res.status(400).json({ error: "Invalid event name" });
    }

    if (eventName !== "Hackathon" && eventName !== "Sports") {
      if (participants.length !== eventParticipants[eventName]) {
        return res.status(400).json({
          error: `This event requires ${eventParticipants[eventName]} participants.`,
        });
      }
    }

    // DUPLICATE CHECK - Check if any participant already registered for this event
    console.log(`\n🔍 Checking duplicates for ${eventName}...`);
    
    const regNos = participants.map((p: any) => p.registrationNo);
    console.log(`Registration numbers to check: ${regNos.join(", ")}`);
    
    if (eventName === "Coding Challenge") {
      const regNo = participants[0].registrationNo;
      const existingReg = await CodingChallenge.findOne({
        "participants.registrationNo": regNo,
      });
      console.log(`Coding Challenge - Looking for ${regNo}:`, existingReg ? "FOUND" : "NOT FOUND");
      if (existingReg) {
        return res.status(409).json({
          error: "You have already registered for this event.",
        });
      }
    } 
    else if (eventName === "Code Hunt") {
      // Check for duplicates within the team
      const uniqueRegNos = new Set(regNos);
      if (uniqueRegNos.size !== regNos.length) {
        return res.status(400).json({
          error: "Duplicate registration numbers within team. Each team member must have unique registration number.",
        });
      }
      
      // Check if any team member already registered for Code Hunt
      for (const regNo of regNos) {
        const existingReg = await CodeHunt.findOne({
          "participants.registrationNo": regNo,
        });
        console.log(`Code Hunt - Looking for ${regNo}:`, existingReg ? "FOUND" : "NOT FOUND");
        if (existingReg) {
          return res.status(409).json({
            error: "You have already registered for this event.",
          });
        }
      }
    } 
    else if (eventName === "Poster Presentation") {
      const regNo = participants[0].registrationNo;
      const existingReg = await PosterPresentation.findOne({
        "participants.registrationNo": regNo,
      });
      console.log(`Poster - Looking for ${regNo}:`, existingReg ? "FOUND" : "NOT FOUND");
      if (existingReg) {
        return res.status(409).json({
          error: "You have already registered for this event.",
        });
      }
    } 
    else if (eventName === "Technical Quiz") {
      // Check for duplicates within the team
      const uniqueRegNos = new Set(regNos);
      if (uniqueRegNos.size !== regNos.length) {
        return res.status(400).json({
          error: "Duplicate registration numbers within team. Each team member must have unique registration number.",
        });
      }
      
      // Check if any team member already registered for Technical Quiz
      for (const regNo of regNos) {
        const existingReg = await TechnicalQuiz.findOne({
          "participants.registrationNo": regNo,
        });
        console.log(`Quiz - Looking for ${regNo}:`, existingReg ? "FOUND" : "NOT FOUND");
        if (existingReg) {
          return res.status(409).json({
            error: "You have already registered for this event.",
          });
        }
      }
    } 
    else if (eventName === "Sports") {
      const regNo = participants[0].registrationNo;
      const existingReg = await Sports.findOne({
        registrationNo: regNo,
      });
      console.log(`Sports - Looking for ${regNo}:`, existingReg ? "FOUND" : "NOT FOUND");
      if (existingReg) {
        return res.status(409).json({
          error: "You have already registered for this event.",
        });
      }
    } 
    else if (eventName === "Hackathon") {
      // Check for duplicates within the team
      const uniqueRegNos = new Set(regNos);
      if (uniqueRegNos.size !== regNos.length) {
        return res.status(400).json({
          error: "Duplicate registration numbers in team. Each member must have unique registration number.",
        });
      }
      
      // Check if any team member already registered for Hackathon
      for (const regNo of regNos) {
        const existingReg = await Hackathon.findOne({
          "participants.registrationNo": regNo,
        });
        console.log(`Hackathon - Looking for ${regNo}:`, existingReg ? "FOUND" : "NOT FOUND");
        if (existingReg) {
          return res.status(409).json({
            error: "You have already registered for this event.",
          });
        }
      }
    }

    // Validation for non-sports events - Mandatory Core Fields
    if (eventName !== "Sports") {
      for (let i = 0; i < participants.length; i++) {
        const participant = participants[i];
        
        // Check mandatory fields
        if (!participant.name || !participant.name.trim()) {
          return res.status(400).json({
            error: `Participant ${i + 1}: Student name is required.`,
          });
        }
        if (!participant.email || !participant.email.trim()) {
          return res.status(400).json({
            error: `Participant ${i + 1}: Email is required.`,
          });
        }
        if (!participant.registrationNo || !participant.registrationNo.trim()) {
          return res.status(400).json({
            error: `Participant ${i + 1}: Registration number is required.`,
          });
        }
        if (!participant.phoneNo || !participant.phoneNo.trim()) {
          return res.status(400).json({
            error: `Participant ${i + 1}: Phone number is required.`,
          });
        }
        if (!participant.section || !participant.section.trim()) {
          return res.status(400).json({
            error: `Participant ${i + 1}: Section is required.`,
          });
        }
        if (!participant.year) {
          return res.status(400).json({
            error: `Participant ${i + 1}: Year is required.`,
          });
        }
      }

      // Validate format of mandatory fields
      for (let i = 0; i < participants.length; i++) {
        const participant = participants[i];
        
        if (participant.phoneNo.length !== 10 || !participant.phoneNo.match(/^\d+$/)) {
          return res.status(400).json({
            error: `Participant ${i + 1}: Phone number must be exactly 10 digits.`,
          });
        }
        // Validate registration number format: dddlldd(d/l)dd
        const regnoRegex = /^[0-9]{3}[a-zA-Z]{2}[0-9]{2}[0-9a-zA-Z][0-9]{2}$/;
        if (!regnoRegex.test(participant.registrationNo)) {
          return res.status(400).json({
            error: `Participant ${i + 1}: Registration number format should be: 3 digits, 2 letters, 2 digits, 1 digit/letter, 2 digits (e.g., 123AB45C67).`,
          });
        }
        if (!participant.email.includes("@")) {
          return res.status(400).json({
            error: `Participant ${i + 1}: Invalid email format.`,
          });
        }
      }
    }

    // Validation for Sports event - Mandatory Core Fields + Sports Fields
    if (eventName === "Sports") {
      const participant = participants[0];
      
      // Check mandatory core fields
      if (!participant.name || !participant.name.trim()) {
        return res.status(400).json({
          error: "Student name is required.",
        });
      }
      if (!participant.email || !participant.email.trim()) {
        return res.status(400).json({
          error: "Email is required.",
        });
      }
      if (!participant.registrationNo || !participant.registrationNo.trim()) {
        return res.status(400).json({
          error: "Registration number is required.",
        });
      }
      if (!participant.phoneNo || !participant.phoneNo.trim()) {
        return res.status(400).json({
          error: "Phone number is required.",
        });
      }
      if (!participant.section || !participant.section.trim()) {
        return res.status(400).json({
          error: "Section is required.",
        });
      }
      if (!participant.year || !participant.year.toString().trim()) {
        return res.status(400).json({
          error: "Year is required.",
        });
      }
      
      // Check sports-specific fields
      if (!participant.sportName || !participant.sportName.trim()) {
        return res.status(400).json({
          error: "Sport name is required.",
        });
      }
      if (!participant.department || !participant.department.trim()) {
        return res.status(400).json({
          error: "Department is required.",
        });
      }
      if (!participant.teamName || !participant.teamName.trim()) {
        return res.status(400).json({
          error: "Team name is required.",
        });
      }
      if (!participant.role || !participant.role.trim()) {
        return res.status(400).json({
          error: "Role is required.",
        });
      }
      
      // Validate format
      if (participant.phoneNo.length !== 10 || !participant.phoneNo.match(/^\d+$/)) {
        return res.status(400).json({
          error: "Phone number must be exactly 10 digits.",
        });
      }
      // Validate registration number format: dddlldd(d/l)dd
      const regnoRegex = /^[0-9]{3}[a-zA-Z]{2}[0-9]{2}[0-9a-zA-Z][0-9]{2}$/;
      if (!regnoRegex.test(participant.registrationNo)) {
        return res.status(400).json({
          error: "Registration number format should be: 3 digits, 2 letters, 2 digits, 1 digit/letter, 2 digits (e.g., 123AB45C67).",
        });
      }
      if (!participant.email.includes("@")) {
        return res.status(400).json({
          error: "Invalid email format.",
        });
      }
    }

    // Validation for specific events requiring additional fields
    if (eventName === "Code Hunt" && !teamName) {
      return res.status(400).json({ error: "Team name is required for Code Hunt" });
    }

    if (eventName === "Technical Quiz" && !teamName) {
      return res.status(400).json({ error: "Team name is required for Technical Quiz" });
    }

    if (eventName === "Poster Presentation" && !topic) {
      return res.status(400).json({ error: "Topic is required for Poster Presentation" });
    }

    if (eventName === "Hackathon") {
      if (!teamName || !teamNo || !problemStatement) {
        return res.status(400).json({ 
          error: "Team name, team number, and problem statement are required for Hackathon" 
        });
      }
    }

    let registration;

    switch (eventName) {
      case "Coding Challenge":
        registration = new CodingChallenge({
          participants,
        });
        break;
      case "Code Hunt":
        registration = new CodeHunt({
          participants,
          teamName,
        });
        break;
      case "Poster Presentation":
        registration = new PosterPresentation({
          participants,
          topic,
        });
        break;
      case "Technical Quiz":
        registration = new TechnicalQuiz({
          participants,
          teamName,
        });
        break;
      case "Sports":
        const {
          name,
          email,
          registrationNo,
          gender,
          section,
          sportName,
          year,
          department,
          teamName: sportTeamName,
          role,
          phoneNo,
        } = participants[0];
        registration = new Sports({
          name,
          email,
          registrationNo,
          gender,
          section,
          sportName,
          year,
          department,
          teamName: sportTeamName,
          role,
          phoneNo,
        });
        break;
      case "Hackathon":
        registration = new Hackathon({
          teamName,
          teamNo,
          problemStatement,
          participants,
          gitHubLink,
          deploedLink,
        });
        break;
      default:
        registration = new EventRegistration({
          eventName,
          participants,
        });
    }

    await registration.save();
    return res.status(201).json({
      message: "Registration successful",
      registration,
    });
  } catch (error: any) {
    console.log("Registration Error:", error.message);
    
    // Handle MongoDB duplicate key error
    if (error.code === 11000 || error.message.includes("duplicate key")) {
      return res.status(409).json({
        error: "You have already registered for this event.",
      });
    }
    
    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: Object.values(error.errors)
          .map((e: any) => e.message)
          .join(", "),
      });
    }
    
    console.log("Full error:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
});

export default router;
