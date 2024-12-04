const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();

// Route to login an admin
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate request data
  if (!email || !password) {
    return res.status(400).send({ error: 'email and password are required.' });
  }

  try {
    // Find the admin by name
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).send({ error: 'Invalid name or password.' });
    }

    // Compare the provided password with the stored password (not hashed)
    if (password !== admin.password) {
      return res.status(400).send({ error: 'Invalid name or password.' });
    }

    // If authentication is successful, send a success response
    res.status(200).send({ message: 'Login successful', admin });

  } catch (error) {
    console.error('Error logging in admin:', error);
    res.status(500).send({ error: 'Error logging in admin', details: error.message });
  }
});

// Export the router so it can be used in index.js
module.exports = router;
