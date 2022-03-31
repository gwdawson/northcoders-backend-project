const { getTopics } = require('./controllers/topics.controller');
const {
  getArticleById,
  patchArticleById,
  getArticles,
  postCommentByArticleId,
} = require('./controllers/articles.controller');
const { getUsers } = require('./controllers/users.controller');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api/users', getUsers);
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id', getArticleById);
app.patch('/api/articles/:article_id', patchArticleById);
app.post('/api/articles/:article_id/comments', postCommentByArticleId);

module.exports = app;
