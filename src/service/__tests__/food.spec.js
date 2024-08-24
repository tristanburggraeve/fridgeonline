const supertest = require('supertest');
const createServer = require('../../createServer');
const {getConnection} = require('../../data');
const fs = require('fs');

const foodSeedQuery = fs.readFileSync('src/data/seeds/foodSeed.sql', {encoding: "utf-8"});
const foodItemSeedQuery = fs.readFileSync('src/data/seeds/foodItemSeed.sql', {encoding: "utf-8"});
const fridgeSeedQuery = fs.readFileSync('src/data/seeds/fridgeSeed.sql', {encoding: "utf-8"});
const ingredientSeedQuery = fs.readFileSync('src/data/seeds/ingredientSeed.sql', {encoding: "utf-8"});
const recipeSeedQuery = fs.readFileSync('src/data/seeds/recipeSeed.sql', {encoding: "utf-8"});
const userSeedQuery = fs.readFileSync('src/data/seeds/userSeed.sql', {encoding: "utf-8"});



describe('Food', () => {
    
    let server;
    let request;
    let connection;

    beforeAll(async () => {
        server = await createServer();
        request = supertest(server.getApp().callback());
        connection = getConnection();
    });

    afterAll(async () => {
        await server.stop();
    });

    const url = '/api/food/';


    describe('GET /api/food', () => {

        beforeAll(async () => {
            [foodSeedQuery, userSeedQuery, fridgeSeedQuery, recipeSeedQuery, foodItemSeedQuery, ingredientSeedQuery].map(async (query) => {
                try {
                    await connection.execute(query);
                } catch (error) {
                }
            })
        })

        it('should 200 and return all foods', async () => {
            const response = await request.get(url);
            expect(response.status).toBe(200);
        });

        it('should 200 and return 1 food', async () => {
            const response = await request.get('/api/food/1');
            expect(response.status).toBe(200);
        });
    });
});