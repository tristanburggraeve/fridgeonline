const INVALID_CREDENTIALS = 'INVALID_CREDENTIALS';
const INVALID_TOKEN = 'INVALID_TOKEN';
const NOT_SIGNED_IN = 'NOT_SIGNED_IN';

class AuthError extends Error {

    constructor(code, message, details = {}) {
        super(message);
        this.code = code;
        this.details = details;
        this.name = 'AuthError';
    }

    static invalidCredentials(message, details){
        return new AuthError(INVALID_CREDENTIALS, message, details);
    }

    static invalidToken(message, details) {
        return new AuthError(INVALID_TOKEN, message, details);
    }
    
    static notSignedIn(message, details) {
        return new AuthError(NOT_SIGNED_IN, message, details);
    }

    get isInvalidCredentials() {
        return this.code === INVALID_CREDENTIALS;
    }

    get isInvalidToken() {
        return this.code === INVALID_TOKEN;
    }

    get isNotSignedIn() {
        return this.code === NOT_SIGNED_IN;
    }

}

module.exports = AuthError;