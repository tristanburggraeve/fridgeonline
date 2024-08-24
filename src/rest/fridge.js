const Router = require('@koa/router');
const fridgeService = require('../service/fridge');
const { requireAuthentication } = require('../core/auth');
const Joi = require('joi');
const validate = require('../core/validation');


const getAllFridges = async (ctx) => {
    const {userId} = ctx.state.session;
    ctx.body = await fridgeService.getAll(userId);
};

getAllFridges.validationScheme = null;

const getFridgeById = async (ctx) => {
    const {userId} = ctx.state.session;
    ctx.body = await fridgeService.getById(ctx.params.id, userId);
};

getFridgeById.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive(),
    }),
};

const deleteFridge = async (ctx) => {
    const {userId} = ctx.state.session;
    ctx.body = await fridgeService.deleteFridge(ctx.params.id, userId);
};

deleteFridge.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive(),
    }),
}

const createFridge = async (ctx) => {
    const {userId} = ctx.state.session;
    ctx.body = await fridgeService.createFridge(ctx.request.body.name, userId);
};

createFridge.validationScheme = {
    body: Joi.object({
        name: Joi.string().max(127),
    }),
};

const updateFridge = async (ctx) => {
    const {userId} = ctx.state.session;
    ctx.body = await fridgeService.updateFridgeName(ctx.params.id, ctx.request.body.name, userId);
};

updateFridge.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive(),
    }),
    body: Joi.object({
        name: Joi.string().max(127),
    }),
};

const getFridgeContents = async (ctx) => {
    const {userId} = ctx.state.session;
    ctx.body = await fridgeService.getFridgeContents(ctx.params.id, userId);
};

getFridgeContents.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive(),
    }),
}

module.exports = (app) => {
    const router = new Router({
        prefix: '/fridge'
    });

    router.use(requireAuthentication);

    router.get(
        '/',
        validate(getAllFridges.validationScheme),
        getAllFridges
    );
    router.get(
        '/:id',
        validate(getFridgeById.validationScheme),
        getFridgeById
    );
    router.post(
        '/',
        validate(createFridge.validationScheme),
        createFridge
    );
    router.delete(
        '/:id',
        validate(deleteFridge.validationScheme),
        deleteFridge
    );
    router.post(
        '/:id',
        validate(updateFridge.validationScheme),
        updateFridge
    );
    router.get(
        '/:id/contents',
        validate(getFridgeContents.validationScheme),
        getFridgeContents
    );

    app.use(router.routes()).use(router.allowedMethods());
}