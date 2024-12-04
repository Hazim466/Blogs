const mongoose = require('mongoose');
const { unique } = require('next/dist/build/utils');

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
  collection: 'user'  
});


const User = mongoose.model('User', adminSchema);

module.exports = User;
