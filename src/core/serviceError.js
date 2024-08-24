const NOT_FOUND = 'NOT_FOUND';
const VALIDATION_FAILED = 'VALIDATION_FAILED';
const NO_CONNECTION = 'NO_CONNECTION';

class ServiceError extends Error {

    constructor(code, message, details = {}) {
        super(message);
        this.code = code;
        this.details = details;
        this.name = 'ServiceError';
    }

    static notFound(message, details) {
        return new ServiceError(NOT_FOUND, message, details);
    }

    static validationFailed(message, details) {
        return new ServiceError(VALIDATION_FAILED, message, details);
    }

    static noConnection(message, details) {
        return new ServiceError(NO_CONNECTION, message, details);
    }

    get isNotFound() {
        return this.code === NOT_FOUND;
    }

    get isValidationFailed() {
        return this.code === VALIDATION_FAILED;
    }

    get isNoConnection() {
        return this.code === undefined;
    }
}

module.exports = ServiceError;