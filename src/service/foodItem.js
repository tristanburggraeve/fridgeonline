const itemRepo = require('../repository/foodItem')
const handleDBError = require('./_handleDBError');
const serviceError = require('../core/serviceError');
const fridgeService = require('./fridge');
const foodService = require('./food');
const ServiceError = require('../core/serviceError');

const getAll = async (userId) => {
    try {
        const items = await itemRepo.getAllItems(userId);
        return items;
    } catch (error) { throw handleDBError(error)}
    
}

const getById = async (id, userId) => {
    let item = null;
    try {item = await itemRepo.getItemById(id);} catch (error) { throw handleDBError(error)}
    if(!item || item.userId !== userId){
        throw serviceError.notFound(`No item with id ${id} exists`, {id});
    }
    return item;
}

const updateById = async (id, amount, fridge, userId) => {
    if (fridge) {
        const existingFridge = await fridgeService.getById(fridge);

        if(!existingFridge) {
            throw ServiceError.notFound(`No fridge with id ${fridge} exists`, {fridge});
        }
    }
    try {
        await itemRepo.updateItem(id, amount, fridge, userId);
        return getById(id, userId);
    } catch (error) {
        throw handleDBError(error);
    }
}

const createItem = async (food, amount, fridge, userId) => {
    if(food && fridge) {
        const existingFood = await foodService.getFoodById(food);
        const existingFridge = await fridgeService.getById(fridge);

        if (!existingFood) {
            throw ServiceError.notFound(`There is no food with id ${food}`, {food});
        }

        if (!existingFridge) {
            throw ServiceError.notFound(`No fridge with id ${fridge} exists`, {fridge});
        }
    }

    try {
        const item = await itemRepo.createItem(food, amount, fridge, userId);
        return getById(item, userId);
    } catch (error) {
        throw handleDBError(error);
    }
}

const deleteById = async (id, userId) => {
    try {
        const deleted = await itemRepo.deleteItem(id, userId);
        if(!deleted) {
            throw ServiceError.notFound(`No item with id ${id} exists`, {id});
        }
    } catch (error) {
        throw handleDBError(error);
    }
}

module.exports = {
    getAll,
    getById,
    updateById,
    createItem,
    deleteById,
}