import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointments.js';

dotenv.config();

const app = express(); // ✅ Create app first

app.use(cors());
app.use(express.json());

// ✅ Mount routes
app.use('/api/auth', authRoutes);
console.log("✅ Mounted /api/auth routes");

app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);


// ✅ Optional 404 catcher to debug invalid paths
app.use((req, res) => {
  res.status(404).send(`❌ Route not found: ${req.method} ${req.originalUrl}`);
});

// ✅ Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log('🚀 Server running on port', process.env.PORT || 5000);
    });
  })
  .catch(err => console.error('❌ DB connection failed:', err));
  