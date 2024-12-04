const mongoose = require('mongoose');
const { unique } = require('next/dist/build/utils');

// Define the Admin schema
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  }
}, {
  collection: 'user'  // Explicitly set collection name
});

// Create and export the model
const User = mongoose.model('User', adminSchema);

module.exports = User;
