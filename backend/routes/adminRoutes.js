const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();


router.post('/login', async (req, res) => {
  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).send({ error: 'email and password are required.' });
  }

  try {
  
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).send({ error: 'Invalid name or password.' });
    }

    
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
