const { getTopics } = require('./controllers/topics.controller');
const { getArticle } = require('./controllers/articles.controller');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticle);

module.exports = app;
