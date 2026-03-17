const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  tagline: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  videoUrl: {
    type: String,
    default: ''
  },
  colorScheme: {
    type: String,
    enum: ['cyan', 'teal', 'green', 'pink', 'purple', 'sky'],
    default: 'cyan'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);
