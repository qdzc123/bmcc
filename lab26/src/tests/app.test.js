const request = require('supertest');
const app = require('../src/app');
const db = require('../src/database');
const { faker } = require('@faker-js/faker');

describe('Users API', () => {
  afterAll(async () => {
    await db.query('DELETE FROM users');
  });

  it('should create a new user', async () => {
    const newUser = { name: faker.name.fullName(), email: faker.internet.email() };
    const response = await request(app).post('/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });

  it('should fetch all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
