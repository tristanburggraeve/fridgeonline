const ServiceError = require('../core/serviceError');
const fridgeRepo = require('../repository/fridge');
const handleDBError = require('./_handleDBError');

const createFridge = async (name, userId) => {
    try {
        const fridge = await fridgeRepo.createFridge(name, userId);
        return getById(fridge);
    } catch (error) {
        throw handleDBError(error);
    }
};

const getAll = async (userId) => {
    try {
        const fridges = await fridgeRepo.getAllFridges(userId);
        return fridges;
    } catch (error) { throw handleDBError(error)}
    
};

const getById = async (id, userId) => {
    let fridge = null;
    try {fridge = await fridgeRepo.getFridgeById(id, userId);} catch (error) {handleDBError(error)}
    if (!fridge || fridge.user_id !== userId){
        throw ServiceError.notFound(`No fridge with id ${id} exists`, {id});
    }
    return fridge;
};

const deleteFridge = async (id, userId) => {
    try {
        const deleted = await fridgeRepo.deleteFridge(id, userId);

        if(!deleted) {
            throw ServiceError.notFound(`No fridge with id ${id} exists`, {id});
        }
    } catch (error) {
        throw handleDBError(error);
    }
};

const updateFridgeName = async (id, name, userId) => {
    try {
        await fridgeRepo.updateFridge(id, name, userId);
        return getById(id);
    } catch (error) {
        throw handleDBError(error);
    }
};

const getFridgeContents = async (id, userId) => {
    try {const contents = await fridgeRepo.getFridgeContents(id, userId);} catch (error) {throw handleDBError(error)}
    if(!contents) {
        throw ServiceError.notFound(`No fridge with id ${id} exists`, {id});
    }
    return contents;
};

module.exports = {
    createFridge,
    getAll,
    getById,
    deleteFridge,
    updateFridgeName,
    getFridgeContents
}