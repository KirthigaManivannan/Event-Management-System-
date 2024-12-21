const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for cross-origin requests

// Routes
app.use('/api/auth', require('./routes/auth')); // Authentication routes
app.use('/api/events', require('./routes/events')); // Event management routes

// Ensure MONGO_URI is loaded correctly
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in the .env file.');
  process.exit(1); // Exit the process if MONGO_URI is not defined
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected: event-management-system database'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process if the connection fails
  });

// Handling Uncaught Routes (404 errors)
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
