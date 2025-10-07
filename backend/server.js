require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error(err));

// API Routes
app.use('/api/auth', require('./routes/authRoutes')); 
app.use('/api/resumes', require('./routes/resumeRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));