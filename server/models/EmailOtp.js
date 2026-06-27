const mongoose = require('mongoose');

const EmailOtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  otp: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    default: 'signup'
  },
  expiresAt: {
    type: Date,
    required: true
  }
}, { timestamps: true });

EmailOtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('EmailOtp', EmailOtpSchema);
