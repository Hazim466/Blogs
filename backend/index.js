const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const blogRoutes= require('./routes/blogRoutes');
const adminRoutes=require('./routes/adminRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(express.json()); 
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/BlogApp', {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});


app.use('/user', userRoutes);
app.use('/blog',blogRoutes);
app.use('/admin',adminRoutes);


const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
