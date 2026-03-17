const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
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
  role: {
    type: String,
    default: 'admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Static method to create admin with hashed password
adminSchema.statics.createAdmin = async function(username, plainPassword) {
  const hash = await bcrypt.hash(plainPassword, 10);
  return this.create({ username, passwordHash: hash });
};

// Instance method to check password
adminSchema.methods.comparePassword = async function(plainPassword) {
  return bcrypt.compare(plainPassword, this.passwordHash);
};

module.exports = mongoose.model('Admin', adminSchema);
