import express from 'express';
import TodaysSpecial from '../models/TodaysSpecial.js';
import { defaultSpecials } from '../data/defaultData.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) throw new Error('DB not connected');
    const specials = await TodaysSpecial.find({});
    if (specials.length > 0) {
      res.json(specials);
    } else {
      res.json(defaultSpecials);
    }
  } catch (error) {
    res.json(defaultSpecials);
  }
});

export default router;
