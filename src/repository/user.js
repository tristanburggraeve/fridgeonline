const { getConnection, tables } = require("../data")


const create = async ({
    username,
    email,
    passwordHash
}) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`INSERT INTO ${tables.user} (email, username, password_hash) VALUES ("${email}", "${username}", "${passwordHash}");`);
        return rows;
    } catch (error) {
        logger.error(error);
        throw(error);
    }
};

const findById = async (id) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`SELECT * FROM ${tables.user} WHERE id = ${id}`);
        return rows[0];
    } catch (error) {
        logger.error(error);
        throw(error);
    }
}

const findByEmail = async (email) => {
    try {
        const [rows, fields] = await (await getConnection()).execute(`SELECT * FROM ${tables.user} WHERE email = "${email}"`);
        return rows[0];
    } catch (error) {
        logger.error(error);
        throw(error);
    }
}

module.exports = {
    create,
    findById,
    findByEmail,
}