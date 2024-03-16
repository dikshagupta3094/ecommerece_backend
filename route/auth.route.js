
const controller = require('../controllers/auth.controller.js')
const {verifysingupBody} = require('../middleware/auth.middleware.js')
module.exports = (app)=>{
    app.post('/ecomm/api/v1/auth/signup',[verifysingupBody],controller.singup)
    app.post('/ecomm/api/v1/auth/signin',controller.signin)
}

