
const user_model = require('../models/user.model.js')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const secret = require("../config/auth.config.js")
// Controller for singup
exports.singup = async(req,res)=>{
    let req_body = req.body;  // req_body is in the form of javascript object
    const user_obj = {
        name:req_body. name, 
        userId:req_body.userId,
        email:req_body.email,
        userType:req_body.userType,
        password: bcrypt.hashSync(req_body.password,8)
    }

    try {
        const user = await user_model.create(user_obj)
        const res_obj = {
            name:user.name,
            userId:user.userId,
            email:user.email,
            userType:user.userType,
            createdAt:user.createdAt,
            updateAt:user.updatedAt
        }
    
        res.status(201).send(res_obj)
    } catch (error) {
        console.log("Error while reading the data",error);
        res.status(500).send({
            message:"Some internall error happen"
        })
    }
}


//Controller for login 
exports.signin = async(req,res) =>{
//1.check userId is present is present or not
const user = await user_model.findOne({userId:req.body.userId})
if(user==null){
    return res.status(400).json({
        message:"User id is not find",
    })
}
//2.Check password matched or not
 const isPasswordvalid = bcrypt.compareSync(req.body.password,user.password)
 if(!isPasswordvalid){
    return res.status(400).json({
        message:"Password is not matched"
    })
 }

 const token = jsonwebtoken.sign({id:user.userId},secret.secret,{expiresIn:300})

 return res.status(200).json({
    name:user.name,
    userId : user.userId,
    email:user.email,
    userType: user.userType,
    accessToken:token
 })
}
