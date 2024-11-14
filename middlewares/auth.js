const jwt = require('jsonwebtoken');

// Middleware function to verify token and extract user ID
const verifyToken = (req, res, next) => {
  const {token} = req.body;
  // Check if token is provided
  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Attach user ID to the request object
    // console.log(decoded);
    req.body.userId = decoded.id;
    console.log("I am at middleware");
    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = verifyToken;
