const { getConnection, tables } = require('../data/index');

const createFridge = async (name, userId) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`INSERT INTO ${tables.fridge} (name, user_id) VALUES (${name}, ${userId});`);
        return rows;
    } catch (error) {
        logger.error(error);
        throw(error);
    }
};

const deleteFridge = async (id, userId) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`DELETE FROM ${tables.fridge} WHERE id = ${id} AND user_id = ${userId};`);
        return rows;
    } catch (error) {
        logger.error(error);
        throw(error);
    }
};

const getAllFridges = async (userId) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`SELECT * FROM ${tables.fridge} WHERE user_id = ${userId}`);
        return rows;
    } catch (error) {
        logger.error(error);
        throw(error);
    }
};

const getFridgeById = async (id, userId) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`SELECT * FROM ${tables.fridge} WHERE id = ${id} AND user_id = ${userId}`);
        return rows[0];
    } catch (error) {
        logger.error(error);
        throw(error);
    }
};

const updateFridge = async (id, name, userId) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`UPDATE ${tables.fridge} SET name = "${name}" where id = ${id} AND user_id = ${userId};`);
        return rows;
    } catch (error) {
        logger.error(error);
        throw(error);
    }
};

const getFridgeContents = async (id, userId) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`SELECT * FROM ${tables.foodItem} WHERE fridge_id = ${id} AND user_id = ${userId}`);
        return rows;
    } catch (error) {
        logger.error(error);
        throw(error);
    }
}

module.exports = {
    createFridge,
    deleteFridge,
    getAllFridges,
    getFridgeById,
    updateFridge,
    getFridgeContents
};