const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');

const upload = multer({ storage: multer.memoryStorage() });

// POST /api/upload — admin-protected: upload image to ImgBB
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'ImgBB API key not configured. Add IMGBB_API_KEY to your .env file.' });
    }

    const base64Image = req.file.buffer.toString('base64');
    
    const formData = new URLSearchParams();
    formData.append('image', base64Image);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      res.json({ url: data.data.url });
    } else {
      console.error('ImgBB error:', data);
      res.status(500).json({ error: 'Failed to upload to ImgBB' });
    }
  } catch (err) {
    console.error('Upload route error:', err);
    res.status(500).json({ error: 'Server error during upload' });
  }
});

module.exports = router;
