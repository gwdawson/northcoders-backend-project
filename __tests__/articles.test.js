const request = require('supertest');
const testData = require('../db/data/test-data/index');
const seed = require('../db/seeds/seed');
const db = require('../db/connection');
const app = require('../index.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('testing article endpoints', () => {
  test('should return an object including keys {author, title, article_id , body, topic, created_at, votes, comment_count}', async () => {
    const { body } = await request(app).get('/api/articles/1').expect(200);
    const { article } = body;
    expect(article).toEqual(
      expect.objectContaining({
        author: 'butter_bridge',
        title: 'Living in the shadow of a great man',
        article_id: 1,
        body: 'I find this existence challenging',
        topic: 'mitch',
        created_at: '2020-07-09T20:11:00.000Z',
        votes: 100,
        comment_count: 11,
      })
    );
  });
  describe('PATCH /api/articles/:article_id', () => {
    test('should return an the article with the updated vote count', async () => {
      const { body } = await request(app).patch('/api/articles/1').send({ inc_votes: 6 }).expect(200);
      const { article } = body;
      expect(article).toEqual(
        expect.objectContaining({
          author: 'butter_bridge',
          title: 'Living in the shadow of a great man',
          article_id: 1,
          body: 'I find this existence challenging',
          topic: 'mitch',
          created_at: '2020-07-09T20:11:00.000Z',
          votes: 106,
        })
      );
    });
  });
  describe('GET /api/articles', () => {
    test('should return an array of all articles', async () => {
      const { body } = await request(app).get('/api/articles').expect(200);
      const { articles } = body;
      expect(articles).toHaveLength(12);
    });
  });
});
