'use strict';
const express = require('express');
const router = express.Router();

// example
router.use('/quiz', require('./quiz'));

module.exports = router;
