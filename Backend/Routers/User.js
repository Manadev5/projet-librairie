const express = require('express');
const router = express.Router();
const userCtrl = require('../Controllers/User')

router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signUp);

module.exports = router