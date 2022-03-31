const {
  fetchArticleById,
  updateArticleById,
  fetchArticles,
  insertCommentByArticleId,
} = require('../models/articles.model');

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

exports.postCommentByArticleId = async (req, res) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  const comment = await insertCommentByArticleId(article_id, username, body);
  res.status(201).send({ comment });
};
