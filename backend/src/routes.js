const routes = require('express').Router()
const {celebrate, Segments, Joi} = require('celebrate')

const UserController = require('./controllers/UserController')
const AuthController = require('./controllers/AuthController')
const ForgotPasswordController = require('./controllers/ForgotPasswordController')
const projectController = require('./controllers/projectController')

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

module.exports = routes