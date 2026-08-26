const mongoose = require('mongoose');

const attendanceLogSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Meeting', 'Event'],
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  purpose: {
    type: String,
    required: true
  },
  presentMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClubMember'
  }],
  loggedBy: {
    type: String,
    default: 'Admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AttendanceLog', attendanceLogSchema);
