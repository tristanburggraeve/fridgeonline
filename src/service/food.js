const ServiceError = require('../core/serviceError');
const foodRepository = require('../repository/food');
const handleDBError = require('./_handleDBError');

const getAll = async () => {
    try { 
        const foods = await foodRepository.findAll(); 
        return foods;
    } catch (error) {throw handleDBError(error)};
    
};

const getFoodById = async (id) => {
    let food = null;
    try { food = await foodRepository.findById(id); } catch (error) {throw handleDBError(error)};

    if (!food) {
        throw ServiceError.notFound(`No food with id ${id} exists!`, {id});
    }
    return food;
};

const createFood = async ({name, description}) => {
    try {
        const food = await foodRepository.createFood(name, description);
        return getFoodById(food);
    } catch (error) {
        throw handleDBError(error);
    }
};

const updateFood = async (id, name, description) => {
    try {
        await foodRepository.updateFoodById(id, name, description);
        return getFoodById(id);
    } catch (error) {
        throw handleDBError(error);
    }
};

const deleteFood = async (id) => {
    try {
        const deleted = await foodRepository.deleteFoodById(id);

        if(!deleted) {
            throw ServiceError.notFound(`No food with id ${id} exists`, {id});
        }
    } catch (error) {
        throw handleDBError(error)
    }
};

module.exports = {
    getAll,
    getFoodById,
    createFood,
    updateFood,
    deleteFood
}