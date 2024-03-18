const express = require('express');
const verifyToken = require('../controllers/verifyToken');

const AuthRouter = express.Router();

// Protected route example (requires verified token)
AuthRouter.get('/protected-resource', verifyToken, (req, res) => {
  console.log(req.body);
  // Access user data or perform actions using req.uid
  res.status(200).send('This is a protected resource!');
});

module.exports = AuthRouter;