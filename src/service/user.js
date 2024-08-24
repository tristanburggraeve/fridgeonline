const { generateJWT, verifyJWT } = require("../core/jwt");
const { hashPassword, verifyPassword } = require("../core/password");
const userRepository = require('../repository/user');
const { getLogger } = require('../core/logging');
const AuthError = require('../core/authError');

const register = async ({
    username,
    email,
    password
}) => {
    try {
        const passwordHash = await hashPassword(password);
        const userId = await userRepository.create({
            username,
            email,
            passwordHash
        })
        const user = await userRepository.findById(userId.insertId);
        return await makeLoginData(user);
    } catch (error) {
        getLogger().error(error);
        throw(error);
    }
};

const makeExposedUser = ({id, username, email}) => ({
    id,
    username,
    email
});

const makeLoginData = async (user) => {
    const token = await generateJWT(user);
    return{
        user: makeExposedUser(user),
        token,
    };
};

const login = async (email, password) => {
    const user = await userRepository.findByEmail(email);
    if(!user) {
        throw AuthError.invalidCredentials('Given email and pass do not match');
    }

    const passwordValid = await verifyPassword(password, user.password_hash);
    if(!passwordValid) {
        throw AuthError.invalidCredentials('Given email and pass do not match');
    }

    return await makeLoginData(user);
};

const checkAndParseSession = async (authHeader) => {
    if (!authHeader) {
        throw AuthError.notSignedIn('you need to be signed in');
    }

    if(!authHeader.startsWith('Bearer ')) {
        throw AuthError.invalidToken('Invalid auth token');
    }

    const authToken = authHeader.substring(7);
    try {
        const { userId } = await verifyJWT(authToken);

        return {
            userId,
            authToken,
        };
    } catch (error) {
        throw AuthError.invalidToken('Invalid JWT', error);
    }
};

module.exports = {
    register,
    login,
    checkAndParseSession,
}