const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./models');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - order is important here
app.use(express.json());  // Make sure this comes before routes
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// Import routes
const authRoutes = require('./routes/auth');

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Stock Rebel API' });
});

// Use routes
app.use('/auth', authRoutes);

// Sync database and start server
db.sequelize.sync().then(() => {
  console.log('Database synced');
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});