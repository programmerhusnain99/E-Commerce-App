const express = require('express');
const { requireSignin, isAdmin } = require('../middleware/authMiddleware');
const { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController } = require('../controllers/categoryController');

const router = express.Router();

// routes

// create category
router.post('/create-category', requireSignin, isAdmin, createCategoryController);

// update category
router.put('/update-category/:id', requireSignin, isAdmin, updateCategoryController);

// Get All category
router.get('/category', categoryController);

// Get All category
router.get('/single-category/:slug', singleCategoryController);

// delete category
router.delete('/delete-category/:id', requireSignin, isAdmin, deleteCategoryController);

module.exports = router;