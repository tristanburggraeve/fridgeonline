const Router = require('@koa/router');
const userService = require('../service/user');
const Joi = require('joi');
const validate = require('../core/validation');

const login = async (ctx) => {
    const {email, password} = ctx.request.body;
    const token = await userService.login(email, password);
    ctx.body = token;
};

login.validationScheme = {
    body : Joi.object({
        email: Joi.string().email(),
        password: Joi.string()
    }),
};

const register = async (ctx) => {
    const {email, password, username} = ctx.request.body;
    const token = await userService.register({username, email, password});
    ctx.body = token;
    ctx.status = 200;
};

register.validationScheme = {
    body : Joi.object({
        email: Joi.string().email(),
        password: Joi.string(),
        username: Joi.string().max(127)
    })
}

module.exports = (app) => {
    const router = new Router({
        prefix: '/user'
    });

    router.post(
        '/login',
        validate(login.validationScheme),
        login
        );

    router.post(
        '/register',
        validate(register.validationScheme),
        register
    );

    app.use(router.routes()).use(router.allowedMethods());
}