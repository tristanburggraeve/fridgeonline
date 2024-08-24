const Router = require('@koa/router');
const foodService = require('../service/food');
const Joi = require('joi');
const validate = require('../core/validation');

const getAllFoods = async (ctx) => {
    ctx.body = await foodService.getAll();
}

getAllFoods.validationScheme = null;

const createFood = async (ctx) => {
    ctx.body = await foodService.createFood(ctx.request.body);
}

createFood.validationScheme = {
    body : {
        name: Joi.string().max(127),
        description : Joi.string().max(511)
    }
};

const getFoodById = async (ctx) => {
    ctx.body = await foodService.getFoodById(Number(ctx.params.id));
};

getFoodById.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive(),
    })
};

const updateFood = async (ctx) => {
    const updatedFood = { id : ctx.params.id, name : ctx.request.body.name, description : ctx.request.body.description };
    ctx.body = await foodService.updateFood(updatedFood);
};

updateFood.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive(),
    }),
    body: Joi.object({
        name: Joi.string().max(127),
        description: Joi.string().max(511),
    }),
};

const deleteFood = async (ctx) => {
    ctx.body = await foodService.deleteFood(ctx.params.id);
}

deleteFood.validationScheme = {
    params : Joi.object({
        id: Joi.number().integer().positive(),
    }),
};

module.exports = (app) => {
    const router = new Router({
        prefix: '/food',
    });

    router.get(
        '/',
        validate(getAllFoods.validationScheme),
        getAllFoods
    );
    router.post(
        '/',
        validate(createFood.validationScheme),
        createFood
    );
    router.get(
        '/:id',
        validate(getFoodById.validationScheme),
        getFoodById
    );
    router.post(
        '/:id',
        validate(updateFood.validationScheme),
        updateFood
    );
    router.delete(
        '/:id',
        validate(deleteFood.validationScheme),
        deleteFood
    )

    app.use(router.routes()).use(router.allowedMethods());
}