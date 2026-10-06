import express from 'express';
import MenuItem from '../models/MenuItem.js';
import TodaysSpecial from '../models/TodaysSpecial.js';
import GalleryImage from '../models/GalleryImage.js';
import { defaultMenuItems, defaultSpecials, defaultGallery } from '../data/defaultData.js';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
       return res.status(503).json({ error: 'Database unavailable' });
    }
    await MenuItem.deleteMany({});
    await TodaysSpecial.deleteMany({});
    await GalleryImage.deleteMany({});

    await MenuItem.insertMany(defaultMenuItems);
    await TodaysSpecial.insertMany(defaultSpecials);
    await GalleryImage.insertMany(defaultGallery);

    res.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to seed database' });
  }
});

export default router;
