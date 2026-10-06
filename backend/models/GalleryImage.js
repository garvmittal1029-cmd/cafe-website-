import mongoose from 'mongoose';

const galleryImageSchema = mongoose.Schema({
  url: { type: String, required: true },
  alt_text: { type: String, required: true },
  category: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.GalleryImage || mongoose.model('GalleryImage', galleryImageSchema);
