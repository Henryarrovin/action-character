const express = require('express');
const videoController = require('../controllers/videoController');

const router = express.Router();

router.get('/videos/:name', videoController.getVideoByName);

module.exports = router;
