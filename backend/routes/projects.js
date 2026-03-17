const express = require('express');
const router = express.Router();
const Project = require('../models/ProjectModel');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/projects — public: list active projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

// POST /api/projects — admin-protected: create
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, tagline, description, images, videoUrl, colorScheme, order } = req.body;
    const project = new Project({ title, tagline, description, images, videoUrl, colorScheme, order });
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Error creating project' });
  }
});

// PUT /api/projects/:id — admin-protected: update
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Project not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating project' });
  }
});

// DELETE /api/projects/:id — admin-protected: delete
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting project' });
  }
});

module.exports = router;
