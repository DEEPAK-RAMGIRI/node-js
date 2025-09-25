const express = require('express');
const router = express.Router();
const handelRefreshToken = require('../controllers/refreshTokenController');

router.get('/',handelRefreshToken);
module.exports = router;