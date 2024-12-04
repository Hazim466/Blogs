const mongoose = require('mongoose');

// Define the Blog schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  
  },
  content: {
    type: String,
    required: true,  
  },
  image:{
    type:String,
    required:true,
  }
}, {
  collection: 'blogs'  
});

// Create and export the model
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
