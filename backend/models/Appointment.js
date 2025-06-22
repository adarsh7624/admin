import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctorId: { type: String, required: true },
  issue: { type: String },
  date: { type: String },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;