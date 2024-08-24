const Router = require('@koa/router');
const recipeService = require('../service/recipe');
const Joi = require('joi');
const validate = require('../core/validation');

const getAllRecipes = async (ctx) => {
    ctx.body = await recipeService.getAllRecipes();
};

getAllRecipes.validationScheme = null;

const getRecipeById = async (ctx) => {
    ctx.body = recipeService.getRecipeById(ctx.params.id);
};

getRecipeById.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive(),
    }),
}

const createRecipe = async (ctx) => {
    const { name, description } = ctx.request.body;
    ctx.body = recipeService.createRecipe(name, description);
};

createRecipe.validationScheme = {
    body: Joi.object({
        name: Joi.string().max(127),
        description: Joi.string().max(511),
    }),
};

const deleteRecipe = async (ctx) => {
    ctx.body = recipeService.deleteRecipe(ctx.params.id);
};

deleteRecipe.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive(),
    }),
}

const updateRecipe = async (ctx) => {
    const { id, name, description } = ctx.request.body;
    ctx.body = recipeService.updateRecipe(id, name, description);
};

updateRecipe.validationScheme = {
    body: Joi.object({
        id: Joi.number().integer().positive(),
        name: Joi.string().max(127),
        description: Joi.string().max(511),
    }),
};

const prepareRecipe = async (ctx) => {

};

const getIngredients = async (ctx) => {
    ctx.body = recipeService.getIngredients(ctx.params.id);
}

getIngredients.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive(),
    }),
}

const addIngredient = async (ctx) => {
    ctx.body = recipeService.addIngredient(ctx.params.id, ctx.request.body.foodId);
}

addIngredient.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive(),
    }),
    body: Joi.object({
        foodId: Joi.number().integer().positive(),
    }),
};

const removeIngredient = async (ctx) => {
    ctx.body = recipeService.removeIngredient(ctx.params.id);
}

removeIngredient.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive(),
    }),
}

module.exports = (app) => {
    const router = new Router({
        prefix: '/recipe'
    });

    router.get(
        '/',
        validate(getAllRecipes.validationScheme),
        getAllRecipes
    );
    router.get(
        '/:id',
        validate(getRecipeById.validationScheme),
        getRecipeById
    );
    router.post(
        '/',
        validate(createRecipe.validationScheme),
        createRecipe
    );
    router.delete(
        '/:id',
        validate(deleteRecipe.validationScheme),
        deleteRecipe
    );
    router.post(
        '/:id',
        validate(updateRecipe.validationScheme),
        updateRecipe
    );
    router.get(//VERWIJDEREN
        '/:id/prep',
        prepareRecipe
    );
    router.get(
        '/:id/ingredient',
        validate(getIngredients.validationScheme),
        getIngredients
    );
    router.post(
        '/:id/ingredient',
        validate(addIngredient.validationScheme),
        addIngredient
    );
    router.delete(
        '/:recipe/ingredient/:id',
        validate(removeIngredient.validationScheme),
        removeIngredient
    );

    app.use(router.routes()).use(router.allowedMethods());
}
