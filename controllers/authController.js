const userModel = require('../models/userModel');
const { hashPassword, comparePassword } = require('../helper/authHelper');
const JWT = require('jsonwebtoken');

// User Registration || Post
const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // validations
        if (!name) {
            return res.send({ message: 'Name is Required' });
        }
        if (!email) {
            return res.send({ message: 'Email is Required' });
        }
        if (!password) {
            return res.send({ message: 'Password is Required' });
        }
        if (!phone) {
            return res.send({ message: 'Phone is Required' });
        }
        if (!address) {
            return res.send({ message: 'Address is Required' });
        }

        // existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already Registered. Please Login or try to register with another Email'
            });
        }

        // register user
        const hashedPassword = await hashPassword(password);
        const user = new userModel({ name, email, password: hashedPassword, phone, address }).save();

        res.status(201).send({
            success: true,
            message: 'User Registered Successfully',
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        });
    }
};

// User LOGIN || Post
const loginController = async (req, res) => {

    try {
        const { email, password } = req.body;
        // Validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'These field should not be empty'
            });
        }
        // check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            });
        }
        // check Passowrd
        const match = comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            });
        }
        // JWT token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        res.status(200).send({
            success: true,
            message: 'Login successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        })
    }
}

// Test User Controller
const testController = (req, res)=>{
    res.send('Protected Routes')
}

module.exports = { registerController, loginController, testController };