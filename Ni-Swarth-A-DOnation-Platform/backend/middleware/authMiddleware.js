// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // Check if the request has an Authorization header and if it starts with "Bearer "
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token from the header (after "Bearer ")
      token = req.headers.authorization.split(' ')[1];

      // Verify if the token is valid using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from the database using the ID in the token
      // We exclude the password for security reasons
      req.user = await User.findById(decoded.id).select('-password');

      // Allow the request to proceed to the next step (the actual route handler)
      next();
    } catch (error) {
      // If the token is invalid or expired, log the error and send an "Unauthorized" response
      console.error('Authentication error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If there's no token in the header, send an "Unauthorized" response
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};