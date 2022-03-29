const { fetchArticleById } = require('../models/articles.model');

exports.getArticleById = async (req, res) => {
  const { article_id } = req.params;
  const article = await fetchArticleById(article_id);
  res.status(200).send({ article });
};
