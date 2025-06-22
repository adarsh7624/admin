import express from 'express';
console.log("✅ authRoutes loaded");
import Appointment from '../models/Appointment.js';

const router = express.Router();

// GET appointments by doctorId
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.params.doctorId });
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;