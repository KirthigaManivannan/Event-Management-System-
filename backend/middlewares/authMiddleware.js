const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure 'User.js' matches this casing

const authMiddleware = async (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, return an error
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    // Verify the token using the JWT_SECRET from the .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the userId to the request object
    req.userId = decoded.userId;

    // Optionally, fetch the user from the database (if needed for additional checks)
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
