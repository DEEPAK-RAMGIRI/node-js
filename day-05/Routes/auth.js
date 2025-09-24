const express = require('express');
const router = express.Router();
const handelLogin = require('../controllers/authController');

router.post('/',handelLogin);
module.exports = router;