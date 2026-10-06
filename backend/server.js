import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import menuRoutes from './routes/menuRoutes.js';
import specialsRoutes from './routes/specialsRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import seedRoutes from './routes/seedRoutes.js';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

// Connect to MongoDB
connectDB();

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Brew & Bloom API is running' });
});

app.use('/api/menu', menuRoutes);
app.use('/api/todays-special', specialsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/seed', seedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
