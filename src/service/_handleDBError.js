const ServiceError = require('../core/serviceError');

const handleDBError = (error) => {
    const {code = '', sqlMessage} = error;

    if (code === 'ER_DUP_ENTRY') {
        switch (true) {
            case sqlMessage.includes('user.email'):
                return ServiceError.validationFailed(
                    'A user with this email already exists'
                );
            case sqlMessage.includes('.id'):
                return ServiceError.validationFailed(
                    'An item with this id already exists'
                );
            default :
                return ServiceError.validationFailed('This item already exists');
        }
    }

    if (code.startsWith('ER_NO_REFERENCED_ROW')) {
        switch (true) {
            case sqlMessage.includes('user_id'):
                return ServiceError.notFound('This user does not exist');
            case sqlMessage.includes('food_id'):
                return ServiceError.notFound('This food does not exist');
            case sqlMessage.includes('fridge_id'):
                return ServiceError.notFound('This fridge does not exist');
            case sqlMessage.includes('recipe_id'):
                return ServiceError.notFound('This recipe does not exist');
        }
    }

    if (code === undefined) {
        return ServiceError.noConnection('Database connection is in closed state');
    }

    return error;
};

module.exports = handleDBError;