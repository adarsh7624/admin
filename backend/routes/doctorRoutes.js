import express from "express";
import Doctor from "../models/Doctor.js"; // Note: use .js extension if using ESM
console.log("✅ authRoutes loaded");

const router = express.Router();

router.get("/", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

router.post("/", async (req, res) => {
  const newDoc = new Doctor(req.body);
  await newDoc.save();
  res.json({ message: "Doctor saved successfully!" });
});

export default router; 