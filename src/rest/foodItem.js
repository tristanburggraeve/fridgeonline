const Router = require('@koa/router');
const itemService = require('../service/foodItem');
const fridgeService = require('../service/fridge');
const { requireAuthentication } = require('../core/auth');
const Joi = require('joi');
const validate = require('../core/validation');

//auth toevoegen

const getAllItems = async (ctx) => {
    const {userId} = ctx.state.session;
    ctx.body = await itemService.getAll(userId);
}

getAllItems.validationScheme = null;

const getItemById = async (ctx) => {
    const {userId} = ctx.state.session;
    ctx.body = await itemService.getById(ctx.params.id, userId);
}

getItemById.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive(),
    })
};

const updateItem = async (ctx) => {
    const {userId} = ctx.state.session;
    const updatedItem = {id : ctx.params.id, amount: ctx.request.body.amount, fridge : ctx.request.body.fridge, userId};
    ctx.body = await itemService.updateById(updatedItem);
}

updateItem.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive(),
    }),
    body: Joi.object({
        amount: Joi.number().integer().positive(),
        fridge: Joi.number().integer().positive()
    }),
};

const deleteItem = async (ctx) => {
    const {userId} = ctx.state.session;
    ctx.body = await itemService.deleteById(ctx.params.id, userId);
}

deleteItem.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive(),
    }),
};

const createItem = async (ctx) => {
    const {userId} = ctx.state.session;
    ctx.body = await itemService.createItem(ctx.request.body.food, ctx.request.body.amount, ctx.request.body.fridge, userId);
}

createItem.validationScheme = {
    body: Joi.object({
        food: Joi.number().integer().positive(),
        amount: Joi.number().integer().positive(),
        fridge: Joi.number().integer().positive(),
    }),
};

const getFridgeContents = async (ctx) => {
    const {userId} = ctx.state.session;
    ctx.body = await fridgeService.getFridgeContents(ctx.params.id, userId);//veranderen nr itemservice
}

getFridgeContents.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive(),
    }),
};

module.exports = (app) => {
    const router = new Router({
        prefix: '/item'
    });

    router.use(requireAuthentication);

    router.get(
        '/',
        validate(getAllItems.validationScheme),
        getAllItems
    );
    router.get(
        '/:id',
        validate(getItemById.validationScheme),
        getItemById
    );
    router.post(
        '/',
        validate(createItem.validationScheme),
        createItem
    );
    router.post(
        '/:id',
        validate(updateItem.validationScheme),
        updateItem
    );
    router.delete(
        '/:id',
        validate(deleteItem.validationScheme),
        deleteItem
    );
    router.get(
        '/fridge/:id',
        validate(getFridgeContents.validationScheme),
        getFridgeContents
    );

    app.use(router.routes()).use(router.allowedMethods());
}