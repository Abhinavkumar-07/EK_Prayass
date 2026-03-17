const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const authMiddleware = require('../middleware/authMiddleware');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check the Admin collection first
    let admin = await Admin.findOne({ username });

    if (admin) {
      const isValid = await admin.comparePassword(password);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign(
        { id: admin._id, username: admin.username, role: admin.role },
        JWT_SECRET,
        { expiresIn: '4h' }
      );
      return res.json({ token, username: admin.username });
    }

    // Fallback: check legacy hardcoded admin (backward compatible)
    const LEGACY_ID = 'ekp123';
    const LEGACY_HASH = '$2b$10$GNV5PyrP4GkAdv9Cix8eDuzCYaJQnAPinZ/yGfh.SnrBUXQ7qh0fq';

    if (username === LEGACY_ID) {
      const isValid = await bcrypt.compare(password, LEGACY_HASH);
      if (isValid) {
        const token = jwt.sign({ id: LEGACY_ID, role: 'admin' }, JWT_SECRET, { expiresIn: '4h' });
        return res.json({ token, username: LEGACY_ID });
      }
    }

    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// GET /api/admin/verify — verify token validity
router.get('/verify', authMiddleware, (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

// POST /api/admin/seed — create initial admin (use once, then disable)
router.post('/seed', async (req, res) => {
  try {
    const existing = await Admin.findOne({ username: 'ekp123' });
    if (existing) {
      return res.status(400).json({ error: 'Admin already exists' });
    }
    const admin = await Admin.createAdmin('ekp123', 'ekp123');
    res.status(201).json({ message: 'Admin created successfully', username: admin.username });
  } catch (err) {
    console.error('Seed error:', err);
    res.status(500).json({ error: 'Error seeding admin' });
  }
});

module.exports = router;
