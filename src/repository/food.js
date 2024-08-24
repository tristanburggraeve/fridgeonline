let { FOOD_DATA } = require('../data/mock_data');
const { getConnection, tables } = require('../data/index');
const { getLogger } = require('../core/logging');
const mysql = require('mysql2/promise');

const findAll = async () => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`SELECT * FROM ${tables.food}`);
        return rows;
    } catch (error) {
        getLogger().error(error);
        throw(error);
    }
};

const findById = async (id) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`SELECT * FROM ${tables.food} WHERE id = ${id}`);
        return rows[0];
    } catch (error) {
        getLogger().error(error);
        throw(error);
    }
}

const updateFoodById = async ({id, name, description}) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`UPDATE ${tables.food} SET name = "${name}", description="${description}" where id = ${id};`);
        return rows;
    } catch (error) {
        getLogger().error(error);
        throw(error);
    }
}

const createFood = async (name, description) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`INSERT INTO ${tables.food} (name, description) VALUES ("${name}", "${description}");`);
        return rows;
    } catch (error) {
        getLogger().error(error);
        throw(error);
    }
}

const deleteFoodById = async (id) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`DELETE FROM ${tables.food} WHERE id = ${id};`);
        return rows;
    } catch (error) {
        getLogger().error(error);
        throw(error);
    }
};

module.exports = {
    findAll,
    findById,
    updateFoodById,
    createFood,
    deleteFoodById
}