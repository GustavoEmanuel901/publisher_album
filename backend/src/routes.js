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
const AdminResetPassword = require('./controllers/admin/AdminResetPassword')

//Users Routes

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

routes.post('/authenticate', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    })
}), AuthController.create)

routes.post('/forgot_password', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email()
    })
}), ForgotPasswordController.create)

routes.post('/reset_password', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        token: Joi.string().required(),
        password: Joi.string().required().min(6)
    })
}), ForgotPasswordController.reset)

routes.get('/projects', projectController.index)

//Admin Routes

routes.post('/admin/authenticate', celebrate({
    [Segments.BODY]: Joi.object().keys({
        user_name: Joi.string().required(),
        password: Joi.string().required().min(6)
    })
}), AdminAuthController.create)

routes.post('/admin/register', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        user_name: Joi.string().required(),
        email: Joi.string().required().email()
    })
}), AdminController.store)

routes.post('/admin/forgot', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required.email()
    })
}), AdminResetPassword.forgot)

routes.post('/admin/reset', celebrate({
    email: Joi.string().required().email(),
    token: Joi.string().required(),
    password: Joi.string().required().min(6)
}), AdminResetPassword.reset)

routes.get('/admin/list_user', UserController.index)

routes.delete('/admin/delete_user/:id', UserController.delete)

module.exports = routes