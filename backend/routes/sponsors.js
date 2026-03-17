const express = require('express');
const router = express.Router();
const Sponsor = require('../models/Sponsor');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/sponsors — public: list active sponsors
router.get('/', async (req, res) => {
  try {
    const sponsors = await Sponsor.find({ isActive: true }).sort({ tier: 1, createdAt: -1 });
    res.json(sponsors);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching sponsors' });
  }
});

// POST /api/sponsors — admin-protected: create
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, logoUrl, website, tier, description } = req.body;
    const sponsor = new Sponsor({ name, logoUrl, website, tier, description });
    const saved = await sponsor.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Error creating sponsor' });
  }
});

// PUT /api/sponsors/:id — admin-protected: update
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Sponsor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Sponsor not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating sponsor' });
  }
});

// DELETE /api/sponsors/:id — admin-protected: delete
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Sponsor.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Sponsor not found' });
    res.json({ message: 'Sponsor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting sponsor' });
  }
});

module.exports = router;
