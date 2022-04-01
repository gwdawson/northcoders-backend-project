const { getTopics } = require('./controllers/topics.controller');
const {
  getArticleById,
  patchArticleById,
  getArticles,
  postCommentByArticleId,
  getCommentsByArticleId,
} = require('./controllers/articles.controller');
const { getApi } = require('./controllers/api.controller');
const { getUsers } = require('./controllers/users.controller');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api', getApi);
app.get('/api/topics', getTopics);
app.get('/api/users', getUsers);
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles/:article_id/comments', getCommentsByArticleId);
app.patch('/api/articles/:article_id', patchArticleById);
app.post('/api/articles/:article_id/comments', postCommentByArticleId);

app.all('/*', (err, req, res, next) => {
  res.status(404).send({ message: 'not found' });
});

// custom
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.staus).send({ message: err.message });
  } else {
    next(err);
  }
});

// psql
app.use((err, req, res, next) => {
  if (err.code === '23502') {
    res.status(400).send({ message: 'POST request must include 2 keys [username, body]' });
  } else if (err.code === '23503') {
    res.status(400).send({ message: 'bad request' });
  } else if (err.code === '22P02') {
    res.status(400).send({ message: 'invalid article_id' });
  } else if (err.code === '42703') {
    res.status(400).send({ message: 'invalid article_id' });
  } else {
    next(err);
  }
});

// default
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: 'Internal server error' });
});

module.exports = app;
