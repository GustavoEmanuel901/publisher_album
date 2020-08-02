const routes = require('express').Router()
const {celebrate, Segments, Joi} = require('celebrate')

//User Controllers

const UserController = require('./controllers/user/UserController')
const AuthController = require('./controllers/user/AuthController')
const ForgotPasswordController = require('./controllers/user/ForgotPasswordController')
const projectController = require('./controllers/user/projectController')


//Admins Controllers

const AdminAuthController = require('./controllers/admin/AdminAuthController')
const AdminController = require('./controllers/admin/AdminController')

//Users Routes

routes.get('/users', UserController.index)

routes.post('/users/register', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(3),
        user_name: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        telephone: Joi.string().min(8).max(15),
        city: Joi.string().required(),
        state: Joi.string().required(),
        password: Joi.string().required().min(6)
    })  
}), UserController.store)

routes.post('/authenticate', AuthController.create)

routes.post('/forgot_password', ForgotPasswordController.create)

routes.post('/reset_password', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        token: Joi.string().required(),
        password: Joi.string().required().min(6)
    })
}), ForgotPasswordController.reset)

routes.get('/projects', projectController.index)

//Admin Routes

routes.post('/admin/authenticate', AdminAuthController.create)

//routes.post('/teste', AdminController.store)

module.exports = routes