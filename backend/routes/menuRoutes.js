import express from 'express';
import MenuItem from '../models/MenuItem.js';
import { defaultMenuItems } from '../data/defaultData.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) throw new Error('DB not connected');
    const menuItems = await MenuItem.find({});
    if (menuItems.length > 0) {
      res.json(menuItems);
    } else {
      res.json(defaultMenuItems);
    }
  } catch (error) {
    res.json(defaultMenuItems);
  }
});

router.get('/:category', async (req, res) => {
  const category = req.params.category;
  try {
    if (mongoose.connection.readyState !== 1) throw new Error('DB not connected');
    const menuItems = await MenuItem.find({ category });
    if (menuItems.length > 0) {
      res.json(menuItems);
    } else {
      res.json(defaultMenuItems.filter(item => item.category === category));
    }
  } catch (error) {
    res.json(defaultMenuItems.filter(item => item.category === category));
  }
});

export default router;
