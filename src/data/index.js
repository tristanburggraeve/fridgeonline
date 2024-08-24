const config = require('config');
const mysql = require('mysql2/promise');
const fs = require('fs');

const Migrator = require('mysql2-migration/lib/Migrator');
const { getLogger } = require('../core/logging');

const NODE_ENV = config.get('env');
const isDevelopment = NODE_ENV === 'development';

const DATABASE_CLIENT = config.get('database.client');
const DATABASE_HOST = config.get('database.host');
const DATABASE_PORT = config.get('database.port');
const DATABASE_NAME = config.get('database.name');
const DATABASE_USER = config.get('database.user');
const DATABASE_PASSWORD = config.get('database.password');

let connection;

async function initializeData(){
    const logger = getLogger();
    logger.info('Initializing connection with database.');

    const connectionOptions = {
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        user: DATABASE_USER,
        password: DATABASE_PASSWORD,
        multipleStatements: false,
    };

    try {
        connection = await mysql.createConnection(connectionOptions);
        logger.info('Connection with db-server created without errors.');
    } catch (error) {
        logger.error(error);
    }

    try{
        const [rows, fields] = await connection.execute(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`);
            const warning = rows.warningStatus;
            if(warning === 0){logger.info(`Database ${DATABASE_NAME} was succesfully created.`)}
            else if(warning === 1){logger.info(`Could not create database, because database ${DATABASE_NAME} already exists.`)}
        } catch (error) {
            logger.error(error);
        }

        await connection.end();

        connectionOptions.database = DATABASE_NAME;
        try {
        connection = await mysql.createConnection(connectionOptions);
        logger.info(`Connection with db ${DATABASE_NAME} created without errors.`);
        } catch (error) {
            logger.error(error);
        }
    
    //connectie voor seeding, connectie om op te werken

    await Migrator.startMigration('up');
    
    if(isDevelopment){
        await connection.end();
        connectionOptions.multipleStatements = true;
        connection = await mysql.createConnection(connectionOptions);

        const foodSeedQuery = fs.readFileSync('src/data/seeds/foodSeed.sql', {encoding: "utf-8"});
        const foodItemSeedQuery = fs.readFileSync('src/data/seeds/foodItemSeed.sql', {encoding: "utf-8"});
        const fridgeSeedQuery = fs.readFileSync('src/data/seeds/fridgeSeed.sql', {encoding: "utf-8"});
        const ingredientSeedQuery = fs.readFileSync('src/data/seeds/ingredientSeed.sql', {encoding: "utf-8"});
        const recipeSeedQuery = fs.readFileSync('src/data/seeds/recipeSeed.sql', {encoding: "utf-8"});
        const userSeedQuery = fs.readFileSync('src/data/seeds/userSeed.sql', {encoding: "utf-8"});

        [foodSeedQuery, userSeedQuery, fridgeSeedQuery, recipeSeedQuery, foodItemSeedQuery, ingredientSeedQuery].map(async (query) => {
            try {
                await connection.execute(query);
                logger.info('seeding succeeded.')
            } catch (error) {
                logger.warn('seeding failed');
            }
        })
    }
}

const getConnection = () => {
    if(!connection){
        throw new Error('Please initialize dataLayer before invoking getConnection()');
    }
    return connection;
}

const shutDownData = async () => {
    getLogger().info('Shutting down database connection!');
    connection.end();
    connection = null;
    getLogger().info('Database connection is shut down.');
};

const tables = {
    food: 'food',
    foodItem: 'food_item',
    fridge: 'fridge',
    recipe: 'recipe',
    ingredient: 'ingredient',
    user: 'user'
};

const columns = {//TODO: update this so it's usable in repo
    food: ['id', 'name', 'description'],
    foodItem: ['id', 'food_id', 'amount', 'fridge_id'],
    fridge: ['id', 'name'],
    recipe: ['id', 'name', 'description'],
    ingredient: ['id', 'food_id', 'recipe_id'],
    user: ['id', 'username', 'email', 'password_hash']
};

module.exports = {
    initializeData,
    getConnection,
    shutDownData,
    tables,
    columns,
}