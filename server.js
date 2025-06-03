require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const contactRoutes = require('./routes/contact');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

if (!mongoURI || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ Missing environment variables. Check your .env file.");
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
