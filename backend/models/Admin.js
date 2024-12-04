const mongoose = require('mongoose');

// Define the Admin schema
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
}, {
  collection: 'admin'  // Explicitly set collection name
});

// Create and export the model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
