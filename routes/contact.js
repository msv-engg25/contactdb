const express = require('express');
const router = express.Router();
const cors = require('cors');  
const Review = require('../inquiry');
const sendEmail = require('../utils/sendEmail');

// Enable CORS for this router (if not globally added in app.js)
router.use(cors({
    origin: '*'  // or set to your frontend URL e.g. 'http://localhost:5000'
}));

// POST /api/reviews - Submit review
router.post('/', async (req, res) => {
    try {
        console.log('Received review data:', req.body);  // Log incoming data for debugging
        
        const newReview = new Review(req.body);
        await newReview.save();
        
        await sendEmail(req.body);
        
        res.status(200).json({ message: ' Inquiry submitted successfully!' });
    } catch (err) {
        console.error('Error saving review or sending email:', err);
        res.status(500).json({ error: 'Failed to submit details.' });
    }
});

// GET /api/reviews - Fetch all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ date: -1 });
        res.status(200).json(contacts);
    } catch (err) {
        console.error('Error fetching contacts:', err);
        res.status(500).json({ error: 'Failed to fetch reviews.' });
    }
});

// Optional: GET /api/reviews/test-fetch for debugging
router.get('/test-fetch', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(contacts);
    } catch (err) {
        console.error('Fetch error:', err);
        res.status(500).json({ error: 'Failed to fetch reviews.' });
    }
});

module.exports = router;  // <-- Correct export
