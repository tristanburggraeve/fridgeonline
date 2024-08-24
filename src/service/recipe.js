const recipeRepo = require('../repository/recipe');
const handleDBError = require('./_handleDBError');
const ServiceError = require('../core/serviceError');
const foodService = require('./food');

const createRecipe = async (name, description) => {
    try {
        const recipe = recipeRepo.createRecipe(name, description);
        return getRecipeById(recipe);
    } catch (error){
        throw handleDBError(error);
    }
};

const getAllRecipes = async () => {
    try {
        const recipes = await recipeRepo.getAllRecipes();
        return recipes;
    } catch (error) {throw handleDBError(error)}
    
};

const getRecipeById = async (id) => {
    let recipe = null;
    try {recipe = await recipeRepo.getRecipeById(id);} catch (error) {throw handleDBError(error)}
    if(!recipe){
        throw ServiceError.notFound(`No recipe with id ${id} exists`, {id});
    }
    return recipe;
};

const deleteRecipe = async (id) => {
    try {
        const deleted = await recipeRepo.deleteRecipe(id);

        if(!deleted) {
            throw ServiceError.notFound(`No recipe with id ${id} exists`, {id});
        }
    } catch (error) {
        handleDBError(error);
    }
};

const updateRecipe = async (id, name, description) => {
    try {
        await recipeRepo.updateRecipe(id, name, description);
        return getRecipeById(id);
    } catch (error) {
        throw ServiceError.notFound(`No recipe with id ${id} exists`, {id});
    }
};

const getIngredients = async (id) => {
    let ingredients = null;
    try {ingredients = await recipeRepo.getIngredientNames(id);} catch (error) {throw handleDBError(error)}
    if(!ingredients) {
        throw ServiceError.notFound(`No recipe with id ${id} exists`, {id});
    }
    return ingredients;
};

const addIngredient = async (id, foodId) => {
    const existingFood = await foodService.getFoodById(foodId);
    if(!existingFood){
        throw ServiceError.notFound(`No food with id ${foodId} exists`, {foodId});
    }
    try {
        await recipeRepo.addIngredient(id, foodId);
        return getRecipeById(id);
    } catch (error) {
        handleDBError(error);
    }
};

const removeIngredient = async (id) => {
    try {
        const deleted = await recipeRepo.removeIngredient(id);
        if(!deleted){
            throw ServiceError.notFound(`No ingredient with id ${id} exists`, {id})
        }
    } catch (error) {
        throw handleDBError(error);
    }
};

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    deleteRecipe,
    updateRecipe,
    getIngredients,
    addIngredient,
    removeIngredient
};