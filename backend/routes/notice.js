const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/notices — public: list all notices
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.status(200).json(notices);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching notices', err });
  }
});

// POST /api/notices — admin-protected: create notice
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, message, postedBy } = req.body;
    const newNotice = new Notice({ title, message, postedBy });
    const savedNotice = await newNotice.save();
    res.status(201).json(savedNotice);
  } catch (err) {
    res.status(500).json({ message: 'Error creating notice', err });
  }
});

// PUT /api/notices/:id — admin-protected: update notice
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Notice not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating notice' });
  }
});

// DELETE /api/notices/:id — admin-protected: delete notice
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedNotice = await Notice.findByIdAndDelete(req.params.id);
    if (!deletedNotice) {
      return res.status(404).json({ error: 'Notice not found' });
    }
    res.json({ message: 'Notice deleted successfully' });
  } catch (err) {
    console.error('Error deleting notice:', err);
    res.status(500).json({ error: 'Server error while deleting' });
  }
});

module.exports = router;