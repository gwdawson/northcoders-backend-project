const request = require('supertest');
const testData = require('../db/data/test-data/index');
const seed = require('../db/seeds/seed');
const db = require('../db/connection');
const app = require('../index.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('testing article endpoints', () => {
  test('should return a status 204 and no content', async () => {
    await request(app).delete('/api/comments/1').expect(204);
  });
});
