import mongoose from 'mongoose';

const todaysSpecialSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String },
  available_until: { type: String },
  desc: { type: String },
}, { timestamps: true });

export default mongoose.models.TodaysSpecial || mongoose.model('TodaysSpecial', todaysSpecialSchema);
