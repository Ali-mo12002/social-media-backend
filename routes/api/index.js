const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Use user and thought routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;