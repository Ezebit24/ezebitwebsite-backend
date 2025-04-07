const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
const connectDB = require('./src/config/database');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to Database
// connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));

// Routes
const userRoutes = require('./src/routes/userRoutes');

// API routes
app.use('/api', userRoutes);



// Error handling middleware
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Server setup
const PORT = process.env.PORT || 5000;

app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;