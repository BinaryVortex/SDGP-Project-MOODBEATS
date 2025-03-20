const express = require('express');
const transcriptionRoutes = require('./transcriptionRoutes');
const imageGenerationRoutes = require('./imageGenerationRoutes');
const testController = require('../controllers/testController');

const router = express.Router();

// Test route
router.get('/test', testController.testConnection);

// Mount other route groups
router.use('/transcribe', transcriptionRoutes);
router.use('/generate-image', imageGenerationRoutes);

module.exports = router;