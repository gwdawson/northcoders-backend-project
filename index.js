const { getTopics } = require('./controllers/topics.controller');
const { removeCommentById } = require('./controllers/comments.controller');
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
app.delete('/api/comments/:comment_id', removeCommentById);

app.use((err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send({ message: err.message });
  } else if (err.status === 404) {
    res.status(404).send({ message: err.message });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ message: 'bad request' });
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: 'Internal server error' });
});

module.exports = app;
