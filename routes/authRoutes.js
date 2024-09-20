const express = require('express');
const router = express.Router();
const auth = require('../controllers/authCon');

router.get('/', auth.index);
router.get('/profile', auth.profile)
router.get('/login', auth.loginForm);
router.post('/login', auth.login);
router.get('/signup', auth.signupForm);
router.post('/signup', auth.signup);
router.get('/logout', auth.logout);

module.exports = router;