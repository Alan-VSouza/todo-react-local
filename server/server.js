const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes'); 

const app = express();

app.use(cors());
app.use(express.json()); 

app.use('/api/todos', todoRoutes); 

const PORT = process.env.PORT || 5000;

module.exports = app; 