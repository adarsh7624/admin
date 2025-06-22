import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  specialization: String,
});

export default mongoose.model('Doctor', doctorSchema);