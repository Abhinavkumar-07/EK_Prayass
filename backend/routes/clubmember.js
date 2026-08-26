const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ClubMember = require('../models/ClubMember');
const memberAuth = require('../middleware/memberAuth');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// POST /api/clubmember/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const member = await ClubMember.findOne({ username });

    if (!member) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await member.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: member._id, username: member.username, role: member.role },
      JWT_SECRET,
      { expiresIn: '7d' } // Members stay logged in longer
    );
    
    return res.json({ 
      token, 
      member: {
        id: member._id,
        username: member.username,
        name: member.name,
        role: member.role,
        attendance: member.attendance,
        imageUrl: member.imageUrl,
        events: member.events
      }
    });

  } catch (err) {
    console.error('ClubMember Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

const AttendanceLog = require('../models/AttendanceLog');

// Helper function to calculate attendance for a member
const calculateStats = (member, allLogs) => {
  const joinDate = new Date(member.createdAt);
  
  // Filter logs to only those that occurred AFTER the member joined
  const relevantLogs = allLogs.filter(log => new Date(log.date) >= joinDate);
  
  const relevantMeetings = relevantLogs.filter(log => log.type === 'Meeting');
  const relevantEvents = relevantLogs.filter(log => log.type === 'Event');

  const attendedMeetings = relevantMeetings.filter(log => log.presentMembers.some(id => id.toString() === member._id.toString()));
  const attendedEvents = relevantEvents.filter(log => log.presentMembers.some(id => id.toString() === member._id.toString()));

  const meetingPercentage = relevantMeetings.length > 0 ? Math.round((attendedMeetings.length / relevantMeetings.length) * 100) : 100;
  const eventPercentage = relevantEvents.length > 0 ? Math.round((attendedEvents.length / relevantEvents.length) * 100) : 100;

  return {
    ...member.toObject(),
    meetingAttendance: meetingPercentage,
    eventAttendance: eventPercentage,
    totalMeetings: relevantMeetings.length,
    attendedMeetings: attendedMeetings.length,
    totalEvents: relevantEvents.length,
    attendedEvents: attendedEvents.length
  };
};

// GET /api/clubmember/profile
router.get('/profile', memberAuth, async (req, res) => {
  try {
    const member = await ClubMember.findById(req.member.id).select('-passwordHash');
    if (!member) return res.status(404).json({ error: 'Member not found' });
    
    const allLogs = await AttendanceLog.find();
    res.json(calculateStats(member, allLogs));
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching profile' });
  }
});

// GET /api/clubmember/all
router.get('/all', memberAuth, async (req, res) => {
  try {
    const members = await ClubMember.find().select('-passwordHash');
    const allLogs = await AttendanceLog.find();
    
    const enrichedMembers = members.map(m => calculateStats(m, allLogs));
    res.json(enrichedMembers);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching members' });
  }
});

module.exports = router;
