const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/team — public: list active team members
router.get('/', async (req, res) => {
  try {
    const members = await TeamMember.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching team members' });
  }
});

// POST /api/team — admin-protected: create
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, position, imageUrl, quote, order } = req.body;
    const member = new TeamMember({ name, position, imageUrl, quote, order });
    const saved = await member.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Error creating team member' });
  }
});

// PUT /api/team/:id — admin-protected: update
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Team member not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating team member' });
  }
});

// DELETE /api/team/:id — admin-protected: delete
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await TeamMember.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Team member not found' });
    res.json({ message: 'Team member deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting team member' });
  }
});

module.exports = router;
