
module.exports = {
    port: 9000,
    log: {
        level: 'silly',
        disabled: true,
    },
    database : {
        client: 'mysql2',
        host: 'localhost',
        port: 3306,
        name: 'fridgedb_test',
        user: 'root',
        password: 'root',
        
    },
    cors : {
        origins: ['http://localhost:5173'],
        maxAge: 3 * 60 * 60,
    },
    auth : {
        argon: {
            saltLength: 16,
            hashLength: 32,
            timeCost: 6,
            memoryCost: 2 ** 17,
        },
        jwt: {
            secret: 'ditiseensecretdieheelmoielijkiswantookschrijffouten',
            expirationInterval: 60*60*1000,
            issuer: 'fridge.ws',
            audience: 'fridge.ws',
        },
    },
};