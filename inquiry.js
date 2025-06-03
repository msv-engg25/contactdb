const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  fullName: String,
  company: String,
  email: String,
  phone: String,
  subject: String,
  inquiry: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Inquiry', inquirySchema);
