const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Inquiry = require('../models/Inquiry');

router.post('/', async (req, res) => {
  const { fullName, company, email, phone, subject, inquiry, message } = req.body;

  try {
    // Save to database
    const newInquiry = new Inquiry({ fullName, company, email, phone, subject, inquiry, message });
    await newInquiry.save();

    // Email setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Inquiry: ${subject}`,
      text: `
New inquiry received:

Full Name: ${fullName}
Company: ${company}
Email: ${email}
Phone: ${phone}
Subject: ${subject}
Inquiry Type: ${inquiry}
Message:
${message}
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Inquiry submitted and email sent.' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Error processing your request.' });
  }
});

module.exports = router;
