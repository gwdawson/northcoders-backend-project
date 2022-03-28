const request = require('supertest');
const testData = require('../db/data/test-data/index');
const seed = require('../db/seeds/seed');
const db = require('../db/connection');
const app = require('../index.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('testing article endpoints', () => {
  test('should return an object including keys {author, title, article_id , body, topic, created_at, votes}', async () => {
    const { body } = await request(app).get('/api/articles/9').expect(200);
    const { article } = body;
    expect('author' in article).toBe(true);
    expect('title' in article).toBe(true);
    expect('article_id' in article).toBe(true);
    expect('body' in article).toBe(true);
    expect('created_at' in article).toBe(true);
    expect('votes' in article).toBe(true);
  });
});
