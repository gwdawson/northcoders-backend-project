const { getTopics } = require('./controllers/topics.controller');
const { getArticleById, patchArticleById } = require('./controllers/articles.controller');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);
app.patch('/api/articles/:article_id', patchArticleById);

module.exports = app;
