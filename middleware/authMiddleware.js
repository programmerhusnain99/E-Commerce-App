const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');

// Protect Routes with JWT
const requireSignin = async (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();
    } catch (error) {
        console.log(error)
    }
};

// Admin Access
const isAdmin = async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id);
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
        });
      }
  
      if (user.role !== 1) {
        return res.status(403).send({
          success: false,
          message: 'Unauthorized Access',
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };
  
// const isAdmin = async(req, res, next)=>{
//     try {
//         const user = await userModel.findOne(req.user._id);
//         if(user.role !== 1){
//             return res.status(404).send({
//                 success: false,
//                 message: 'UnAuthorized Access'
//             })
//         } else {
//             next();
//         }
//     } catch (error) {
//         console.log(error)
//     }
// };

module.exports = { requireSignin, isAdmin }