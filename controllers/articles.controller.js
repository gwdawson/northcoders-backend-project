const { getArticleById } = require('../models/articles.model');

exports.getArticle = async (req, res) => {
  const { article_id } = req.params;
  const article = await getArticleById(article_id);
  res.status(200).send({ article });
};
