//Create a mw to check whether all the functions are working properly or not

const user_model = require("../models/user.model.js");

const verifysingupBody = async(req, res, next) => {
  try {
    if (!req.body.name) {
      res.status(400).json({
        message: "Name was not provided in request body",
      });
    }

    if (!req.body.email) {
      res.status(400).json({
        message: "Email was not provided in request body",
      });
    }

    if (!req.body.password) {
        res.status(400).json({
          message: "Password was not provided in request body",
        });
      }
       
      const user = await user_model.findOne({userId:req.body.userId})

      if(user){
         res.status(400).json({
            message:"User is already present with same userId"
         })
      }

      next()
  } catch (error) {
    res.status(500).json({
      message: "Error while validating the request",
    });
  }
};

module.exports = {
  verifysingupBody,
};
