const knex = require('knex');
const jwt = require('jsonwebtoken')
const app = require('../src/app');
const helpers = require('./test-helpers');

describe(`Auth endpoints`, () => {

    let db

    const { testUsers } = helpers.makeThingsFixtures()
    const testUser = testUsers[0]

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))


    describe(`POST /api/auth/login`, () => {

        beforeEach('insert things', () => {
            helpers.seedUsers(
                db,
                testUsers,
            )
        })

        const requiredFields = ['user_name', 'password']

        requiredFields.forEach(field => {
            const loginAttemptBody = {
                user_name: testUser.user_name,
                password: testUser.password,
            }

            it(`responds with 400 and an error message when the '${field}' is missing`, () => {
                delete loginAttemptBody[field]

                return supertest(app)
                    .post('/api/auth/login')
                    .send(loginAttemptBody)
                    .expect(400, {
                        error: `Missing '${field}' in request body`,
                    })
            }) 
        })

        it(`responds with 400 'incorrect user_name or password' when 'user_name' is not in db`, () => {
                
            const userInvalidUser = { user_name: 'user--not', password: 'existy' }
            return supertest(app)
                .post('/api/auth/login')
                .send(userInvalidUser)
                .expect(400, {
                    error: 'Incorrect user_name or password',
                })
        })

        it(`responds with 400 'incorrect user_name or password' when 'password' is not in db`, () => {
            
            const userInvalidUser = { user_name: testUser.user_name, password: 'incorrect' }
            return supertest(app)
                .post('/api/auth/login')
                .send(userInvalidUser)
                .expect(400, {
                    error: 'Incorrect user_name or password',
                })
        })

        // Sometimes this test fails... why? > 'Error: expected 200 "OK", got 400 "Bad Request"'
        it(`responds 200 and JWT auth token using secret when valid credentials`, () => {

            const userValidCreds = {
                user_name: testUser.user_name,
                password: testUser.password,
            }

            const expectedToken = jwt.sign(
                { user_id: testUser.id },   // payload
                process.env.JWT_SECRET,
                {
                    subject: testUser.user_name,
                    algorithm: 'HS256',
                },
            )

            return supertest(app)
                .post('/api/auth/login')
                .send(userValidCreds)
                .expect(200, {
                    authToken: expectedToken,
                })
        });
    
    });

});