import express from 'express';
import GalleryImage from '../models/GalleryImage.js';
import { defaultGallery } from '../data/defaultData.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) throw new Error('DB not connected');
    const images = await GalleryImage.find({});
    if (images.length > 0) {
      res.json(images);
    } else {
      res.json(defaultGallery);
    }
  } catch (error) {
    res.json(defaultGallery);
  }
});

export default router;
