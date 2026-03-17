const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/volunteers — public: save a volunteer application
router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, purpose, volunteerRole, message } = req.body;
    const volunteer = new Volunteer({
      fullName,
      email,
      phone,
      purpose,
      volunteerRole,
      message
    });
    const saved = await volunteer.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving volunteer:', err);
    res.status(500).json({ error: 'Error saving volunteer application' });
  }
});

// GET /api/volunteers — admin-protected: list all applications
router.get('/', authMiddleware, async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching volunteers' });
  }
});

// PATCH /api/volunteers/:id — admin-protected: update status
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Volunteer not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating volunteer' });
  }
});

// DELETE /api/volunteers/:id — admin-protected: delete
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Volunteer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Volunteer not found' });
    res.json({ message: 'Volunteer deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting volunteer' });
  }
});

module.exports = router;
