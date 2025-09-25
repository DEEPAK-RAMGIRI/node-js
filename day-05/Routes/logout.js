const express = require('express');
const router = express.Router();
const handelLogout = require('../controllers/logOutController');

router.get('/',handelLogout);
module.exports = router;