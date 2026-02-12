import express, { Router, Request, Response } from 'express';
import Hackathon from '../models/hackathon';
import mongoose from 'mongoose';
import { upload } from '../middleware/upload';

const router: Router = express.Router();

router.get('/',  async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    try {
        const hackathons = await Hackathon.find() .sort({ teamNo: 1 }).skip(skip).limit(limit);
        res.status(200).json(hackathons);        
    } catch(err) {
        res.status(500).json({ message: 'Error fetching hackathons' });
        console.log(err);
    }
});



router.post('/', upload.array('images', 6), async (req: any, res: any) => {
  try {
    const {
      teamName,
      teamNo,
      problemStatement,
      gitHubLink,
      deploedLink,
      status,
      participants, // should be a JSON stringified array
      uiux,
      backend,
      frontend,
      deployed
    } = req.body;

    if(!teamName || !teamNo || !problemStatement || !participants) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }
    

    const parsedParticipants = JSON.parse(participants); 
    const images = req.files.map((file: any) => file.path);

    // Assign image paths to participants
    parsedParticipants.forEach((participant: any, index: number) => {
      participant.img = images[index] || '';
    });

    const newTeam = new Hackathon({
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

    await newTeam.save();
    res.status(201).json({ message: 'Team registered successfully', team: newTeam });
  } catch (err) {
    console.error('Error saving team:', err);
    res.status(500).json({ error: 'Failed to register team' });
  }
});




  
router.get('/forBoard', async (req: Request, res: Response) => {
    try {
        const hackathons = await Hackathon.find().sort({ teamNo: 1 });
        res.status(200).json(hackathons);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching hackathons' });
        console.log(err);
    }
});

router.get('/reg/:regno', async (req: any, res: any) => {
    const regno = req.params.regno;
    try {
        const hackathon = await Hackathon.findOne({ 'participants.registrationNo': regno });
        if (!hackathon) {
            return res.status(404).json({ message: 'participant team not found' });
        }
        res.status(200).json(hackathon);  
      }
      catch (err) {
        res.status(500).json({ message: 'Error fetching hackathon' });
        console.log(err);
      }
});



export default router;
