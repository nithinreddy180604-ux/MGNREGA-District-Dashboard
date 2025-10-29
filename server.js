const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');

// Initialize express app
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/projects', require('./routes/api/projects'));
app.use('/api/jobcards', require('./routes/api/jobcards'));
app.use('/api/attendance', require('./routes/api/attendance'));
app.use('/api/payments', require('./routes/api/payments'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));