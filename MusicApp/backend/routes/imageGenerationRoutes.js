const express = require('express');
const imageGenerationController = require('../controllers/imageGenerationController');
const router = express.Router();

// Routes
router.post('/', imageGenerationController.generateImage);

module.exports = router;