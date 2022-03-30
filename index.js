const { getTopics } = require('./controllers/topics.controller');
const {
  getArticleById,
  patchArticleById,
  getArticles,
  getCommentsByArticleId,
} = require('./controllers/articles.controller');
const { getUsers } = require('./controllers/users.controller');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api/users', getUsers);
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles/:article_id/comments', getCommentsByArticleId);
app.patch('/api/articles/:article_id', patchArticleById);

module.exports = app;
