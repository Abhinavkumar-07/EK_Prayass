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

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

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

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// GET /api/admin/verify — verify token validity
router.get('/verify', authMiddleware, (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

// --- Club Member Management ---
const ClubMember = require('../models/ClubMember');

// GET all club members
router.get('/clubmembers', authMiddleware, async (req, res) => {
  try {
    const members = await ClubMember.find().select('-passwordHash').sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new club member
router.post('/clubmembers', authMiddleware, async (req, res) => {
  try {
    const { username, password, name, role, attendance, imageUrl } = req.body;
    const existing = await ClubMember.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    const member = await ClubMember.createMember(username, password, name, role, imageUrl);
    if (attendance) member.attendance = attendance;
    await member.save();
    
    // exclude password
    const memberData = member.toObject();
    delete memberData.passwordHash;
    res.status(201).json(memberData);
  } catch (err) {
    res.status(500).json({ error: 'Server error creating member' });
  }
});

// PUT update club member
router.put('/clubmembers/:id', authMiddleware, async (req, res) => {
  try {
    const { name, role, attendance, imageUrl } = req.body;
    const member = await ClubMember.findByIdAndUpdate(
      req.params.id,
      { name, role, attendance, imageUrl },
      { new: true }
    ).select('-passwordHash');
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: 'Server error updating member' });
  }
});

// DELETE club member
router.delete('/clubmembers/:id', authMiddleware, async (req, res) => {
  try {
    await ClubMember.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error deleting member' });
  }
});

// --- Attendance Management ---
const AttendanceLog = require('../models/AttendanceLog');

// GET all attendance logs
router.get('/attendance', authMiddleware, async (req, res) => {
  try {
    const logs = await AttendanceLog.find().sort({ date: -1 }).populate('presentMembers', 'name username');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new attendance log
router.post('/attendance', authMiddleware, async (req, res) => {
  try {
    const { type, date, purpose, presentMembers } = req.body;
    const log = new AttendanceLog({ type, date, purpose, presentMembers });
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: 'Server error creating attendance log' });
  }
});

module.exports = router;
