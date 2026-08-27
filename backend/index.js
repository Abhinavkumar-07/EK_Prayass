const notice = require('./routes/notice');
const admin = require('./routes/admin');
const volunteers = require('./routes/volunteers');
const sponsors = require('./routes/sponsors');
const projects = require('./routes/projects');
const team = require('./routes/team');
const uploadRoute = require('./routes/upload');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : [
      'http://localhost:5173', // for local frontend dev
      'http://localhost:5174', // if port 5173 is busy
      'https://notice-theta.vercel.app',
      'https://ek-prayass.vercel.app',
      'https://frontend-red-theta-89.vercel.app'
    ];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get('/', (req, res) => {
  res.send('Ek-prayass Website is live');
});

const clubmember = require('./routes/clubmember');

// Routes
app.use('/api/notices', notice);
app.use('/api/admin', admin);
app.use('/api/clubmember', clubmember);
app.use('/api/volunteers', volunteers);
app.use('/api/sponsors', sponsors);
app.use('/api/projects', projects);
app.use('/api/team', team);
app.use('/api/upload', uploadRoute);

// 404 catch-all
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;