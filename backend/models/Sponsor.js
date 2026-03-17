const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  logoUrl: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  tier: {
    type: String,
    enum: ['Gold', 'Silver', 'Bronze'],
    default: 'Bronze'
  },
  description: {
    type: String,
    default: ''
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

module.exports = mongoose.model('Sponsor', sponsorSchema);
