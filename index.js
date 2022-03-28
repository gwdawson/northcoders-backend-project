const { getTopics } = require('./controllers/topics.controller');
const { getArticleById } = require('./controllers/articles.controller');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticleById);

module.exports = app;
