
const controller = require('../controllers/auth.controller.js')
module.exports = (app)=>{
    app.post('/ecomm/api/v1/auth/signup',controller.singup)
}