const { fetchArticleById, updateArticleById, fetchArticles } = require('../models/articles.model');

exports.getArticleById = async (req, res) => {
  const { article_id } = req.params;
  const article = await fetchArticleById(article_id);
  res.status(200).send({ article });
};

exports.patchArticleById = async (req, res) => {
  const { inc_votes } = req.body;
  const { article_id } = req.params;
  const article = await updateArticleById(article_id, inc_votes);
  res.status(200).send({ article });
};

exports.getArticles = async (req, res) => {
  const articles = await fetchArticles();
  res.status(200).send({ articles });
};
