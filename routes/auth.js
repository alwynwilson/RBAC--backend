const express = require('express');
const router = express.Router();
const { loginUser, registerSuperAdmin } = require('../controllers/authController');

router.post('/register-superadmin', registerSuperAdmin);

router.post('/login', loginUser);

module.exports = router;