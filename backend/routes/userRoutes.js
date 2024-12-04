const express = require('express');
const User = require('../models/User');
const router = express.Router(); // Create a router instance

// Route to create a user (register)
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Validate request data
  if (!email || !password) {
    return res.status(400).send({ error: 'Email and password are required.' });
  }

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'Email already exists.' });
    }

    // Create a new user without hashing the password
    const user = new User({ email, password });

    // Save the user to the database
    await user.save();
    res.status(201).send({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ error: 'Error creating user', details: error.message });
  }
});

// Route to login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate request data
  if (!email || !password) {
    return res.status(400).send({ error: 'Email and password are required.' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'Invalid email or password.' });
    }

    // Compare the provided password with the stored password (not hashed)
    if (password !== user.password) {
      return res.status(400).send({ error: 'Invalid email or password.' });
    }

    // If authentication is successful, send a success response
    res.status(200).send({ message: 'Login successful', user });

  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send({ error: 'Error logging in user', details: error.message });
  }
});

// Export the router so it can be used in index.js
module.exports = router;
