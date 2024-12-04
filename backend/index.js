const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const blogRoutes= require('./routes/blogRoutes');
const adminRoutes=require('./routes/adminRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON data
app.use(bodyParser.json());
// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/BlogApp', {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Use the user routes for handling user registration
app.use('/user', userRoutes);
app.use('/blog',blogRoutes);
app.use('/admin',adminRoutes);

// Starting the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
