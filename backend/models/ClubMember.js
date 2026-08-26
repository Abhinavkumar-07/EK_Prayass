const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const clubMemberSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'Member'
  },
  attendance: {
    type: String,
    default: '0%' // e.g., '85%' or '10/12'
  },
  imageUrl: {
    type: String,
    default: ''
  },
  events: [{
    title: String,
    date: Date,
    status: {
      type: String,
      enum: ['upcoming', 'completed', 'missed'],
      default: 'upcoming'
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Static method to create member with hashed password
clubMemberSchema.statics.createMember = async function(username, plainPassword, name, role, imageUrl) {
  const hash = await bcrypt.hash(plainPassword, 10);
  return this.create({ 
    username, 
    passwordHash: hash, 
    name, 
    role: role || 'Member',
    imageUrl: imageUrl || ''
  });
};

// Instance method to check password
clubMemberSchema.methods.comparePassword = async function(plainPassword) {
  return bcrypt.compare(plainPassword, this.passwordHash);
};

module.exports = mongoose.model('ClubMember', clubMemberSchema);
