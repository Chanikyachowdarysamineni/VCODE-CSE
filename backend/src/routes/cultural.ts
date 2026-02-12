import express, { Router } from "express";
import Cultural from "../models/Cultural";

const router: Router = express.Router();

// Get all cultural event registrations
router.get("/all", async (req: any, res: any) => {
  try {
    const registrations = await Cultural.find();
    return res.status(200).json({
      message: "All cultural event registrations",
      count: registrations.length,
      registrations,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

// Get registrations by event name
router.get("/:eventName", async (req: any, res: any) => {
  try {
    const { eventName } = req.params;
    const registrations = await Cultural.find({ eventName });
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

// Register for cultural event
router.post("/register", async (req: any, res: any) => {
  try {
    const { name, email, registrationNo, phoneNo, section, year, eventName } =
      req.body;

    // Validate required fields
    if (!name || !email || !registrationNo || !phoneNo || !section || !year || !eventName) {
      return res.status(400).json({
        error: "All fields (name, email, registrationNo, phoneNo, section, year, eventName) are required",
      });
    }

    // Check for duplicate registration
    const existingRegistration = await Cultural.findOne({
      registrationNo,
      eventName,
    });

    if (existingRegistration) {
      return res.status(409).json({
        error: "You have already registered for this event.",
      });
    }

    // Create new registration
    const culturalRegistration = new Cultural({
      name,
      email,
      registrationNo,
      phoneNo,
      section,
      year,
      eventName,
    });

    await culturalRegistration.save();

    return res.status(201).json({
      message: "Successfully registered for cultural event",
      registration: culturalRegistration,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
