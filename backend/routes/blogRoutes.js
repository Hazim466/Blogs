const express = require('express');
const Blog = require('../models/Blog'); 
const router = express.Router();

// Route to create a new blog
router.post('/add', async (req, res) => {
  const { title, content,image } = req.body;

  // Validate request data
  if (!title || !content || !image ) {
    return res.status(400).send({ error: 'Title and content and image are required.' });
  }

  try {
    // Create a new blog post
    const blog = new Blog({ title, content,image });

    // Save the blog to the database
    await blog.save();
    res.status(201).send({ message: 'Blog created successfully', blog });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).send({ error: 'Error creating blog', details: error.message });
  }
});

// Route to delete a blog by its ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;  // Get the blog ID from the URL parameter

  try {
    // Find the blog by ID and delete it
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).send({ error: 'Blog not found' });
    }

    res.status(200).send({ message: 'Blog deleted successfully', deletedBlog });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).send({ error: 'Error deleting blog', details: error.message });
  }
});

// Route to fetch all blogs
router.get('/all', async (req, res) => {
  try {
    // Find all blogs in the database
    const blogs = await Blog.find();

    if (blogs.length === 0) {
      return res.status(404).send({ error: 'No blogs found' });
    }

    res.status(200).send({ message: 'Blogs fetched successfully', blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).send({ error: 'Error fetching blogs', details: error.message });
  }
});


// Export the router to be used in index.js
module.exports = router;
