const express = require('express');
const { registerController, loginController, testController } = require('../controllers/authController');
const { requireSignin, isAdmin } = require('../middleware/authMiddleware')

const router = express.Router();

// Registration
router.post('/register', registerController);

// Login
router.post('/login', loginController);

// Test routes
router.get('/test', requireSignin, isAdmin, testController);

//protected route auth
router.get("/user-auth", requireSignin, (req, res) => {
    res.status(200).send({ ok: true });
  });

module.exports = router;