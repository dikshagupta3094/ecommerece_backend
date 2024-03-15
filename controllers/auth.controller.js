
const user_model = require('../models/user.model.js')
const bcrypt = require('bcryptjs')
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
