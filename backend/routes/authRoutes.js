const express = require('express');
const {
    signUp,
    signIn,
    signOut
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signUp); // User signup
router.post('/signin', signIn); // User login
router.post('/signout', signOut); // User logout

module.exports = router;
