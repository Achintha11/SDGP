const admin = require('firebase-admin');

// Function to verify Firebase ID token
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Unauthorized: Missing or invalid token');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid; // Store the user ID for further use
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(403).send('Forbidden: Invalid token');
  }
};

module.exports = verifyToken;