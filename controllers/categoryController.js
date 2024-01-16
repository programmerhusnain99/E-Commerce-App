const slugify = require('slugify')
const categoryModel = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
    const { name } = req.body;
    try {
        if (!name) {
            return res.status(401).send({ message: "Name is Required" });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: false,
                message: `${name} category already exisits`
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: `${name} category created`,
            category
        })
    } catch (error) {
        console.log(error);
        res.send(500).send({
            success: false,
            error,
            message: `Error in Creating ${name} Category`
        })
    }
};

// update category
const updateCategoryController = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    try {
        const category = await categoryModel.findByIdAndUpdate(id,
            { name, slug: slugify(name) },
            { name: true }
        )
        res.status(200).send({
            success: true,
            message: `${name} category updated`,
            category
        })
    } catch (error) {
        console.log(error);
        res.send(500).send({
            success: false,
            error,
            message: `Error in Updating ${name} Category`
        })
    }
};

// Show All Category
const categoryController = async(req, res)=>{
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: 'All Categories Displayed',
            category
        })
    } catch (error) {
        console.log(error);
        res.send(500).send({
            success: false,
            error,
            message: `Error in Getting All Categories`
        })
    }
};

// Create Single Category
const singleCategoryController = async(req, res)=>{
    try {
        const { slug } = req.params;
        const category = await categoryModel.findOne({slug})
        res.status(200).send({
            success: true,
            message: 'Single Category Displayed',
            category
        })
    } catch (error) {
        console.log(error);
        res.send(500).send({
            success: false,
            error,
            message: `Error in Getting Single Category`
        })
    }
};

// Category Category
const deleteCategoryController = async(req, res)=>{
    try {
        const { id } = req.params;
        const category = await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: `${category} Category Deleted`,
            category
        })
    } catch (error) {
        console.log(error);
        res.send(500).send({
            success: false,
            error,
            message: `Error in Deleting ${category} Category`
        })
    }
};

module.exports = { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController };