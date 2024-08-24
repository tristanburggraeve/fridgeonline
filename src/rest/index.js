const Router = require('@koa/router');

const installFoodRouter = require('./food');
const installItemRouter = require('./foodItem');
const installFridgeRouter = require('./fridge');
const installUserRouter = require('./user');
const installRecipeRouter = require('./recipe');

module.exports = (app) => {
    const router = new Router({
        prefix: '/api',
    });

    installFoodRouter(router);
    installItemRouter(router);
    installFridgeRouter(router);
    installUserRouter(router);
    installRecipeRouter(router);

    app.use(router.routes()).use(router.allowedMethods());
};