const { getConnection } = require("../data");
const { tables } = require('../data');

const getAllRecipes = async () => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`SELECT * FROM ${tables.recipe};`);
        return rows;
    } catch (error) {
        logger.error(error);
        throw(error);
    }
};

const getRecipeById = async (id) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`SELECT * FROM ${tables.recipe} WHERE id = ${id};`);
        return rows[0];
    } catch (error) {
        logger.error(error);
        throw(error);
    }
};

const deleteRecipe = async (id) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`DELETE FROM ${tables.recipe} WHERE id = ${id};`);
        return rows;
    } catch (error) {
        logger.error(error);
        throw(error);
    }
};

const updateRecipe = async (id, name, description) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`UPDATE ${tables.recipe} SET name = "${name}", description = "${description}" WHERE id = ${id};`);
        return rows;
    } catch (error) {
        logger.error(error);
        throw(error);
    }
}

const createRecipe = async (name, description) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`INSERT INTO ${tables.recipe} (name, description) VALUES ("${name}", "${description}");`);
        return rows;
    } catch (error) {
        logger.error(error);
        throw(error);
    }
};

const getIngredientNames = async (id) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`SELECT i.id, f.name, f.description FROM recipe r INNER JOIN ingredient i ON r.id = i.recipe_id INNER JOIN food f ON f.id = i.food_id WHERE r.id = ${id};`);
        return rows;
    } catch (error) {
        logger.error(error);
        throw(error);
    }
}

const addIngredient = async (recipeId, foodId) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`INSERT INTO ingredient (food_id, recipe_id) VALUES (${foodId}, ${recipeId});`);
        return rows;
    } catch (error) {
        logger.error(error);
        throw(error);
    }
}

const removeIngredient = async (id) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`DELETE FROM ingredient WHERE id = ${id};`);
        return rows;
    } catch (error) {
        logger.error(error);
        throw(error);
    }
}

module.exports = {
    getAllRecipes,
    getRecipeById,
    deleteRecipe,
    updateRecipe,
    createRecipe,
    getIngredientNames,
    addIngredient,
    removeIngredient
};