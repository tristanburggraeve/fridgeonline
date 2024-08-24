const { getConnection, tables } = require('../data/index');

//TODO: description toevoegen?

const createItem = async (foodId, amount, fridgeId, userId) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`INSERT INTO ${tables.foodItem} (food_id, amount, fridge_id, user_id) VALUES (${foodId}, ${amount}, ${fridgeId}, ${userId});`);
        return rows;
    } catch (error) {
        logger.error(error);
        throw(error);
    }
}

const getAllItems = async (userId) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`SELECT * FROM ${tables.foodItem} WHERE user_id = ${userId}`);
        return rows;
    } catch (error) {
        logger.error(error);
        throw(error);
    }
}

const getItemById = async (id) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`SELECT * FROM ${tables.foodItem} WHERE id = ${id} AND user_id = ${userId}`);
        return rows[0];
    } catch (error) {
        logger.error(error);
        throw(error);
    }
}

const updateItem = async (id, amount, fridge_id, userId) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`UPDATE ${tables.foodItem} SET amount = ${amount}, fridge_id=${fridge_id} WHERE id = ${id} AND user_id = ${userId};`);
        return rows;
    } catch (error) {
        logger.error(error);
        throw(error);
    }
}

const deleteItem = async (id, userId) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`DELETE FROM ${tables.foodItem} WHERE id = ${id} AND user_id = ${userId};`);
        return rows;
    } catch (error) {
        logger.error(error);
        throw(error);
    }
}

module.exports = {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem
}