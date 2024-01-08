const express = require('express');
const { registerController, loginController, testController, forgetPasswordController } = require('../controllers/authController');
const { requireSignin, isAdmin } = require('../middleware/authMiddleware')

const router = express.Router();

// Registration  || POST
router.post('/register', registerController);

// Login  || POST
router.post('/login', loginController);

// Forget Password  || POST
router.post('/forget-password', forgetPasswordController);

// Test routes
router.get('/test', requireSignin, isAdmin, testController);

//protected route auth
router.get("/user-auth", requireSignin, (req, res) => {
    res.status(200).send({ ok: true });
  });

module.exports = router;